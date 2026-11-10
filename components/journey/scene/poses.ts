/**
 * O que a cena mostra em cada trecho. Uma pose é um retrato completo: câmera,
 * enquadramento e o estado de cada elemento. O diretor interpola as poses
 * conforme o scroll e todos os elementos leem a pose corrente.
 */
import { harborScenes } from "@/consts/experience";
import { stackLayers } from "@/consts/skills";
import { ARRIVAL_START, getAct, VOYAGE_START } from "@/consts/voyage";
import {
  BRASILIA,
  BRASILIA_AGAIN,
  CITIES,
  CONTINENT,
  HARBOR,
  ISLAND,
  type LatLon,
  OPEN_SEA,
  routeIndex,
} from "./places";
import { route } from "./route-geometry";

export interface Pose {
  /** Câmera: latitude, longitude e distância ao centro (o raio do globo é 1). */
  cam: [number, number, number];
  /** Para onde a câmera olha: latitude, longitude e raio. */
  look: [number, number, number];
  /** Deslocamento do globo na tela, em fração da largura e da altura. */
  shift: [number, number];
  /** Fração da rota já acesa. */
  route: number;
  /** 1 = os pontos do globo separados em camadas (vista explodida). */
  explode: number;
  /** Camada em destaque na vista explodida (0 é a de cima). */
  layer: number;
  /** Quanto os navios do porto aparecem. */
  ships: number;
  /** Quanto os workers em volta do porto aparecem. */
  workers: number;
  /** Quanto o farol do porto aparece. */
  beam: number;
  /** Opacidade geral da cena. */
  opacity: number;
}

const BASE: Pose = {
  cam: [0, 0, 3.8],
  look: [0, 0, 1],
  shift: [0, 0],
  route: 0,
  explode: 0,
  layer: 0,
  ships: 0,
  workers: 0,
  beam: 0,
  opacity: 1,
};

interface Keyframe {
  t: number;
  pose: Pose;
}

/** Em que ponto do passo o texto entra e sai (usado pelo DOM e pela cena). */
export const TEXT_IN = 0.1;
export const TEXT_OUT = 0.86;
// A cena chega um pouco depois do texto e fica parada enquanto ele é lido.
const HOLD_FROM = 0.24;
const HOLD_TO = 0.8;

