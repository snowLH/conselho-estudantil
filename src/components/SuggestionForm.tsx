"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Shield,
  HelpCircle,
  Users,
} from "lucide-react";

export function SuggestionForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    isAnonymous: false,
    studentClass: "1ª Série EM",
    category: "Infraestrutura",
    title: "",
    description: "",
    justification: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao processar envio.");
      }

      setStatus("success");
      setFormData({
        studentName: "",
        isAnonymous: false,
        studentClass: "1ª Série EM",
        category: "Infraestrutura",
        title: "",
        description: "",
        justification: "",
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Ocorreu um erro ao enviar sua pauta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="formulario" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
          Canal Direto de Participação
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-civic-900 tracking-tight mt-2">
          Apresente uma Sugestão ou Demanda
        </h2>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          Sua manifestação será encaminhada aos representantes de turma para triagem ética e eventual inclusão na pauta de deliberação coletiva.
        </p>
      </div>

      {status === "success" && (
        <div className="mb-6 bg-emerald-50 border border-emerald-300 rounded-xl p-5 flex items-start gap-3 text-emerald-950 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <strong className="block font-bold">Proposta enviada com sucesso!</strong>
            Sua demanda foi protocolada na caixa de entrada do Conselho. Ela será analisada pelos representantes da sua turma com total respeito à sua privacidade e moderação ética (Art. 26).
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 bg-rose-50 border border-rose-300 rounded-xl p-5 flex items-start gap-3 text-rose-950 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <strong className="block font-bold">Erro no envio:</strong>
            {errorMessage}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identificação / Anonimato */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Seu Nome (Opcional)
            </label>
            <input
              type="text"
              placeholder={formData.isAnonymous ? "Envio anônimo selecionado" : "Ex: Maria Silva"}
              disabled={formData.isAnonymous}
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-civic-900/20 focus:border-civic-900 disabled:bg-slate-100 disabled:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Sua Turma no Ensino Médio *
            </label>
            <select
              value={formData.studentClass}
              onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-civic-900/20 focus:border-civic-900"
              required
            >
              <option value="1ª Série EM">1ª Série do Ensino Médio</option>
              <option value="2ª Série EM">2ª Série do Ensino Médio</option>
              <option value="3ª Série EM">3ª Série do Ensino Médio</option>
              <option value="Geral">Todas as Séries / Geral</option>
            </select>
          </div>
        </div>

        {/* Checkbox Anônimo */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="anonymous"
            checked={formData.isAnonymous}
            onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
            className="w-4 h-4 rounded text-civic-900 border-slate-300 focus:ring-civic-900 cursor-pointer"
          />
          <label htmlFor="anonymous" className="text-xs text-slate-600 cursor-pointer">
            Prefiro manifestar minha sugestão de forma anônima (sem identificação de nome).
          </label>
        </div>

        {/* Categoria e Título */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Categoria da Demanda *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-civic-900/20 focus:border-civic-900"
              required
            >
              <option value="Infraestrutura">Infraestrutura e Espaços</option>
              <option value="Pedagógico">Pedagógico e Horários</option>
              <option value="Convivência">Convivência e Recreio</option>
              <option value="Eventos">Eventos e Atividades</option>
              <option value="Institucional">Institucional e Estatuto</option>
              <option value="Outros">Outro Assunto</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Título da Pauta ou Sugestão *
            </label>
            <input
              type="text"
              placeholder="Ex: Ampliação de tomadas na sala de estudos do Bloco C"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-civic-900/20 focus:border-civic-900"
              required
            />
          </div>
        </div>

        {/* Descrição Detalhada */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Descrição do Problema ou Oportunidade *
          </label>
          <textarea
            rows={4}
            placeholder="Descreva detalhadamente o que acontece hoje na escola, quais dificuldades são enfrentadas e o que você propõe para solucionar..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-civic-900/20 focus:border-civic-900 resize-y"
            required
          />
        </div>

        {/* Justificativa / Benefício Coletivo */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Justificativa e Benefício Coletivo (Opcional, mas recomendado)
          </label>
          <textarea
            rows={2}
            placeholder="Por que essa mudança é importante para a sua turma ou para toda a escola?"
            value={formData.justification}
            onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-civic-900/20 focus:border-civic-900 resize-y"
          />
        </div>

        {/* Salvaguarda de Privacidade e Moderação Ética */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-600">
          <Shield className="w-4 h-4 text-civic-900 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Proteção à Privacidade e Moderação Ética (Art. 26 do Estatuto):</strong> Nenhuma informação pessoal ou manifestação individual é publicada automaticamente na internet. As mensagens passam por triagem prévia dos representantes para assegurar respeito mútuo, vedando ofensas, perseguições ou informações falsas.
          </p>
        </div>

        {/* Botão de Envio */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-civic-900 hover:bg-civic-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-gold-400" />
            <span>{loading ? "Protocolando Manifestação..." : "Protocolar Sugestão no Conselho"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
