import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import {
  Color,
  DoubleSide,
  InstancedBufferAttribute,
  type InstancedMesh,
  Object3D,
  Raycaster,
  ShaderMaterial,
  Sphere,
  Vector2,
  Vector3,
} from "three";
import { stackLayers } from "@/consts/skills";
import { latLonToVector3 } from "@/lib/geo";
import { useJourneyStore } from "@/lib/journey-store";
import { BRASILIA } from "./places";
import { stage } from "./poses";
import { useLandPoints } from "./use-land-points";

// Cerca de 29% da esfera é terra: estes candidatos rendem ~18 mil pontos no
// desktop e ~5,5 mil no mobile, dentro do orçamento de 20 mil e 6 mil.
const CANDIDATES_DESKTOP = 62_000;
const CANDIDATES_MOBILE = 19_000;

const vertexShader = /* glsl */ `
  #define LAYERS ${stackLayers.length.toFixed(1)}
  #define LAYER_GAP 0.16
  uniform vec3 uSun;
  uniform vec3 uPointer;
  uniform float uPointerStrength;
  uniform float uExplode;
  uniform float uLayer;
  attribute float aLayer;
  varying float vLight;
  varying float vFocus;
  varying float vNear;

  void main() {
    vec3 direction = normalize(instanceMatrix[3].xyz);

    // Pontos perto do cursor crescem: a mesma reação da grade de pontos antiga.
    vNear = smoothstep(0.16, 0.0, distance(direction, uPointer)) * uPointerStrength;
    vec3 scaled = position * (1.0 + vNear * 0.9);

    // Terminador dia/noite: transição curta em volta do grande círculo.
    vLight = smoothstep(-0.12, 0.12, dot(direction, uSun));

    // Vista explodida: cada ponto pertence a uma camada e sobe até a altura
    // dela (a camada 0 é a mais alta). A camada em destaque fica acesa.
    float lift = uExplode * LAYER_GAP * (LAYERS - 1.0 - aLayer);
    float focused = 1.0 - smoothstep(0.35, 0.8, abs(aLayer - uLayer));
    vFocus = mix(1.0, 0.28 + focused * 0.72, uExplode);

    vec4 local = instanceMatrix * vec4(scaled * (1.0 + uExplode * focused * 0.5), 1.0);
    local.xyz += direction * lift;
    gl_Position = projectionMatrix * modelViewMatrix * local;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vLight;
  varying float vNear;
  varying float vFocus;

  void main() {
    float alpha = mix(0.26, 0.95, vLight) + vNear * 0.5;
    gl_FragColor = vec4(uColor, min(alpha, 1.0) * vFocus * uOpacity);
  }
`;

// Contorno do globo: um brilho só na borda, para a esfera continuar legível
// sobre o oceano, onde não há pontos.
const rimVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-viewPosition.xyz);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const rimFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 3.2);
    gl_FragColor = vec4(uColor, rim * 0.4 * uOpacity);
  }
`;

const brasilia = latLonToVector3(BRASILIA[0], BRASILIA[1]);
const east = new Vector3(0, 1, 0).cross(brasilia).normalize();
// No tema claro é dia em Brasília; no escuro é noite, com o terminador
// visível a leste para a transição não sumir atrás do globo.
const SUN_DAY = brasilia.clone().addScaledVector(east, 0.6).normalize();
const SUN_NIGHT = brasilia.clone().multiplyScalar(-0.3).add(east).normalize();

const unitSphere = new Sphere(new Vector3(), 1);
const raycaster = new Raycaster();
const hit = new Vector3();
const dummy = new Object3D();
const ndc = new Vector2();

interface GlobeProps {
  dark: boolean;
  color: string;
  compact: boolean;
}

export function Globe({ dark, color, compact }: GlobeProps) {
  const positions = useLandPoints(
    compact ? CANDIDATES_MOBILE : CANDIDATES_DESKTOP,
  );
  const count = positions ? positions.length / 3 : 0;

  const mesh = useRef<InstancedMesh>(null);

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
          uExplode: { value: 0 },
          uLayer: { value: 0 },
        },
      }),
    [],
  );

  const rim = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: rimVertexShader,
        fragmentShader: rimFragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: { uColor: { value: new Color() }, uOpacity: { value: 1 } },
      }),
    [],
  );

  useEffect(
    () => () => {
      material.dispose();
      rim.dispose();
    },
    [material, rim],
  );

  useEffect(() => {
    material.uniforms.uColor.value.set(color);
    rim.uniforms.uColor.value.set(color);
  }, [material, rim, color]);

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

    // Camada de cada ponto, sorteada de forma estável: cada camada do corte
    // fica com um quarto do continente.
    const layers = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const noise = Math.sin(i * 12.9898) * 43758.5453;
      layers[i] = Math.floor((noise - Math.floor(noise)) * stackLayers.length);
    }
    mesh.current.geometry.setAttribute(
      "aLayer",
      new InstancedBufferAttribute(layers, 1),
    );
  }, [positions, count]);

  useFrame((state, delta) => {
    const { uSun, uPointer, uPointerStrength, uOpacity, uExplode, uLayer } =
      material.uniforms;
    const ease = 1 - Math.exp(-2.5 * delta);

    // Ao trocar o tema, o sol dá a volta em vez de simplesmente apagar.
    // O primeiro frame já nasce no tema certo, sem animar.
    (uSun.value as Vector3)
      .lerp(dark ? SUN_NIGHT : SUN_DAY, sunPlaced.current ? ease : 1)
      .normalize();
    sunPlaced.current = true;
    uOpacity.value = stage.pose.opacity;
    uExplode.value = stage.pose.explode;
    uLayer.value = stage.pose.layer;
    rim.uniforms.uOpacity.value =
      stage.pose.opacity * (1 - stage.pose.explode * 0.7);

    let strength = 0;
    const { pointer, pointerActive } = useJourneyStore.getState();
    // Na vista explodida os pontos saem da superfície e o cursor não acerta.
    if (pointerActive && stage.pose.explode < 0.05) {
      raycaster.setFromCamera(ndc.set(pointer.x, pointer.y), state.camera);
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

      <mesh material={rim}>
        <sphereGeometry args={[1, 64, 40]} />
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
