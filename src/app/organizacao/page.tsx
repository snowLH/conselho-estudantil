import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Users,
  Layers,
  ArrowRight,
  GitBranch,
  Shield,
  FileCheck2,
  Send,
  MessageSquare,
  Scale,
  Sparkles,
  HelpCircle,
  FileText,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Organização e Estrutura | CEEM - Conselho Estudantil",
  description: "Estrutura representativa, os Três Pilares Centrais e o fluxo democrático de deliberação coletiva do Conselho Estudantil do Ensino Médio.",
};

export default function OrganizacaoPage() {
  const config = db.getConfig();
  const pillars = config.pillars || [];

  const flowSteps = [
    {
      step: "01",
      title: "Coleta e Escuta na Sala",
      actor: "Estudantes & Representante",
      desc: "Os alunos apresentam problemas, críticas ou ideias ao representante de sua série por conversas, enquetes ou pelo formulário digital.",
    },
    {
      step: "02",
      title: "Sistematização da Demanda",
      actor: "Mesa dos 3 Pilares",
      desc: "A demanda é triada e formatada no Modelo Oficial de Relatório (Anexo I), verificando sua viabilidade técnica e impacto coletivo.",
    },
    {
      step: "03",
      title: "Plenária e Deliberação",
      actor: "Representantes das 3 Turmas",
      desc: "Reunião formal onde cada turma apresenta sua posição. Busca-se a concordância unânime entre 1º, 2º e 3º ano (Art. 13).",
    },
    {
      step: "04",
      title: "Protocolo Formal na Direção",
      actor: "Conselho & Direção Escolar",
      desc: "Com a concordância das 3 turmas, o relatório formal é assinado e entregue à administração escolar para análise institucional (Art. 21).",
    },
    {
      step: "05",
      title: "Acompanhamento e Prestação de Contas",
      actor: "Transparência Pública",
      desc: "O Conselho acompanha os prazos de resposta, registra o desfecho no Diário de Decisões e comunica imediatamente a todos os alunos (Art. 24).",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="border-b border-slate-200 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-civic-100 text-civic-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-gold-600" />
              Arquitetura de Representação Cívica
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-civic-900 tracking-tight leading-tight">
              Organização e Estrutura
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
              Conheça a composição orgânica do Conselho: a base soberana dos Representantes de Turma, a estrutura funcional dos Três Pilares e o fluxo colegiado de tomada de decisões.
            </p>
          </div>

          {/* DIAGRAMA INSTITUCIONAL DA ESTRUTURA */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-100 px-3 py-1 rounded-full">
                Diagrama Institucional
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-civic-900 mt-2">
                Arquitetura de Deliberação Estudantil
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Estrutura descentralizada com soberania dos estudantes e facilitação colegiada.
              </p>
            </div>

            {/* Visual Tree Diagram */}
            <div className="flex flex-col items-center space-y-6">
              {/* Nível 1: Base Soberana (Estudantes) */}
              <div className="w-full max-w-2xl bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-4 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Base Democrática e Soberana
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Comunidade de Estudantes do Ensino Médio
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Origem primária de todas as reivindicações, ideias e mandatos da representação.
                </p>
              </div>

              {/* Conector */}
              <div className="w-0.5 h-6 bg-slate-300"></div>

              {/* Nível 2: Os Representantes de Turma */}
              <div className="w-full">
                <div className="text-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-civic-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Art. 4º • Os Representantes de Turma
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white border-2 border-civic-900/30 rounded-xl p-5 shadow-xs text-center hover:border-civic-900 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-civic-100 text-civic-900 font-black text-sm flex items-center justify-center mx-auto mb-2">
                      1º EM
                    </div>
                    <h5 className="font-bold text-civic-900 text-sm">Representação da 1ª Série</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Escuta ativa, integração dos novos alunos e consolidação de demandas da sala.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-civic-900/30 rounded-xl p-5 shadow-xs text-center hover:border-civic-900 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-civic-100 text-civic-900 font-black text-sm flex items-center justify-center mx-auto mb-2">
                      2º EM
                    </div>
                    <h5 className="font-bold text-civic-900 text-sm">Representação da 2ª Série</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Articulação intermediária, eventos acadêmicos e acompanhamento de infraestrutura.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-civic-900/30 rounded-xl p-5 shadow-xs text-center hover:border-civic-900 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-civic-100 text-civic-900 font-black text-sm flex items-center justify-center mx-auto mb-2">
                      3º EM
                    </div>
                    <h5 className="font-bold text-civic-900 text-sm">Representação da 3ª Série</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Pautas preparatórias, exames, vestibulares, formaturas e convivência sênior.
                    </p>
                  </div>
                </div>
              </div>

              {/* Conector */}
              <div className="w-0.5 h-6 bg-slate-300"></div>

              {/* Nível 3: Mesa Central (Os 3 Pilares) */}
              <div className="w-full max-w-4xl bg-gradient-to-r from-civic-950 via-civic-900 to-civic-950 text-white rounded-xl p-6 shadow-md border border-civic-800">
                <div className="text-center mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400 bg-civic-800 px-3 py-1 rounded-full border border-gold-500/30">
                    Art. 5º e 6º • Estrutura Funcional Central
                  </span>
                  <h4 className="text-lg font-black text-white mt-2">
                    Os Três Pilares de Organização do Conselho
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xl mx-auto mt-1">
                    Não exercem mando sobre as salas; organizam as reuniões, redigem os relatórios técnicos e garantem que nenhuma turma fique desamparada.
                  </p>
                </div>
              </div>

              {/* Conector */}
              <div className="w-0.5 h-6 bg-slate-300"></div>

              {/* Nível 4: Interlocução com a Administração Escolar */}
              <div className="w-full max-w-2xl bg-amber-50 border border-amber-300 rounded-xl p-4 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block mb-1">
                  Art. 20 a 23 • Canal Formal de Diálogo
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-amber-950">
                  Direção Escolar & Coordenação Pedagógica
                </h4>
                <p className="text-xs text-amber-900/80 mt-1">
                  Recebimento dos Relatórios Oficiais (Anexo I), análise institucional e devolutivas públicas.
                </p>
              </div>
            </div>
          </section>

          {/* OS TRÊS PILARES CENTRAIS (CONFIGURÁVEIS EM DELIBERAÇÃO) */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-100 px-3 py-1 rounded-full border border-gold-300/80">
                  Capítulo II • Artigo 5º
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-civic-900 tracking-tight mt-2">
                  Os Três Pilares Centrais
                </h2>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  Conforme determinado no estatuto de fundação, os nomes, as atribuições definitivas e os ocupantes permanecerão em processo de discussão e deliberação das turmas antes de serem fixados definitivamente.
                </p>
              </div>

              <div className="bg-slate-100 px-3.5 py-2 rounded-lg text-xs text-slate-600 border border-slate-200">
                <span className="font-bold text-slate-800 block">Status Atual:</span>
                Proposta-Base Aberta a Emendas
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillars.map((p, idx) => (
                <div
                  key={p.id || idx}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="font-mono font-bold text-gold-700">Pilar 0{idx + 1}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                        {p.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-civic-900 leading-snug">
                      {p.name}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                      {p.description}
                    </p>

                    {p.suggestedRoles && p.suggestedRoles.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-2">
                          Atribuições Sugeridas em Minuta:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {p.suggestedRoles.map((role, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-1.5">
                              <span className="text-gold-500 font-bold">•</span>
                              <span>{role}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400 italic">
                    Sujeito à deliberação das 3 turmas
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FLUXO PASSO A PASSO DE DELIBERAÇÃO COLETIVA */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-civic-900 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Capítulo IV e VI • Tramitação Oficial
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-civic-900 tracking-tight mt-2">
                O Processo de Apresentação e Deliberação de Pautas
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Como uma ideia, necessidade de infraestrutura ou demanda pedagógica se torna uma proposta formal e chega à Direção Escolar.
              </p>
            </div>

            <div className="space-y-4">
              {flowSteps.map((s) => (
                <div
                  key={s.step}
                  className="flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-5 rounded-xl bg-slate-50/70 border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-civic-900 text-gold-400 font-mono font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-xs">
                    {s.step}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-civic-900">
                        {s.title}
                      </h4>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-slate-200">
                        Ator: {s.actor}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Aviso sobre não aprovação prévia */}
            <div className="bg-slate-100/80 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <strong className="text-slate-900 block font-bold">
                Regra de Ouro (Art. 13 do Estatuto):
              </strong>
              <p>
                Nenhuma proposta pode ser divulgada como &ldquo;aprovada pelo Conselho&rdquo; antes de passar pela plenária oficial com a devida concordância entre as turmas do Ensino Médio. Essa salvaguarda impede decisões precipitadas ou unilaterais.
              </p>
            </div>
          </section>

          {/* Links para Ação */}
          <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-8">
            <div>
              <h4 className="text-base font-bold text-civic-900">
                Quer consultar as pautas atualmente em tramitação?
              </h4>
              <p className="text-xs text-slate-500">
                Veja as propostas ativas registradas no painel do Conselho.
              </p>
            </div>
            <Link
              href="/propostas"
              className="px-5 py-3 rounded-lg bg-civic-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-civic-800 transition-colors inline-flex items-center gap-2"
            >
              <span>Ver Pautas em Discussão</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
