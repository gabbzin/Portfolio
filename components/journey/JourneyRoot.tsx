"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { type ReactNode, useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useJourneyStore } from "@/lib/journey-store";

/** Interpola o scroll entre os centros dos capítulos: devolve a "parada". */
function travelAt(scroll: number, centers: number[]) {
  const last = centers.length - 1;
  if (last < 0 || scroll <= centers[0]) return 0;

  for (let i = 0; i < last; i++) {
    const span = centers[i + 1] - centers[i];
    if (scroll < centers[i + 1] && span > 0)
      return i + (scroll - centers[i]) / span;
  }
  return last;
}

export function JourneyRoot({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    // Sem scroll suave para quem pede menos movimento: o scroll nativo
    // continua alimentando os ScrollTriggers.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // O Lenis já respeita o `scroll-margin-top` das seções (header fixo).
    const lenis = new Lenis({ anchors: true });
    // O Lenis é movido pelo ticker do GSAP para que todos os ScrollTriggers
    // enxerguem a mesma posição suavizada, no mesmo frame.
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>(":scope > section");
      // Posição de scroll em que cada capítulo fica centralizado na tela.
      let centers: number[] = [];

      const update = (self: ScrollTrigger) => {
        const { setProgress, setTravel } = useJourneyStore.getState();
        setProgress(self.progress);
        setTravel(travelAt(self.scroll(), centers));
      };

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onRefresh: self => {
          const max = ScrollTrigger.maxScroll(window);
          centers = sections.map(section => {
            const { top, height } = section.getBoundingClientRect();
            const center =
              top + window.scrollY + height / 2 - window.innerHeight / 2;
            return gsap.utils.clamp(0, max, center);
          });
          update(self);
        },
        onUpdate: update,
      });
    },
    { scope: root },
  );

  return (
    <main id="conteudo" ref={root} className="relative z-10">
      {children}
    </main>
  );
}
