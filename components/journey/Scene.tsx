"use client";

import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      // Nada se move ainda: renderiza só quando algo invalida o frame.
      frameloop="demand"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    />
  );
}
