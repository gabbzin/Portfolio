import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { type PerspectiveCamera, Vector3 } from "three";
import { ARRIVAL_START, VOYAGE_START } from "@/consts/voyage";
import { latLonToVector3 } from "@/lib/geo";
import { useJourneyStore } from "@/lib/journey-store";
import { buildTrack, samplePose, stage } from "./poses";

const target = new Vector3();

/**
 * O diretor: lê o scroll, percorre a trilha de poses com inércia e posiciona
 * a câmera. Roda antes dos outros elementos (prioridade negativa), para que
 * todos leiam a pose do mesmo quadro.
 */
export function Director() {
  const portrait = useThree(
    state => state.size.width / state.size.height < 0.9,
  );
  const track = useMemo(() => buildTrack(portrait), [portrait]);
  const inner = useRef({ started: false, px: 0, py: 0 });

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const self = inner.current;
    const { hero, voyage, arrival, pointer } = useJourneyStore.getState();

    // As três seções escrevem trechos consecutivos da mesma linha do tempo.
    const goal =
      arrival > 0
        ? ARRIVAL_START + arrival
        : voyage > 0
          ? VOYAGE_START + voyage
          : hero;

    // No primeiro quadro a cena nasce no lugar certo, sem voar até ele.
    stage.t = self.started
      ? stage.t + (goal - stage.t) * (1 - Math.exp(-dt * 4.2))
      : goal;
    self.started = true;

    const { pose } = stage;
    samplePose(track, stage.t, pose);

    const drift = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    const ease = 1 - Math.exp(-dt * 2.4);
    self.px += (pointer.x + drift - self.px) * ease;
    self.py += (pointer.y - self.py) * ease;

    // Parallax: o cursor desloca a câmera alguns graus em volta do globo.
    const camera = state.camera as PerspectiveCamera;
    latLonToVector3(
      pose.cam[0] + self.py * 1.6,
      pose.cam[1] - self.px * 2.4,
      pose.cam[2],
      camera.position,
    );
    camera.lookAt(
      latLonToVector3(pose.look[0], pose.look[1], pose.look[2], target),
    );

    // Desloca o quadro na tela sem girar a câmera: o globo abre espaço
    // para o cartão de texto.
    const { width, height } = state.size;
    camera.setViewOffset(
      width,
      height,
      -pose.shift[0] * width,
      -pose.shift[1] * height,
      width,
      height,
    );
  }, -1);

  return null;
}
