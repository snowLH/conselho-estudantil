"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Decision } from "@/lib/types";
import { StatusBadge, DemonstrationTag } from "./StatusBadge";
import {
  Search,
  Filter,
  Calendar,
  ArrowRight,
  Layers,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
  Sparkles,
  Users,
} from "lucide-react";

interface DecisionsBoardProps {
  initialDecisions: Decision[];
  limit?: number;
  showFilters?: boolean;
  title?: string;
  subtitle?: string;
}

export function DecisionsBoard({
  initialDecisions,
  limit,
  showFilters = true,
  title = "Últimas Decisões",
  subtitle = "Registro público, transparente e atualizado de todas as deliberações, pautas em debate e ações do Conselho Estudantil.",
}: DecisionsBoardProps) {
  const [activeFilter, setActiveFilter] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filters = [
    { id: "todos", label: "Mais Recentes" },
    { id: "decisao", label: "Decisões" },
    { id: "proposta", label: "Propostas" },
    { id: "reuniao", label: "Reuniões" },
    { id: "em_andamento", label: "Em Andamento" },
    { id: "concluido", label: "Concluídas" },
  ];

  const filteredDecisions = useMemo(() => {
    return initialDecisions.filter((item) => {
      // Type / Status filter
      if (activeFilter === "decisao" && item.type !== "decisao") return false;
      if (activeFilter === "proposta" && item.type !== "proposta") return false;
      if (activeFilter === "reuniao" && item.type !== "reuniao") return false;
      if (activeFilter === "em_andamento") {
        const inProgress = [
          "Em análise",
          "Em discussão",
          "Encaminhada à direção",
          "Aguardando resposta",
          "Em execução",
        ];
        if (!inProgress.includes(item.status)) return false;
      }
      if (activeFilter === "concluido" && item.status !== "Concluída") return false;

      // Text search
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesContext = item.context.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesCategory && !matchesContext) {
          return false;
        }
      }

      return true;
    });
  }, [initialDecisions, activeFilter, searchQuery]);

  const displayedDecisions = limit ? filteredDecisions.slice(0, limit) : filteredDecisions;

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="w-full">
      {/* Header and Controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-civic-100 text-civic-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              Diário Institucional & Transparência
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-civic-900 tracking-tight font-sans">
              {title}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar pautas ou deliberações..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-civic-900/20 focus:border-civic-900 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Filter Pills */}
        {showFilters && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filtrar:
            </span>
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === f.id
                    ? "bg-civic-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Decision Cards List */}
      {displayedDecisions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">
            Nenhuma publicação encontrada
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Não há registros correspondentes ao filtro ou termo pesquisado. Redefina a busca para visualizar as matérias.
          </p>
          <button
            onClick={() => {
              setActiveFilter("todos");
              setSearchQuery("");
            }}
            className="text-xs font-bold text-civic-900 underline hover:text-civic-700"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedDecisions.map((item) => {
            const isExpanded = expandedId === item.id;
            const isApproved = item.status === "Aprovada pelo Conselho" || item.status === "Concluída";

            return (
              <article
                key={item.id}
                className="bg-white border border-slate-200/90 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden group border-l-4 border-l-civic-900"
              >
                <div className="p-5 sm:p-6">
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={item.status} />

                      {/* Type Pill (Proposta vs Decisão) */}
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          item.type === "decisao"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : item.type === "proposta"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-purple-50 text-purple-800 border-purple-200"
                        }`}
                      >
                        {item.type === "decisao"
                          ? "Deliberação Oficial"
                          : item.type === "proposta"
                          ? "Proposta em Pauta"
                          : item.type === "reuniao"
                          ? "Ata de Reunião"
                          : "Comunicado"}
                      </span>

                      <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100">
                        {item.category}
                      </span>

                      {item.isDemonstrative && <DemonstrationTag />}
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <time dateTime={item.date}>{item.date}</time>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-civic-900 tracking-tight group-hover:text-civic-700 transition-colors">
                    <Link href={`/decisoes/${item.id}`} className="hover:underline">
                      {item.title}
                    </Link>
                  </h3>

                  {/* Objective Summary */}
                  <div className="mt-2 text-sm text-slate-700 leading-relaxed font-sans bg-slate-50/80 p-3.5 rounded-lg border border-slate-100">
                    <strong className="text-slate-900 font-semibold">Resumo: </strong>
                    {item.summary}
                  </div>

                  {/* Quick Key Facts Grid */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-white border border-slate-200/80">
                      <span className="font-bold text-slate-900 uppercase tracking-wider block mb-1">
                        Resultado / Situação:
                      </span>
                      <p className="text-slate-700 leading-snug">{item.result}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white border border-slate-200/80">
                      <span className="font-bold text-slate-900 uppercase tracking-wider block mb-1">
                        Próxima Etapa:
                      </span>
                      <p className="text-slate-700 leading-snug">{item.nextSteps}</p>
                    </div>
                  </div>

                  {/* Expandable Section: Context, Classes, Timeline */}
                  {isExpanded && (
                    <div className="mt-5 pt-4 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                          Contexto da Discussão
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
                          {item.context}
                        </p>
                      </div>

                      {item.classPositions && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-civic-900" />
                            Posição das Turmas do Ensino Médio
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            {Object.entries(item.classPositions).map(([key, val]) => (
                              <div key={key} className="p-2.5 rounded bg-slate-50 border border-slate-200">
                                <span className="font-bold text-slate-800 block">{val?.turma}</span>
                                <span className="text-slate-600 font-medium">{val?.posicao}</span>
                                {val?.obs && (
                                  <p className="text-[11px] text-slate-400 mt-1 italic">{val.obs}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.timeline && item.timeline.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-civic-900" />
                            Linha do Tempo e Encaminhamentos
                          </h4>
                          <div className="space-y-2 border-l-2 border-slate-200 ml-2 pl-3">
                            {item.timeline.map((step) => (
                              <div key={step.id} className="text-xs">
                                <span className="font-bold text-slate-800 block">
                                  {step.date} — {step.title}
                                </span>
                                <p className="text-slate-600">{step.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions Footer */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-civic-900 transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Ocultar detalhes internos
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Ver contexto e posições das turmas
                        </>
                      )}
                    </button>

                    <Link
                      href={`/decisoes/${item.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-civic-900 hover:text-gold-600 transition-colors"
                    >
                      <span>Acessar Diário Completo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* CTA Button to view all */}
      {limit && filteredDecisions.length > limit && (
        <div className="mt-8 text-center">
          <Link
            href="/decisoes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-civic-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-civic-800 transition-all shadow-sm hover:shadow"
          >
            <span>Ver Todas as Decisões e Pautas do Histórico</span>
            <ArrowRight className="w-4 h-4 text-gold-400" />
          </Link>
        </div>
      )}
    </section>
  );
}
