import fs from "fs";
import path from "path";
import {
  DatabaseSchema,
  Decision,
  Proposal,
  OfficialDocument,
  Notice,
  StudentSuggestion,
  InstitutionalConfig,
} from "./types";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

// Initial Seed Data accurately derived from the project foundation documents
const INITIAL_DATA: DatabaseSchema = {
  config: {
    name: "Conselho Estudantil do Ensino Médio",
    acronym: "CEEM",
    schoolName: "Instituição de Ensino Médio (A definir pelos estudantes)",
    currentStage: "Proposta inicial para discussão, deliberação e aprovação das turmas",
    proponent: "Henry Vasconcellos",
    foundationPrinciples: [
      "Representatividade Legítima: Cada turma possui voz ativa através de seus representantes.",
      "Democracia Participativa: Decisões colegiadas construídas pelo diálogo aberto e respeitoso.",
      "Transparência Pública Irrestrita: Registro aberto de todas as pautas, deliberações e atas.",
      "Diálogo Institucional: Canal estruturado de interlocução com a Direção Escolar.",
      "Responsabilidade Cívica: Compromisso com a verdade, sem partidarização ou manipulações.",
      "Participação Coletiva: O Conselho não é autoridade sobre os alunos, mas instrumento da voz discente."
    ],
    pillars: [
      {
        id: "pilar-1",
        name: "Coordenação Geral e Articulação Institucional",
        status: "Proposta em deliberação",
        description: "Responsável por facilitar os trabalhos do Conselho, manter o canal formal de diálogo com a Direção Escolar e coordenar as sessões plenárias.",
        suggestedRoles: ["Condução das reuniões gerais", "Protocolo de relatórios na secretaria", "Porta-voz institucional"]
      },
      {
        id: "pilar-2",
        name: "Mobilização de Turmas e Participação Estudantil",
        status: "Proposta em deliberação",
        description: "Responsável pelo contato diário com os representantes de cada turma, levantamento de demandas e organização das consultas e plenárias de sala.",
        suggestedRoles: ["Acompanhamento de representantes", "Pesquisas de opinião interna", "Engajamento cívico"]
      },
      {
        id: "pilar-3",
        name: "Secretaria, Registro e Transparência Pública",
        status: "Proposta em deliberação",
        description: "Responsável pela redação das atas oficiais, manutenção do portal de Últimas Decisões, guarda de documentos e prestação de contas coletiva.",
        suggestedRoles: ["Lavratura de atas", "Publicação de deliberações", "Gestão do acervo de documentos"]
      }
    ],
    bannerNotice: "DOCUMENTO-BASE: O Conselho Estudantil encontra-se em fase de organização e consulta pública. Conheça a proposta e participe da construção coletiva.",
    updatedAt: new Date().toISOString()
  },
  decisions: [
    {
      id: "dec-2026-001",
      slug: "proposta-de-revisao-da-distribuicao-de-professores",
      title: "Proposta de revisão da distribuição de professores",
      date: "02/11/2026",
      category: "Pedagógico",
      type: "proposta",
      status: "Em discussão",
      summary: "Os representantes das turmas reuniram manifestações dos estudantes sobre a distribuição de professores. O assunto foi organizado em uma pauta para discussão coletiva.",
      context: "Estudantes de diferentes turmas apontaram preocupações relativas à carga horária e alocação de disciplinas específicas no semestre. Representantes compilaram os apontamentos para avaliar viabilidade pedagógica e sistematizar a demanda.",
      result: "Pauta admitida formalmente para ciclo de debate e deliberação entre as turmas do Ensino Médio.",
      nextSteps: "Consolidar as manifestações das turmas e avaliar a apresentação de um documento formal à direção escolar.",
      isDemonstrative: true,
      targetClasses: ["1ª Série EM", "2ª Série EM", "3ª Série EM"],
      classPositions: {
        turma1: { turma: "1ª Série EM", posicao: "Favorável ao encaminhamento", obs: "Demandas pontuais em disciplinas de exatas." },
        turma2: { turma: "2ª Série EM", posicao: "Favorável ao encaminhamento", obs: "Apoio expressivo durante consulta em sala." },
        turma3: { turma: "3ª Série EM", posicao: "Em análise interna", obs: "Solicitou dados adicionais sobre grade antes do voto final." }
      },
      timeline: [
        { id: "t1", date: "28/10/2026", title: "Levantamento inicial", description: "Representantes de sala receberam manifestações individuais e queixas sobre conflito de horários." },
        { id: "t2", date: "31/10/2026", title: "Sistematização da Pauta", description: "Coordenação preliminar compilou relatos em um documento técnico preparatório." },
        { id: "t3", date: "02/11/2026", title: "Abertura do Debate Colegiado", description: "Pauta admitida e distribuída aos representantes para coleta de parecer das turmas." }
      ],
      relatedDocuments: [
        { title: "Minuta de Levantamento Pedagógico", url: "#", type: "PDF" }
      ],
      protocolNumber: "CEEM-PAUTA-2026-004",
      createdAt: "2026-11-02T14:30:00Z",
      updatedAt: "2026-11-02T18:00:00Z"
    },
    {
      id: "dec-2026-002",
      slug: "apresentacao-e-consulta-publica-do-estatuto-de-fundacao",
      title: "Apresentação e Consulta Pública do Estatuto de Fundação",
      date: "25/10/2026",
      category: "Institucional",
      type: "decisao",
      status: "Em análise",
      summary: "Publicação do documento-base de 10 capítulos e 35 artigos para conhecimento, debate e sugestões de todos os estudantes do Ensino Médio.",
      context: "Elaborado pelo proponente Henry Vasconcellos como marco inicial da representação estudantil, definindo salvaguardas democráticas, conduta ética e os limites claros de atuação em relação à direção escolar.",
      result: "Minuta do Estatuto e anexos técnicos disponibilizados integralmente para consulta pública no portal.",
      nextSteps: "Realização de rodada de esclarecimentos com as turmas e compilação de emendas populares antes da assembleia de aprovação.",
      isDemonstrative: false,
      targetClasses: ["1ª Série EM", "2ª Série EM", "3ª Série EM"],
      classPositions: {
        turma1: { turma: "1ª Série EM", posicao: "Em leitura coletiva", obs: "Representante organizou discussão dos primeiros 4 capítulos." },
        turma2: { turma: "2ª Série EM", posicao: "Favorável à proposta-base", obs: "Destacou a clareza sobre não-partidarização e limites institucionais." },
        turma3: { turma: "3ª Série EM", posicao: "Favorável com contribuições", obs: "Prepara sugestões para o Anexo I." }
      },
      timeline: [
        { id: "t21", date: "15/10/2026", title: "Estruturação dos Princípios Basilares", description: "Definição dos 5 princípios (Representar, Ouvir, Debater, Organizar, Agir)." },
        { id: "t22", date: "22/10/2026", title: "Redação Final da Minuta Provisória", description: "Finalização dos 35 artigos contemplando a relação harmônica com a escola." },
        { id: "t23", date: "25/10/2026", title: "Lançamento para Consulta Pública", description: "Disponibilização do arquivo no portal com canal aberto para emendas." }
      ],
      relatedDocuments: [
        { title: "Estatuto de Organização e Funcionamento (Íntegra)", url: "/documentos", type: "PDF/Oficial" }
      ],
      protocolNumber: "CEEM-DOC-2026-001",
      createdAt: "2026-10-25T10:00:00Z",
      updatedAt: "2026-10-25T12:00:00Z"
    },
    {
      id: "dec-2026-003",
      slug: "adequacao-dos-espacos-de-convivencia-e-patio",
      title: "Adequação dos Espaços de Convivência e Pátio nos Intervalos",
      date: "18/10/2026",
      category: "Infraestrutura",
      type: "decisao",
      status: "Encaminhada à direção",
      summary: "Elaboração de relatório formal (Anexo I) reivindicando melhorias na distribuição de mesas e áreas sombreadas no pátio central durante o recreio.",
      context: "Após manifestações sobre superlotação das áreas cobertas em dias quentes, os representantes realizaram vistoria e mapeamento dos fluxos de estudantes no intervalo.",
      result: "Proposta alcançou concordância unânime entre as três turmas e foi redigida sob o modelo oficial do Anexo I.",
      nextSteps: "Acompanhar a análise da equipe de infraestrutura da direção escolar e aguardar retorno formal.",
      isDemonstrative: true,
      targetClasses: ["1ª Série EM", "2ª Série EM", "3ª Série EM"],
      classPositions: {
        turma1: { turma: "1ª Série EM", posicao: "Aprovada unanimemente", obs: "Turma mais afetada pela falta de bancos." },
        turma2: { turma: "2ª Série EM", posicao: "Aprovada unanimemente", obs: "Sugeriu realocação de mesas perto da quadra." },
        turma3: { turma: "3ª Série EM", posicao: "Aprovada com ressalva", obs: "Pediu inclusão de lixeiras de coleta seletiva." }
      },
      timeline: [
        { id: "t31", date: "08/10/2026", title: "Recebimento da demanda", description: "Alunos encaminharam mais de 40 assinaturas de apoio aos seus representantes." },
        { id: "t32", date: "14/10/2026", title: "Deliberação e Unanimidade", description: "Turmas votaram e concordaram integralmente com o texto do relatório." },
        { id: "t33", date: "18/10/2026", title: "Protocolo na Direção", description: "Relatório Formal nº 01/2026 entregue à administração escolar." }
      ],
      relatedDocuments: [
        { title: "Relatório de Proposta nº 01/2026", url: "/documentos", type: "PDF" }
      ],
      protocolNumber: "CEEM-REL-2026-001",
      createdAt: "2026-10-18T16:00:00Z",
      updatedAt: "2026-10-19T09:00:00Z"
    },
    {
      id: "dec-2026-004",
      slug: "compatibilizacao-de-prazos-entre-simulados-e-entregas",
      title: "Compatibilização de Prazos entre Simulados e Entregas Acadêmicas",
      date: "10/10/2026",
      category: "Pedagógico",
      type: "decisao",
      status: "Concluída",
      summary: "Diálogo estruturado com a coordenação pedagógica para garantir espaçamento mínimo de 48h entre grandes simulados de vestibulares e projetos.",
      context: "A 3ª série do EM identificou acúmulo de provas na terceira semana do bimestre, prejudicando o sono e a saúde mental dos vestibulandos.",
      result: "Coordenação pedagógica acolheu o relatório técnico do Conselho e readequou a grade avaliativa bimestral.",
      nextSteps: "Acompanhamento do cronograma letivo cumprido. Caso concluído com sucesso e arquivado nos anais do conselho.",
      isDemonstrative: true,
      targetClasses: ["3ª Série EM"],
      classPositions: {
        turma3: { turma: "3ª Série EM", posicao: "Aprovada integralmente", obs: "Resultado comemorado pela turma." }
      },
      timeline: [
        { id: "t41", date: "02/10/2026", title: "Apresentação do Problema", description: "Comissão de vestibulandos levou dados à coordenação." },
        { id: "t42", date: "06/10/2026", title: "Mesa de Diálogo", description: "Reunião de mediação entre representantes e coordenação." },
        { id: "t43", date: "10/10/2026", title: "Publicação do Novo Calendário", description: "Calendário retificado divulgado no mural escolar." }
      ],
      protocolNumber: "CEEM-PED-2026-002",
      createdAt: "2026-10-10T11:00:00Z",
      updatedAt: "2026-10-10T15:00:00Z"
    },
    {
      id: "dec-2026-005",
      slug: "proposta-de-uso-livre-de-dispositivos-na-sala-de-estudos",
      title: "Proposta de Uso Livre de Dispositivos Móveis na Sala de Leitura",
      date: "05/10/2026",
      category: "Convivência",
      type: "proposta",
      status: "Não aprovada",
      summary: "Proposta de liberação de celulares sem restrições na sala de estudo silencioso foi arquivada após ausência de consenso e riscos pedagógicos.",
      context: "Discutiu-se se o uso de fones e celulares na sala de leitura traria benefícios para pesquisas ou se dispersaria o ambiente de concentração.",
      result: "Após amplo debate entre as turmas, a matéria foi rejeitada por maioria simples, prevalecendo a necessidade de manter o silêncio estrito.",
      nextSteps: "Arquivada com parecer pedagógico fundamentado e transparente comunicado aos proponentes.",
      isDemonstrative: true,
      targetClasses: ["1ª Série EM", "2ª Série EM"],
      timeline: [
        { id: "t51", date: "28/09/2026", title: "Apresentação da sugestão", description: "Grupo de estudantes sugeriu flexibilização das regras." },
        { id: "t52", date: "05/10/2026", title: "Votação em Plenária", description: "Rejeitada pelos representantes com base no respeito ao estudo alheio." }
      ],
      protocolNumber: "CEEM-PAUTA-2026-001",
      createdAt: "2026-10-05T17:00:00Z",
      updatedAt: "2026-10-05T18:30:00Z"
    },
    {
      id: "dec-2026-006",
      slug: "primeira-reuniao-de-alinhamento-das-turmas-do-ensino-medio",
      title: "Primeira Reunião de Alinhamento das Turmas do Ensino Médio",
      date: "28/10/2026",
      category: "Institucional",
      type: "reuniao",
      status: "Aprovada pelo Conselho",
      summary: "Estabelecimento do cronograma de encontros quinzenais e adoção do protocolo de transparência e prestação de contas aos alunos.",
      context: "Necessidade de garantir que cada turma tenha um método padronizado para manifestar opiniões sem privilégios ou censura.",
      result: "Aprovado protocolo de registro de atas e rotina de 15 minutos ao fim de cada ciclo para informe aos colegas de classe.",
      nextSteps: "Publicação da ata oficial na biblioteca de documentos do site.",
      isDemonstrative: false,
      targetClasses: ["1ª Série EM", "2ª Série EM", "3ª Série EM"],
      timeline: [
        { id: "t61", date: "28/10/2026", title: "Realização da Plenária", description: "Reunião de 45 minutos no intervalo expandido." }
      ],
      relatedDocuments: [
        { title: "Ata da Reunião de Alinhamento nº 01", url: "/documentos", type: "PDF" }
      ],
      protocolNumber: "CEEM-ATA-2026-001",
      createdAt: "2026-10-28T19:00:00Z",
      updatedAt: "2026-10-28T20:00:00Z"
    }
  ],
  proposals: [
    {
      id: "prop-2026-001",
      proposalNumber: "01/2026",
      title: "Reorganização e Sombreamento das Áreas Coletivas de Convivência",
      date: "18/10/2026",
      status: "Encaminhada à direção",
      category: "Infraestrutura",
      problemIdentified: "Escassez de bancos e assentos protegidos do sol no pátio central, provocando aglomerações em corredores durante os intervalos e dias de calor intenso.",
      proposedSolution: "Instalação de bancos modulares adicionais e toldos móveis nas laterais ajardinadas, mantendo as vias de evacuação desobstruídas.",
      justification: "Garante conforto, incentiva a convivência sadia entre turmas e atende às normas básicas de ergonomia e bem-estar estudantil.",
      targetClasses: ["1ª Série EM", "2ª Série EM", "3ª Série EM"],
      classPositions: {
        turma1: "Favorável sem ressalvas (Concordância formal)",
        turma2: "Favorável com sugestão de posicionamento próximo às árvores",
        turma3: "Favorável com acréscimo de coletores de lixo reciclável"
      },
      deliberationResult: "Concordância plena e formal alcançada pelas três turmas em 15/10/2026.",
      forwarding: "Encaminhar à direção",
      updates: [
        { id: "u1", date: "15/10/2026", note: "Texto consolidado com as emendas das 3 turmas." },
        { id: "u2", date: "18/10/2026", note: "Relatório protocolado sob ofício nº 01/2026 na Direção Escolar." }
      ],
      isDemonstrative: true,
      createdAt: "2026-10-18T16:00:00Z",
      updatedAt: "2026-10-18T16:00:00Z"
    },
    {
      id: "prop-2026-002",
      proposalNumber: "02/2026",
      title: "Instituição de Horário Quinzenal de Assembleia de Turma",
      date: "26/10/2026",
      status: "Em debate",
      category: "Institucional",
      problemIdentified: "Dificuldade prática dos representantes em prestar contas e colher manifestações sem interromper aulas regulares ou o curto período do recreio.",
      proposedSolution: "Destinação oficial de 20 minutos de uma aula quinzenal de tutoria/orientação para informes do Conselho e escuta das demandas da sala.",
      justification: "Atendimento direto aos Artigos 9º e 24 do Estatuto de Fundação, garantindo que o representante nunca atue de modo isolado.",
      targetClasses: ["1ª Série EM", "2ª Série EM", "3ª Série EM"],
      classPositions: {
        turma1: "Em debate sobre o melhor dia da semana",
        turma2: "Favorável à proposta",
        turma3: "Favorável, sugerindo formato híbrido com enquetes digitais"
      },
      deliberationResult: "Pauta em tramitação; aguardando fechamento da posição da 1ª série.",
      forwarding: "Realizar nova discussão",
      updates: [
        { id: "u21", date: "26/10/2026", note: "Proposta apresentada pelo representante do 2º ano." }
      ],
      isDemonstrative: true,
      createdAt: "2026-10-26T14:00:00Z",
      updatedAt: "2026-10-26T14:00:00Z"
    },
    {
      id: "prop-2026-003",
      proposalNumber: "03/2026",
      title: "Ampliação do Acervo da Biblioteca com Foco em Exames e Vestibulares",
      date: "20/10/2026",
      status: "Aprovada pelo Conselho",
      category: "Pedagógico",
      problemIdentified: "Número insuficiente de exemplares das obras literárias obrigatórias cobradas no ENEM e nos principais vestibulares públicos do estado.",
      proposedSolution: "Elaboração de lista prioritária de 15 títulos essenciais e solicitação de aquisição institucional ou campanha de doação dirigida.",
      justification: "Democratização do acesso aos livros didáticos e literários de alta demanda para todos os estudantes do Ensino Médio.",
      targetClasses: ["2ª Série EM", "3ª Série EM"],
      classPositions: {
        turma1: "Apoiou a iniciativa para os próximos anos",
        turma2: "Aprovou integralmente",
        turma3: "Aprovou por aclamação"
      },
      deliberationResult: "Aprovada por concordância unânime no Conselho Estudantil.",
      forwarding: "Encaminhar à direção",
      updates: [
        { id: "u31", date: "24/10/2026", note: "Lista de títulos conferida com a equipe de Linguagens." }
      ],
      isDemonstrative: true,
      createdAt: "2026-10-20T11:00:00Z",
      updatedAt: "2026-10-24T15:00:00Z"
    }
  ],
  documents: [
    {
      id: "doc-01",
      title: "Estatuto de Organização e Funcionamento do CEEM (Documento de Fundação)",
      category: "Estatuto",
      date: "25/10/2026",
      description: "Documento-base fundamental contendo 10 Capítulos e 35 Artigos. Estrutura os princípios basilares, direitos e deveres dos representantes de turma, processo deliberativo e relação com a direção escolar.",
      fileUrl: "#",
      downloadable: true,
      status: "Proposta-base",
      content: `DOCUMENTO DE FUNDAÇÃO
ESTATUTO DE ORGANIZAÇÃO E FUNCIONAMENTO
CONSELHO ESTUDANTIL DO ENSINO MÉDIO

Uma proposta de representação, participação e organização democrática dos estudantes.

Nome do Conselho: A definir
Instituição de ensino: A definir
Abrangência: Ensino Médio
Natureza: Organização representativa e participativa
Versão: Proposta inicial para discussão e aprovação
DOCUMENTO-BASE • SUJEITO À DELIBERAÇÃO DOS ESTUDANTES

PREÂMBULO
O Conselho Estudantil do Ensino Médio nasce da necessidade de criar um espaço organizado de representação, diálogo e participação dos estudantes nas decisões que afetam sua vida escolar. Sua finalidade é estabelecer uma ligação entre os alunos e a administração da instituição de ensino, permitindo que opiniões, reivindicações, propostas e problemas sejam apresentados de maneira organizada, responsável e coletiva.
O Conselho deverá funcionar como uma instituição representativa dos estudantes, garantindo que cada turma tenha voz e que nenhuma decisão seja tomada sem considerar os interesses daqueles que serão afetados por ela.
Este documento estabelece princípios, estrutura, responsabilidades e regras fundamentais para o funcionamento do Conselho. As disposições identificadas como proposta inicial ainda deverão ser discutidas e aprovadas pelos estudantes.

CAPÍTULO I — DOS PRINCÍPIOS FUNDAMENTAIS
Art. 1º — Da finalidade: o Conselho tem como finalidade representar os estudantes do Ensino Médio, organizar suas demandas e promover a participação estudantil na construção de melhorias para a escola.
Art. 2º — Dos princípios: o Conselho será orientado pela democracia, representatividade, transparência, responsabilidade, diálogo, igualdade de participação e compromisso coletivo.
Art. 3º — Da independência: o Conselho deverá preservar sua função representativa, evitando que interesses pessoais, disputas entre estudantes ou influências externas impeçam a manifestação legítima das turmas.

CAPÍTULO II — DA ESTRUTURA ORGANIZACIONAL
Art. 4º — Da composição: o Conselho será composto por representantes das turmas do Ensino Médio. Cada turma deverá possuir um representante responsável por ouvir seus colegas, organizar suas demandas e apresentar suas opiniões nas reuniões.
Art. 5º — Dos três pilares: a organização central do Conselho será formada por três pilares, responsáveis por sua condução, organização e funcionamento. Suas funções específicas deverão ser definidas e aprovadas antes do início oficial das atividades.
Art. 6º — Da relação entre representantes e pilares: os representantes participarão das discussões e apresentarão as posições de suas respectivas salas. Os três pilares deverão organizar os trabalhos, facilitar as discussões e garantir que as demandas sejam analisadas. A existência dos três pilares não deverá retirar dos representantes o direito de participar das decisões.

CAPÍTULO III — DOS REPRESENTANTES DE TURMA
Art. 7º — Das responsabilidades: ouvir os estudantes; reunir opiniões, críticas, reclamações e sugestões; apresentar as demandas da turma; comunicar aos colegas os assuntos discutidos e as decisões; acompanhar propostas encaminhadas à direção; e manter postura respeitosa e responsável.
Art. 8º — Do dever de representação: o representante não deverá atuar como autoridade sobre os demais estudantes. Sua função será representar, organizar e transmitir as opiniões da turma.
Art. 9º — Da comunicação: os estudantes deverão ter meios acessíveis para apresentar suas opiniões ao representante. As demandas poderão ser coletadas por conversas, reuniões, formulários ou outros mecanismos definidos pelo Conselho.
Art. 10º — Da responsabilidade perante a turma: o representante deverá manter seus colegas informados. A representação não poderá ser utilizada como instrumento de benefício pessoal ou de imposição de opiniões individuais.

CAPÍTULO IV — DAS PROPOSTAS E DELIBERAÇÕES
Art. 11º — Da apresentação de propostas: qualquer estudante poderá apresentar proposta relacionada à vida escolar, incluindo infraestrutura, atividades, eventos, convivência, horários, espaços, funcionamento da escola e outros assuntos de interesse coletivo.
Art. 12º — Da análise: as propostas deverão ser apresentadas aos representantes, que ficarão responsáveis por levá-las ao Conselho. O Conselho discutirá argumentos favoráveis e contrários, considerando os impactos sobre os estudantes.
Art. 13º — Da concordância entre as turmas: como princípio inicial, propostas que afetem coletivamente as três turmas deverão buscar concordância entre suas representações. Quando as três turmas concordarem, a proposta poderá ser formalizada e encaminhada à administração escolar.
Art. 14º — Da divergência: caso não exista concordância, a proposta deverá ser discutida novamente. O Conselho deverá buscar soluções alternativas, ajustes ou novas formas de atender às demandas. A divergência não deverá ser escondida ou ignorada.
Art. 15º — Do registro: as propostas discutidas deverão possuir registros contendo descrição, problema a resolver, justificativa, opiniões das turmas, resultado da discussão e encaminhamento definido.

CAPÍTULO V — DAS REUNIÕES
Art. 16º — Da realização: o Conselho deverá realizar reuniões periódicas para discutir as demandas apresentadas pelos representantes. A frequência deverá ser definida conforme a disponibilidade dos estudantes e as condições da instituição.
Art. 17º — Da pauta: as reuniões deverão possuir pauta organizada, contendo os assuntos que serão discutidos. Os representantes poderão sugerir novos assuntos.
Art. 18º — Da participação: todos os representantes deverão ter oportunidade de apresentar demandas e participar das discussões, respeitando a diversidade de opiniões.
Art. 19º — Do registro: as reuniões deverão possuir registros de seus principais assuntos, decisões e encaminhamentos, acessíveis aos integrantes do Conselho.

CAPÍTULO VI — DA RELAÇÃO COM A DIREÇÃO ESCOLAR
Art. 20º — Da comunicação institucional: o Conselho funcionará como canal organizado de comunicação entre os estudantes e a administração escolar.
Art. 21º — Dos relatórios: quando uma proposta alcançar concordância entre as três turmas, o Conselho poderá elaborar relatório formal para apresentar à direção, contendo problema identificado, proposta de solução, justificativa, posição das turmas, benefícios esperados e observações relevantes.
Art. 22º — Do acompanhamento: após o encaminhamento, o Conselho deverá acompanhar a análise da direção e informar os estudantes sobre eventuais respostas.
Art. 23º — Dos limites institucionais: o Conselho terá caráter representativo e propositivo. Não deverá se apresentar como substituto da direção, coordenação pedagógica ou outras autoridades escolares. Seu objetivo será construir diálogo e apresentar reivindicações de maneira organizada.

CAPÍTULO VII — DA TRANSPARÊNCIA E DA RESPONSABILIDADE
Art. 24º — Da prestação de contas: os representantes deverão informar suas turmas sobre as atividades realizadas.
Art. 25º — Da transparência: propostas, decisões e respostas recebidas deverão ser comunicadas de forma clara.
Art. 26º — Da conduta: os integrantes deverão agir com respeito, responsabilidade e honestidade. Não serão compatíveis com a função manipular opiniões, ocultar deliberadamente decisões, perseguir colegas, apresentar informações falsas em nome das turmas ou impedir a manifestação de opiniões divergentes.

CAPÍTULO VIII — DA FORMAÇÃO E CONTINUIDADE
Art. 27º — Da implantação: a implantação deverá começar com a apresentação da proposta aos estudantes e a organização da representação das turmas.
Art. 28º — Da legitimidade: os representantes deverão ser escolhidos por procedimento transparente, com participação dos estudantes de suas respectivas turmas.
Art. 29º — Da substituição: deverá existir procedimento para substituição de representantes que deixem de exercer suas funções, percam a confiança de sua turma ou não possam continuar no cargo. O procedimento deverá ser definido e aprovado pelos estudantes.
Art. 30º — Da continuidade: o Conselho deverá preservar registros, propostas e documentos para que suas atividades não dependam exclusivamente de seus primeiros integrantes.

CAPÍTULO IX — DAS ALTERAÇÕES DO ESTATUTO
Art. 31º — Das modificações: este estatuto poderá ser alterado conforme a evolução das atividades. As alterações deverão ser discutidas pelos representantes e comunicadas às turmas.
Art. 32º — Da aprovação: as regras definitivas deverão ser submetidas à aprovação dos integrantes do Conselho e, quando necessário, adequadas às normas da instituição de ensino.

CAPÍTULO X — DAS DISPOSIÇÕES FINAIS
Art. 33º — Do compromisso coletivo: o Conselho deverá existir para representar os estudantes, e não para criar uma hierarquia de poder entre eles.
Art. 34º — Da finalidade formativa: a criação do Conselho representa o início de uma experiência de participação democrática, organização coletiva e desenvolvimento de liderança estudantil. Seu sucesso deverá ser medido pela capacidade de ouvir os estudantes, organizar suas demandas e produzir melhorias reais.
Art. 35º — Da entrada em vigor: este documento constitui proposta inicial de estatuto. Sua aplicação oficial dependerá de discussão, aprovação e adequação às regras da instituição de ensino.`
    },
    {
      id: "doc-02",
      title: "Anexo I — Modelo de Relatório de Proposta",
      category: "Anexo Oficial",
      date: "25/10/2026",
      description: "Formulário padronizado do Conselho para registro formal de propostas, posições de cada turma e assinaturas de encaminhamento à Direção Escolar.",
      fileUrl: "#",
      downloadable: true,
      status: "Proposta-base",
      content: `ANEXO I — MODELO DE RELATÓRIO DE PROPOSTA
CONSELHO ESTUDANTIL DO ENSINO MÉDIO

Número da proposta: ________________________________________________
Data: ____ / ____ / ______

1. Problema identificado:
Descrever o problema que os estudantes desejam resolver.

2. Proposta apresentada:
Descrever objetivamente a solução sugerida.

3. Justificativa:
Explicar por que a proposta é importante e quais benefícios poderá trazer.

4. Posição das turmas:
Turma 1: _______________________________________________
Turma 2: _______________________________________________
Turma 3: _______________________________________________

5. Resultado da deliberação:
Descrever o resultado da discussão e eventuais divergências.

6. Encaminhamento:
[ ] Encaminhar à direção
[ ] Realizar nova discussão
[ ] Reformular a proposta
[ ] Arquivar, apresentando justificativa

7. Assinaturas:
Representante 1: ________________________________________
Representante 2: ________________________________________
Representante 3: ________________________________________
Coordenação do Conselho: _______________________________`
    },
    {
      id: "doc-03",
      title: "Anexo II — Princípios de Fundação e Declaração",
      category: "Anexo Oficial",
      date: "25/10/2026",
      description: "Os 5 princípios centrais da ação estudantil (Representar, Ouvir, Debater, Organizar, Agir) e a Declaração de Fundação do Conselho.",
      fileUrl: "#",
      downloadable: true,
      status: "Proposta-base",
      content: `ANEXO II — PRINCÍPIOS DE FUNDAÇÃO

1. REPRESENTAR — Dar voz aos estudantes de todas as turmas.
2. OUVIR — Conhecer as necessidades antes de propor soluções.
3. DEBATER — Permitir opiniões diferentes e buscar entendimento.
4. ORGANIZAR — Transformar reclamações isoladas em propostas concretas.
5. AGIR — Levar as demandas à direção e acompanhar seus resultados.

DECLARAÇÃO DE FUNDAÇÃO
O Conselho Estudantil do Ensino Médio é criado com o propósito de demonstrar que a participação dos estudantes pode ser organizada, responsável e efetiva. A escola é também um espaço de formação cidadã. Portanto, os estudantes devem ter a oportunidade de aprender a dialogar, representar, deliberar e construir soluções coletivas.
A representação estudantil não deve existir apenas para ocupar cargos, mas para garantir que a voz dos alunos seja ouvida.

________________________________________        ________________________________________
Representante / proponente                     Data

________________________________________        ________________________________________
Representante estudantil                       Aprovação / registro da escola

NOTA DE APROVAÇÃO — Este estatuto é uma proposta-base. Antes de sua adoção oficial, os estudantes deverão discutir e aprovar os pontos em aberto, especialmente as atribuições dos três pilares, o processo de escolha e substituição dos representantes, a periodicidade das reuniões e os procedimentos de deliberação. A aplicação também deverá respeitar as normas da instituição de ensino.`
    },
    {
      id: "doc-04",
      title: "Ata da Reunião de Apresentação Inicial nº 01/2026",
      category: "Ata de Reunião",
      date: "28/10/2026",
      description: "Registro da reunião de nivelamento com os representantes de turma provisórios para apresentação da plataforma digital e diário deliberativo.",
      fileUrl: "#",
      downloadable: true,
      status: "Vigente",
      content: `ATA DA REUNIÃO INAUGURAL DE ALINHAMENTO — Nº 01/2026
Data: 28 de outubro de 2026
Local: Sala Multiuso / Plenária Estudantil
Presentes: Henry Vasconcellos (Proponente) e representantes das 3 séries do Ensino Médio.

Pauta:
1. Apresentação da minuta do Estatuto de Fundação.
2. Demonstração da plataforma institucional e sistema de Últimas Decisões.
3. Definição do cronograma de consultas nas salas de aula.

Deliberações:
- Ficou acordado que cada representante conduzirá uma leitura dialogada com sua sala até a primeira semana de novembro.
- Todas as sugestões serão inseridas diretamente no portal para triagem transparente.
- Encerramento às 18h30 com a lavratura da presente ata.`
    }
  ],
  notices: [
    {
      id: "not-01",
      title: "Lançamento da Proposta-Base do Conselho Estudantil do Ensino Médio",
      slug: "lancamento-da-proposta-base-do-conselho",
      date: "25/10/2026",
      category: "Institucional",
      summary: "Iniciativa idealizada por Henry Vasconcellos propõe canal estruturado e democrático de representação estudantil junto à comunidade escolar.",
      content: "Com foco na transparência e no diálogo responsável, foi apresentada nesta semana a proposta-base do Conselho Estudantil do Ensino Médio. A iniciativa visa organizar a manifestação coletiva dos estudantes, assegurando que demandas de infraestrutura, convivência e rotina pedagógica sejam tratadas com método e responsabilidade.",
      featured: true,
      author: "Coordenação de Comunicação Provisória",
      createdAt: "2026-10-25T08:00:00Z"
    },
    {
      id: "not-02",
      title: "Entenda o Funcionamento da Seção 'Últimas Decisões'",
      slug: "entenda-o-funcionamento-da-secao-ultimas-decisoes",
      date: "28/10/2026",
      category: "Transparência",
      summary: "Inspirado no mais rigoroso padrão de transparência cívica, o Diário Deliberativo permite a qualquer estudante auditar as posições do Conselho.",
      content: "Diferente de agremiações tradicionais onde decisões ocorrem a portas fechadas, o CEEM adota a prestação de contas contínua. Cada proposta possui ciclo de vida com status público, permitindo acompanhar desde a triagem até a resposta da Direção.",
      featured: true,
      author: "Henry Vasconcellos",
      createdAt: "2026-10-28T09:30:00Z"
    },
    {
      id: "not-03",
      title: "Como os Representantes de Sala Coletam Demandas nas Turmas",
      slug: "como-os-representantes-coletam-demandas-nas-turmas",
      date: "01/11/2026",
      category: "Participação",
      summary: "Saiba como apresentar sugestões de melhorias para a sua turma e acompanhar a tramitação de relatórios formais.",
      content: "O Estatuto de Fundação deixa claro: o representante de turma não possui poder de mando, mas sim a responsabilidade de ouvir e representar fielmente os anseios de seus colegas. Conheça os canais de envio de pautas.",
      featured: false,
      author: "Equipe de Articulação",
      createdAt: "2026-11-01T11:00:00Z"
    }
  ],
  suggestions: [
    {
      id: "sug-001",
      date: "01/11/2026",
      studentName: "Lucas Mendes",
      isAnonymous: false,
      studentClass: "2ª Série EM",
      category: "Infraestrutura",
      title: "Instalação de bebedouros adicionais no piso superior",
      description: "Durante os intervalos, a fila no bebedouro térreo consome quase todo o tempo de recreio.",
      justification: "Evitaria aglomerações e facilitaria o acesso rápido dos estudantes durante a troca de aulas.",
      status: "Aprovada para Pauta",
      adminNotes: "Pauta admitida e repassada ao representante do 2º ano para inclusão no próximo relatório de infraestrutura.",
      createdAt: "2026-11-01T15:20:00Z"
    },
    {
      id: "sug-002",
      date: "02/11/2026",
      isAnonymous: true,
      studentClass: "3ª Série EM",
      category: "Pedagógico",
      title: "Organização de aulões de revisão para o ENEM aos sábados pela manhã",
      description: "Muitos alunos não têm acesso a cursinhos particulares e gostariam de reforço em matemática e redação.",
      justification: "Fortalecimento do desempenho acadêmico coletivo da escola nos vestibulares.",
      status: "Pendente",
      adminNotes: "Em avaliação prévia de viabilidade com docentes voluntários.",
      createdAt: "2026-11-02T10:15:00Z"
    }
  ]
};

