"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function SceneCanvas() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supportsWebGL()) return;

    // O three.js só é baixado com o navegador ocioso, depois do conteúdo
    // pintado, para não competir com o LCP.
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setReady(true));
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      {ready && <Scene />}
    </div>
  );
}
