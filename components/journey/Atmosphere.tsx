"use client";

import { Component, type ReactNode, useEffect, useState } from "react";
import { useJourneyStore } from "@/lib/journey-store";
import { cn } from "@/lib/utils";
import { useJourney } from "./Journey";
import Scene from "./Scene";

class Boundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const IDLE_MS = 12_000;

/** O canvas fixo da cena, atrás de todo o conteúdo. */
export default function Atmosphere() {
  const { compact, goStatic } = useJourney();
  const [ready, setReady] = useState(false);
  // Sem scroll, cursor ou teclado por um tempo, o render para: a cena fica
  // congelada no último quadro e a bateria agradece.
  const [awake, setAwake] = useState(true);

  useEffect(() => {
    let timer = 0;
    const wake = () => {
      setAwake(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setAwake(false), IDLE_MS);
    };
    const events = ["scroll", "pointermove", "keydown", "touchstart"] as const;

    wake();
    for (const event of events)
      window.addEventListener(event, wake, { passive: true });
    return () => {
      window.clearTimeout(timer);
      for (const event of events) window.removeEventListener(event, wake);
    };
  }, []);

  useEffect(() => {
    // O canvas tem pointer-events: none, então o cursor vem da janela.
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      useJourneyStore.setState({
        pointerActive: true,
        pointer: {
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -((event.clientY / window.innerHeight) * 2 - 1),
        },
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 transition-opacity duration-1500",
        ready ? "opacity-100" : "opacity-0",
      )}
    >
      <Boundary onError={goStatic}>
        <Scene
          compact={compact}
          active={awake}
          onReady={() => setReady(true)}
          onContextLost={goStatic}
        />
      </Boundary>
    </div>
  );
}