export function buildTrack(portrait: boolean): Keyframe[] {
  const far = portrait ? 1.45 : 1;
  // O globo vai para o lado oposto ao cartão; no celular sobe, porque o
  // cartão fica na base da tela.
  const beside = (side: "left" | "right"): [number, number] =>
    portrait ? [0, -0.25] : [side === "left" ? 0.2 : -0.2, 0];

  /** Câmera um pouco ao sul e a leste do lugar, para vê-lo de lado. */
  const over = (
    [lat, lon]: LatLon,
    distance: number,
    rest: Partial<Pose> = {},
  ): Pose => ({
    ...BASE,
    cam: [lat - 14, lon + 10, distance * far],
    look: [lat, lon, 1],
    ...rest,
  });

  const track: Keyframe[] = [];
  /** A mesma pose do começo ao fim da leitura de um passo. */
  const hold = (beat: number, pose: Pose) => {
    track.push({ t: beat + HOLD_FROM, pose }, { t: beat + HOLD_TO, pose });
  };
  const lit = (stop: number) => route.fractions[stop];

  // Hero: o globo inteiro, com Brasília marcada. Rolar afasta a câmera.
  track.push({
    t: 0,
    pose: over(BRASILIA, 3.8, { shift: portrait ? [0, 0.3] : [0.24, 0] }),
  });
  track.push({
    t: 0.7,
    pose: over(BRASILIA, 4.6, { shift: portrait ? [0, 0.1] : [0.2, 0] }),
  });

  // Bússola: desce até a ilha; os três primeiros projetos acendem em volta.
  const first = getAct("primeiros-passos");
  hold(
    VOYAGE_START + first.start,
    over(ISLAND, 1.75, {
      shift: beside(first.side),
      route: lit(routeIndex.island),
    }),
  );

  // Continente: primeiro inteiro (linguagens), depois em corte, uma camada
  // em destaque por passo.
  const stack = getAct("stack");
  const stackAt = VOYAGE_START + stack.start;
  const continent = {
    shift: beside(stack.side),
    route: lit(routeIndex.continent),
  };
  hold(stackAt, over(CONTINENT, 2.5, continent));
  stackLayers.forEach((_, layer) => {
    hold(stackAt + 1 + layer, {
      ...BASE,
      ...continent,
      // De lado e de baixo, quase rasante: é o ângulo em que as camadas
      // se descolam umas das outras.
      cam: [CONTINENT[0] - 46, CONTINENT[1] + 26, 2.9 * far],
      look: [CONTINENT[0] - 6, CONTINENT[1], 1.16],
      explode: 1,
      layer,
    });
  });

  // Cidades: a câmera pousa em uma cidade por projeto.
  const cities = getAct("projetos");
  CITIES.forEach((city, index) => {
    hold(
      VOYAGE_START + cities.start + index,
      over(city, 1.8, {
        shift: beside(cities.side),
        route: lit(routeIndex.city(index)),
      }),
    );
  });

  // Porto: navios na fila, depois os workers, depois o farol.
  const harbor = getAct("experiencia");
  const harborAt = VOYAGE_START + harbor.start;
  const port = { shift: beside(harbor.side), route: lit(routeIndex.harbor) };
  hold(harborAt, over(HARBOR, 2, { ...port, ships: 0.5 }));
  harborScenes.forEach((_, scene) => {
    hold(
      harborAt + 1 + scene,
      over(HARBOR, 1.6, {
        ...port,
        ships: 1,
        workers: scene >= 1 ? 1 : 0,
        beam: scene >= 2 ? 1 : 0,
      }),
    );
  });

  // Travessia: mar aberto, câmera alta e lenta, a rota avançando para casa.
  const crossing = getAct("sobre");
  const crossingAt = VOYAGE_START + crossing.start;
  const seaFrom = lit(routeIndex.openSea);
  const seaTo = lit(routeIndex.end);
  for (let beat = 0; beat < crossing.beats; beat++) {
    const progress = beat / crossing.beats;
    hold(
      crossingAt + beat,
      over([OPEN_SEA[0], OPEN_SEA[1] + progress * 50], 3.9, {
        shift: beside(crossing.side),
        route: seaFrom + (seaTo - seaFrom) * progress * 0.7,
      }),
    );
  }

  // Chegada: a rota fecha a volta em Brasília e a cena recua para o
  // formulário.
  track.push({
    t: ARRIVAL_START + 0.3,
    pose: over(BRASILIA_AGAIN, 2.6, { route: 1 }),
  });
  track.push({
    t: ARRIVAL_START + 1,
    pose: over(BRASILIA_AGAIN, 3.2, {
      route: 1,
      opacity: 0.45,
      shift: portrait ? [0, -0.2] : [0, -0.08],
    }),
  });

  return track;
}

const NUMERIC = [
  "route",
  "explode",
  "layer",
  "ships",
  "workers",
  "beam",
  "opacity",
] as const;

const smooth = (t: number) => t * t * (3 - 2 * t);

export function samplePose(track: Keyframe[], t: number, out: Pose) {
  let k = 0;
  while (k < track.length - 2 && t > track[k + 1].t) k++;

  const from = track[k];
  const to = track[k + 1];
  const f = smooth(
    Math.min(1, Math.max(0, (t - from.t) / (to.t - from.t || 1))),
  );

  for (let i = 0; i < 3; i++) {
    out.cam[i] = from.pose.cam[i] + (to.pose.cam[i] - from.pose.cam[i]) * f;
    out.look[i] = from.pose.look[i] + (to.pose.look[i] - from.pose.look[i]) * f;
  }
  for (let i = 0; i < 2; i++)
    out.shift[i] =
      from.pose.shift[i] + (to.pose.shift[i] - from.pose.shift[i]) * f;
  for (const key of NUMERIC)
    out[key] = from.pose[key] + (to.pose[key] - from.pose[key]) * f;
}

/**
 * Estado corrente da cena: escrito pelo diretor a cada quadro e lido por
 * todos os elementos. Mutável de propósito, fora do React.
 */
export const stage = {
  /** Posição suavizada na linha do tempo da página. */
  t: 0,
  pose: {
    ...BASE,
    cam: [...BASE.cam],
    look: [...BASE.look],
    shift: [...BASE.shift],
  } as Pose,
};
