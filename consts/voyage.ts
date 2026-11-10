import { aboutParagraphs } from "./about";
import type { ChapterId } from "./chapters";
import { harborScenes } from "./experience";
import { projects } from "./projects";
import { stackLayers } from "./skills";

export type ActId = Exclude<ChapterId, "partida" | "contato">;

interface ActPlan {
  id: ActId;
  /** Lado do cartão de texto no desktop: a cena acontece do lado oposto. */
  side: "left" | "right";
  /** Quantos passos o ato tem. Cada passo dura 1 unidade da linha do tempo. */
  beats: number;
}

// A viagem fixada na tela. O texto (components/journey/acts.tsx) e a cena
// (scene/poses.ts) leem esta lista: mudar a quantidade de projetos ou de
// camadas ajusta os dois sem mais nada.
const plan: ActPlan[] = [
  { id: "primeiros-passos", side: "left", beats: 1 },
  // Linguagens e depois uma camada por passo.
  { id: "stack", side: "right", beats: 1 + stackLayers.length },
  { id: "projetos", side: "left", beats: projects.length },
  // Resumo da experiência e depois uma cena do porto por passo.
  { id: "experiencia", side: "right", beats: 1 + harborScenes.length },
  { id: "sobre", side: "left", beats: aboutParagraphs.length },
];

let cursor = 0;
export const voyageActs = plan.map(act => {
  const start = cursor;
  cursor += act.beats;
  return { ...act, start };
});

/** Duração da viagem fixada, em passos. */
export const VOYAGE_BEATS = cursor;

export function getAct(id: ActId) {
  const act = voyageActs.find(item => item.id === id);
  if (!act) throw new Error(`Ato desconhecido: ${id}`);
  return act;
}

/**
 * A linha do tempo da página inteira, lida pela cena:
 * hero de 0 a 1, viagem de 1 a 1 + VOYAGE_BEATS, chegada na última unidade.
 */
export const VOYAGE_START = 1;
export const ARRIVAL_START = VOYAGE_START + VOYAGE_BEATS;
