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
  FileText,
  Users,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  AlertCircle,
  FileCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const proposals = db.getProposals();
  return proposals.map((p) => ({ id: p.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PropostaDetailPage({ params }: Props) {
  const { id } = await params;
  const prop = db.getProposalById(id);

  if (!prop) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Back link */}
          <div>
            <Link
              href="/propostas"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-civic-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Painel de Propostas</span>
            </Link>
          </div>

          {/* Institutional Document Header (Estilo Anexo I) */}
          <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-sm overflow-hidden">
            {/* Header Documento Oficial */}
            <div className="bg-civic-950 text-white p-6 sm:p-8 border-b-4 border-gold-500">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3">
                <span className="font-mono text-gold-400 uppercase tracking-widest font-bold">
                  ANEXO I — MODELO DE RELATÓRIO DE PROPOSTA
                </span>
                <span className="font-mono text-slate-400">Data: {prop.date}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {prop.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs bg-civic-800 px-3 py-1 rounded text-slate-200 border border-civic-700">
                  Número Oficial: {prop.proposalNumber}
                </span>
                <StatusBadge status={prop.status} size="md" />
                {prop.isDemonstrative && <DemonstrationTag />}
              </div>
            </div>

            {/* Document Body (Strictly matching the 7 sections of Anexo I) */}
            <div className="p-6 sm:p-8 space-y-8 font-sans">
              {/* Seção 1: Problema Identificado */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/60">
                <span className="text-xs font-mono font-bold text-civic-900 uppercase tracking-wider block mb-2">
                  1. Problema Identificado
                </span>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {prop.problemIdentified}
                </p>
              </div>

              {/* Seção 2: Proposta Apresentada */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/60">
                <span className="text-xs font-mono font-bold text-civic-900 uppercase tracking-wider block mb-2">
                  2. Proposta Apresentada
                </span>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {prop.proposedSolution}
                </p>
              </div>

              {/* Seção 3: Justificativa */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/60">
                <span className="text-xs font-mono font-bold text-civic-900 uppercase tracking-wider block mb-2">
                  3. Justificativa e Benefícios Esperados
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {prop.justification}
                </p>
              </div>

              {/* Seção 4: Posição das Turmas */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/60">
                <span className="text-xs font-mono font-bold text-civic-900 uppercase tracking-wider block mb-3">
                  4. Posição das Turmas (Art. 13 do Estatuto)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <strong className="text-civic-900 block mb-1">Turma 1 (1ª Série):</strong>
                    <span className="text-slate-700">{prop.classPositions.turma1}</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <strong className="text-civic-900 block mb-1">Turma 2 (2ª Série):</strong>
                    <span className="text-slate-700">{prop.classPositions.turma2}</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <strong className="text-civic-900 block mb-1">Turma 3 (3ª Série):</strong>
                    <span className="text-slate-700">{prop.classPositions.turma3}</span>
                  </div>
                </div>
              </div>

              {/* Seção 5: Resultado da Deliberação */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/60">
                <span className="text-xs font-mono font-bold text-civic-900 uppercase tracking-wider block mb-2">
                  5. Resultado da Deliberação Coletiva
                </span>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {prop.deliberationResult}
                </p>
              </div>

              {/* Seção 6: Encaminhamento */}
              <div className="border border-slate-200 rounded-xl p-5 bg-blue-50/40 border-blue-200">
                <span className="text-xs font-mono font-bold text-blue-900 uppercase tracking-wider block mb-3">
                  6. Encaminhamento Regimental
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    "Encaminhar à direção",
                    "Realizar nova discussão",
                    "Reformular a proposta",
                    "Arquivar, apresentando justificativa",
                  ].map((enc) => {
                    const isSelected = prop.forwarding === enc;
                    return (
                      <div
                        key={enc}
                        className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                          isSelected
                            ? "bg-civic-900 text-white font-bold border-civic-950"
                            : "bg-white text-slate-500 border-slate-200 opacity-60"
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${isSelected ? "border-gold-400 bg-gold-500 text-civic-950" : "border-slate-300"}`}>
                          {isSelected && "✓"}
                        </span>
                        <span>{enc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Seção 7: Assinaturas dos Representantes */}
              <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/60 space-y-4">
                <span className="text-xs font-mono font-bold text-civic-900 uppercase tracking-wider block">
                  7. Assinaturas e Rubricas Institucionais
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                  <div className="border-t-2 border-slate-300 pt-2">
                    <span className="font-bold text-slate-800 block">Representação 1º e 2º Ano</span>
                    <span className="text-slate-400 italic">Rubrica registrada em plenária</span>
                  </div>
                  <div className="border-t-2 border-slate-300 pt-2">
                    <span className="font-bold text-slate-800 block">Representação 3º Ano</span>
                    <span className="text-slate-400 italic">Rubrica registrada em plenária</span>
                  </div>
                  <div className="border-t-2 border-slate-300 pt-2 sm:col-span-2">
                    <span className="font-bold text-slate-800 block">Coordenação do Conselho Estudantil</span>
                    <span className="text-slate-400 italic">Formalizado sob o Estatuto de Fundação</span>
                  </div>
                </div>
              </div>

              {/* Histórico de Atualizações da Pauta */}
              {prop.updates && prop.updates.length > 0 && (
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-xs font-mono font-bold text-civic-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-civic-900" />
                    Histórico de Atualizações da Pauta
                  </h3>
                  <div className="space-y-2">
                    {prop.updates.map((u) => (
                      <div key={u.id} className="p-3 bg-white rounded border border-slate-200 text-xs flex items-start gap-2">
                        <span className="font-mono font-bold text-slate-500">{u.date}:</span>
                        <span className="text-slate-700">{u.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/propostas"
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Voltar às Propostas
                </Link>

                <Link
                  href="/participe"
                  className="px-4 py-2 rounded-lg bg-civic-900 hover:bg-civic-800 text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-gold-400" />
                  Enviar Contribuição para Esta Pauta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
