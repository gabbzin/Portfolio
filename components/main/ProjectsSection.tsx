/** biome-ignore-all lint/suspicious/noArrayIndexKey: <Pode usar> */
"use client";

import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { projects } from "@/consts/projects";
import { SkillIcon } from "../SkillIcon";
import { Badge, tagVariantMap } from "../ui/badge";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function ProjectsSection() {
  const [showIcons, setShowIcons] = useState(false);

  const handleSwitch = () => {
    setShowIcons(!showIcons);

    if (!showIcons) {
      toast.info("Alguns icones podem não estar disponíveis.", {
        duration: 3000,
      });
    }

    toast.success("Ícones exibidos com sucesso!");
  };

  return (
    <section id="projects" className="relative px-4 py-24">
      <Button
        className="absolute top-4 z-50"
        variant={"outline"}
        onClick={handleSwitch}
      >
        Mostrar icones
      </Button>
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-4 text-center font-bold text-3xl md:text-4xl">
          {" "}
          <span className="text-primary"> Projetos </span> Realizados
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          Aqui estão alguns dos meus projetos recentes. Cada projeto foi
          cuidadosamente elaborado com atenção aos detalhes, desempenho e
          experiência do usuário.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group card-hover relative overflow-hidden rounded-lg bg-card shadow-xs"
            >
              <Badge
                variant={project.dev ? "dev" : "success"}
                className="absolute top-1 right-1 z-60"
              >
                {project.dev ? "Em Desenvolvimento" : "Concluído"}
              </Badge>
              <div className="h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={400}
                  height={192}
                />
              </div>

              <div className="p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => {
                    if (showIcons) {
                      return <SkillIcon icon={tag.toLowerCase()} key={tag} />;
                    } else {
                      return (
                        <Badge
                          className="rounded-full border bg-secondary px-2 py-1 font-medium text-secondary-foreground text-xs"
                          key={tag}
                          variant={tagVariantMap[tag] ?? "default"}
                        >
                          {tag}
                        </Badge>
                      );
                    }
                  })}
                </div>

                <h3 className="mb-1 font-semibold text-xl"> {project.title}</h3>
                <p className="mb-4 text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <Link
                      href={project.demoUrl || "#"}
                      target={project.demoUrl ? "_blank" : "_self"}
                      className="text-foreground/80 transition-colors duration-300 hover:text-primary"
                    >
                      {project.demoUrl ? (
                        <ExternalLink size={20} />
                      ) : (
                        <Tooltip>
                          <TooltipTrigger>
                            <ExternalLink
                              size={20}
                              className="pointer-events-none text-red-500"
                            />
                          </TooltipTrigger>
                          <TooltipContent>Sem link externo</TooltipContent>
                        </Tooltip>
                      )}
                    </Link>
                    <Link
                      href={project.githubUrl || "#"}
                      target={project.githubUrl ? "_blank" : "_self"}
                      className="text-foreground/80 transition-colors duration-300 hover:text-primary"
                    >
                      {project.githubUrl ? (
                        <Github size={20} />
                      ) : (
                        <Tooltip>
                          <TooltipTrigger>
                            <Github
                              size={20}
                              className="pointer-events-none text-red-500"
                            />
                          </TooltipTrigger>
                          <TooltipContent>Repositório Privado</TooltipContent>
                        </Tooltip>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            className="cosmic-button mx-auto flex w-fit items-center gap-2"
            target="_blank"
            href="https://github.com/gabbzin"
            rel="noopener"
          >
            Confira no GitHub <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
