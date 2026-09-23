"use client";

import { Delaunay } from "d3-delaunay";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  intensity: number;
  targetIntensity: number;
  isText: boolean;
}

// Configurações gerais
const WORDS = [
  "Node.js",
  "React.js",
  "Next.js",
  "JS / TS",
];
const LERP_FACTOR = 0.07;
const PARTICLE_COUNT = 3000;

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const pointsRef = useRef<Point[]>([]);
  const currentWordIndexRef = useRef(0);

  /* Efeito principal: inicializa canvas, pontos, render loop e listeners */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    /* Ajuste de tamanho do canvas e (re)inicialização dos alvos */
    const setCanvasSize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      initPoints();
      generateTargetSeeds(WORDS[currentWordIndexRef.current]);
    };

    /* Inicializa partículas com posições e estados randômicos */
    const initPoints = () => {
      pointsRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        intensity: 0,
        targetIntensity: 0,
        isText: false,
      }));
    };

    /* Gera alvos das partículas a partir do texto desenhado em canvas offscreen */
    const generateTargetSeeds = (text: string) => {
      const offscreenCanvas = document.createElement("canvas");
      const offCtx = offscreenCanvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (!offCtx) return;

      offscreenCanvas.width = width;
      offscreenCanvas.height = height;

      offCtx.fillStyle = "black";
      offCtx.fillRect(0, 0, width, height);

      const fontSize = Math.min(width / 5, 200);
      offCtx.font = `bold ${fontSize}px Inter, system-ui, sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillStyle = "white";
      offCtx.fillText(text, width / 2, height / 2);

      const imageData = offCtx.getImageData(0, 0, width, height).data;
      const validPixels: { x: number; y: number }[] = [];

      for (let y = 0; y < height; y += 3) {
        for (let x = 0; x < width; x += 3) {
          const index = (y * width + x) * 4;
          if (imageData[index] > 128) {
            validPixels.push({ x, y });
          }
        }
      }

      const shuffledPixels = validPixels.sort(() => Math.random() - 0.5);
      const textParticleCount = Math.floor(PARTICLE_COUNT * 0.85);

      const targets: { x: number; y: number; isText: boolean }[] = [];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        if (i < textParticleCount && i < shuffledPixels.length) {
          targets.push({
            x: shuffledPixels[i].x,
            y: shuffledPixels[i].y,
            isText: true,
          });
        } else {
          targets.push({
            x: Math.random() * width,
            y: Math.random() * height,
            isText: false,
          });
        }
      }

      targets.sort(() => Math.random() - 0.5);

      pointsRef.current.forEach((point, i) => {
        if (targets[i]) {
          point.targetX = targets[i].x;
          point.targetY = targets[i].y;
          point.targetIntensity = targets[i].isText ? 1 : 0;
          point.isText = targets[i].isText;
        }
      });
    };

    /* Loop de renderização: limpa canvas, atualiza partículas, desenha malha e pontos */
    const render = () => {
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, width, height);

      const points = pointsRef.current;
      const flatPoints = new Float64Array(points.length * 2);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        const driftX = !p.isText ? Math.sin(Date.now() * 0.001 + i) * 0.5 : 0;
        const driftY = !p.isText ? Math.cos(Date.now() * 0.001 + i) * 0.5 : 0;

        p.x += (p.targetX - p.x) * LERP_FACTOR + driftX;
        p.y += (p.targetY - p.y) * LERP_FACTOR + driftY;
        p.intensity += (p.targetIntensity - p.intensity) * LERP_FACTOR;

        flatPoints[i * 2] = p.x;
        flatPoints[i * 2 + 1] = p.y;
      }

      const delaunay = new Delaunay(flatPoints);
      const voronoi = delaunay.voronoi([0, 0, width, height]);

      ctx.beginPath();
      voronoi.render(ctx);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        if (p.intensity > 0.05) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${p.intensity})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
          ctx.fill();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    /* Rotação de palavras exibidas e geração de novos alvos */
    const wordInterval = setInterval(() => {
      currentWordIndexRef.current =
        (currentWordIndexRef.current + 1) % WORDS.length;
      generateTargetSeeds(WORDS[currentWordIndexRef.current]);
    }, 4500);

    window.addEventListener("resize", setCanvasSize);
    setCanvasSize();
    render();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      clearInterval(wordInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen min-h-150 w-full items-center overflow-hidden bg-background"
    >
      {/* Seção: Canvas de fundo */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
        style={{ pointerEvents: "none" }}
      />

      {/* Content Container */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between px-6 md:flex-row md:px-12">
        {/* Seção: Conteúdo principal (lado esquerdo) */}
        <motion.div
          className="pointer-events-auto flex w-full flex-col space-y-6 md:w-1/2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* Espaço reservado para tipografia e resumo (desativado) */}
        </motion.div>

        {/* Seção: Espaço à direita (visível em md+) */}
        <div className="hidden h-full w-1/2 md:block" />
      </div>

      {/* Seção: Indicador de rolagem inferior */}
      <motion.div
        className="pointer-events-none absolute bottom-8 left-0 flex w-full justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-2 text-sm text-zinc-500">
          <span>Scroll</span>
          <div className="relative h-8 w-px overflow-hidden bg-zinc-800">
            <motion.div
              className="absolute top-0 h-1/2 w-full bg-zinc-400"
              animate={{ y: [0, 32] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
