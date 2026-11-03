import React from "react";
import Link from "next/link";
import { InstitutionalLogo } from "./InstitutionalLogo";
import {
  ShieldCheck,
  Scale,
  FileText,
  Users,
  Compass,
  ArrowUpRight,
  Lock,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-civic-950 text-slate-300 border-t border-civic-800">
      {/* Top Banner with Civic Value */}
      <div className="civic-gold-bar w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <InstitutionalLogo variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Uma representação estudantil construída pela participação. O Conselho Estudantil do Ensino Médio nasce para organizar a voz dos estudantes, promover o diálogo transparente entre as turmas e transformar demandas coletivas em propostas concretas para a escola.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-civic-900 border border-civic-800 text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                Transparência Pública
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-civic-900 border border-civic-800 text-slate-300 font-medium">
                <Scale className="w-3.5 h-3.5 text-gold-400" />
                Deliberação Democrática
              </span>
            </div>
          </div>

          {/* Navegação Rápida */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-gold-400" />
              Institucional
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">
                  Sobre o Conselho
                </Link>
              </li>
              <li>
                <Link href="/organizacao" className="hover:text-white transition-colors">
                  Organização & Três Pilares
                </Link>
              </li>
              <li>
                <Link href="/participe" className="hover:text-white transition-colors">
                  Canal de Participação
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-500" />
                  Painel Administrativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Diário & Pautas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Scale className="w-4 h-4 text-gold-400" />
              Atuação Pública
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/decisoes" className="hover:text-white transition-colors font-medium text-slate-200">
                  Últimas Decisões
                </Link>
              </li>
              <li>
                <Link href="/propostas" className="hover:text-white transition-colors">
                  Pautas em Discussão
                </Link>
              </li>
              <li>
                <Link href="/decisoes?status=Conclu%C3%ADda" className="hover:text-white transition-colors">
                  Projetos Concluídos
                </Link>
              </li>
              <li>
                <Link href="/participe#ouvidoria" className="hover:text-white transition-colors">
                  Enviar Nova Pauta
                </Link>
              </li>
            </ul>
          </div>

          {/* Documentos & Fundação */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-gold-400" />
              Documentos-Base
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/documentos" className="hover:text-white transition-colors">
                  Estatuto de Organização
                </Link>
              </li>
              <li>
                <Link href="/documentos#anexo-1" className="hover:text-white transition-colors">
                  Anexo I — Modelo de Relatório
                </Link>
              </li>
              <li>
                <Link href="/documentos#anexo-2" className="hover:text-white transition-colors">
                  Anexo II — Princípios de Fundação
                </Link>
              </li>
              <li>
                <Link href="/documentos#atas" className="hover:text-white transition-colors">
                  Atas das Sessões Plenárias
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Institutional Clarity Box */}
        <div className="mt-12 pt-8 border-t border-civic-800/80 bg-civic-900/50 rounded-xl p-5 border border-civic-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-400">
            <div className="space-y-1">
              <p className="text-slate-300 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gold-400"></span>
                Nota de Esclarecimento Institucional:
              </p>
              <p className="leading-relaxed">
                O Conselho Estudantil do Ensino Médio constitui <strong>proposta-base de organização</strong> idealizada por <strong>Henry Vasconcellos</strong>. As disposições regimentais, nomes e ocupantes dos três pilares centrais permanecem configuráveis e sujeitos à deliberação das turmas e adequação às normas da instituição de ensino (Art. 35 do Estatuto). O Conselho atua como canal representativo e propositivo, sem substituir a direção escolar (Art. 23).
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Conselho Estudantil do Ensino Médio. Todos os registros sob princípio da transparência pública discente.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Proponente: <strong className="text-slate-200">Henry Vasconcellos</strong></span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">Versão: Proposta Inicial</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
