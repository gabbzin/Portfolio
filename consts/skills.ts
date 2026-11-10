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
  SiPrometheus,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

interface Skill {
  name: string;
  icon: IconType;
  /** Cor da marca; sem valor, usa a cor do texto (marcas pretas somem no tema escuro). */
  color?: string;
}

interface StackLayer {
  /** Camada do mundo no corte transversal do continente. */
  world: string;
  title: string;
  description: string;
  skills: Skill[];
}

export const languages: Skill[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "HTML/CSS", icon: SiHtml5, color: "#e34f26" },
];

// De cima para baixo, na ordem em que as camadas aparecem no corte.
export const stackLayers: StackLayer[] = [
  {
    world: "Céu",
    title: "Frontend",
    description: "Interfaces rápidas, acessíveis e responsivas.",
    skills: [
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
    ],
  },
  {
    world: "Terra",
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
    world: "Subsolo",
    title: "Banco de dados",
    description: "Onde os dados ficam guardados e as filas se apoiam.",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
      { name: "Redis", icon: SiRedis, color: "#ff4438" },
    ],
  },
  {
    world: "Oceano",
    title: "Infra",
    description: "Contêineres, monitoramento e o ambiente onde tudo roda.",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ed" },
      { name: "Linux", icon: SiLinux, color: "#fcc624" },
      { name: "Git/GitHub", icon: SiGit, color: "#f05032" },
      { name: "Prometheus", icon: SiPrometheus, color: "#e6522c" },
    ],
  },
];
