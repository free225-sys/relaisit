from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
import jwt
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Relais IT API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------------- Admin auth ----------------
JWT_ALGORITHM = "HS256"


class AdminLoginInput(BaseModel):
    password: str = Field(..., min_length=1, max_length=200)


def create_admin_token() -> str:
    payload = {
        "sub": "admin",
        "type": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
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


# ---------------- Models ----------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactSubmissionCreate(BaseModel):
    nom: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    telephone: Optional[str] = Field(default="", max_length=40)
    objet: str = Field(..., min_length=1, max_length=160)
    message: str = Field(..., min_length=1, max_length=4000)


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nom: str
    email: str
    telephone: str = ""
    objet: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Relais IT API - Trust it."}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact", response_model=ContactSubmission, status_code=201)
async def create_contact(input: ContactSubmissionCreate):
    submission = ContactSubmission(**input.model_dump())
    doc = submission.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_submissions.insert_one(doc)
    return submission


@api_router.post("/admin/login")
async def admin_login(input: AdminLoginInput):
    expected = os.environ["ADMIN_PASSWORD"]
    if not secrets.compare_digest(input.password.encode("utf-8"), expected.encode("utf-8")):
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")
    return {"token": create_admin_token(), "token_type": "bearer"}


@api_router.get("/admin/me", dependencies=[Depends(require_admin)])
async def admin_me():
    return {"authenticated": True}


@api_router.get("/contact", response_model=List[ContactSubmission], dependencies=[Depends(require_admin)])
async def list_contacts():
    items = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.delete("/contact/{submission_id}", dependencies=[Depends(require_admin)])
async def delete_contact(submission_id: str):
    result = await db.contact_submissions.delete_one({"id": submission_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Demande introuvable")
    return {"deleted": True, "id": submission_id}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
