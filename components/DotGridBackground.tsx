"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const SPACING = 28;
const RADIUS = 140;

export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pointer = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let frame = 0;

    const draw = () => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = getComputedStyle(canvas).color;

      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          const near = Math.max(
            0,
            1 - Math.hypot(x - pointer.x, y - pointer.y) / RADIUS,
          );
          ctx.globalAlpha = 0.18 + near * 0.7;
          ctx.beginPath();
          ctx.arc(x, y, 1 + near * 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      schedule();
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    // biome-ignore lint/a11y/noAriaHiddenOnFocusable: canvas decorativo, não é focável
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-highlight"
    />
  );
}
