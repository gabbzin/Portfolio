import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { Badge } from "@/components/ui/badge";
import { aboutFacts, aboutParagraphs } from "@/consts/about";
import { experiences, harborScenes } from "@/consts/experience";
import { firstSteps } from "@/consts/first-steps";
import { type Project, projects } from "@/consts/projects";
import { languages, stackLayers } from "@/consts/skills";
import type { ActId } from "@/consts/voyage";

const linkClass =
  "inline-flex min-h-11 items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground";

const beatLabel = "font-mono text-sm text-subtle";

function TechChips({
  skills,
}: {
  skills: { name: string; icon: IconType; color?: string }[];
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <li
          key={skill.name}
          className="inline-flex items-center gap-2 rounded-lg border bg-code px-3 py-2 font-medium text-sm"
        >
          <skill.icon
            aria-hidden="true"
            className="size-5"
            style={{ color: skill.color }}
          />
          {skill.name}
        </li>
      ))}
    </ul>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <li key={tag}>
          <Badge variant="tech">{tag}</Badge>
        </li>
      ))}
    </ul>
  );
}

function ProjectBeat({ project }: { project: Project }) {
  return (
    <article className="space-y-3">
      {project.image && (
        <div className="relative hidden aspect-[16/7] overflow-hidden rounded-lg bg-code lg:block">
          <Image
            src={project.image}
            alt={`Captura de tela do projeto ${project.name}`}
            fill
            sizes="30rem"
            className="object-cover object-top"
          />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-display font-semibold text-2xl">{project.name}</h3>
        <Badge variant={project.status === "concluido" ? "success" : "dev"}>
          {project.status === "concluido" ? "Concluído" : "Em desenvolvimento"}
        </Badge>
      </div>
      <p className="text-muted-foreground text-sm md:text-base">
        {project.description}
      </p>
      <Tags tags={project.tags} />
      <div className="flex flex-wrap items-center gap-x-5">
        <Link
          href={`/projetos/${project.slug}`}
          className="inline-flex min-h-11 items-center gap-1.5 font-medium text-highlight text-sm hover:underline"
        >
          Ver estudo de caso <ArrowRight size={16} />
        </Link>
        {project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <Github size={16} /> GitHub
          </a>
        ) : (
          <span className="inline-flex min-h-11 items-center text-sm text-subtle">
            Código privado
          </span>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <ExternalLink size={16} /> Demo
          </a>
        )}
      </div>
    </article>
  );
}

const experience = experiences[0];

/**
 * O texto de cada ato, um nó por passo. A quantidade de passos tem de bater
 * com `consts/voyage.ts`, que é de onde a cena tira a linha do tempo.
 */
export const actBeats: Record<ActId, ReactNode[]> = {
  "primeiros-passos": [
    <ul key="first-steps" className="space-y-3">
      {firstSteps.map(step => (
        <li
          key={step.name}
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-lg border bg-code px-4 py-3"
        >
          <div>
            <h3 className="font-semibold">{step.name}</h3>
            <p className="font-mono text-subtle text-xs">
              {step.tags.join(" · ")}
            </p>
          </div>
          {step.repo && (
            <a
              href={step.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <Github size={16} /> GitHub
            </a>
          )}
        </li>
      ))}
    </ul>,
  ],

  stack: [
    <div key="languages" className="space-y-3">
      <p className={beatLabel}>Linguagens</p>
      <p className="text-muted-foreground text-sm">
        A base de tudo que escrevo.
      </p>
      <TechChips skills={languages} />
    </div>,
    ...stackLayers.map(layer => (
      <div key={layer.title} className="space-y-3">
        <p className={beatLabel}>{layer.world}</p>
        <h3 className="font-display font-semibold text-2xl">{layer.title}</h3>
        <p className="text-muted-foreground text-sm">{layer.description}</p>
        <TechChips skills={layer.skills} />
      </div>
    )),
  ],

  projetos: projects.map(project => (
    <ProjectBeat key={project.slug} project={project} />
  )),

  experiencia: [
    <div key="summary" className="space-y-3">
      <p className="font-mono text-highlight text-sm">{experience.period}</p>
      <h3 className="font-semibold text-xl">
        {experience.role}
        <span className="text-muted-foreground"> · {experience.company}</span>
      </h3>
      <p className="text-muted-foreground text-sm md:text-base">
        {experience.summary}
      </p>
      <Tags tags={experience.tags} />
    </div>,
    ...harborScenes.map(scene => (
      <div key={scene.label} className="space-y-3">
        <p className={beatLabel}>{scene.label}</p>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground text-sm md:text-base">
          {scene.highlights.map(index => (
            <li key={index}>{experience.highlights[index]}</li>
          ))}
        </ul>
      </div>
    )),
  ],

  sobre: aboutParagraphs.map((paragraph, index) => (
    <div key={paragraph} className="space-y-4">
      <p className="text-muted-foreground max-md:text-sm">{paragraph}</p>
      {index === aboutParagraphs.length - 1 && (
        <ul className="space-y-2">
          {aboutFacts.map(fact => (
            <li key={fact.text} className="flex items-center gap-3 text-sm">
              <fact.icon
                aria-hidden="true"
                className="size-4 shrink-0 text-highlight"
              />
              <span className="font-medium">{fact.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )),
};
