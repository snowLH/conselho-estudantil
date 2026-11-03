import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ShieldCheck,
  Scale,
  Users,
  Compass,
  ArrowRight,
  BookOpen,
  HeartHandshake,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

export const metadata = {
  title: "Sobre o Conselho | CEEM - Conselho Estudantil do Ensino Médio",
  description: "Finalidade, princípios fundamentais, histórico e limites institucionais do Conselho Estudantil do Ensino Médio.",
};

export default function SobrePage() {
  const principles = [
    {
      title: "1. Representatividade Legítima",
      desc: "Cada turma do Ensino Médio possui representantes eleitos e investidos no dever de ouvir seus colegas, sem atuar como autoridade ou privilégio pessoal sobre os demais.",
    },
    {
      title: "2. Democracia Participativa",
      desc: "As decisões são deliberadas pelo diálogo franco e pela busca constante de consenso entre as turmas. Divergências não são ignoradas, mas debatidas com maturidade.",
    },
    {
      title: "3. Transparência Pública Irrestrita",
      desc: "Todas as reuniões, atas, propostas, relatórios e respostas da administração escolar são publicadas no Diário Oficial aberto a qualquer estudante da instituição.",
    },
    {
      title: "4. Diálogo Construtivo",
      desc: "O Conselho constrói pontes sólidas com professores, coordenação e direção, formulando propostas fundamentadas com dados, respeito e rigor argumentativo.",
    },
    {
      title: "5. Responsabilidade Institucional",
      desc: "Compromisso inegociável com a verdade e a ética. O Conselho veda manipulações, censura de opiniões discordantes ou uso de pautas para autopromoção.",
    },
    {
      title: "6. Participação Coletiva",
      desc: "A escola é um espaço de formação cidadã. O sucesso do Conselho é medido pela capacidade de ouvir a coletividade e gerar melhorias concretas para o ambiente escolar.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Solene */}
          <div className="border-b border-slate-200 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-civic-100 text-civic-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-gold-600" />
              Manifesto Institucional
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-civic-900 tracking-tight leading-tight">
              Sobre o Conselho Estudantil
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              Uma proposta de representação, diálogo e organização democrática dos estudantes do Ensino Médio, estruturada para transformar demandas coletivas em melhorias concretas.
            </p>
          </div>

          {/* O que é e por que foi criado */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <h2 className="text-2xl font-extrabold text-civic-900 tracking-tight flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-gold-500" />
              O que é e Por que Foi Criado
            </h2>

            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
              <p>
                O <strong>Conselho Estudantil do Ensino Médio (CEEM)</strong> nasce da necessidade urgente de criar um espaço organizado, sério e transparente de representação e participação dos estudantes nas decisões que afetam sua rotina escolar.
              </p>
              <p>
                Historicamente, as reivindicações dos alunos frequentemente se dispersavam em reclamações isoladas pelos corredores, sem método de encaminhamento e sem registro oficial. O Conselho surge exatamente para superar essa fragilidade: estabelecendo uma ligação responsável entre o corpo discente e a administração escolar, permitindo que sugestões, opiniões e críticas sejam apresentadas de maneira <strong>coletiva, técnica e respeitosa</strong>.
              </p>
              <div className="bg-slate-50 border-l-4 border-civic-900 p-4 rounded-r-lg text-slate-800 italic font-serif">
                &ldquo;A representação estudantil não deve existir apenas para ocupar cargos ou títulos honoríficos, mas para garantir que a voz das turmas seja ouvida e respeitada com seriedade institucional.&rdquo;
                <span className="block text-xs font-sans not-italic text-slate-500 font-bold mt-2 uppercase tracking-wider">
                  — Declaração de Fundação (Anexo II do Estatuto)
                </span>
              </div>
            </div>
          </section>

          {/* Princípios Fundamentais (Capítulo I) */}
          <section className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-civic-900 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Capítulo I • Artigo 2º
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-civic-900 tracking-tight mt-2">
                Princípios Fundamentais de Atuação
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Pilares éticos e operacionais que orientam todas as ações do Conselho.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {principles.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 transition-colors"
                >
                  <h3 className="text-base font-bold text-civic-900 mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* O Idealizador e Proponente */}
          <section className="bg-gradient-to-br from-civic-900 via-civic-850 to-civic-950 text-white rounded-2xl p-6 sm:p-10 border border-civic-800 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-civic-800 px-3 py-1 rounded-full border border-gold-500/30">
                  Idealização & Autoria do Projeto
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Henry Vasconcellos
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Idealizador e proponente da iniciativa de criação do Conselho Estudantil do Ensino Médio. Responsável pela redação da minuta inicial do Estatuto de Fundação e pela estruturação dos princípios democráticos submetidos à consulta e deliberação das turmas.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-gold-300">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span>Proponente institucional em regime de construção coletiva com os estudantes.</span>
                </div>
              </div>

              <div className="bg-civic-800/80 p-5 rounded-xl border border-slate-700/80 text-xs text-slate-300 space-y-2 md:max-w-xs">
                <span className="font-bold text-white block uppercase tracking-wider">
                  Nota Regimental:
                </span>
                <p className="leading-snug">
                  Conforme o Estatuto de Fundação, o proponente atua na facilitação da proposta-base. Todas as instâncias decisórias finais pertencerão aos representantes regularmente escolhidos pelas turmas.
                </p>
              </div>
            </div>
          </section>

          {/* Limites Institucionais (Capítulo VI - Art. 23) */}
          <section className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-800">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-amber-950">
                  Limites Institucionais e Relação com a Escola (Art. 23)
                </h3>
                <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                  O Conselho Estudantil do Ensino Médio possui caráter <strong>estritamente representativo e propositivo</strong>. Ele não substitui nem interfere nas prerrogativas da Direção Escolar, da Coordenação Pedagógica ou do Corpo Docente. Seu objetivo exclusivo é qualificar a comunicação, apresentar demandas legítimas com dados fundamentados e acompanhar suas soluções com maturidade cívica.
                </p>
              </div>
            </div>
          </section>

          {/* Próximos Passos & Chamada */}
          <section className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-civic-900">
                Deseja entender como o Conselho está estruturado?
              </h4>
              <p className="text-xs text-slate-500">
                Conheça o diagrama de representação de turmas e os três pilares centrais.
              </p>
            </div>
            <Link
              href="/organizacao"
              className="px-5 py-3 rounded-lg bg-civic-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-civic-800 transition-colors inline-flex items-center gap-2"
            >
              <span>Ver Organização e Estrutura</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
