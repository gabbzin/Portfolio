import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { DoubleSide, type Mesh, type MeshBasicMaterial } from "three";
import { chapters } from "@/consts/chapters";
import { latLonToVector3 } from "@/lib/geo";
import { useJourneyStore } from "@/lib/journey-store";
import { sceneState } from "./scene-state";

const PULSE_SECONDS = 1.8;

export function Markers({ color }: { color: string }) {
  // Partida e chegada dividem o mesmo ponto (Brasília): um marcador só.
  const markers = useMemo(() => {
    const byPlace = new Map<
      string,
      { chapters: number[]; coords: readonly [number, number] }
    >();
    chapters.forEach(({ coords }, index) => {
      const key = coords.join(",");
      const entry = byPlace.get(key) ?? { chapters: [], coords };
      entry.chapters.push(index);
      byPlace.set(key, entry);
    });

    return [...byPlace.values()].map(({ chapters: indexes, coords }) => {
      const position = latLonToVector3(coords[0], coords[1], 1.004);
      return { indexes, position, outward: position.clone().multiplyScalar(2) };
    });
  }, []);

  const dots = useRef<(Mesh | null)[]>([]);
  const rings = useRef<(Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const { activeChapter } = useJourneyStore.getState();
    const phase = (clock.elapsedTime % PULSE_SECONDS) / PULSE_SECONDS;

    markers.forEach(({ indexes }, i) => {
      const dot = dots.current[i];
      const ring = rings.current[i];
      if (!dot || !ring) return;

      const active = indexes.includes(activeChapter);
      const dotMaterial = dot.material as MeshBasicMaterial;
      const ringMaterial = ring.material as MeshBasicMaterial;

      dotMaterial.opacity = (active ? 1 : 0.5) * sceneState.opacity;
      // O anel se expande e some: só a parada atual pulsa.
      ring.visible = active;
      ring.scale.setScalar(1 + phase * 2.4);
      ringMaterial.opacity = (1 - phase) * sceneState.opacity;
    });
  });

  return (
    <>
      {markers.map(({ position, outward }, i) => (
        <group
          key={position.toArray().join(",")}
          position={position}
          onUpdate={group => group.lookAt(outward)}
        >
          <mesh
            ref={mesh => {
              dots.current[i] = mesh;
            }}
          >
            <circleGeometry args={[0.014, 20]} />
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
            <ringGeometry args={[0.02, 0.024, 40]} />
            <meshBasicMaterial
              color={color}
              transparent
              depthWrite={false}
              side={DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}
