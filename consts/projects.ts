export interface Project {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
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
    slug: "barbearia-saas",
    name: "Barbearia SaaS",
    description:
      "SaaS de barbearia com agendamento online e gestão de clientes.",
    tags: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Stripe",
    ],
    image: "/projects/barbearia-saas.png",
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
];
