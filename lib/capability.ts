export type Mode = "3d" | "static";

function hasWebGL(requireAcceleration: boolean) {
  try {
    const gl = document.createElement("canvas").getContext("webgl2", {
      failIfMajorPerformanceCaveat: requireAcceleration,
    });
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
}

/**
 * Decide qual versão da home entregar. A estática (mesmo conteúdo, sem cena
 * nem scroll fixado) vale para movimento reduzido, aparelho fraco e WebGL
 * ausente ou só por software. `?modo=3d` e `?modo=estatico` forçam cada uma.
 */
export function detectMode(): Mode {
  const forced = new URLSearchParams(location.search).get("modo");
  if (forced === "estatico") return "static";
  if (forced === "3d") return hasWebGL(false) ? "3d" : "static";

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";

  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.hardwareConcurrency <= 2 || (nav.deviceMemory ?? 8) <= 2)
    return "static";

  return hasWebGL(true) ? "3d" : "static";
}

/** Tela estreita ou toque: menos pontos no globo e viagem mais curta. */
export const isCompact = () =>
  matchMedia("(max-width: 820px), (pointer: coarse)").matches;
