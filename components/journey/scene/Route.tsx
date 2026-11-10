import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Color, ShaderMaterial, TubeGeometry } from "three";
import { stage } from "./poses";
import { route } from "./route-geometry";

const vertexShader = /* glsl */ `
  varying float vAlong;
  void main() {
    vAlong = uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uProgress;
  uniform float uOpacity;
  uniform float uTime;
  varying float vAlong;

  void main() {
    if (vAlong > uProgress) discard;
    // A ponta da rota brilha mais; o resto pulsa de leve, no sentido da viagem.
    float tip = smoothstep(uProgress - 0.02, uProgress, vAlong) * step(uProgress, 0.999);
    float pulse = 0.5 + 0.5 * sin(vAlong * 260.0 - uTime * 2.4);
    gl_FragColor = vec4(uColor, (0.5 + pulse * 0.2 + tip * 0.5) * uOpacity);
  }
`;

/** A rota da viagem: uma linha que se acende de Brasília em diante. */
export function Route({ color }: { color: string }) {
  const { geometry, material } = useMemo(
    () => ({
      geometry: new TubeGeometry(route.curve, 900, 0.0028, 5, false),
      material: new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uColor: { value: new Color() },
          uProgress: { value: 0 },
          uOpacity: { value: 1 },
          uTime: { value: 0 },
        },
      }),
    }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useEffect(() => {
    material.uniforms.uColor.value.set(color);
  }, [material, color]);

  useFrame(({ clock }) => {
    const { uProgress, uOpacity, uTime } = material.uniforms;
    uProgress.value = stage.pose.route;
    // Na vista explodida a rota some: ela ficaria presa à camada de baixo.
    uOpacity.value = stage.pose.opacity * (1 - stage.pose.explode);
    uTime.value = clock.elapsedTime;
  });

  return <mesh geometry={geometry} material={material} renderOrder={2} />;
}
