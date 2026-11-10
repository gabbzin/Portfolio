import { Vector3 } from "three";

const DEG = Math.PI / 180;

/**
 * Converte latitude/longitude (graus) em um ponto da esfera. Com a câmera
 * olhando de fora e o norte para cima, o leste fica à direita.
 */
export function latLonToVector3(
  lat: number,
  lon: number,
  radius = 1,
  target = new Vector3(),
) {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;

  return target.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Inverso de `latLonToVector3` para um vetor unitário: [lat, lon] em graus. */
export function vector3ToLatLon(x: number, y: number, z: number) {
  const lat = Math.asin(y) / DEG;
  const lon = ((Math.atan2(z, -x) / DEG + 360) % 360) - 180;
  return [lat, lon] as const;
}
