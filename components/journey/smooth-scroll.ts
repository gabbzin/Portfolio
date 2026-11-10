import type Lenis from "lenis";

/** A instância do Lenis quando o scroll suave está ligado (modo 3D). */
export const smoothScroll: { lenis: Lenis | null } = { lenis: null };

export function scrollToY(top: number) {
  if (smoothScroll.lenis) smoothScroll.lenis.scrollTo(top, { duration: 1.4 });
  else window.scrollTo({ top });
}
