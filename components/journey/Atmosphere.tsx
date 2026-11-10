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

/** O canvas fixo da cena, atrás de todo o conteúdo. */
export default function Atmosphere() {
  const { compact, goStatic } = useJourney();
  const [ready, setReady] = useState(false);

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
          onReady={() => setReady(true)}
          onContextLost={goStatic}
        />
      </Boundary>
    </div>
  );
}
