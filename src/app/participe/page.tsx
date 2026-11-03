import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SuggestionForm } from "@/components/SuggestionForm";
import {
  Vote,
  Users,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Participe | CEEM - Conselho Estudantil do Ensino Médio",
  description: "Como participar ativamente da vida escolar, apresentar sugestões aos representantes de turma e acompanhar as deliberações coletivas.",
};

export default function ParticipePage() {
  const waysToParticipate = [
    {
      icon: Users,
      title: "1. Fale com seu Representante de Turma",
      desc: "Cada turma do Ensino Médio (1º, 2º e 3º ano) possui um representante encarregado de ouvir sugestões, reclamações e defender a posição da sala nas reuniões.",
    },
    {
      icon: MessageSquare,
      title: "2. Protocolar Pautas Diretamente",
      desc: "Use o formulário oficial desta página. Sua sugestão é registrada diretamente na fila de triagem da mesa diretora do Conselho.",
    },
    {
      icon: Vote,
      title: "3. Participe das Assembleias de Sala",
      desc: "Quinzenalmente ou conforme a rotina da turma, reserve alguns minutos para debater os relatórios em discussão antes do voto final.",
    },
    {
      icon: ShieldCheck,
      title: "4. Fiscalize pelo Diário de Decisões",
      desc: "Audite tudo o que foi conversado com a direção escolar pela aba 'Últimas Decisões'. A transparência é direito inegociável de todos os alunos.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="border-b border-slate-200 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-bold uppercase tracking-wider mb-3 border border-gold-300">
              <Vote className="w-3.5 h-3.5 text-gold-700" />
              Cidadania Estudantil Ativa
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-civic-900 tracking-tight leading-tight">
              Como Participar do Conselho
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
              O Conselho Estudantil existe em razão e em benefício dos estudantes. Não dependa apenas da iniciativa de terceiros: traga os problemas da sua sala, sugira melhorias para a rotina pedagógica e acompanhe o resultado de cada pedido.
            </p>
          </div>

          {/* Formas de Participar */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {waysToParticipate.map((w, idx) => {
              const IconComp = w.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-civic-50 text-civic-900 flex items-center justify-center flex-shrink-0 border border-civic-200">
                    <IconComp className="w-6 h-6 text-civic-900" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-civic-900">{w.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {w.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>

          {/* O Formulário Oficial de Ouvidoria / Pauta */}
          <section id="ouvidoria">
            <SuggestionForm />
          </section>

          {/* FAQ Rápido do Estudante */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold text-civic-900 tracking-tight flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-gold-600" />
              Perguntas Frequentes sobre a Participação
            </h3>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm space-y-4 pt-2">
              <div className="pt-3 space-y-1">
                <strong className="text-civic-900 block font-bold">
                  Minha sugestão será publicada com meu nome na internet?
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  Não. Todas as manifestações são confidenciais e tratadas internamente pelo Conselho. Apenas a pauta temática consolidada (ex: &ldquo;Melhoria do intervalo no pátio central&rdquo;) é registrada publicamente, preservando integralmente a identidade dos alunos.
                </p>
              </div>

              <div className="pt-3 space-y-1">
                <strong className="text-civic-900 block font-bold">
                  Quanto tempo leva para uma pauta ser debatida?
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  As pautas são analisadas nas reuniões quinzenais regulares. Havendo relevância coletiva e urgência, o representante de turma pode solicitar pauta extraordinária aos três pilares.
                </p>
              </div>

              <div className="pt-3 space-y-1">
                <strong className="text-civic-900 block font-bold">
                  E se a Direção Escolar não aceitar uma proposta?
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  Conforme o Art. 22 e 25 do Estatuto, a resposta da direção é comunicada com transparência absoluta aos alunos. O Conselho busca sempre alternativas, ajustes de custos ou reformulações amigáveis sem gerar conflitos desnecessários.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
