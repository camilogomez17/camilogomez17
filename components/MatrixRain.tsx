"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let columns: number[] = [];
    let animationFrame = 0;
    const fontSize = 16;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Array.from({ length: Math.ceil(width / fontSize) }, () =>
        Math.random() * (height / fontSize)
      );
      context.fillStyle = "#020704";
      context.fillRect(0, 0, width, height);
    };

    const draw = () => {
      context.fillStyle = "rgba(2, 7, 4, 0.075)";
      context.fillRect(0, 0, width, height);
      context.font = `${fontSize}px "JetBrains Mono", monospace`;

      columns.forEach((position, index) => {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = index * fontSize;
        const y = position * fontSize;
        const isHead = Math.random() > 0.975;
        context.fillStyle = isHead ? "#d8ffe0" : "rgba(40, 220, 105, 0.72)";
        context.fillText(glyph, x, y);

        if (y > height && Math.random() > 0.975) {
          columns[index] = 0;
        } else {
          columns[index] += 0.35 + Math.random() * 0.55;
        }
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    if (!reducedMotion) draw();
    else {
      context.fillStyle = "rgba(2, 7, 4, 0.92)";
      context.fillRect(0, 0, width, height);
      context.font = `${fontSize}px "JetBrains Mono", monospace`;
      context.fillStyle = "rgba(40, 220, 105, 0.6)";
      columns.forEach((position, index) => {
        context.fillText(
          GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          index * fontSize,
          (position % Math.max(1, height / fontSize)) * fontSize
        );
      });
    }

    window.addEventListener("resize", resize);
    if (reducedMotion) window.removeEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="matrix-home" aria-label="Animated falling green Matrix code">
      <canvas ref={canvasRef} className="matrix-canvas" aria-hidden="true" />
      <div className="matrix-vignette" aria-hidden="true" />
    </div>
  );
}
