import React from "react";
import { DecisionStatus, ProposalStatus } from "@/lib/types";
import {
  Clock,
  MessageSquare,
  CheckCircle2,
  Send,
  Hourglass,
  PlayCircle,
  CheckCheck,
  XCircle,
  FileQuestion,
} from "lucide-react";

interface StatusBadgeProps {
  status: DecisionStatus | ProposalStatus | string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function StatusBadge({ status, size = "md", showIcon = true }: StatusBadgeProps) {
  let bgClasses = "bg-slate-100 text-slate-800 border-slate-300";
  let IconComponent = Clock;

  switch (status) {
    case "Em análise":
      bgClasses = "bg-amber-50 text-amber-900 border-amber-300 ring-1 ring-amber-400/20";
      IconComponent = FileQuestion;
      break;
    case "Nova proposta":
      bgClasses = "bg-amber-50 text-amber-900 border-amber-300 ring-1 ring-amber-400/20";
      IconComponent = FileQuestion;
      break;
    case "Em discussão":
    case "Em debate":
      bgClasses = "bg-sky-50 text-sky-900 border-sky-300 ring-1 ring-sky-400/20";
      IconComponent = MessageSquare;
      break;
    case "Aprovada pelo Conselho":
      bgClasses = "bg-emerald-50 text-emerald-900 border-emerald-300 ring-1 ring-emerald-400/20";
      IconComponent = CheckCircle2;
      break;
    case "Encaminhada à direção":
      bgClasses = "bg-purple-50 text-purple-900 border-purple-300 ring-1 ring-purple-400/20";
      IconComponent = Send;
      break;
    case "Aguardando resposta":
      bgClasses = "bg-blue-50 text-blue-900 border-blue-300 ring-1 ring-blue-400/20";
      IconComponent = Hourglass;
      break;
    case "Em execução":
      bgClasses = "bg-teal-50 text-teal-900 border-teal-300 ring-1 ring-teal-400/20";
      IconComponent = PlayCircle;
      break;
    case "Concluída":
      bgClasses = "bg-emerald-100/80 text-emerald-950 border-emerald-400 ring-1 ring-emerald-500/30";
      IconComponent = CheckCheck;
      break;
    case "Não aprovada":
    case "Arquivada":
      bgClasses = "bg-rose-50 text-rose-900 border-rose-300 ring-1 ring-rose-400/20";
      IconComponent = XCircle;
      break;
  }

  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3.5 py-1.5 gap-2",
  }[size];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-xs transition-colors ${bgClasses} ${sizeClasses}`}
    >
      {showIcon && <IconComponent className={size === "sm" ? "w-3 h-3" : size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5"} />}
      <span>{status}</span>
    </span>
  );
}

export function DemonstrationTag({ className = "" }: { className?: string }) {
  return (
    <span
      title="Este item é um exemplo didático e demonstrativo do fluxo deliberativo"
      className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-300/80 ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
      Exemplo Demonstrativo
    </span>
  );
}
