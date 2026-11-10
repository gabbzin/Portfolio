import { projects } from "@/consts/projects";

export type LatLon = readonly [number, number];

// Onde cada parada fica no globo. As longitudes seguem "desdobradas" para
// leste (Brasília termina em -47.88 + 360) para que interpolar entre duas
// paradas nunca dê a volta pelo lado errado.
export const BRASILIA: LatLon = [-15.79, -47.88];
/** Fernando de Noronha: a ilha dos primeiros passos. */
export const ISLAND: LatLon = [-3.85, -32.42];
/** África: o continente da stack. */
export const CONTINENT: LatLon = [6, 20];
/** Singapura: o porto. */
export const HARBOR: LatLon = [1.29, 103.85];
/** Pacífico: o mar aberto da travessia. */
export const OPEN_SEA: LatLon = [-12, 210];
export const BRASILIA_AGAIN: LatLon = [BRASILIA[0], BRASILIA[1] + 360];

// Uma cidade por projeto, de oeste para leste até chegar ao porto. Com mais
// projetos do que cidades, a lista recomeça.
const cityPool: LatLon[] = [
  [25.2, 55.3],
  [19.1, 72.9],
  [28.6, 77.2],
  [22.3, 114.2],
  [13.7, 100.5],
];
export const CITIES: LatLon[] = projects.map(
  (_, index) => cityPool[index % cityPool.length],
);

/** Um farol por projeto dos primeiros passos, em volta da ilha. */
export const BEACONS: LatLon[] = [
  [-1.6, -35.4],
  [-6.6, -34.2],
  [-2.4, -29.6],
];

/** A rota completa da viagem, na ordem em que a trilha se acende. */
export const ROUTE: LatLon[] = [
  BRASILIA,
  ISLAND,
  CONTINENT,
  ...CITIES,
  HARBOR,
  OPEN_SEA,
  BRASILIA_AGAIN,
];

export const routeIndex = {
  island: 1,
  continent: 2,
  city: (index: number) => 3 + index,
  harbor: 3 + CITIES.length,
  openSea: 4 + CITIES.length,
  end: 5 + CITIES.length,
};
