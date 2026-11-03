import React from "react";
import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DecisionsBoard } from "@/components/DecisionsBoard";
import { Sparkles, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DecisoesPage() {
  const decisions = db.getDecisions();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="mb-10 pb-8 border-b border-slate-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-civic-100 text-civic-900 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
              Diário Deliberativo Oficial • Transparência Pública
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-civic-900 tracking-tight">
              Últimas Decisões e Registros do Conselho
            </h1>
            <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
              Consulte aqui o histórico detalhado de todas as matérias apreciadas, propostas em tramitação, decisões aprovadas e relatórios encaminhados à administração escolar. O princípio da transparência pública garante a auditoria de qualquer estudante do Ensino Médio.
            </p>
          </div>

          {/* Full Interactive Board */}
          <DecisionsBoard
            initialDecisions={decisions}
            title="Todas as Publicações Oficiais"
            subtitle="Filtre por tipo de publicação ou pesquise termos para visualizar atas, pautas e desdobramentos."
            showFilters={true}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