// Ensure data folder and file exists
function ensureDb(): DatabaseSchema {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2), "utf-8");
      return INITIAL_DATA;
    }
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as DatabaseSchema;
  } catch (err) {
    console.error("Database reading error, resetting to initial data:", err);
    return INITIAL_DATA;
  }
}

function saveDb(data: DatabaseSchema): void {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const tempPath = `${DB_PATH}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tempPath, DB_PATH);
}

// Database Repositories
export const db = {
  // Config
  getConfig(): InstitutionalConfig {
    const data = ensureDb();
    return data.config;
  },
  updateConfig(config: Partial<InstitutionalConfig>): InstitutionalConfig {
    const data = ensureDb();
    data.config = { ...data.config, ...config, updatedAt: new Date().toISOString() };
    saveDb(data);
    return data.config;
  },

  // Decisions
  getDecisions(): Decision[] {
    const data = ensureDb();
    return data.decisions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  getDecisionById(idOrSlug: string): Decision | undefined {
    const data = ensureDb();
    return data.decisions.find((d) => d.id === idOrSlug || d.slug === idOrSlug);
  },
  createDecision(decision: Omit<Decision, "id" | "createdAt" | "updatedAt">): Decision {
    const data = ensureDb();
    const id = `dec-${Date.now()}`;
    const now = new Date().toISOString();
    const newDecision: Decision = {
      ...decision,
      id,
      createdAt: now,
      updatedAt: now,
    };
    data.decisions.unshift(newDecision);
    saveDb(data);
    return newDecision;
  },
  updateDecision(id: string, update: Partial<Decision>): Decision | null {
    const data = ensureDb();
    const idx = data.decisions.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    data.decisions[idx] = {
      ...data.decisions[idx],
      ...update,
      updatedAt: new Date().toISOString(),
    };
    saveDb(data);
    return data.decisions[idx];
  },
  deleteDecision(id: string): boolean {
    const data = ensureDb();
    const before = data.decisions.length;
    data.decisions = data.decisions.filter((d) => d.id !== id);
    if (data.decisions.length !== before) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Proposals
  getProposals(): Proposal[] {
    const data = ensureDb();
    return data.proposals.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  getProposalById(id: string): Proposal | undefined {
    const data = ensureDb();
    return data.proposals.find((p) => p.id === id);
  },
  createProposal(prop: Omit<Proposal, "id" | "createdAt" | "updatedAt">): Proposal {
    const data = ensureDb();
    const id = `prop-${Date.now()}`;
    const now = new Date().toISOString();
    const newProp: Proposal = {
      ...prop,
      id,
      createdAt: now,
      updatedAt: now,
    };
    data.proposals.unshift(newProp);
    saveDb(data);
    return newProp;
  },
  updateProposal(id: string, update: Partial<Proposal>): Proposal | null {
    const data = ensureDb();
    const idx = data.proposals.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    data.proposals[idx] = {
      ...data.proposals[idx],
      ...update,
      updatedAt: new Date().toISOString(),
    };
    saveDb(data);
    return data.proposals[idx];
  },
  deleteProposal(id: string): boolean {
    const data = ensureDb();
    const before = data.proposals.length;
    data.proposals = data.proposals.filter((p) => p.id !== id);
    if (data.proposals.length !== before) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Documents
  getDocuments(): OfficialDocument[] {
    const data = ensureDb();
    return data.documents;
  },
  getDocumentById(id: string): OfficialDocument | undefined {
    const data = ensureDb();
    return data.documents.find((doc) => doc.id === id);
  },
  createDocument(doc: Omit<OfficialDocument, "id">): OfficialDocument {
    const data = ensureDb();
    const id = `doc-${Date.now()}`;
    const newDoc: OfficialDocument = { ...doc, id };
    data.documents.unshift(newDoc);
    saveDb(data);
    return newDoc;
  },
  updateDocument(id: string, update: Partial<OfficialDocument>): OfficialDocument | null {
    const data = ensureDb();
    const idx = data.documents.findIndex((doc) => doc.id === id);
    if (idx === -1) return null;
    data.documents[idx] = { ...data.documents[idx], ...update };
    saveDb(data);
    return data.documents[idx];
  },
  deleteDocument(id: string): boolean {
    const data = ensureDb();
    const before = data.documents.length;
    data.documents = data.documents.filter((doc) => doc.id !== id);
    if (data.documents.length !== before) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Notices
  getNotices(): Notice[] {
    const data = ensureDb();
    return data.notices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  getNoticeById(idOrSlug: string): Notice | undefined {
    const data = ensureDb();
    return data.notices.find((n) => n.id === idOrSlug || n.slug === idOrSlug);
  },
  createNotice(notice: Omit<Notice, "id" | "createdAt">): Notice {
    const data = ensureDb();
    const id = `not-${Date.now()}`;
    const newNotice: Notice = {
      ...notice,
      id,
      createdAt: new Date().toISOString(),
    };
    data.notices.unshift(newNotice);
    saveDb(data);
    return newNotice;
  },
  updateNotice(id: string, update: Partial<Notice>): Notice | null {
    const data = ensureDb();
    const idx = data.notices.findIndex((n) => n.id === id);
    if (idx === -1) return null;
    data.notices[idx] = { ...data.notices[idx], ...update };
    saveDb(data);
    return data.notices[idx];
  },
  deleteNotice(id: string): boolean {
    const data = ensureDb();
    const before = data.notices.length;
    data.notices = data.notices.filter((n) => n.id !== id);
    if (data.notices.length !== before) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Suggestions
  getSuggestions(): StudentSuggestion[] {
    const data = ensureDb();
    return data.suggestions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  createSuggestion(sug: Omit<StudentSuggestion, "id" | "createdAt" | "status">): StudentSuggestion {
    const data = ensureDb();
    const id = `sug-${Date.now()}`;
    const newSug: StudentSuggestion = {
      ...sug,
      id,
      status: "Pendente",
      createdAt: new Date().toISOString(),
    };
    data.suggestions.unshift(newSug);
    saveDb(data);
    return newSug;
  },
  updateSuggestionStatus(id: string, status: StudentSuggestion["status"], adminNotes?: string): StudentSuggestion | null {
    const data = ensureDb();
    const idx = data.suggestions.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    data.suggestions[idx].status = status;
    if (adminNotes !== undefined) {
      data.suggestions[idx].adminNotes = adminNotes;
    }
    saveDb(data);
    return data.suggestions[idx];
  },
  deleteSuggestion(id: string): boolean {
    const data = ensureDb();
    const before = data.suggestions.length;
    data.suggestions = data.suggestions.filter((s) => s.id !== id);
    if (data.suggestions.length !== before) {
      saveDb(data);
      return true;
    }
    return false;
  },
};
