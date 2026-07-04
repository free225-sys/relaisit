import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Inbox, RefreshCw, Trash2, ArrowLeft, Loader2, Mail, Phone, Lock, LogOut } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { LOGO_URL } from "@/data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "relais_admin_token";

const authHeaders = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/admin/login`, { password });
      onLogin(res.data.token);
    } catch (err) {
      setError(err.response?.status === 401 ? "Mot de passe incorrect." : "Connexion impossible. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6" data-testid="admin-login-page">
      <div className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        <img src={LOGO_URL} alt="Relais IT" className="h-10 w-auto object-contain mx-auto" />
        <h1 className="mt-6 text-lg font-semibold text-navy text-center flex items-center justify-center gap-2">
          <Lock size={18} className="text-brand-orange" /> Espace administration
        </h1>
        <p className="mt-1 text-sm text-slate-500 text-center">Accès protégé par mot de passe.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            data-testid="admin-password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            autoFocus
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
          />
          {error && <p data-testid="admin-login-error" className="text-sm text-red-500">{error}</p>}
          <button
            data-testid="admin-login-submit"
            type="submit"
            disabled={submitting || !password}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-dark transition-colors disabled:opacity-50"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : "Se connecter"}
          </button>
        </form>
        <Link to="/" data-testid="admin-login-back" className="mt-5 flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-navy transition-colors">
          <ArrowLeft size={14} /> Retour au site
        </Link>
      </div>
    </div>
  );
};

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY));
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setItems([]);
  }, []);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API}/contact`, authHeaders(token));
      setItems(res.data);
    } catch (e) {
      if (e.response?.status === 401) {
        logout();
        toast.error("Session expirée. Reconnectez-vous.");
      } else {
        toast.error("Impossible de charger les demandes.");
      }
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  useEffect(() => { load(); }, [load]);

  const remove = async (id) => {
    try {
      await axios.delete(`${API}/contact/${id}`, authHeaders(token));
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("Demande supprimée.");
    } catch (e) {
      if (e.response?.status === 401) {
        logout();
        toast.error("Session expirée. Reconnectez-vous.");
      } else {
        toast.error("Suppression impossible.");
      }
    }
  };

  const handleLogin = (newToken) => {
    sessionStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const fmt = (iso) => {
    try { return new Date(iso).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" }); }
    catch { return iso; }
  };

  if (!token) return <AdminLogin onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-slate-50" data-testid="admin-page">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={LOGO_URL} alt="Relais IT" className="h-8 w-auto object-contain" />
            <span className="hidden sm:block text-sm font-semibold text-navy">Administration — Demandes</span>
          </div>
          <div className="flex items-center gap-3">
            <button data-testid="admin-refresh" onClick={load} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-navy hover:bg-slate-50 transition-colors">
              <RefreshCw size={16} /> Actualiser
            </button>
            <button data-testid="admin-logout" onClick={logout} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-500 hover:text-red-500 hover:border-red-200 transition-colors">
              <LogOut size={16} /> Déconnexion
            </button>
            <Link to="/" data-testid="admin-back" className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-dark transition-colors">
              <ArrowLeft size={16} /> Site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-navy flex items-center gap-3">
            <Inbox size={26} className="text-brand-orange" /> Demandes de contact
          </h1>
          <span className="rounded-full bg-navy/5 px-3 py-1 text-sm font-medium text-navy">{items.length} demande(s)</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-400">
            <Loader2 size={26} className="animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div data-testid="admin-empty" className="rounded-2xl border border-dashed border-slate-300 bg-white py-24 text-center">
            <Inbox size={40} className="mx-auto text-slate-300" />
            <p className="mt-4 text-slate-500">Aucune demande pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.id} data-testid="admin-submission" className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-navy">{it.nom}</h3>
                      <span className="text-xs text-slate-400">{fmt(it.created_at)}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><Mail size={14} /> {it.email}</span>
                      {it.telephone && <span className="flex items-center gap-1.5"><Phone size={14} /> {it.telephone}</span>}
                    </div>
                  </div>
                  <button data-testid="admin-delete" onClick={() => remove(it.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 size={15} /> Supprimer
                  </button>
                </div>
                <p className="mt-3 text-sm font-medium text-brand-orange">{it.objet}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">{it.message}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
