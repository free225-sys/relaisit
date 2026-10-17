"""Tests de l'API Relais IT.

Exécution :  cd backend && .venv/bin/python -m pytest tests -q
La base est simulée en mémoire (mongomock) : aucun MongoDB n'est nécessaire.
"""

import os
import sys
from pathlib import Path

import pytest

BACKEND_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_DIR))

os.environ.setdefault("MONGO_URL", "mongodb://localhost:27017")
os.environ.setdefault("DB_NAME", "relaisit_test")
os.environ.setdefault("ADMIN_PASSWORD", "mot-de-passe-de-test")
os.environ.setdefault("JWT_SECRET", "secret-de-test")
os.environ.setdefault("CORS_ORIGINS", "https://relaisit.com")

from fastapi.testclient import TestClient  # noqa: E402
from mongomock_motor import AsyncMongoMockClient  # noqa: E402

import server  # noqa: E402

VALID = {
    "nom": "Awa Traoré",
    "email": "awa@example.com",
    "telephone": "0747732557",
    "entreprise": "Cabinet Traoré",
    "objet": "Contrat de maintenance",
    "message": "Bonjour, nous avons 12 postes à Cocody et cherchons un contrat de maintenance.",
}


@pytest.fixture()
def api(monkeypatch):
    """Client de test avec une base en mémoire et le compteur de débit remis à zéro."""
    fake_db = AsyncMongoMockClient()["relaisit_test"]
    monkeypatch.setattr(server, "db", fake_db)
    server._HITS.clear()
    with TestClient(server.app) as client:
        yield client


def login(api) -> str:
    res = api.post("/api/admin/login", json={"password": "mot-de-passe-de-test"})
    assert res.status_code == 200
    return res.json()["token"]


# --------------------------------------------------------------------- santé
def test_health(api):
    assert api.get("/api/health").json() == {"status": "ok"}


def test_les_routes_status_publiques_sont_supprimees(api):
    # Ces routes permettaient d'écrire en base sans authentification.
    assert api.post("/api/status", json={"client_name": "x"}).status_code == 404
    assert api.get("/api/status").status_code == 404


# ------------------------------------------------------------------- contact
def test_soumission_valide(api):
    res = api.post("/api/contact", json=VALID)
    assert res.status_code == 201
    assert res.json()["ok"] is True


def test_email_invalide_refuse(api):
    res = api.post("/api/contact", json={**VALID, "email": "pas-un-email"})
    assert res.status_code == 422


def test_message_trop_court_refuse(api):
    res = api.post("/api/contact", json={**VALID, "message": "court"})
    assert res.status_code == 422


def test_champ_leurre_rejette_silencieusement(api):
    res = api.post("/api/contact", json={**VALID, "site_web": "http://spam.example"})
    assert res.status_code == 201
    token = login(api)
    listed = api.get("/api/contact", headers={"Authorization": f"Bearer {token}"})
    assert listed.json() == []  # rien n'a été stocké


def test_limite_de_debit_sur_le_formulaire(api):
    for _ in range(5):
        assert api.post("/api/contact", json=VALID).status_code == 201
    trop = api.post("/api/contact", json=VALID)
    assert trop.status_code == 429
    assert "Retry-After" in trop.headers


# --------------------------------------------------------------------- admin
def test_mot_de_passe_incorrect(api):
    assert api.post("/api/admin/login", json={"password": "faux"}).status_code == 401


def test_limite_de_debit_sur_la_connexion_admin(api):
    for _ in range(5):
        api.post("/api/admin/login", json={"password": "faux"})
    assert api.post("/api/admin/login", json={"password": "faux"}).status_code == 429
    # Le bon mot de passe est lui aussi bloqué : c'est le but d'un verrou anti-force brute.
    assert api.post("/api/admin/login", json={"password": "mot-de-passe-de-test"}).status_code == 429


def test_routes_protegees_sans_jeton(api):
    assert api.get("/api/contact").status_code == 401
    assert api.get("/api/admin/me").status_code == 401
    assert api.delete("/api/contact/nimporte-quoi").status_code == 401


def test_jeton_invalide_refuse(api):
    assert api.get("/api/contact", headers={"Authorization": "Bearer faux"}).status_code == 401


def test_parcours_complet_admin(api):
    api.post("/api/contact", json=VALID)
    token = login(api)
    auth = {"Authorization": f"Bearer {token}"}

    assert api.get("/api/admin/me", headers=auth).json() == {"authenticated": True}

    items = api.get("/api/contact", headers=auth).json()
    assert len(items) == 1
    assert items[0]["nom"] == "Awa Traoré"
    assert items[0]["entreprise"] == "Cabinet Traoré"

    submission_id = items[0]["id"]
    assert api.delete(f"/api/contact/{submission_id}", headers=auth).status_code == 200
    assert api.get("/api/contact", headers=auth).json() == []
    assert api.delete(f"/api/contact/{submission_id}", headers=auth).status_code == 404


# ----------------------------------------------------------------------- CORS
def test_cors_ne_transmet_jamais_les_identifiants():
    origines, credentials = server._cors_settings()
    assert credentials is False
    assert origines == ["https://relaisit.com"]


def test_cors_joker_desactive_les_identifiants(monkeypatch):
    monkeypatch.setenv("CORS_ORIGINS", "*")
    origines, credentials = server._cors_settings()
    assert credentials is False
