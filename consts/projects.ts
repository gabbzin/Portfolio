interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string | null;
  githubUrl: string | null;
  dev?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Match Room",
    description:
      "Projeto que organiza e gerencia lista de futebol.",
    image: "/projects/match-room.png",
    tags: ["React", "TailwindCSS", "Next", "Prisma", "PostgreSQL"],
    demoUrl: "https://matchroom-beryl.vercel.app/",
    githubUrl: "https://github.com/gabbzin/matchroom",
  },
  {
    id: 2,
    title: "Barbearia Saas SingleTenant",
    description:
      "SaaS de barbearia com agendamento online e gestão de clientes. Versão Single Tenant",
    image: "/projects/barbearia-saas-st.png",
    tags: ["React", "TailwindCSS", "Next", "Prisma", "PostgreSQL", "Stripe"],
    // "http://barbearia-saas-st.vercel.app/"
    demoUrl: null, // Tá sendo testado em produção, manter site privado.
    githubUrl: null, // Projeto privado
  },
  {
    id: 3,
    title: "Barbearia SaaS MultiTenant",
    description:
      "SaaS de barbearia com agendamento online e gestão de clientes. Versão Multi Tenant",
    image: "/projects/barbearia-saas.png",
    tags: ["React", "TailwindCSS", "Next", "Prisma", "PostgreSQL", "Stripe"],
    demoUrl: null,
    githubUrl: null, // Projeto privado
    dev: true,
  },
  {
    id: 4,
    title: "Oportune",
    description:
      "Plataforma web que conecta alunos, professores e empresas, centralizando a divulgação de oportunidades para quem está no início da carreira.",
    image: "/projects/oportune.png",
    tags: ["TypeScript", "React", "Next", "PostgreSQL", "Prisma", "Docker"],
    demoUrl: null,
    githubUrl: "https://github.com/PedrFelip/oportune",
    dev: false,
  },
  {
    id: 5,
    title: "Saúde Pontual",
    description:
      "Sistema web para agendamento de consultas médicas e gerenciamento de pacientes.",
    image: "/projects/saudepontual.png",
    tags: ["React", "Nodejs", "Express", "PostgreSQL", "TailwindCSS"],
    demoUrl: null,
    githubUrl: "https://github.com/gabbzin/saude_pontual",
    dev: false,
  },
];
