"use client";

import { type FocusEvent, useRef, useState } from "react";
import { getChapter } from "@/consts/chapters";
import { VOYAGE_BEATS, voyageActs } from "@/consts/voyage";
import { gsap, useGSAP } from "@/lib/gsap";
import { useJourneyStore } from "@/lib/journey-store";
import { cn } from "@/lib/utils";
import { actBeats } from "./acts";
import { chapterLabel } from "./ChapterHeading";
import { useJourney } from "./Journey";
import { TEXT_IN, TEXT_OUT } from "./scene/poses";
import { scrollToY } from "./smooth-scroll";

/**
 * A viagem: scroll fixado em atos. Os textos ficam no DOM, num cartão do
 * lado oposto ao que a cena mostra; a cena atrás muda conforme o progresso.
 */
export function Voyage() {
  const { compact } = useJourney();
  const section = useRef<HTMLElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  // Passo atual na linha do tempo: decide o que recebe clique e foco.
  const [beat, setBeat] = useState(0);
  const svhPerBeat = compact ? 60 : 72;

  useGSAP(
    () => {
      let current = 0;
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: self => {
            useJourneyStore.setState({
              voyage: self.progress * VOYAGE_BEATS,
            });
            if (bar.current)
              bar.current.style.transform = `scaleX(${self.progress})`;

            const index = Math.min(
              VOYAGE_BEATS - 1,
              Math.floor(self.progress * VOYAGE_BEATS),
            );
            if (index !== current) {
              current = index;
              setBeat(index);
            }
          },
        },
      });
      // A timeline dura exatamente VOYAGE_BEATS: 1 unidade por passo, a
      // mesma escala da trilha de poses da cena.
      timeline.to({}, { duration: VOYAGE_BEATS }, 0);

      for (const act of voyageActs) {
        const card = `[data-act="${act.id}"]`;
        const end = act.start + act.beats;

        timeline.fromTo(
          card,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.12 },
          act.start + TEXT_IN,
        );
        timeline.to(
          card,
          { opacity: 0, y: -16, duration: 0.1 },
          end - 1 + TEXT_OUT,
        );

        for (let index = 0; index < act.beats; index++) {
          const item = `${card} [data-beat="${index}"]`;
          if (index > 0)
            timeline.fromTo(
              item,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.1 },
              act.start + index + 0.02,
            );
          if (index < act.beats - 1)
            timeline.to(
              item,
              { opacity: 0, y: -8, duration: 0.08 },
              act.start + index + 0.92,
            );
        }
      }

      return () => useJourneyStore.setState({ voyage: 0 });
    },
    { scope: section },
  );

  /** Leva o scroll até o meio da leitura de um passo. */
  const goTo = (unit: number) => {
    const element = section.current;
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY;
    const travel = element.offsetHeight - window.innerHeight;
    scrollToY(top + ((unit + 0.5) / VOYAGE_BEATS) * travel);
  };

  // Quem navega por teclado cai num link de um passo que não está na tela:
  // o scroll vai até ele.
  const onFocus = (event: FocusEvent<HTMLElement>) => {
    const unit = event.target.closest<HTMLElement>("[data-unit]")?.dataset.unit;
    if (unit !== undefined && Number(unit) !== beat) goTo(Number(unit));
  };

  const activeAct = voyageActs.findLast(act => beat >= act.start);

  return (
    <section
      ref={section}
      aria-label="A viagem"
      onFocus={onFocus}
      className="relative [--edge:max(1.5rem,calc((100vw-1280px)/2+1.5rem))]"
      style={{ height: `calc(${VOYAGE_BEATS * svhPerBeat}svh + 100svh)` }}
    >
      {/* Âncoras do menu: cada uma fica na altura do scroll em que o ato
          correspondente está na tela. */}
      {voyageActs.map(act => (
        <span
          key={act.id}
          id={act.id}
          aria-hidden="true"
          className="absolute"
          style={{
            top: `calc(${(act.start + 0.5) * svhPerBeat}svh + 5rem)`,
          }}
        />
      ))}

      <div className="sticky top-0 h-svh overflow-clip">
        <nav
          aria-label="Paradas da viagem"
          className="absolute inset-x-(--edge) top-18 z-10 md:top-22"
        >
          <ol className="flex gap-1 md:gap-6">
            {voyageActs.map(act => {
              const { index, stop } = getChapter(act.id);
              const active = act.id === activeAct?.id;
              return (
                <li key={act.id}>
                  <button
                    type="button"
                    onClick={() => goTo(act.start)}
                    aria-current={active ? "step" : undefined}
                    className={cn(
                      "inline-flex min-h-11 min-w-11 cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-widest transition-opacity duration-500",
                      active ? "opacity-100" : "opacity-50 hover:opacity-100",
                    )}
                  >
                    <span className="text-highlight">
                      {String(index).padStart(2, "0")}
                    </span>
                    <span className="max-lg:sr-only">{stop}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="relative h-px bg-border">
            <span
              ref={bar}
              className="absolute inset-0 origin-left bg-highlight"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </nav>

        {voyageActs.map(act => {
          const { title, lede } = getChapter(act.id);
          const actActive = act.id === activeAct?.id;

          return (
            <article
              key={act.id}
              data-act={act.id}
              aria-labelledby={`${act.id}-titulo`}
              // Nasce oculto: quem mostra é a timeline, na hora do ato.
              style={{ opacity: 0 }}
              className={cn(
                // Ocupa a coluna inteira e centraliza o cartão com flex: o
                // transform fica livre para a animação de entrada.
                "pointer-events-none absolute max-md:inset-x-0 max-md:bottom-0 max-md:p-3 md:inset-y-0 md:flex md:w-[min(42vw,31rem)] md:items-center md:pt-24",
                act.side === "left" ? "md:left-(--edge)" : "md:right-(--edge)",
              )}
            >
              <div
                className={cn(
                  "w-full rounded-2xl bg-card/75 p-4 shadow-2xl ring-1 ring-border backdrop-blur-md md:p-8",
                  actActive && "pointer-events-auto",
                )}
              >
                <p className="font-mono text-highlight text-xs md:text-sm">
                  {chapterLabel(act.id)}
                </p>
                <h2
                  id={`${act.id}-titulo`}
                  className="mt-1 font-bold font-display text-xl tracking-tight md:text-4xl"
                >
                  {title}
                </h2>
                {/* No celular a frase de abertura sai: o cartão precisa
                    deixar a cena aparecer. */}
                <p className="mt-2 text-muted-foreground max-md:hidden">
                  {lede}
                </p>

                {/* No desktop todos os passos ocupam a mesma célula: o
                    cartão tem a altura do maior e não pula na troca. */}
                <div className="relative mt-3 grid md:mt-5">
                  {actBeats[act.id].map((content, index) => {
                    const unit = act.start + index;
                    return (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: a ordem dos passos é fixa
                        key={index}
                        data-beat={index}
                        data-unit={unit}
                        style={{ opacity: index === 0 ? 1 : 0 }}
                        className={cn(
                          "[grid-area:1/1]",
                          // No celular só o passo atual ocupa espaço: o
                          // cartão encolhe e a cena aparece mais.
                          unit !== beat &&
                            "pointer-events-none max-md:absolute max-md:inset-x-0 max-md:top-0",
                        )}
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
