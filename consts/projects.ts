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
    title: "Barbearia SaaS",
    description:
      "SaaS de barbearia com agendamento online e gestão de clientes.",
    image: "/projects/barbearia-saas.png",
    tags: ["React", "TailwindCSS", "Next", "Prisma", "PostgreSQL", "Stripe"],
    demoUrl: "https://barbearia-system-saas.vercel.app/",
    githubUrl: null, // Projeto privado
    dev: true,
  },
  {
    id: 2,
    title: "Oportune",
    description:
      "Plataforma web que conecta alunos, professores e empresas, centralizando a divulgação de oportunidades para quem está no início da carreira.",
    image: "/projects/oportune.png",
    tags: ["TypeScript", "React", "Next", "PostgreSQL", "Prisma", "Docker"],
    demoUrl: null,
    githubUrl: "https://github.com/PedrFelip/oportune",
  },
  {
    id: 3,
    title: "Saúde Pontual",
    description:
      "Sistema web para agendamento de consultas médicas e gerenciamento de pacientes.",
    image: "/projects/saudepontual.png",
    tags: ["React", "Nodejs", "Express", "PostgreSQL", "TailwindCSS"],
    demoUrl: null,
    githubUrl: "https://github.com/gabbzin/saude_pontual",
  },
];