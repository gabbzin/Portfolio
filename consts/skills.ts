interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Linguagens",
    skills: ["TypeScript", "JavaScript", "HTML/CSS"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "NestJS", "Express", "Prisma"],
  },
  {
    title: "Dados e infra",
    skills: ["PostgreSQL", "Docker", "Linux", "Git/GitHub"],
  },
];
