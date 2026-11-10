import { Download } from "lucide-react";
import { DotGridBackground } from "@/components/DotGridBackground";
import { chapterLabel } from "@/components/journey/ChapterHeading";
import { ChapterSection } from "@/components/journey/ChapterSection";
import { Button } from "@/components/ui/button";
import { getChapter } from "@/consts/chapters";
import { github, linkedin } from "@/consts/socials";

export function Departure() {
  const { title, lede } = getChapter("partida");

  return (
    <ChapterSection
      id="partida"
      className="flex min-h-svh items-center overflow-hidden pt-28"
    >
      {/* Sai na fase 2, quando o globo de pontos assume a textura. */}
      <DotGridBackground />

      <div className="relative max-w-3xl space-y-6">
        <p className="font-mono text-highlight text-sm">
          {chapterLabel("partida")} · {title}
        </p>

        <h1
          id="partida-titulo"
          className="font-display font-extrabold text-5xl tracking-tight sm:text-6xl lg:text-8xl"
        >
          Gabriel Pimentel
        </h1>

        <p className="font-bold font-display text-2xl md:text-3xl">
          Desenvolvedor <span className="text-highlight">Full-Stack</span>
        </p>

        <p className="max-w-xl text-lg text-muted-foreground">{lede}</p>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <a href="#projetos">Ver projetos</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="/cv/curriculo.pdf" download="curriculo.pdf">
              <Download /> Baixar CV
            </a>
          </Button>
          {[github, linkedin].map(social => (
            <Button
              key={social.name}
              asChild
              size="icon"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <social.icon className="size-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </ChapterSection>
  );
}
