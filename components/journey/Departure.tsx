"use client";

import { Download } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { getChapter } from "@/consts/chapters";
import { github, linkedin } from "@/consts/socials";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useJourneyStore } from "@/lib/journey-store";
import { chapterLabel } from "./ChapterHeading";
import { useJourney } from "./Journey";

/** Partida: o globo inteiro, com Brasília marcada. Rolar começa a viagem. */
export function Departure() {
  const { mode } = useJourney();
  const root = useRef<HTMLElement>(null);
  const { title, lede } = getChapter("partida");

  useGSAP(
    () => {
      if (mode !== "3d") return;

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        onUpdate: self => useJourneyStore.setState({ hero: self.progress }),
      });
      // O texto sai de cena antes de a câmera chegar à primeira parada.
      gsap.to(".departure-content", {
        opacity: 0,
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });
      gsap.from(".departure-content > *", {
        opacity: 0,
        y: 18,
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.15,
      });

      return () => useJourneyStore.setState({ hero: 0 });
    },
    { scope: root, dependencies: [mode] },
  );

  return (
    <section
      id="partida"
      ref={root}
      aria-labelledby="partida-titulo"
      className="relative flex min-h-svh items-center pt-24 pb-16 max-md:items-start max-md:pt-28"
    >
      <div className="container">
        <div className="departure-content max-w-3xl space-y-6">
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

          {mode === "3d" && (
            <p
              aria-hidden="true"
              className="flex items-center gap-3 pt-4 font-mono text-subtle text-xs uppercase tracking-[0.2em]"
            >
              <span className="h-px w-10 bg-subtle" />
              Role para começar a viagem
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
