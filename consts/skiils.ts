interface Skill {
  name: string;
  level: number; // Nível de proficiência de 0 a 100
  category: "frontend" | "backend" | "tools";
  icon: string; // Nome do ícone correspondente
}

export const skills: Skill[] = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend", icon: "html,css" },
  { name: "VS Code", level: 95, category: "tools", icon: "vscode" },
  { name: "JavaScript", level: 90, category: "frontend", icon: "js" },
  { name: "React", level: 90, category: "frontend", icon: "react" },
  { name: "Tailwind CSS", level: 90, category: "frontend", icon: "tailwind" },

  // Frontend avançando
  { name: "TypeScript", level: 85, category: "frontend", icon: "ts" },
  { name: "Next.js", level: 80, category: "frontend", icon: "nextjs" },

  // Backend
  { name: "Node.js", level: 80, category: "backend", icon: "nodejs" },
  { name: "Express", level: 75, category: "backend", icon: "express" },

  // Banco de dados
  { name: "PostgreSQL", level: 75, category: "backend", icon: "postgresql" },
  { name: "Prisma ORM", level: 75, category: "backend", icon: "prisma" },

  // Ferramentas
  { name: "Git/GitHub", level: 90, category: "tools", icon: "git,github" },
  { name: "Docker", level: 70, category: "tools", icon: "docker" },
  { name: "Linux", level: 70, category: "tools", icon: "linux" },
];
