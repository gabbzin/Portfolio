export interface Project {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  image?: string;
  repo?: string;
  demo?: string;
  status: "concluido" | "em-desenvolvimento";
  caseStudy: {
    problem: string;
    decisions: string[];
    result: string;
    contribution?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "axon",
    name: "Axon",
    description:
      "SaaS multi-tenant de agendamento e gestão para barbearias, com painéis para administrador, barbeiro e cliente.",
    tags: [
      "TanStack Start",
      "React",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Docker",
    ],
    image: "/projects/axon.png",
    status: "em-desenvolvimento",
    caseStudy: {
      problem: "[PREENCHER] Qual problema o projeto resolve e para quem.",
      decisions: [
        "[PREENCHER] Decisão técnica 1 e por quê.",
        "[PREENCHER] Decisão técnica 2 e por quê.",
      ],
      result: "[PREENCHER] O que foi entregue e o que aprendi.",
    },
  },
  {
    slug: "oportune",
    name: "Oportune",
    description:
      "Plataforma que conecta alunos, professores e empresas, centralizando oportunidades para quem está no início da carreira.",
    tags: ["TypeScript", "React", "Next.js", "PostgreSQL", "Prisma", "Docker"],
    image: "/projects/oportune.png",
    repo: "https://github.com/PedrFelip/oportune",
    status: "concluido",
    caseStudy: {
      problem: "[PREENCHER] Qual problema o projeto resolve e para quem.",
      decisions: [
        "[PREENCHER] Decisão técnica 1 e por quê.",
        "[PREENCHER] Decisão técnica 2 e por quê.",
      ],
      result: "[PREENCHER] O que foi entregue e o que aprendi.",
      contribution:
        "[PREENCHER] Projeto em equipe (repositório de Pedro). Descreva aqui a sua parte.",
    },
  },
  {
    slug: "match-room",
    name: "Match Room",
    description: "Organiza e gerencia listas de futebol entre amigos.",
    tags: ["React", "Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
    image: "/projects/match-room.png",
    repo: "https://github.com/gabbzin/matchroom",
    demo: "https://matchroom-beryl.vercel.app/",
    status: "concluido",
    caseStudy: {
      problem: "[PREENCHER] Qual problema o projeto resolve e para quem.",
      decisions: [
        "[PREENCHER] Decisão técnica 1 e por quê.",
        "[PREENCHER] Decisão técnica 2 e por quê.",
      ],
      result: "[PREENCHER] O que foi entregue e o que aprendi.",
    },
  },
  {
    slug: "alocca-plantoes",
    name: "Alocca Plantões",
    description:
      "Plataforma de gestão de plantões médicos, com candidatura a plantões, controle de presença por geofencing, notificações e fluxo financeiro.",
    tags: ["NestJS", "Kotlin", "PostgreSQL", "Docker", "SeaweedFS"],
    status: "em-desenvolvimento",
    caseStudy: {
      problem:
        "Gerenciar plantões médicos em um só lugar: candidatura, presença, notificações e processos financeiros.",
      decisions: [
        "Check-in e check-out baseados em localização e geofencing, para validar a presença no local do plantão.",
        "Backend em NestJS, com os fluxos de candidatura e gerenciamento de plantões definidos antes da implementação.",
        "Envio de comprovantes financeiros com armazenamento de arquivos no SeaweedFS.",
      ],
      result:
        "Projeto em fase inicial: MVP e estrutura definidos, com o backend como próxima etapa.",
      contribution:
        "Participei da definição do MVP, da arquitetura do backend e dos fluxos principais.",
    },
  },
  {
    slug: "jejum",
    name: "Jejum+",
    description:
      "Aplicativo mobile de acompanhamento de jejum intermitente, com timer, janela de alimentação e histórico de sessões.",
    tags: ["Flutter", "Provider", "ChangeNotifier", "Hive"],
    repo: "https://github.com/gabbzin/jejum_app",
    status: "concluido",
    caseStudy: {
      problem:
        "Teste técnico de um processo seletivo: um app para acompanhar o jejum intermitente.",
      decisions: [
        "Estado gerenciado com Provider e ChangeNotifier, separando a lógica nos controllers.",
        "Persistência local com Hive, para manter o histórico sem depender de servidor.",
      ],
      result:
        "App com timer e indicador de progresso circular, protocolos, refeições, login e histórico de sessões.",
    },
  },
];
