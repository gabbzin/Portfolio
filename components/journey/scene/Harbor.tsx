import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  DoubleSide,
  type Group,
  type InstancedMesh,
  type Mesh,
  type MeshBasicMaterial,
  Object3D,
} from "three";
import { latLonToVector3 } from "@/lib/geo";
import { HARBOR, type LatLon } from "./places";
import { stage } from "./poses";

// De onde os navios vêm: Índico, Mar da China Meridional e Mar de Java.
const LANES: LatLon[] = [
  [-6, 84],
  [13, 113],
  [-8, 113],
];
const SHIPS_PER_LANE = 7;
const SHIPS = LANES.length * SHIPS_PER_LANE;
const WORKERS = 3;

const dummy = new Object3D();

/**
 * O porto: navios (jobs) chegam em fila pelas rotas de mar, os workers giram
 * em volta do cais e o farol varre a região. Cada parte aparece no passo do
 * texto que fala dela.
 */
export function Harbor({ color }: { color: string }) {
  const ships = useRef<InstancedMesh>(null);
  const shipMaterial = useRef<MeshBasicMaterial>(null);
  const workers = useRef<Group>(null);
  const beam = useRef<Mesh>(null);

  const port = useMemo(() => {
    const position = latLonToVector3(HARBOR[0], HARBOR[1], 1.008);
    return { position, outward: position.clone().multiplyScalar(2) };
  }, []);

  useFrame(({ clock }) => {
    const { pose } = stage;
    const time = clock.elapsedTime;

    if (ships.current && shipMaterial.current) {
      ships.current.visible = pose.ships > 0.01;
      shipMaterial.current.opacity = 0.9 * pose.opacity;

      if (ships.current.visible) {
        for (let i = 0; i < SHIPS; i++) {
          const [lat, lon] = LANES[i % LANES.length];
          // Cada navio percorre a rota em laço, com a fila espaçada por igual.
          const along =
            (time * 0.045 + Math.floor(i / LANES.length) / SHIPS_PER_LANE) % 1;
          latLonToVector3(
            lat + (HARBOR[0] - lat) * along,
            lon + (HARBOR[1] - lon) * along,
            1.006,
            dummy.position,
          );
          dummy.lookAt(
            dummy.position.x * 2,
            dummy.position.y * 2,
            dummy.position.z * 2,
          );
          // Surge no horizonte e some ao atracar; perto do cais a fila aperta.
          const fade = Math.min(1, along * 8, (1 - along) * 10);
          dummy.scale.setScalar(fade * pose.ships);
          dummy.updateMatrix();
          ships.current.setMatrixAt(i, dummy.matrix);
        }
        ships.current.instanceMatrix.needsUpdate = true;
      }
    }

    if (workers.current) {
      workers.current.visible = pose.workers > 0.01;
      workers.current.rotation.z = time * 0.9;
      workers.current.scale.setScalar(pose.workers);
      for (const worker of workers.current.children) {
        ((worker as Mesh).material as MeshBasicMaterial).opacity =
          0.9 * pose.workers * pose.opacity;
      }
    }

    if (beam.current) {
      beam.current.visible = pose.beam > 0.01;
      beam.current.rotation.z = -time * 0.7;
      (beam.current.material as MeshBasicMaterial).opacity =
        0.22 * pose.beam * pose.opacity;
    }
  });

  return (
    <>
      <instancedMesh
        ref={ships}
        args={[undefined, undefined, SHIPS]}
        frustumCulled={false}
        renderOrder={3}
      >
        <circleGeometry args={[0.0055, 4]} />
        <meshBasicMaterial
          ref={shipMaterial}
          color={color}
          transparent
          depthWrite={false}
          side={DoubleSide}
        />
      </instancedMesh>

      <group
        position={port.position}
        onUpdate={group => group.lookAt(port.outward)}
        renderOrder={3}
      >
        <group ref={workers}>
          {Array.from({ length: WORKERS }, (_, index) => {
            const angle = (index / WORKERS) * Math.PI * 2;
            return (
              <mesh
                // biome-ignore lint/suspicious/noArrayIndexKey: lista fixa
                key={index}
                position={[Math.cos(angle) * 0.05, Math.sin(angle) * 0.05, 0]}
              >
                <ringGeometry args={[0.008, 0.012, 4]} />
                <meshBasicMaterial
                  color={color}
                  transparent
                  depthWrite={false}
                  side={DoubleSide}
                />
              </mesh>
            );
          })}
        </group>

        {/* Farol: um setor de luz girando em volta do porto. */}
        <mesh ref={beam}>
          <circleGeometry args={[0.22, 24, 0, Math.PI / 5]} />
          <meshBasicMaterial
            color={color}
            transparent
            depthWrite={false}
            side={DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
}
