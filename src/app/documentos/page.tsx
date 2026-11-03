import React from "react";
import { db } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DocumentLibrary } from "@/components/DocumentReader";
import { FileText, Shield, Download } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Documentos Oficiais | CEEM - Conselho Estudantil",
  description: "Repositório documental público: Estatuto de Fundação, Anexos Oficiais, Atas de Reuniões e Relatórios Técnicos.",
};

export default async function DocumentosPage() {
  const documents = db.getDocuments();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="border-b border-slate-200 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-civic-100 text-civic-900 text-xs font-bold uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5 text-gold-600" />
              Acervo Público & Legislação Estudantil
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-civic-900 tracking-tight">
              Documentos Oficiais do Conselho
            </h1>
            <p className="mt-2 text-base text-slate-600 max-w-3xl leading-relaxed">
              Consulte a íntegra do Estatuto de Organização e Funcionamento, modelos de propostas formais, atas das reuniões e comunicados institucionais. Todos os arquivos são públicos para leitura e impressão.
            </p>
          </div>

          {/* Interactive Document Library */}
          <DocumentLibrary documents={documents} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
