import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { DoubleSide, type Mesh, type MeshBasicMaterial } from "three";
import { ARRIVAL_START, getAct, VOYAGE_START } from "@/consts/voyage";
import { latLonToVector3 } from "@/lib/geo";
import {
  BEACONS,
  BRASILIA,
  CITIES,
  CONTINENT,
  HARBOR,
  ISLAND,
  type LatLon,
} from "./places";
import { stage } from "./poses";

interface Pin {
  coords: LatLon;
  /** A partir de que ponto da linha do tempo o marcador aparece. */
  from: number;
  /** Trechos em que ele é a parada atual e pulsa. */
  active: [number, number][];
  small?: boolean;
}

function buildPins(): Pin[] {
  const island = VOYAGE_START + getAct("primeiros-passos").start;
  const stack = getAct("stack");
  const continent = VOYAGE_START + stack.start;
  const cities = VOYAGE_START + getAct("projetos").start;
  const harbor = getAct("experiencia");
  const port = VOYAGE_START + harbor.start;

  return [
    {
      coords: BRASILIA,
      from: -1,
      active: [
        [-1, 0.9],
        [ARRIVAL_START - 0.1, Number.POSITIVE_INFINITY],
      ],
    },
    {
      coords: ISLAND,
      from: island - 0.1,
      active: [[island - 0.1, island + 1]],
    },
    // Os três primeiros projetos acendem um depois do outro.
    ...BEACONS.map((coords, index) => ({
      coords,
      from: island + 0.28 + index * 0.14,
      active: [[island, island + 1]] as [number, number][],
      small: true,
    })),
    {
      coords: CONTINENT,
      from: continent - 0.1,
      active: [[continent - 0.1, continent + 1]],
    },
    ...CITIES.map((coords, index) => ({
      coords,
      from: cities + index - 0.15,
      active: [[cities + index - 0.15, cities + index + 0.9]] as [
        number,
        number,
      ][],
    })),
    {
      coords: HARBOR,
      from: port - 0.15,
      active: [[port - 0.15, port + harbor.beats]],
    },
  ];
}

const PULSE_SECONDS = 1.8;

/** Marcadores das paradas: aparecem quando a rota chega e pulsam na parada atual. */
export function Pins({ color }: { color: string }) {
  const pins = useMemo(
    () =>
      buildPins().map(pin => {
        const position = latLonToVector3(pin.coords[0], pin.coords[1], 1.006);
        return {
          ...pin,
          position,
          outward: position.clone().multiplyScalar(2),
        };
      }),
    [],
  );

  const dots = useRef<(Mesh | null)[]>([]);
  const rings = useRef<(Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const { t, pose } = stage;
    // Na vista explodida os marcadores somem junto com a rota.
    const scene = pose.opacity * (1 - pose.explode);

    pins.forEach((pin, i) => {
      const dot = dots.current[i];
      const ring = rings.current[i];
      if (!dot || !ring) return;

      const shown = Math.min(1, Math.max(0, (t - pin.from) / 0.12));
      const active = pin.active.some(([from, to]) => t >= from && t < to);
      const phase =
        ((clock.elapsedTime + i * 0.37) % PULSE_SECONDS) / PULSE_SECONDS;

      dot.visible = shown > 0;
      dot.scale.setScalar(shown);
      (dot.material as MeshBasicMaterial).opacity = (active ? 1 : 0.55) * scene;

      ring.visible = active && shown > 0;
      ring.scale.setScalar(1 + phase * 2.4);
      (ring.material as MeshBasicMaterial).opacity = (1 - phase) * scene;
    });
  });

  return (
    <>
      {pins.map((pin, i) => {
        const size = pin.small ? 0.6 : 1;
        return (
          <group
            key={pin.coords.join(",")}
            position={pin.position}
            onUpdate={group => group.lookAt(pin.outward)}
            renderOrder={3}
          >
            <mesh
              ref={mesh => {
                dots.current[i] = mesh;
              }}
            >
              <circleGeometry args={[0.012 * size, 20]} />
              <meshBasicMaterial
                color={color}
                transparent
                depthWrite={false}
                side={DoubleSide}
              />
            </mesh>
            <mesh
              ref={mesh => {
                rings.current[i] = mesh;
              }}
            >
              <ringGeometry args={[0.018 * size, 0.0215 * size, 40]} />
              <meshBasicMaterial
                color={color}
                transparent
                depthWrite={false}
                side={DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
}
