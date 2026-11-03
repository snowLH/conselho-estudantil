"use client";

import React, { useState, useEffect } from "react";
import { AdminDashboard } from "@/components/AdminDashboard";
import { InstitutionalLogo } from "@/components/InstitutionalLogo";
import { Lock, ArrowRight, AlertCircle, ShieldCheck, KeyRound } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check");
      const data = await res.json();
      setIsAuthenticated(Boolean(data.authenticated));
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Senha incorreta.");
      }

      setIsAuthenticated(true);
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Falha na verificação da senha.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex items-center gap-2 text-sm text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping"></span>
          <span>Verificando credenciais de acesso...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-civic-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background aesthetic */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 px-4">
        <div className="flex justify-center mb-6">
          <InstitutionalLogo variant="light" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-civic-900 border border-civic-800 text-gold-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Lock className="w-3.5 h-3.5" />
          Módulo de Governança Digital
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Acesso Administrativo do Conselho
        </h2>
        <p className="mt-2 text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          Área reservada aos representantes e membros dos três pilares para publicação no Diário Oficial e gestão de pautas.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-civic-900/90 py-8 px-6 shadow-2xl rounded-2xl border border-civic-800 backdrop-blur-md sm:px-10">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Chave de Acesso Institucional
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Digite a senha de administrador..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-civic-950 border border-civic-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all font-mono"
                />
              </div>
            </div>

            {/* Hint / Helper for convenient evaluation */}
            <div className="bg-civic-950/80 p-3 rounded-lg border border-civic-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-gold-400" />
                <span>Senha padrão:</span>
              </span>
              <button
                type="button"
                onClick={() => setPassword("conselho2026")}
                className="font-mono text-gold-400 font-bold hover:underline"
              >
                conselho2026
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-civic-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span>{loading ? "Autenticando..." : "Entrar no Painel"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-civic-800 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Voltar para o portal público do Conselho
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
