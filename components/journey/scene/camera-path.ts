import { CatmullRomCurve3, Vector3 } from "three";
import { type ChapterId, chapters } from "@/consts/chapters";
import { latLonToVector3 } from "@/lib/geo";

interface StopView {
  /** Distância da câmera ao centro do globo (o raio do globo é 1). */
  distance: number;
  /** Deslocamento do globo na tela, em fração da largura e da altura. */
  shift: readonly [number, number];
  /** Opacidade da cena: mais baixa onde o texto passa por cima do globo. */
  opacity: number;
}

interface Stop extends StopView {
  marker: Vector3;
  camera: Vector3;
}

const backdrop: StopView = { distance: 2.3, shift: [0, 0], opacity: 0.45 };

const landscape: Record<ChapterId, StopView> = {
  partida: { distance: 3.8, shift: [0.24, 0], opacity: 1 },
  "primeiros-passos": backdrop,
  stack: backdrop,
  projetos: backdrop,
  experiencia: backdrop,
  sobre: backdrop,
  contato: { distance: 2.6, shift: [0, 0], opacity: 0.6 },
};

// Em tela estreita o globo fica atrás do texto, mais longe e mais discreto.
const portrait: Record<ChapterId, StopView> = {
  ...landscape,
  partida: { distance: 4.6, shift: [0, 0.32], opacity: 0.8 },
  contato: { distance: 4, shift: [0, 0], opacity: 0.45 },
};

// A câmera fica um pouco ao sul e a leste da parada para ver o marcador de
// lado, e não de cima.
const TILT = [-14, 10] as const;

// Pontos extras por trecho, sobre o arco de círculo máximo. Sem eles a
// spline cortaria caminho por dentro do globo entre paradas distantes.
const SUBDIVISIONS = 6;

export function buildCameraPath(isPortrait: boolean) {
  const views = isPortrait ? portrait : landscape;

  const stops: Stop[] = chapters.map(({ id, coords: [lat, lon] }) => ({
    ...views[id],
    marker: latLonToVector3(lat, lon),
    camera: latLonToVector3(lat + TILT[0], lon + TILT[1], views[id].distance),
  }));

  const points: Vector3[] = [];
  for (let i = 0; i < stops.length - 1; i++) {
    const from = stops[i].camera;
    const to = stops[i + 1].camera;
    const angle = from.angleTo(to);

    for (let step = 0; step < SUBDIVISIONS; step++) {
      const t = step / SUBDIVISIONS;
      points.push(slerp(from, to, angle, t));
    }
  }
  points.push(stops[stops.length - 1].camera.clone());

  // Parametrização uniforme (`getPoint`, não `getPointAt`): com o mesmo número
  // de pontos por trecho, t = i / (paradas - 1) cai exatamente na parada i.
  const curve = new CatmullRomCurve3(points, false, "centripetal");

  return { stops, curve };
}

function slerp(from: Vector3, to: Vector3, angle: number, t: number) {
  const length = from.length() + (to.length() - from.length()) * t;
  if (angle < 1e-4) return from.clone().setLength(length);

  const sin = Math.sin(angle);
  const a = Math.sin((1 - t) * angle) / sin / from.length();
  const b = Math.sin(t * angle) / sin / to.length();

  return new Vector3()
    .addScaledVector(from, a)
    .addScaledVector(to, b)
    .setLength(length);
}
