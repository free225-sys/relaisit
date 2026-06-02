"""Backend API tests for Relais IT — covers /api/contact CRUD + validations."""
import os
import uuid
import pytest
import requests
from dotenv import load_dotenv
from pathlib import Path

# Use frontend's REACT_APP_BACKEND_URL (production-style external URL)
load_dotenv(Path(__file__).resolve().parents[2] / "frontend" / ".env")
BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def created_ids():
    ids = []
    yield ids
    # Cleanup any leftover TEST_ submissions
    try:
        for _id in ids:
            requests.delete(f"{API}/contact/{_id}", timeout=10)
    except Exception:
        pass


# ---------------- Health ----------------
class TestHealth:
    def test_root(self, session):
        r = session.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        body = r.json()
        assert "message" in body


# ---------------- Contact POST ----------------
class TestContactCreate:
    def test_create_valid(self, session, created_ids):
        payload = {
            "nom": f"TEST_User_{uuid.uuid4().hex[:6]}",
            "email": "test_user@example.com",
            "telephone": "0700000000",
            "objet": "TEST_Objet demande de devis",
            "message": "TEST_Bonjour, je souhaite un devis pour un projet IT.",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 201, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["nom"] == payload["nom"]
        assert data["email"] == payload["email"]
        assert data["objet"] == payload["objet"]
        assert data["message"] == payload["message"]
        assert "created_at" in data
        # MongoDB internal _id must not leak
        assert "_id" not in data
        created_ids.append(data["id"])

    def test_create_missing_nom(self, session):
        r = session.post(f"{API}/contact", json={
            "email": "a@b.com", "objet": "x", "message": "y"
        }, timeout=10)
        assert r.status_code == 422

    def test_create_missing_email(self, session):
        r = session.post(f"{API}/contact", json={
            "nom": "A", "objet": "x", "message": "y"
        }, timeout=10)
        assert r.status_code == 422

    def test_create_missing_objet(self, session):
        r = session.post(f"{API}/contact", json={
            "nom": "A", "email": "a@b.com", "message": "y"
        }, timeout=10)
        assert r.status_code == 422

    def test_create_missing_message(self, session):
        r = session.post(f"{API}/contact", json={
            "nom": "A", "email": "a@b.com", "objet": "x"
        }, timeout=10)
        assert r.status_code == 422

    def test_create_invalid_email(self, session):
        r = session.post(f"{API}/contact", json={
            "nom": "A", "email": "not-an-email", "objet": "x", "message": "y"
        }, timeout=10)
        assert r.status_code == 422


# ---------------- Contact GET (list + sort) ----------------
class TestContactList:
    def test_list_returns_array(self, session):
        r = session.get(f"{API}/contact", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        for item in data:
            assert "_id" not in item

    def test_list_sorted_desc_by_created_at(self, session, created_ids):
        # Insert two more, ensure the latest is first
        import time
        p1 = {"nom": "TEST_S1", "email": "s1@example.com", "objet": "TEST_obj", "message": "m"}
        p2 = {"nom": "TEST_S2", "email": "s2@example.com", "objet": "TEST_obj", "message": "m"}
        r1 = session.post(f"{API}/contact", json=p1, timeout=10)
        assert r1.status_code == 201
        time.sleep(1.1)
        r2 = session.post(f"{API}/contact", json=p2, timeout=10)
        assert r2.status_code == 201
        created_ids.extend([r1.json()["id"], r2.json()["id"]])

        r = session.get(f"{API}/contact", timeout=15)
        assert r.status_code == 200
        items = r.json()
        # Find indices of the two created items
        idx2 = next((i for i, it in enumerate(items) if it["id"] == r2.json()["id"]), None)
        idx1 = next((i for i, it in enumerate(items) if it["id"] == r1.json()["id"]), None)
        assert idx2 is not None and idx1 is not None
        # idx2 (newer) should appear before idx1 (older) in desc-sorted list
        assert idx2 < idx1, f"Expected newer item first, got idx2={idx2}, idx1={idx1}"


# ---------------- Contact DELETE ----------------
class TestContactDelete:
    def test_delete_existing(self, session, created_ids):
        payload = {"nom": "TEST_Del", "email": "del@example.com", "objet": "TEST_obj", "message": "m"}
        r = session.post(f"{API}/contact", json=payload, timeout=10)
        assert r.status_code == 201
        _id = r.json()["id"]

        r_del = session.delete(f"{API}/contact/{_id}", timeout=10)
        assert r_del.status_code == 200
        body = r_del.json()
        assert body.get("deleted") is True
        assert body.get("id") == _id

        # Verify removal: subsequent delete returns 404
        r_again = session.delete(f"{API}/contact/{_id}", timeout=10)
        assert r_again.status_code == 404

    def test_delete_unknown_returns_404(self, session):
        unknown = f"nonexistent-{uuid.uuid4()}"
        r = session.delete(f"{API}/contact/{unknown}", timeout=10)
        assert r.status_code == 404
