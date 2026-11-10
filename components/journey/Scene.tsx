"use client";

import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { CameraRig } from "./scene/CameraRig";
import { Globe } from "./scene/Globe";
import { Markers } from "./scene/Markers";

// Os mesmos valores dos tokens --highlight e --foreground de globals.css.
const palette = {
  dark: { dots: "#60a5fa", marker: "#f5f8ff" },
  light: { dots: "#1d4ed8", marker: "#0a1430" },
};

export default function Scene() {
  // O contexto do React não atravessa o <Canvas>: o tema é lido aqui fora.
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";
  const colors = dark ? palette.dark : palette.light;

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 45, near: 0.1, far: 20 }}
    >
      <CameraRig />
      <Globe dark={dark} color={colors.dots} />
      <Markers color={colors.marker} />
    </Canvas>
  );
}
