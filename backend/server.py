"""Relais IT — API.

Expose uniquement ce dont le site a besoin :
  POST /api/contact        — dépôt d'une demande depuis le formulaire public
  POST /api/admin/login    — authentification de l'espace d'administration
  GET  /api/admin/me       — vérification du jeton
  GET  /api/contact        — liste des demandes (authentifié)
  DELETE /api/contact/{id} — suppression d'une demande (authentifié)
  GET  /api/health         — sonde de disponibilité
"""

from contextlib import asynccontextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Dict, List, Tuple
import logging
import os
import secrets
import time
import uuid

import jwt
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("relaisit")

# --------------------------------------------------------------------------
# Base de données
# --------------------------------------------------------------------------
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]


@asynccontextmanager
async def lifespan(_app: FastAPI):
    # Index utiles : tri des demandes par date, suppression par identifiant.
    await db.contact_submissions.create_index("created_at")
    await db.contact_submissions.create_index("id", unique=True)
    logger.info("Relais IT API prête.")
    yield
    client.close()


app = FastAPI(title="Relais IT API", lifespan=lifespan)
api_router = APIRouter(prefix="/api")

# --------------------------------------------------------------------------
# Limitation de débit (fenêtre glissante en mémoire)
# --------------------------------------------------------------------------
# Volontairement sans dépendance externe. Suffisant pour un site vitrine servi
# par un seul processus ; à remplacer par Redis en cas de déploiement multi-worker.
_HITS: Dict[str, List[float]] = {}


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "inconnu"


def rate_limit(bucket: str, limit: int, window_seconds: int):
    """Autorise `limit` requêtes par IP et par fenêtre de `window_seconds`."""

    async def dependency(request: Request) -> None:
        key = f"{bucket}:{_client_ip(request)}"
        now = time.monotonic()
        hits = [t for t in _HITS.get(key, []) if now - t < window_seconds]
        if len(hits) >= limit:
            retry_after = int(window_seconds - (now - hits[0])) + 1
            _HITS[key] = hits
            logger.warning("Limite de débit atteinte sur %s", key)
            raise HTTPException(
                status_code=429,
                detail="Trop de tentatives. Réessayez dans quelques minutes.",
                headers={"Retry-After": str(retry_after)},
            )
        hits.append(now)
        _HITS[key] = hits
        # Purge opportuniste pour éviter la croissance illimitée du dictionnaire.
        if len(_HITS) > 5000:
            for k in [k for k, v in _HITS.items() if not v or now - v[-1] > window_seconds]:
                _HITS.pop(k, None)

    return dependency


# --------------------------------------------------------------------------
# Authentification de l'espace d'administration
# --------------------------------------------------------------------------
JWT_ALGORITHM = "HS256"
TOKEN_TTL_HOURS = 12


class AdminLoginInput(BaseModel):
    password: str = Field(..., min_length=1, max_length=200)


def create_admin_token() -> str:
    payload = {
        "sub": "admin",
        "type": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=TOKEN_TTL_HOURS),
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


async def require_admin(request: Request) -> None:
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Non authentifié")
    token = auth_header[7:]
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "admin":
            raise HTTPException(status_code=401, detail="Jeton invalide")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expirée")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Jeton invalide")


# --------------------------------------------------------------------------
# Modèles
# --------------------------------------------------------------------------
class ContactSubmissionCreate(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    nom: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    telephone: str = Field("", max_length=40)
    entreprise: str = Field("", max_length=160)
    objet: str = Field(..., min_length=2, max_length=160)
    message: str = Field(..., min_length=10, max_length=4000)
    # Champ leurre : invisible pour un humain, rempli par la plupart des robots.
    site_web: str = Field("", max_length=200)


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nom: str
    email: str
    telephone: str = ""
    entreprise: str = ""
    objet: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# --------------------------------------------------------------------------
# Routes publiques
# --------------------------------------------------------------------------
@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post(
    "/contact",
    status_code=201,
    dependencies=[Depends(rate_limit("contact", limit=5, window_seconds=3600))],
)
async def create_contact(payload: ContactSubmissionCreate):
    if payload.site_web:
        # Robot détecté : on répond comme si tout s'était bien passé, sans rien stocker.
        logger.info("Soumission de contact rejetée (champ leurre rempli).")
        return {"ok": True}

    submission = ContactSubmission(**payload.model_dump(exclude={"site_web"}))
    doc = submission.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contact_submissions.insert_one(doc)
    logger.info("Nouvelle demande de contact : %s", submission.id)
    return {"ok": True, "id": submission.id}


# --------------------------------------------------------------------------
# Routes d'administration
# --------------------------------------------------------------------------
@api_router.post(
    "/admin/login",
    dependencies=[Depends(rate_limit("admin-login", limit=5, window_seconds=900))],
)
async def admin_login(payload: AdminLoginInput):
    expected = os.environ["ADMIN_PASSWORD"]
    if not secrets.compare_digest(payload.password.encode("utf-8"), expected.encode("utf-8")):
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")
    return {"token": create_admin_token(), "token_type": "bearer"}


@api_router.get("/admin/me", dependencies=[Depends(require_admin)])
async def admin_me():
    return {"authenticated": True}


@api_router.get(
    "/contact",
    response_model=List[ContactSubmission],
    dependencies=[Depends(require_admin)],
)
async def list_contacts():
    items = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for item in items:
        if isinstance(item.get("created_at"), str):
            item["created_at"] = datetime.fromisoformat(item["created_at"])
    return items


@api_router.delete("/contact/{submission_id}", dependencies=[Depends(require_admin)])
async def delete_contact(submission_id: str):
    result = await db.contact_submissions.delete_one({"id": submission_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Demande introuvable")
    return {"deleted": True, "id": submission_id}


app.include_router(api_router)


# --------------------------------------------------------------------------
# CORS
# --------------------------------------------------------------------------
def _cors_settings() -> Tuple[List[str], bool]:
    """Origines autorisées, et si les identifiants peuvent être transmis.

    `allow_origins=["*"]` combiné à `allow_credentials=True` est interdit par la
    spécification CORS et revient à laisser n'importe quel site appeler l'API au
    nom du visiteur. L'authentification se fait ici par en-tête `Authorization`,
    jamais par cookie : les identifiants ne sont donc jamais nécessaires.
    """
    raw = os.environ.get("CORS_ORIGINS", "")
    origins = [o.strip() for o in raw.split(",") if o.strip()]
    if not origins or "*" in origins:
        logger.warning(
            "CORS_ORIGINS non restreint (%r). Renseignez vos domaines, "
            "par exemple : https://relaisit.com,https://www.relaisit.com",
            raw or "(vide)",
        )
        return ["*"], False
    return origins, False


_origins, _allow_credentials = _cors_settings()

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=_allow_credentials,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
    max_age=600,
)
