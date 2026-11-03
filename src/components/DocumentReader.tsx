"use client";

import React, { useState } from "react";
import { OfficialDocument } from "@/lib/types";
import {
  FileText,
  Calendar,
  Download,
  Eye,
  X,
  Printer,
  Copy,
  Check,
  Search,
  Filter,
} from "lucide-react";

interface Props {
  documents: OfficialDocument[];
}

export function DocumentLibrary({ documents }: Props) {
  const [selectedDoc, setSelectedDoc] = useState<OfficialDocument | null>(null);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  const categories = [
    { id: "todos", label: "Todos os Documentos" },
    { id: "Estatuto", label: "Estatuto & Anexos" },
    { id: "Ata de Reunião", label: "Atas de Reuniões" },
    { id: "Relatório de Proposta", label: "Relatórios à Direção" },
  ];

  const filtered = documents.filter((doc) => {
    if (activeCategory === "Estatuto" && doc.category !== "Estatuto" && doc.category !== "Anexo Oficial") {
      return false;
    }
    if (activeCategory === "Ata de Reunião" && doc.category !== "Ata de Reunião") {
      return false;
    }
    if (activeCategory === "Relatório de Proposta" && doc.category !== "Relatório de Proposta") {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? "bg-civic-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por termo ou artigo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-civic-900/20 focus:border-civic-900"
          />
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-xs mb-3">
                <span className="font-bold text-civic-900 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100">
                  {doc.category}
                </span>
                <span className="text-slate-400 font-mono">{doc.date}</span>
              </div>

              <h3 className="text-base font-bold text-civic-900 leading-snug">
                {doc.title}
              </h3>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                {doc.description}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                  {doc.status}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedDoc(doc)}
                className="px-3.5 py-1.5 rounded-lg bg-civic-900 hover:bg-civic-800 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-gold-400" />
                <span>Ler na Íntegra</span>
              </button>

              <button
                onClick={() => setSelectedDoc(doc)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar / Imprimir</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Reader Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-300">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50 rounded-t-2xl">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-700">
                  {selectedDoc.category} • Registro Oficial
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-civic-900 mt-0.5">
                  {selectedDoc.title}
                </h2>
                <span className="text-xs text-slate-500 font-mono">
                  Data de emissão: {selectedDoc.date} • Situação: {selectedDoc.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(selectedDoc.content || selectedDoc.description)}
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors"
                  title="Copiar texto"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handlePrint}
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors"
                  title="Imprimir documento"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors"
                  title="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Content View */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 font-serif text-slate-900 text-sm sm:text-base leading-relaxed bg-white whitespace-pre-wrap selection:bg-gold-200">
              {selectedDoc.content || selectedDoc.description}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500 rounded-b-2xl">
              <span>Conselho Estudantil do Ensino Médio • Documento Público</span>
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 bg-civic-900 text-white rounded-lg font-bold text-xs uppercase tracking-wider"
              >
                Concluir Leitura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
