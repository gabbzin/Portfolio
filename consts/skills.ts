import type { IconType } from "react-icons";
import {
  SiDocker,
  SiExpress,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

interface Skill {
  name: string;
  icon: IconType;
  /** Cor da marca; sem valor, usa a cor do texto (marcas pretas somem no tema escuro). */
  color?: string;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Linguagens",
    description: "A base de tudo que escrevo.",
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "HTML/CSS", icon: SiHtml5, color: "#e34f26" },
    ],
  },
  {
    title: "Frontend",
    description: "Interfaces rápidas, acessíveis e responsivas.",
    skills: [
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
    ],
  },
  {
    title: "Backend",
    description: "APIs, regras de negócio e acesso a dados.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
      { name: "NestJS", icon: SiNestjs, color: "#e0234e" },
      { name: "Express", icon: SiExpress },
      { name: "Prisma", icon: SiPrisma },
    ],
  },
  {
    title: "Dados e infra",
    description: "Banco, contêineres e o ambiente onde tudo roda.",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
      { name: "Docker", icon: SiDocker, color: "#2496ed" },
      { name: "Linux", icon: SiLinux, color: "#fcc624" },
      { name: "Git/GitHub", icon: SiGit, color: "#f05032" },
    ],
  },
];
