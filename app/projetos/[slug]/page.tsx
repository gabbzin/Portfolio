import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/consts/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);

  return project
    ? {
        title: `${project.name} | Gabriel Pimentel`,
        description: project.description,
      }
    : {};
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-mono text-highlight text-sm">{title}</h2>
      {children}
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);

  if (!project) notFound();

  const { caseStudy } = project;

  return (
    <main className="bg-background pt-28 pb-24">
      <div className="container max-w-3xl space-y-10">
        <Link
          href="/#projetos"
          className="inline-flex min-h-11 items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} /> Voltar aos projetos
        </Link>

        <header className="space-y-4">
          <Badge variant={project.status === "concluido" ? "success" : "dev"}>
            {project.status === "concluido"
              ? "Concluído"
              : "Em desenvolvimento"}
          </Badge>
          <h1 className="font-extrabold text-4xl tracking-tight md:text-5xl">
            {project.name}
          </h1>
          <p className="text-lg text-muted-foreground">{project.description}</p>
          <div className="flex flex-wrap items-center gap-x-5">
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm hover:underline"
              >
                <Github size={16} /> GitHub
              </a>
            ) : (
              <span className="text-sm text-subtle">Código privado</span>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm hover:underline"
              >
                <ExternalLink size={16} /> Demo
              </a>
            )}
          </div>
        </header>

        <div className="relative aspect-video overflow-hidden rounded-xl border bg-code">
          {project.image ? (
            <Image
              src={project.image}
              alt={`Captura de tela do projeto ${project.name}`}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-linear-to-br from-code to-card p-6">
              <span className="text-center font-semibold text-4xl text-highlight">
                {project.name}
              </span>
            </div>
          )}
        </div>

        <Block title="// problema">
          <p className="text-muted-foreground">{caseStudy.problem}</p>
        </Block>

        {caseStudy.contribution && (
          <Block title="// minha contribuição">
            <p className="text-muted-foreground">{caseStudy.contribution}</p>
          </Block>
        )}

        <Block title="// decisões técnicas">
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {caseStudy.decisions.map(decision => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </Block>

        <Block title="// stack">
          <ul className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <li key={tag}>
                <Badge variant="tech">{tag}</Badge>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="// resultado">
          <p className="text-muted-foreground">{caseStudy.result}</p>
        </Block>
      </div>
    </main>
  );
}
