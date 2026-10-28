"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/consts/projects";
import { fadeUp, stagger } from "@/lib/motion";

const linkClass =
  "inline-flex min-h-11 items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground";

export function ProjectsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projetos" className="bg-surface py-24">
      <div className="container">
        <SectionHeading
          label="// projetos"
          title="Projetos em destaque"
          description="Aplicações completas que construí, do banco de dados à interface."
        />

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial={reduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map(project => (
            <motion.article
              key={project.slug}
              variants={fadeUp}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="flex flex-col overflow-hidden rounded-xl border bg-card"
            >
              <div className="relative aspect-video overflow-hidden bg-code">
                <Image
                  src={project.image}
                  alt={`Captura de tela do projeto ${project.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <Badge
                  variant={project.status === "concluido" ? "success" : "dev"}
                  className="absolute top-3 right-3 backdrop-blur"
                >
                  {project.status === "concluido"
                    ? "Concluído"
                    : "Em desenvolvimento"}
                </Badge>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-semibold text-xl">{project.name}</h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  {project.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <li key={tag}>
                      <Badge variant="tech">{tag}</Badge>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-x-5 pt-4">
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
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
