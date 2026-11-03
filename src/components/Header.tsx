"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InstitutionalLogo } from "./InstitutionalLogo";
import {
  Menu,
  X,
  Lock,
  ChevronRight,
  FileText,
  Vote,
  Sparkles,
} from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/decisoes", label: "Últimas Decisões", highlight: true },
    { href: "/sobre", label: "Sobre o Conselho" },
    { href: "/organizacao", label: "Organização e Estrutura" },
    { href: "/propostas", label: "Propostas e Pautas" },
    { href: "/documentos", label: "Documentos Oficiais" },
    { href: "/participe", label: "Participe", isCta: true },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Civic Notice Bar */}
      <div className="bg-civic-950 text-slate-300 text-xs py-1.5 px-4 border-b border-civic-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-gold-400"></span>
            <span className="font-semibold text-white uppercase tracking-wider">
              Documento-Base de Fundação
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-slate-300">
              Iniciativa proposta por <strong className="text-white">Henry Vasconcellos</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link
              href="/documentos"
              className="hover:text-gold-300 transition-colors inline-flex items-center gap-1"
            >
              <FileText className="w-3 h-3 text-gold-400" />
              <span>Consultar Estatuto</span>
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              href="/admin"
              className="hover:text-white transition-colors inline-flex items-center gap-1 font-medium"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Painel Administrativo</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <InstitutionalLogo />

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              if (link.isCta) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-civic-900 text-white font-semibold text-xs tracking-wider uppercase hover:bg-civic-800 transition-all shadow-sm hover:shadow border border-gold-500/30"
                  >
                    <Vote className="w-3.5 h-3.5 text-gold-400" />
                    <span>{link.label}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 rounded-md text-xs uppercase tracking-wider font-semibold transition-all ${
                    active
                      ? "text-civic-900 bg-slate-100/80 font-bold"
                      : "text-slate-600 hover:text-civic-900 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.highlight && (
                      <span className="flex h-1.5 w-1.5 rounded-full bg-gold-500"></span>
                    )}
                  </span>
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-civic-900 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/participe"
              className="inline-flex items-center px-3 py-1.5 rounded-md bg-civic-900 text-white text-xs font-semibold uppercase tracking-wider border border-gold-500/30"
            >
              Participe
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Gold Divider Line */}
      <div className="civic-gold-bar w-full"></div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                    active
                      ? "bg-civic-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {link.highlight && (
                      <Sparkles className={`w-4 h-4 ${active ? "text-gold-300" : "text-gold-600"}`} />
                    )}
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </Link>
              );
            })}

            <div className="pt-4 mt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-md"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Acesso ao Painel Administrativo</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
