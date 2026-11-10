import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import {
  Color,
  DoubleSide,
  type InstancedMesh,
  Object3D,
  Raycaster,
  ShaderMaterial,
  Sphere,
  Vector2,
  Vector3,
} from "three";
import { chapters } from "@/consts/chapters";
import { latLonToVector3 } from "@/lib/geo";
import { sceneState } from "./scene-state";
import { useLandPoints } from "./use-land-points";

// Cerca de 29% da esfera é terra: estes candidatos rendem ~18 mil pontos no
// desktop e ~5,5 mil no mobile, dentro do orçamento de 20 mil e 6 mil.
const CANDIDATES_DESKTOP = 62_000;
const CANDIDATES_MOBILE = 19_000;

const vertexShader = /* glsl */ `
  uniform vec3 uSun;
  uniform vec3 uPointer;
  uniform float uPointerStrength;
  varying float vLight;
  varying float vNear;

  void main() {
    vec3 direction = normalize(instanceMatrix[3].xyz);

    // Pontos perto do cursor crescem: a mesma reação da grade de pontos antiga.
    vNear = smoothstep(0.16, 0.0, distance(direction, uPointer)) * uPointerStrength;
    vec3 scaled = position * (1.0 + vNear * 0.9);

    // Terminador dia/noite: transição curta em volta do grande círculo.
    vLight = smoothstep(-0.12, 0.12, dot(direction, uSun));

    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(scaled, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vLight;
  varying float vNear;

  void main() {
    float alpha = mix(0.26, 0.95, vLight) + vNear * 0.5;
    gl_FragColor = vec4(uColor, min(alpha, 1.0) * uOpacity);
  }
`;

const brasilia = latLonToVector3(...chapters[0].coords);
const east = new Vector3(0, 1, 0).cross(brasilia).normalize();
// No tema claro é dia em Brasília; no escuro é noite, com o terminador
// visível a leste para a transição não sumir atrás do globo.
const SUN_DAY = brasilia.clone().addScaledVector(east, 0.6).normalize();
const SUN_NIGHT = brasilia.clone().multiplyScalar(-0.3).add(east).normalize();

const unitSphere = new Sphere(new Vector3(), 1);
const raycaster = new Raycaster();
const hit = new Vector3();
const dummy = new Object3D();

interface GlobeProps {
  dark: boolean;
  color: string;
}

export function Globe({ dark, color }: GlobeProps) {
  const isSmall = useThree(state => state.size.width < 768);
  const positions = useLandPoints(
    isSmall ? CANDIDATES_MOBILE : CANDIDATES_DESKTOP,
  );
  const count = positions ? positions.length / 3 : 0;

  const mesh = useRef<InstancedMesh>(null);
  const pointer = useRef<Vector2 | null>(null);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
        uniforms: {
          uSun: { value: new Vector3() },
          uPointer: { value: new Vector3() },
          uPointerStrength: { value: 0 },
          uColor: { value: new Color() },
          uOpacity: { value: 1 },
        },
      }),
    [],
  );

  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    material.uniforms.uColor.value.set(color);
  }, [material, color]);

  const sunPlaced = useRef(false);

  // O raio do ponto acompanha o espaçamento: menos pontos, pontos maiores.
  const radius = count ? Math.sqrt((4 * Math.PI * 0.29) / count) * 0.3 : 0;

  useLayoutEffect(() => {
    if (!mesh.current || !positions) return;

    for (let i = 0; i < count; i++) {
      dummy.position.fromArray(positions, i * 3);
      // Cada disco fica tangente à esfera, de frente para fora.
      dummy.lookAt(
        dummy.position.x * 2,
        dummy.position.y * 2,
        dummy.position.z * 2,
      );
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [positions, count]);

  useEffect(() => {
    // O canvas tem pointer-events: none, então o cursor vem da janela.
    const onMove = (event: PointerEvent) => {
      pointer.current ??= new Vector2();
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const { uSun, uPointer, uPointerStrength, uOpacity } = material.uniforms;
    const ease = 1 - Math.exp(-2.5 * delta);

    // Ao trocar o tema, o sol dá a volta em vez de simplesmente apagar.
    // O primeiro frame já nasce no tema certo, sem animar.
    (uSun.value as Vector3)
      .lerp(dark ? SUN_NIGHT : SUN_DAY, sunPlaced.current ? ease : 1)
      .normalize();
    sunPlaced.current = true;
    uOpacity.value = sceneState.opacity;

    let strength = 0;
    if (pointer.current) {
      raycaster.setFromCamera(pointer.current, state.camera);
      if (raycaster.ray.intersectSphere(unitSphere, hit)) {
        (uPointer.value as Vector3).copy(hit);
        strength = 1;
      }
    }
    uPointerStrength.value += (strength - uPointerStrength.value) * ease * 2;
  });

  return (
    <>
      {/* Só escreve profundidade: esconde os pontos do lado de trás do globo
          sem pintar nada por cima do fundo da página. */}
      <mesh>
        <sphereGeometry args={[0.992, 48, 32]} />
        <meshBasicMaterial colorWrite={false} />
      </mesh>

      {positions && (
        <instancedMesh
          // A contagem muda entre mobile e desktop; o buffer não pode crescer.
          key={count}
          ref={mesh}
          args={[undefined, material, count]}
          frustumCulled={false}
        >
          <circleGeometry args={[radius, 6]} />
        </instancedMesh>
      )}
    </>
  );
}
