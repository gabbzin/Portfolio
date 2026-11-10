import { useEffect, useState } from "react";
import { vector3ToLatLon } from "@/lib/geo";

const MASK_URL = "/globe/land-mask.png";
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * Distribui `candidates` pontos de forma uniforme na esfera (espiral de
 * Fibonacci) e fica só com os que caem em terra na máscara de continentes.
 * Devolve as posições [x, y, z, x, y, z, ...] ou `null` enquanto carrega.
 */
export function useLandPoints(candidates: number) {
  const [points, setPoints] = useState<Float32Array | null>(null);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();

    image.onload = () => {
      if (cancelled) return;

      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;

      context.drawImage(image, 0, 0);
      const { data, width, height } = context.getImageData(
        0,
        0,
        image.width,
        image.height,
      );

      const land: number[] = [];
      for (let i = 0; i < candidates; i++) {
        const y = 1 - (2 * (i + 0.5)) / candidates;
        const radius = Math.sqrt(1 - y * y);
        const x = Math.cos(i * GOLDEN_ANGLE) * radius;
        const z = Math.sin(i * GOLDEN_ANGLE) * radius;

        const [lat, lon] = vector3ToLatLon(x, y, z);
        const u = Math.min(width - 1, Math.floor(((lon + 180) / 360) * width));
        const v = Math.min(height - 1, Math.floor(((90 - lat) / 180) * height));

        if (data[(v * width + u) * 4] > 127) land.push(x, y, z);
      }

      setPoints(new Float32Array(land));
    };

    image.src = MASK_URL;
    return () => {
      cancelled = true;
    };
  }, [candidates]);

  return points;
}
