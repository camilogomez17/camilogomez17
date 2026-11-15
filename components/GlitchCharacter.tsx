"use client";

import { useEffect, useState } from "react";

const GLITCH_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>[]{}?/\\|";

type GlitchCharacterProps = {
  character: string;
};

export default function GlitchCharacter({ character }: GlitchCharacterProps) {
  const [glitch, setGlitch] = useState<{ value: string; phase: "green" | "white" } | null>(null);

  useEffect(() => {
    if (character === " " || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let startTimer: number | undefined;
    let phaseTimer: number | undefined;
    let resetTimer: number | undefined;

    const schedule = () => {
      startTimer = window.setTimeout(() => {
        if (cancelled) return;
        // Keep the effect occasional rather than turning the text into continuous noise.
        if (Math.random() < 0.32) {
          const value = Array.from({ length: 4 }, () =>
            GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)]
          ).join("");
          setGlitch({ value, phase: "green" });
          phaseTimer = window.setTimeout(() => {
            if (!cancelled) setGlitch({ value, phase: "white" });
          }, 170);
          resetTimer = window.setTimeout(() => {
            if (cancelled) return;
            setGlitch(null);
            schedule();
          }, 390);
        } else {
          schedule();
        }
      }, 5000 + Math.floor(Math.random() * 9000));
    };

    schedule();
    return () => {
      cancelled = true;
      if (startTimer !== undefined) window.clearTimeout(startTimer);
      if (phaseTimer !== undefined) window.clearTimeout(phaseTimer);
      if (resetTimer !== undefined) window.clearTimeout(resetTimer);
    };
  }, [character]);

  return (
    <span className="glitch-character">
      <span className={glitch ? "glitch-original is-hidden" : "glitch-original"}>{character}</span>
      {glitch && (
        <span className={`glitch-replacement glitch-${glitch.phase}`} aria-hidden="true">
          {glitch.value}
        </span>
      )}
    </span>
  );
}
