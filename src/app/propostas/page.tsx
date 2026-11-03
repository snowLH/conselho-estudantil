import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatusBadge, DemonstrationTag } from "@/components/StatusBadge";
import {
  FileText,
  Users,
  Calendar,
  ArrowRight,
  Send,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Propostas e Pautas | CEEM - Conselho Estudantil",
  description: "Painel de tramitação das pautas, reivindicações e propostas dos estudantes do Ensino Médio.",
};

export default async function PropostasPage() {
  const proposals = db.getProposals();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
                <FileText className="w-3.5 h-3.5 text-blue-700" />
                Modelo Anexo I • Registro Regimental
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-civic-900 tracking-tight">
                Painel de Propostas e Pautas
              </h1>
              <p className="mt-2 text-base text-slate-600 max-w-2xl leading-relaxed">
                Todas as propostas protocoladas pelos representantes e estudantes. Acompanhe os debates, a concordância entre as turmas e os relatórios encaminhados à direção.
              </p>
            </div>

            <Link
              href="/participe"
              className="px-5 py-3 rounded-lg bg-civic-900 hover:bg-civic-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 self-start md:self-end"
            >
              <Send className="w-3.5 h-3.5 text-gold-400" />
              <span>Apresentar Nova Proposta</span>
            </Link>
          </div>

          {/* Regra Institucional de Salvaguarda */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block font-semibold mb-0.5">
                Critério de Transparência Deliberativa (Art. 13 e 14 do Estatuto):
              </strong>
              Nenhuma reivindicação é apresentada como &ldquo;aprovada&rdquo; antes de alcançar a concordância formal entre os representantes das 3 turmas. Matérias em discussão permanecem estritamente identificadas para assegurar a idoneidade institucional.
            </div>
          </div>

          {/* Grid de Propostas */}
          <div className="space-y-6">
            {proposals.map((prop) => (
              <article
                key={prop.id}
                className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-civic-900 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                      Relatório nº {prop.proposalNumber}
                    </span>
                    <StatusBadge status={prop.status} size="md" />
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider px-2 py-0.5 rounded bg-slate-50">
                      {prop.category}
                    </span>
                    {prop.isDemonstrative && <DemonstrationTag />}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Apresentada em {prop.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-civic-900 tracking-tight">
                  <Link href={`/propostas/${prop.id}`} className="hover:underline">
                    {prop.title}
                  </Link>
                </h3>

                {/* Estrutura Anexo I Resumida */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-1">
                    <strong className="text-slate-900 font-semibold block uppercase tracking-wider text-[11px]">
                      1. Problema Identificado:
                    </strong>
                    <p className="text-slate-600 leading-relaxed line-clamp-3">
                      {prop.problemIdentified}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-1">
                    <strong className="text-slate-900 font-semibold block uppercase tracking-wider text-[11px]">
                      2. Proposta Apresentada:
                    </strong>
                    <p className="text-slate-600 leading-relaxed line-clamp-3">
                      {prop.proposedSolution}
                    </p>
                  </div>
                </div>

                {/* Posição das Turmas */}
                {prop.classPositions && (
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                    <span className="font-bold text-slate-800 block mb-2 uppercase tracking-wider text-[11px]">
                      Posição das Turmas:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-semibold text-slate-700 block">1ª Série:</span>
                        <span className="text-slate-500">{prop.classPositions.turma1}</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-semibold text-slate-700 block">2ª Série:</span>
                        <span className="text-slate-500">{prop.classPositions.turma2}</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-semibold text-slate-700 block">3ª Série:</span>
                        <span className="text-slate-500">{prop.classPositions.turma3}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer do Card */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-slate-500">
                    <strong>Encaminhamento Atual: </strong>
                    <span className="font-medium text-slate-800">{prop.forwarding}</span>
                  </div>

                  <Link
                    href={`/propostas/${prop.id}`}
                    className="font-bold text-civic-900 hover:text-gold-600 inline-flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <span>Ficha Completa da Pauta</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
