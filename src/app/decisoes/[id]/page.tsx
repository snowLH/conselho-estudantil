import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatusBadge, DemonstrationTag } from "@/components/StatusBadge";
import {
  ArrowLeft,
  Calendar,
  Layers,
  Clock,
  Users,
  FileText,
  AlertCircle,
  CheckCircle2,
  Share2,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const decisions = db.getDecisions();
  return decisions.map((d) => ({ id: d.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DecisionDetailPage({ params }: Props) {
  const { id } = await params;
  const decision = db.getDecisionById(id);

  if (!decision) {
    notFound();
  }

  const isApproved = decision.status === "Aprovada pelo Conselho" || decision.status === "Concluída";

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/decisoes"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-civic-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Diário de Decisões</span>
            </Link>
          </div>

          {/* Main Card */}
          <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header Area */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={decision.status} size="lg" />

                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${
                      decision.type === "decisao"
                        ? "bg-blue-50 text-blue-900 border-blue-200"
                        : decision.type === "proposta"
                        ? "bg-amber-50 text-amber-900 border-amber-200"
                        : "bg-purple-50 text-purple-900 border-purple-200"
                    }`}
                  >
                    {decision.type === "decisao"
                      ? "Deliberação Oficial"
                      : decision.type === "proposta"
                      ? "Proposta em Tramitação"
                      : "Ata de Reunião"}
                  </span>

                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100">
                    {decision.category}
                  </span>

                  {decision.isDemonstrative && <DemonstrationTag />}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Publicado em {decision.date}</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-civic-900 tracking-tight leading-tight">
                {decision.title}
              </h1>

              {decision.protocolNumber && (
                <div className="mt-3 text-xs font-mono text-slate-400">
                  Protocolo Oficial: <strong className="text-slate-600">{decision.protocolNumber}</strong>
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Resumo Objetivo */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  1. Resumo Objetivo do Acontecimento
                </h2>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5 text-sm sm:text-base text-slate-800 leading-relaxed font-sans font-medium">
                  {decision.summary}
                </div>
              </div>

              {/* Contexto da Discussão */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  2. Contexto e Motivação da Discussão
                </h2>
                <div className="text-sm text-slate-700 leading-relaxed space-y-3 bg-white p-4 rounded-xl border border-slate-200">
                  <p>{decision.context}</p>
                </div>
              </div>

              {/* Resultado & Próximas Etapas (Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50/50 border border-blue-200/80 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-700" />
                    Resultado da Deliberação
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {decision.result}
                  </p>
                </div>

                <div className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
                    <Clock className="w-4 h-4 text-amber-700" />
                    Próximas Etapas e Encaminhamentos
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {decision.nextSteps}
                  </p>
                </div>
              </div>

              {/* Posição das Turmas do Ensino Médio */}
              {decision.classPositions && (
                <div className="border border-slate-200 rounded-xl p-5 sm:p-6 bg-slate-50/50">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-civic-900 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-civic-900" />
                    3. Manifestação e Posição das Turmas do Ensino Médio
                  </h2>
                  <p className="text-xs text-slate-500 mb-4">
                    Conforme o Art. 13 do Estatuto, propostas de impacto coletivo buscam a concordância entre os representantes das 3 séries:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {Object.entries(decision.classPositions).map(([k, v]) => (
                      <div key={k} className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
                        <span className="text-xs font-extrabold text-civic-900 block mb-1">
                          {v?.turma}
                        </span>
                        <span className="text-xs font-semibold text-slate-700 block">
                          {v?.posicao}
                        </span>
                        {v?.obs && (
                          <p className="text-[11px] text-slate-500 mt-1.5 italic border-t border-slate-100 pt-1">
                            {v.obs}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Linha do Tempo dos Fatos */}
              {decision.timeline && decision.timeline.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-civic-900 mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-civic-900" />
                    4. Histórico Cronológico e Andamento
                  </h2>
                  <div className="relative border-l-2 border-civic-900/20 ml-3 space-y-6 pl-5">
                    {decision.timeline.map((step, idx) => (
                      <div key={step.id || idx} className="relative">
                        <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-civic-900 border-2 border-white shadow-xs"></span>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                          {step.date}
                        </div>
                        <h4 className="text-sm font-bold text-civic-900 mt-0.5">
                          {step.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documentos Relacionados */}
              {decision.relatedDocuments && decision.relatedDocuments.length > 0 && (
                <div className="pt-4 border-t border-slate-200">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-civic-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-civic-900" />
                    Documentos e Registros Vinculados
                  </h2>
                  <div className="space-y-2">
                    {decision.relatedDocuments.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                      >
                        <div className="flex items-center gap-2 text-slate-800 font-medium">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span>{doc.title}</span>
                          {doc.type && (
                            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                              {doc.type}
                            </span>
                          )}
                        </div>
                        <Link
                          href={doc.url}
                          className="font-bold text-civic-900 hover:text-gold-600 inline-flex items-center gap-1"
                        >
                          Visualizar <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Observação Democrática / Ética */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">
                  Auditoria e Transparência Estudantil:
                </p>
                <p>
                  Qualquer representante ou estudante pode solicitar cópia das notas de reunião ou esclarecimentos adicionais aos três pilares do Conselho, em conformidade com o Art. 24 do Estatuto.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/decisoes"
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Voltar às Decisões
                </Link>

                <Link
                  href="/participe"
                  className="px-4 py-2 rounded-lg bg-civic-900 hover:bg-civic-800 text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-gold-400" />
                  Manifestar Opinião Sobre Esta Pauta
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
