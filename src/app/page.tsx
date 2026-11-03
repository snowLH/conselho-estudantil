import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DecisionsBoard } from "@/components/DecisionsBoard";
import { StatusBadge, DemonstrationTag } from "@/components/StatusBadge";
import {
  ShieldCheck,
  Users,
  Vote,
  FileText,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  BookOpen,
  Send,
  MessageSquare,
  Compass,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const config = db.getConfig();
  const decisions = db.getDecisions();
  const proposals = db.getProposals();
  const notices = db.getNotices();
  const documents = db.getDocuments();

  // Metrics
  const totalDecisions = decisions.length;
  const inProgressProposals = proposals.filter((p) => p.status !== "Concluída" && p.status !== "Não aprovada").length;
  const activeDocuments = documents.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION INSTITUCIONAL */}
        <section className="relative bg-gradient-to-b from-civic-950 via-civic-900 to-civic-950 text-white pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-civic-800">
          {/* Subtle architectural background pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Badge da Iniciativa */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-civic-800/80 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
                Iniciativa Cívica Estudantil • Documento-Base
              </div>

              {/* Título Principal de Impacto */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-sans">
                Uma representação estudantil{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-amber-200">
                  construída pela participação.
                </span>
              </h1>

              {/* Texto de Apoio Solene */}
              <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                O Conselho Estudantil nasce para organizar a voz dos estudantes, promover o diálogo transparente entre as turmas e transformar demandas coletivas em propostas concretas para o aprimoramento da nossa instituição de ensino.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/decisoes"
                  className="px-6 py-3.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-civic-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-civic-950" />
                  <span>Acessar Últimas Decisões</span>
                </Link>

                <Link
                  href="/sobre"
                  className="px-6 py-3.5 rounded-lg bg-civic-800/90 hover:bg-civic-700 text-white font-semibold text-xs uppercase tracking-wider transition-all border border-slate-700/80 flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-slate-300" />
                  <span>Conhecer a Proposta</span>
                </Link>

                <Link
                  href="/participe"
                  className="px-6 py-3.5 rounded-lg bg-transparent hover:bg-white/10 text-slate-200 font-semibold text-xs uppercase tracking-wider transition-all border border-slate-700 flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-gold-400" />
                  <span>Apresentar Pauta</span>
                </Link>
              </div>

              {/* Proponent & Foundation Clarification */}
              <div className="mt-10 pt-6 border-t border-civic-800/80 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-slate-300 font-medium">Idealizador e Proponente:</span>
                  <span className="text-white font-bold">{config.proponent}</span>
                </div>
                <span className="hidden sm:inline text-slate-600">•</span>
                <div>
                  <span className="text-slate-400">Fase Atual:</span>{" "}
                  <span className="text-gold-400 font-semibold">{config.currentStage}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INDICADORES CÍVICOS DE ATIVIDADE */}
        <section className="relative -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 p-2 sm:p-4">
            <div className="p-4 sm:p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-2xl font-black text-civic-900">3 Turmas</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  1º, 2º e 3º Ensino Médio
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <Vote className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-2xl font-black text-civic-900">{totalDecisions}</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Matérias no Diário
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-2xl font-black text-civic-900">{inProgressProposals} Pautas</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Em Tramitação Ativa
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-2xl font-black text-civic-900">100%</span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Transparência Pública
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ÁREA MAIS IMPORTANTE: ÚLTIMAS DECISÕES (DESTAQUE MÁXIMO) */}
        <section id="ultimas-decisoes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <DecisionsBoard
            initialDecisions={decisions}
            limit={4}
            title="Últimas Decisões e Pautas do Conselho"
            subtitle="Diário público e atualizado em tempo real. Descubra com clareza o que está sendo debatido, as decisões aprovadas e os encaminhamentos à administração escolar."
          />
        </section>

        {/* OS 5 PRINCÍPIOS DE FUNDAÇÃO (ANEXO II DO ESTATUTO) */}
        <section className="bg-slate-100/80 border-y border-slate-200 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-100 px-3 py-1 rounded-full border border-gold-300/80">
                Anexo II • Estatuto de Organização
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-civic-900 tracking-tight mt-3">
                Os Cinco Princípios de Atuação
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                A representação estudantil não existe para ocupar cargos, mas para garantir que cada turma tenha voz e que os estudantes aprendam a deliberar coletivamente.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  step: "01",
                  title: "REPRESENTAR",
                  desc: "Dar voz aos estudantes de todas as turmas, garantindo igualdade plena de manifestação.",
                },
                {
                  step: "02",
                  title: "OUVIR",
                  desc: "Conhecer as necessidades reais antes de propor qualquer solução ou cobrança.",
                },
                {
                  step: "03",
                  title: "DEBATER",
                  desc: "Permitir opiniões diferentes e buscar entendimento sem esconder divergências.",
                },
                {
                  step: "04",
                  title: "ORGANIZAR",
                  desc: "Transformar reclamações isoladas em propostas concretas com dados e justificativas.",
                },
                {
                  step: "05",
                  title: "AGIR",
                  desc: "Levar as demandas à direção escolar e acompanhar rigorosamente seus resultados.",
                },
              ].map((p) => (
                <div
                  key={p.step}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all group"
                >
                  <span className="text-xs font-black text-gold-600 tracking-widest block mb-2 font-mono">
                    {p.step}
                  </span>
                  <h3 className="text-base font-bold text-civic-900 tracking-tight group-hover:text-gold-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/sobre"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-civic-900 hover:text-gold-600 transition-colors"
              >
                <span>Ler Preâmbulo e Princípios Fundamentais (Art. 2º)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* PROPOSTAS E PAUTAS EM DESTAQUE (MODELO ANEXO I) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Pautas em Tramitação
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-civic-900 tracking-tight mt-2">
                Propostas em Discussão Coletiva
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Todas as reivindicações são estruturadas sob o Modelo Oficial de Relatório (Anexo I) antes do envio à Direção.
              </p>
            </div>

            <Link
              href="/propostas"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-civic-900 hover:text-gold-600 transition-colors"
            >
              <span>Ver painel completo de propostas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proposals.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      Proposta nº {prop.proposalNumber}
                    </span>
                    <StatusBadge status={prop.status} size="sm" />
                  </div>

                  <h3 className="text-base font-bold text-civic-900 leading-snug">
                    <Link href={`/propostas/${prop.id}`} className="hover:underline">
                      {prop.title}
                    </Link>
                  </h3>

                  <div className="mt-3 text-xs text-slate-600 space-y-2">
                    <p className="line-clamp-2">
                      <strong className="text-slate-800">Problema: </strong>
                      {prop.problemIdentified}
                    </p>
                    <p className="line-clamp-2">
                      <strong className="text-slate-800">Solução Proposta: </strong>
                      {prop.proposedSolution}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Data: {prop.date}</span>
                  <Link
                    href={`/propostas/${prop.id}`}
                    className="font-bold text-civic-900 hover:text-gold-600 inline-flex items-center gap-1"
                  >
                    Detalhes <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMUNICADOS E NOTÍCIAS OFICIAIS */}
        <section className="bg-white border-t border-slate-200 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-civic-900 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  Comunicação Pública
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-civic-900 tracking-tight mt-2">
                  Notícias e Avisos Institucionais
                </h2>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  Informações transparentes sobre as assembleias, leitura do estatuto e o cronograma de representação.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {notices.map((n) => (
                <article
                  key={n.id}
                  className="bg-slate-50/60 rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="font-semibold text-civic-900 uppercase tracking-wider">
                        {n.category}
                      </span>
                      <span>{n.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-civic-900 leading-snug">
                      {n.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                      {n.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                    <span>Por {n.author}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BANNER PARTICIPE & OUVIDORIA */}
        <section className="bg-civic-950 text-white py-14 border-t border-civic-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-civic-900 to-civic-850 rounded-2xl p-8 sm:p-12 border border-civic-800 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-civic-800 px-3 py-1 rounded-full border border-gold-500/30">
                  Participação Democrática
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Tem uma sugestão de melhoria para a sua turma ou escola?
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Envie sua proposta através do formulário oficial. Ela será analisada pelos representantes da sua série com respeito ao sigilo individual e moderação ética (Art. 26).
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href="/participe"
                  className="px-6 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-civic-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-civic-950" />
                  <span>Enviar Minha Pauta Agora</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
