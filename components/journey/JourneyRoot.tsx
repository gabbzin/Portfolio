"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { type ReactNode, useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useJourneyStore } from "@/lib/journey-store";

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
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: self => useJourneyStore.getState().setProgress(self.progress),
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
