export type DecisionStatus =
  | "Em análise"
  | "Em discussão"
  | "Aprovada pelo Conselho"
  | "Encaminhada à direção"
  | "Aguardando resposta"
  | "Em execução"
  | "Concluída"
  | "Não aprovada";

export type DecisionType = "decisao" | "proposta" | "reuniao" | "comunicado";

export interface DecisionTimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface RelatedDocument {
  title: string;
  url: string;
  type?: string;
}

export interface Decision {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: "Pedagógico" | "Infraestrutura" | "Convivência" | "Institucional" | "Eventos" | "Geral";
  type: DecisionType;
  status: DecisionStatus;
  summary: string;
  context: string;
  result: string;
  nextSteps: string;
  isDemonstrative: boolean;
  targetClasses: string[];
  classPositions?: {
    turma1?: { turma: string; posicao: string; obs?: string };
    turma2?: { turma: string; posicao: string; obs?: string };
    turma3?: { turma: string; posicao: string; obs?: string };
  };
  timeline: DecisionTimelineItem[];
  relatedDocuments?: RelatedDocument[];
  protocolNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProposalStatus =
  | "Nova proposta"
  | "Em análise"
  | "Em debate"
  | "Aprovada pelo Conselho"
  | "Encaminhada à direção"
  | "Concluída"
  | "Não aprovada";

export interface Proposal {
  id: string;
  proposalNumber: string;
  title: string;
  date: string;
  status: ProposalStatus;
  category: string;
  problemIdentified: string;
  proposedSolution: string;
  justification: string;
  targetClasses: string[];
  classPositions: {
    turma1: string;
    turma2: string;
    turma3: string;
  };
  deliberationResult: string;
  forwarding:
    | "Encaminhar à direção"
    | "Realizar nova discussão"
    | "Reformular a proposta"
    | "Arquivar, apresentando justificativa"
    | "Aguardando deliberação";
  updates: Array<{ id: string; date: string; note: string }>;
  isDemonstrative: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OfficialDocument {
  id: string;
  title: string;
  category: "Estatuto" | "Anexo Oficial" | "Ata de Reunião" | "Relatório de Proposta" | "Comunicado" | "Regulamento";
  date: string;
  description: string;
  fileUrl?: string;
  content?: string;
  downloadable: boolean;
  status: "Vigente" | "Proposta-base" | "Histórico";
}

export interface Notice {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  featured: boolean;
  author: string;
  createdAt: string;
}

export interface StudentSuggestion {
  id: string;
  date: string;
  studentName?: string;
  isAnonymous: boolean;
  studentClass: string;
  category: string;
  title: string;
  description: string;
  justification: string;
  status: "Pendente" | "Aprovada para Pauta" | "Respondida" | "Arquivada";
  adminNotes?: string;
  createdAt: string;
}

export interface Pillar {
  id: string;
  name: string;
  status: "Proposta em deliberação" | "Aprovado" | "A definir";
  description: string;
  suggestedRoles: string[];
}

export interface InstitutionalConfig {
  name: string;
  acronym: string;
  schoolName: string;
  currentStage: string;
  proponent: string;
  foundationPrinciples: string[];
  pillars: Pillar[];
  bannerNotice: string;
  updatedAt: string;
}

export interface DatabaseSchema {
  decisions: Decision[];
  proposals: Proposal[];
  documents: OfficialDocument[];
  notices: Notice[];
  suggestions: StudentSuggestion[];
  config: InstitutionalConfig;
}
