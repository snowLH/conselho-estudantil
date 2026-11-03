"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Decision,
  Proposal,
  OfficialDocument,
  Notice,
  StudentSuggestion,
  InstitutionalConfig,
  DecisionStatus,
  ProposalStatus,
} from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import {
  Lock,
  LogOut,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Layers,
  Users,
  Settings,
  Bell,
  MessageSquare,
  Search,
  ExternalLink,
  Save,
  X,
  Sparkles,
} from "lucide-react";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "decisions" | "proposals" | "documents" | "notices" | "suggestions" | "config"
  >("decisions");

  const [loading, setLoading] = useState(true);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [documents, setDocuments] = useState<OfficialDocument[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [suggestions, setSuggestions] = useState<StudentSuggestion[]>([]);
  const [config, setConfig] = useState<InstitutionalConfig | null>(null);

  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Modals / Form States
  const [editingDecision, setEditingDecision] = useState<Partial<Decision> | null>(null);
  const [editingProposal, setEditingProposal] = useState<Partial<Proposal> | null>(null);
  const [editingDocument, setEditingDocument] = useState<Partial<OfficialDocument> | null>(null);
  const [editingNotice, setEditingNotice] = useState<Partial<Notice> | null>(null);

  const showNotification = (type: "success" | "error", msg: string) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [dRes, pRes, docRes, nRes, sRes, cRes] = await Promise.all([
        fetch("/api/decisions"),
        fetch("/api/proposals"),
        fetch("/api/documents"),
        fetch("/api/notices"),
        fetch("/api/suggestions"),
        fetch("/api/config"),
      ]);

      if (dRes.ok) setDecisions(await dRes.json());
      if (pRes.ok) setProposals(await pRes.json());
      if (docRes.ok) setDocuments(await docRes.json());
      if (nRes.ok) setNotices(await nRes.json());
      if (sRes.ok) setSuggestions(await sRes.json());
      if (cRes.ok) setConfig(await cRes.json());
    } catch (err) {
      showNotification("error", "Erro ao carregar dados do banco.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // --- DECISION CRUD ---
  const handleSaveDecision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDecision) return;

    try {
      const isNew = !editingDecision.id;
      const url = isNew ? "/api/decisions" : `/api/decisions/${editingDecision.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDecision),
      });

      if (!res.ok) throw new Error("Erro ao salvar decisão.");

      showNotification("success", isNew ? "Decisão publicada com sucesso!" : "Decisão atualizada!");
      setEditingDecision(null);
      loadAllData();
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  const handleDeleteDecision = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta decisão do Diário Oficial?")) return;
    try {
      const res = await fetch(`/api/decisions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir.");
      showNotification("success", "Decisão excluída.");
      loadAllData();
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  // --- PROPOSAL CRUD ---
  const handleSaveProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProposal) return;

    try {
      const isNew = !editingProposal.id;
      const url = isNew ? "/api/proposals" : `/api/proposals/${editingProposal.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProposal),
      });

      if (!res.ok) throw new Error("Erro ao salvar proposta.");

      showNotification("success", isNew ? "Proposta protocolada com sucesso!" : "Proposta atualizada!");
      setEditingProposal(null);
      loadAllData();
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  const handleDeleteProposal = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta proposta?")) return;
    try {
      const res = await fetch(`/api/proposals/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir.");
      showNotification("success", "Proposta excluída.");
      loadAllData();
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  // --- DOCUMENT CRUD ---
  const handleSaveDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDocument) return;

    try {
      const isNew = !editingDocument.id;
      const url = isNew ? "/api/documents" : `/api/documents/${editingDocument.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDocument),
      });

      if (!res.ok) throw new Error("Erro ao salvar documento.");

      showNotification("success", isNew ? "Documento cadastrado com sucesso!" : "Documento atualizado!");
      setEditingDocument(null);
      loadAllData();
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este documento?")) return;
    try {
      const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir.");
      showNotification("success", "Documento excluído.");
      loadAllData();
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  // --- NOTICE CRUD ---
  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice) return;

    try {
      const isNew = !editingNotice.id;
      const url = isNew ? "/api/notices" : `/api/notices/${editingNotice.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingNotice),
      });

      if (!res.ok) throw new Error("Erro ao salvar notícia.");

      showNotification("success", isNew ? "Notícia publicada!" : "Notícia atualizada!");
      setEditingNotice(null);
      loadAllData();
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta notícia?")) return;
    try {
      const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir.");
      showNotification("success", "Notícia excluída.");
      loadAllData();
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  // --- SUGGESTION MODERATION ---
  const handleModerateSuggestion = async (id: string, status: StudentSuggestion["status"], notes?: string) => {
    try {
      const res = await fetch(`/api/suggestions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes: notes || "" }),
      });
      if (!res.ok) throw new Error("Erro ao moderar sugestão.");
      showNotification("success", `Sugestão atualizada para: ${status}`);
      loadAllData();
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  // --- CONFIG UPDATE ---
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error("Erro ao salvar configurações.");
      showNotification("success", "Configurações institucionais atualizadas!");
      loadAllData();
    } catch (err: any) {
      showNotification("error", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="bg-civic-950 text-white border-b border-civic-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gold-500 text-civic-950 font-black text-sm flex items-center justify-center">
              CE
            </div>
            <div>
              <span className="font-bold text-sm text-white tracking-wide uppercase">
                Painel Administrativo Oficial
              </span>
              <span className="hidden sm:inline text-xs text-slate-400 ml-2 font-mono">
                • Gestão de Conteúdo & Deliberações
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <span>Ver Site Público</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded bg-civic-900 hover:bg-civic-800 text-slate-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-civic-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toast Notification */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium animate-in slide-in-from-top-2 duration-150 shadow-md ${
              notification.type === "success"
                ? "bg-emerald-900 text-emerald-100 border border-emerald-700"
                : "bg-rose-900 text-rose-100 border border-rose-700"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400" />
            )}
            <span>{notification.msg}</span>
          </div>
        )}

        {/* Nav Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 p-1.5 mb-8 flex flex-wrap gap-1 shadow-xs">
          {[
            { id: "decisions", label: "Últimas Decisões", icon: Layers, badge: decisions.length },
            { id: "proposals", label: "Propostas (Anexo I)", icon: FileText, badge: proposals.length },
            { id: "documents", label: "Documentos & Atas", icon: FileText, badge: documents.length },
            { id: "notices", label: "Notícias & Avisos", icon: Bell, badge: notices.length },
            { id: "suggestions", label: "Caixa de Ouvidoria", icon: MessageSquare, badge: suggestions.filter((s) => s.status === "Pendente").length, alert: true },
            { id: "config", label: "Configurações", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-civic-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      tab.alert && tab.badge > 0
                        ? "bg-amber-500 text-white"
                        : isActive
                        ? "bg-civic-800 text-gold-300"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: GESTÃO DE ÚLTIMAS DECISÕES */}
        {activeTab === "decisions" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-bold text-civic-900">
                  Gerenciar Últimas Decisões
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Crie e edite as publicações do Diário Deliberativo que aparecem em destaque na página inicial.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingDecision({
                    title: "",
                    category: "Pedagógico",
                    type: "decisao",
                    status: "Em discussão",
                    summary: "",
                    context: "",
                    result: "",
                    nextSteps: "",
                    date: new Date().toLocaleDateString("pt-BR"),
                    isDemonstrative: false,
                    targetClasses: ["1ª Série EM", "2ª Série EM", "3ª Série EM"],
                  })
                }
                className="px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-civic-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Publicação</span>
              </button>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
              {decisions.map((d) => (
                <div key={d.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={d.status} size="sm" />
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {d.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{d.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{d.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-1">{d.summary}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => setEditingDecision(d)}
                      className="p-2 rounded text-slate-600 hover:bg-slate-200 transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDecision(d.id)}
                      className="p-2 rounded text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL DECISÃO (CREATE / EDIT) */}
        {editingDecision && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
                <h3 className="font-bold text-civic-900 text-base">
                  {editingDecision.id ? "Editar Publicação" : "Nova Publicação no Diário"}
                </h3>
                <button onClick={() => setEditingDecision(null)} className="p-1 rounded text-slate-500 hover:bg-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveDecision} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Título da Decisão / Acontecimento *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingDecision.title || ""}
                    onChange={(e) => setEditingDecision({ ...editingDecision, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Data (DD/MM/AAAA)
                    </label>
                    <input
                      type="text"
                      value={editingDecision.date || ""}
                      onChange={(e) => setEditingDecision({ ...editingDecision, date: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Categoria
                    </label>
                    <select
                      value={editingDecision.category || "Pedagógico"}
                      onChange={(e) => setEditingDecision({ ...editingDecision, category: e.target.value as any })}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    >
                      <option value="Pedagógico">Pedagógico</option>
                      <option value="Infraestrutura">Infraestrutura</option>
                      <option value="Convivência">Convivência</option>
                      <option value="Institucional">Institucional</option>
                      <option value="Eventos">Eventos</option>
                      <option value="Geral">Geral</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Situação / Status *
                    </label>
                    <select
                      value={editingDecision.status || "Em discussão"}
                      onChange={(e) => setEditingDecision({ ...editingDecision, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-slate-300 rounded font-bold"
                    >
                      <option value="Em análise">Em análise</option>
                      <option value="Em discussão">Em discussão</option>
                      <option value="Aprovada pelo Conselho">Aprovada pelo Conselho</option>
                      <option value="Encaminhada à direção">Encaminhada à direção</option>
                      <option value="Aguardando resposta">Aguardando resposta</option>
                      <option value="Em execução">Em execução</option>
                      <option value="Concluída">Concluída</option>
                      <option value="Não aprovada">Não aprovada</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Tipo de Publicação
                  </label>
                  <select
                    value={editingDecision.type || "decisao"}
                    onChange={(e) => setEditingDecision({ ...editingDecision, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  >
                    <option value="decisao">Decisão Oficial</option>
                    <option value="proposta">Proposta em Discussão</option>
                    <option value="reuniao">Ata de Reunião</option>
                    <option value="comunicado">Comunicado</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Resumo Objetivo *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingDecision.summary || ""}
                    onChange={(e) => setEditingDecision({ ...editingDecision, summary: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Contexto da Discussão
                  </label>
                  <textarea
                    rows={3}
                    value={editingDecision.context || ""}
                    onChange={(e) => setEditingDecision({ ...editingDecision, context: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Resultado / Decisão
                    </label>
                    <input
                      type="text"
                      value={editingDecision.result || ""}
                      onChange={(e) => setEditingDecision({ ...editingDecision, result: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Próximas Etapas
                    </label>
                    <input
                      type="text"
                      value={editingDecision.nextSteps || ""}
                      onChange={(e) => setEditingDecision({ ...editingDecision, nextSteps: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isDemo"
                    checked={editingDecision.isDemonstrative || false}
                    onChange={(e) => setEditingDecision({ ...editingDecision, isDemonstrative: e.target.checked })}
                    className="rounded text-civic-900 border-slate-300"
                  />
                  <label htmlFor="isDemo" className="font-semibold text-slate-700">
                    Marcar como &ldquo;Exemplo Demonstrativo&rdquo; (não é decisão real ainda)
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingDecision(null)}
                    className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-civic-900 text-white rounded font-bold hover:bg-civic-800"
                  >
                    Salvar Publicação
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: GESTÃO DE PROPOSTAS (ANEXO I) */}
        {activeTab === "proposals" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-bold text-civic-900">
                  Gerenciar Propostas (Modelo Anexo I)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Cadastre pautas formais, edite as manifestações das turmas e registre o encaminhamento à direção.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingProposal({
                    title: "",
                    problemIdentified: "",
                    proposedSolution: "",
                    justification: "",
                    status: "Nova proposta",
                    category: "Geral",
                    date: new Date().toLocaleDateString("pt-BR"),
                    targetClasses: ["1ª Série EM", "2ª Série EM", "3ª Série EM"],
                    classPositions: {
                      turma1: "Em análise",
                      turma2: "Em análise",
                      turma3: "Em análise",
                    },
                    deliberationResult: "Aguardando deliberação formal.",
                    forwarding: "Aguardando deliberação",
                    isDemonstrative: false,
                  })
                }
                className="px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-civic-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Cadastrar Proposta</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
              {proposals.map((p) => (
                <div key={p.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        Nº {p.proposalNumber}
                      </span>
                      <StatusBadge status={p.status} size="sm" />
                      <span className="text-xs text-slate-500">{p.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{p.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-1">{p.problemIdentified}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => setEditingProposal(p)}
                      className="p-2 rounded text-slate-600 hover:bg-slate-200 transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProposal(p.id)}
                      className="p-2 rounded text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL PROPOSTA (CREATE / EDIT) */}
        {editingProposal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
                <h3 className="font-bold text-civic-900 text-base">
                  {editingProposal.id ? "Editar Proposta" : "Cadastrar Proposta (Modelo Anexo I)"}
                </h3>
                <button onClick={() => setEditingProposal(null)} className="p-1 rounded text-slate-500 hover:bg-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProposal} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Título da Proposta *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProposal.title || ""}
                    onChange={(e) => setEditingProposal({ ...editingProposal, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Situação / Status *
                    </label>
                    <select
                      value={editingProposal.status || "Nova proposta"}
                      onChange={(e) => setEditingProposal({ ...editingProposal, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-slate-300 rounded font-bold"
                    >
                      <option value="Nova proposta">Nova proposta</option>
                      <option value="Em análise">Em análise</option>
                      <option value="Em debate">Em debate</option>
                      <option value="Aprovada pelo Conselho">Aprovada pelo Conselho</option>
                      <option value="Encaminhada à direção">Encaminhada à direção</option>
                      <option value="Concluída">Concluída</option>
                      <option value="Não aprovada">Não aprovada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Encaminhamento
                    </label>
                    <select
                      value={editingProposal.forwarding || "Aguardando deliberação"}
                      onChange={(e) => setEditingProposal({ ...editingProposal, forwarding: e.target.value as any })}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    >
                      <option value="Aguardando deliberação">Aguardando deliberação</option>
                      <option value="Encaminhar à direção">Encaminhar à direção</option>
                      <option value="Realizar nova discussão">Realizar nova discussão</option>
                      <option value="Reformular a proposta">Reformular a proposta</option>
                      <option value="Arquivar, apresentando justificativa">Arquivar, apresentando justificativa</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    1. Problema Identificado *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingProposal.problemIdentified || ""}
                    onChange={(e) => setEditingProposal({ ...editingProposal, problemIdentified: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    2. Proposta Apresentada (Solução) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingProposal.proposedSolution || ""}
                    onChange={(e) => setEditingProposal({ ...editingProposal, proposedSolution: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    3. Justificativa
                  </label>
                  <textarea
                    rows={2}
                    value={editingProposal.justification || ""}
                    onChange={(e) => setEditingProposal({ ...editingProposal, justification: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProposal(null)}
                    className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-civic-900 text-white rounded font-bold hover:bg-civic-800"
                  >
                    Salvar Proposta
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: GESTÃO DE DOCUMENTOS */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-bold text-civic-900">
                  Gerenciar Documentos Oficiais
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Disponibilize o Estatuto, Anexos, Atas de Reuniões e Relatórios Oficiais para consulta pública.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingDocument({
                    title: "",
                    category: "Ata de Reunião",
                    description: "",
                    content: "",
                    date: new Date().toLocaleDateString("pt-BR"),
                    downloadable: true,
                    status: "Vigente",
                  })
                }
                className="px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-civic-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Documento</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
              {documents.map((doc) => (
                <div key={doc.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-xs uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        {doc.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{doc.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{doc.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-1">{doc.description}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => setEditingDocument(doc)}
                      className="p-2 rounded text-slate-600 hover:bg-slate-200 transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="p-2 rounded text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL DOCUMENTO */}
        {editingDocument && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
                <h3 className="font-bold text-civic-900 text-base">
                  {editingDocument.id ? "Editar Documento" : "Cadastrar Documento Oficial"}
                </h3>
                <button onClick={() => setEditingDocument(null)} className="p-1 rounded text-slate-500 hover:bg-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveDocument} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Título do Documento *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingDocument.title || ""}
                    onChange={(e) => setEditingDocument({ ...editingDocument, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Categoria *
                    </label>
                    <select
                      value={editingDocument.category || "Ata de Reunião"}
                      onChange={(e) => setEditingDocument({ ...editingDocument, category: e.target.value as any })}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    >
                      <option value="Estatuto">Estatuto</option>
                      <option value="Anexo Oficial">Anexo Oficial</option>
                      <option value="Ata de Reunião">Ata de Reunião</option>
                      <option value="Relatório de Proposta">Relatório de Proposta</option>
                      <option value="Comunicado">Comunicado</option>
                      <option value="Regulamento">Regulamento</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Data
                    </label>
                    <input
                      type="text"
                      value={editingDocument.date || ""}
                      onChange={(e) => setEditingDocument({ ...editingDocument, date: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Descrição Resumida *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingDocument.description || ""}
                    onChange={(e) => setEditingDocument({ ...editingDocument, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Conteúdo Integral (Texto para Leitura Pública)
                  </label>
                  <textarea
                    rows={6}
                    value={editingDocument.content || ""}
                    onChange={(e) => setEditingDocument({ ...editingDocument, content: e.target.value })}
                    placeholder="Cole ou redija o teor completo do documento..."
                    className="w-full px-3 py-2 border border-slate-300 rounded font-mono"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingDocument(null)}
                    className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-civic-900 text-white rounded font-bold hover:bg-civic-800"
                  >
                    Salvar Documento
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: GESTÃO DE NOTÍCIAS & COMUNICADOS */}
        {activeTab === "notices" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-xl font-bold text-civic-900">
                  Gerenciar Comunicados e Notícias
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Divulgue informativos, convocatórias de assembleias e atualizações da comunidade discente.
                </p>
              </div>
              <button
                onClick={() =>
                  setEditingNotice({
                    title: "",
                    category: "Institucional",
                    summary: "",
                    content: "",
                    featured: true,
                    date: new Date().toLocaleDateString("pt-BR"),
                    author: "Coordenação do Conselho",
                  })
                }
                className="px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-civic-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Notícia</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
              {notices.map((n) => (
                <div key={n.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-xs uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        {n.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{n.date}</span>
                      {n.featured && (
                        <span className="text-[10px] font-bold uppercase bg-gold-100 text-gold-800 px-2 py-0.5 rounded">
                          Destaque
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{n.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-1">{n.summary}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => setEditingNotice(n)}
                      className="p-2 rounded text-slate-600 hover:bg-slate-200 transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNotice(n.id)}
                      className="p-2 rounded text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL NOTÍCIA */}
        {editingNotice && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
                <h3 className="font-bold text-civic-900 text-base">
                  {editingNotice.id ? "Editar Notícia" : "Publicar Notícia Oficial"}
                </h3>
                <button onClick={() => setEditingNotice(null)} className="p-1 rounded text-slate-500 hover:bg-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveNotice} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Título da Notícia *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingNotice.title || ""}
                    onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Categoria
                    </label>
                    <input
                      type="text"
                      value={editingNotice.category || "Institucional"}
                      onChange={(e) => setEditingNotice({ ...editingNotice, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Autor
                    </label>
                    <input
                      type="text"
                      value={editingNotice.author || "Conselho Estudantil"}
                      onChange={(e) => setEditingNotice({ ...editingNotice, author: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Resumo Breve *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingNotice.summary || ""}
                    onChange={(e) => setEditingNotice({ ...editingNotice, summary: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Texto Completo *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={editingNotice.content || ""}
                    onChange={(e) => setEditingNotice({ ...editingNotice, content: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="feat"
                    checked={editingNotice.featured || false}
                    onChange={(e) => setEditingNotice({ ...editingNotice, featured: e.target.checked })}
                    className="rounded text-civic-900 border-slate-300"
                  />
                  <label htmlFor="feat" className="font-semibold text-slate-700">
                    Destacar na Página Inicial
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingNotice(null)}
                    className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-civic-900 text-white rounded font-bold hover:bg-civic-800"
                  >
                    Salvar Notícia
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: MODERAÇÃO DE SUGESTÕES (OUVIDORIA) */}
        {activeTab === "suggestions" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-civic-900">
                Caixa de Entrada da Ouvidoria Estudantil
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Manifestações e propostas submetidas pelos alunos através da página &ldquo;Participe&rdquo;. Realize a triagem ética e promova as viáveis a Pautas Oficiais.
              </p>
            </div>

            <div className="space-y-4">
              {suggestions.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                  Nenhuma sugestão recebida até o momento.
                </div>
              ) : (
                suggestions.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] ${
                            s.status === "Pendente"
                              ? "bg-amber-100 text-amber-900"
                              : s.status === "Aprovada para Pauta"
                              ? "bg-emerald-100 text-emerald-900"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {s.status}
                        </span>
                        <span className="font-semibold text-slate-700">{s.studentClass}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">
                          {s.isAnonymous ? "Anônimo" : s.studentName}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{s.date}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base">{s.title}</h4>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded">
                      {s.description}
                    </p>

                    {s.justification && (
                      <p className="text-xs text-slate-500 italic">
                        <strong>Justificativa do aluno: </strong>
                        {s.justification}
                      </p>
                    )}

                    {s.adminNotes && (
                      <div className="text-xs bg-blue-50 p-2.5 rounded text-blue-900 border border-blue-200">
                        <strong>Despacho do Conselho: </strong>
                        {s.adminNotes}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                      <button
                        onClick={() =>
                          handleModerateSuggestion(
                            s.id,
                            "Aprovada para Pauta",
                            "Pauta admitida para discussão entre os representantes."
                          )
                        }
                        className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
                      >
                        Aprovar para Pauta
                      </button>

                      <button
                        onClick={() =>
                          handleModerateSuggestion(
                            s.id,
                            "Respondida",
                            "Esclarecimento fornecido ao proponente."
                          )
                        }
                        className="px-3 py-1.5 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors"
                      >
                        Marcar como Respondida
                      </button>

                      <button
                        onClick={() =>
                          handleModerateSuggestion(
                            s.id,
                            "Arquivada",
                            "Arquivada por inadequação ou matéria já atendida."
                          )
                        }
                        className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                      >
                        Arquivar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 6: CONFIGURAÇÕES INSTITUCIONAIS */}
        {activeTab === "config" && config && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-civic-900 mb-1">
              Configurações Institucionais do Portal
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Ajuste as informações da fase de organização e os avisos do cabeçalho.
            </p>

            <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Nome Oficial do Conselho
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig({ ...config, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Sigla
                  </label>
                  <input
                    type="text"
                    value={config.acronym}
                    onChange={(e) => setConfig({ ...config, acronym: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Idealizador e Proponente da Iniciativa
                  </label>
                  <input
                    type="text"
                    value={config.proponent}
                    onChange={(e) => setConfig({ ...config, proponent: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Fase Atual do Conselho
                  </label>
                  <input
                    type="text"
                    value={config.currentStage}
                    onChange={(e) => setConfig({ ...config, currentStage: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Aviso do Topo da Página Inicial (Banner)
                </label>
                <textarea
                  rows={2}
                  value={config.bannerNotice}
                  onChange={(e) => setConfig({ ...config, bannerNotice: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-sm text-slate-900"
                />
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-civic-900 text-white font-bold uppercase tracking-wider hover:bg-civic-800 transition-colors inline-flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-gold-400" />
                  <span>Salvar Configurações</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
