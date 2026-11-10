import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils, type PerspectiveCamera, Vector3 } from "three";
import { useJourneyStore } from "@/lib/journey-store";
import { buildCameraPath } from "./camera-path";
import { sceneState } from "./scene-state";

const position = new Vector3();

export function CameraRig() {
  const isPortrait = useThree(state => state.size.width < state.size.height);
  const { stops, curve } = useMemo(
    () => buildCameraPath(isPortrait),
    [isPortrait],
  );

  const target = useRef(new Vector3());
  const shift = useRef({ x: 0, y: 0 });
  const started = useRef(false);

  useFrame((state, delta) => {
    const camera = state.camera as PerspectiveCamera;
    const { travel, activeChapter } = useJourneyStore.getState();
    const last = stops.length - 1;

    const index = Math.min(Math.floor(travel), last - 1);
    const from = stops[index];
    const to = stops[index + 1];
    const mix = travel - index;

    // No primeiro frame a câmera nasce no lugar certo, sem voar até ele.
    const ease = (lambda: number) =>
      started.current ? 1 - Math.exp(-lambda * delta) : 1;

    curve.getPoint(travel / last, position);
    camera.position.lerp(position, ease(4));

    target.current.lerp(stops[activeChapter].marker, ease(3));
    camera.lookAt(target.current);

    const shiftX = MathUtils.lerp(from.shift[0], to.shift[0], mix);
    const shiftY = MathUtils.lerp(from.shift[1], to.shift[1], mix);
    shift.current.x = MathUtils.lerp(shift.current.x, shiftX, ease(4));
    shift.current.y = MathUtils.lerp(shift.current.y, shiftY, ease(4));

    // Desloca a imagem na tela sem mexer na perspectiva: o globo sai do
    // centro para dar lugar ao texto.
    const { width, height } = state.size;
    camera.setViewOffset(
      width,
      height,
      -shift.current.x * width,
      -shift.current.y * height,
      width,
      height,
    );

    sceneState.opacity = MathUtils.lerp(
      sceneState.opacity,
      MathUtils.lerp(from.opacity, to.opacity, mix),
      ease(4),
    );

    started.current = true;
  });

  return null;
}
