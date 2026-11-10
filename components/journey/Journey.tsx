"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import dynamic from "next/dynamic";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { detectMode, isCompact, type Mode } from "@/lib/capability";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useRecruiterMode } from "@/lib/recruiter-mode";
import { smoothScroll } from "./smooth-scroll";

// O three.js fica num chunk à parte, baixado só no modo 3D e depois do
// conteúdo pintado.
const Atmosphere = dynamic(() => import("./Atmosphere"), { ssr: false });

interface JourneyContext {
  mode: Mode;
  compact: boolean;
  /** Cai para a versão estática (cena falhou ou perdeu o contexto WebGL). */
  goStatic: () => void;
}

const Context = createContext<JourneyContext>({
  mode: "static",
  compact: false,
  goStatic: () => {},
});

export const useJourney = () => useContext(Context);

let detected: Mode | undefined;
const subscribe = () => () => {};

export function Journey({ children }: { children: ReactNode }) {
  // No servidor (e sem JavaScript) a página é sempre a versão estática, com
  // todo o conteúdo em ordem de leitura. O modo 3D entra depois de hidratar.
  const initial = useSyncExternalStore(
    subscribe,
    () => {
      detected ??= detectMode();
      return detected;
    },
    () => "static" as const,
  );
  const compact = useSyncExternalStore(subscribe, isCompact, () => false);
  const [failed, setFailed] = useState(false);
  const recruiter = useRecruiterMode();
  const mode: Mode = failed || recruiter ? "static" : initial;

  useEffect(() => {
    if (mode !== "3d") return;

    // O Lenis já respeita o `scroll-margin-top` das âncoras (header fixo).
    const lenis = new Lenis({ anchors: true });
    // Movido pelo ticker do GSAP para que todos os ScrollTriggers enxerguem
    // a mesma posição suavizada, no mesmo frame.
    const raf = (time: number) => lenis.raf(time * 1000);

    smoothScroll.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // A troca para o layout fixado muda a posição das âncoras: quem chegou
    // por um link com # é levado de novo ao lugar certo.
    const hash = window.location.hash;
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    const timer = target
      ? window.setTimeout(() => lenis.scrollTo(target, { immediate: true }), 80)
      : 0;

    return () => {
      window.clearTimeout(timer);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      smoothScroll.lenis = null;
    };
  }, [mode]);

  const value = useMemo(
    () => ({ mode, compact, goStatic: () => setFailed(true) }),
    [mode, compact],
  );

  return (
    <Context value={value}>
      <div data-mode={mode} className="relative">
        {mode === "3d" && <Atmosphere />}
        <main id="conteudo" className="relative z-10">
          {children}
        </main>
      </div>
    </Context>
  );
}
