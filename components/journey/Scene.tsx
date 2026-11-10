"use client";

import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { Director } from "./scene/Director";
import { Globe } from "./scene/Globe";
import { Harbor } from "./scene/Harbor";
import { Pins } from "./scene/Pins";
import { Route } from "./scene/Route";

// Os mesmos valores dos tokens --highlight e --foreground de globals.css.
const palette = {
  dark: { dots: "#60a5fa", ink: "#f5f8ff" },
  light: { dots: "#1d4ed8", ink: "#0a1430" },
};

interface SceneProps {
  compact: boolean;
  onReady: () => void;
  onContextLost: () => void;
}

/** A cena inteira: o globo de pontos e tudo o que a viagem acende nele. */
export default function Scene({ compact, onReady, onContextLost }: SceneProps) {
  // O contexto do React não atravessa o <Canvas>: o tema é lido aqui fora.
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";
  const colors = dark ? palette.dark : palette.light;

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 45, near: 0.1, far: 20 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", event => {
          event.preventDefault();
          onContextLost();
        });
        onReady();
      }}
    >
      <Director />
      <Globe dark={dark} color={colors.dots} compact={compact} />
      <Route color={colors.ink} />
      <Pins color={colors.ink} />
      <Harbor color={colors.ink} />
    </Canvas>
  );
}
