import { CatmullRomCurve3, type Vector3 } from "three";
import { latLonToVector3 } from "@/lib/geo";
import { ROUTE } from "./places";

const STEPS_PER_LEG = 24;
const ALTITUDE = 1.012;

/**
 * A trilha da viagem: arcos entre as paradas, levemente erguidos no meio.
 * Devolve a curva e, para cada parada, a fração do comprimento em que ela
 * fica (é o que a pose usa para dizer "acenda até aqui").
 */
export function buildRoute() {
  const points: Vector3[] = [];

  for (let leg = 0; leg < ROUTE.length - 1; leg++) {
    const [fromLat, fromLon] = ROUTE[leg];
    const [toLat, toLon] = ROUTE[leg + 1];
    // Trechos longos sobem mais, como rota de voo; os curtos ficam rentes.
    const span = Math.hypot(toLat - fromLat, toLon - fromLon);
    const lift = Math.min(0.09, span * 0.0012);

    for (let step = 0; step < STEPS_PER_LEG; step++) {
      const t = step / STEPS_PER_LEG;
      points.push(
        latLonToVector3(
          fromLat + (toLat - fromLat) * t,
          fromLon + (toLon - fromLon) * t,
          ALTITUDE + Math.sin(Math.PI * t) * lift,
        ),
      );
    }
  }
  const [lastLat, lastLon] = ROUTE[ROUTE.length - 1];
  points.push(latLonToVector3(lastLat, lastLon, ALTITUDE));

  const lengths = [0];
  for (let i = 1; i < points.length; i++)
    lengths.push(lengths[i - 1] + points[i].distanceTo(points[i - 1]));
  const total = lengths[lengths.length - 1];

  return {
    curve: new CatmullRomCurve3(points, false, "centripetal"),
    fractions: ROUTE.map((_, stop) => lengths[stop * STEPS_PER_LEG] / total),
  };
}

export const route = buildRoute();
