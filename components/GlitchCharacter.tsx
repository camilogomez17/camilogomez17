"use client";

import { useEffect, useState } from "react";

const GLITCH_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>[]{}?/\\|";

type GlitchCharacterProps = {
  character: string;
};

type GlitchState = {
  value: string;
  phase: "green" | "white";
} | null;

export default function GlitchCharacter({ character }: GlitchCharacterProps) {
  const [glitch, setGlitch] = useState<GlitchState>(null);

  useEffect(() => {
    if (character === " " || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let startTimer: number | undefined;
    let sequenceTimer: number | undefined;
    let fadeTimer: number | undefined;
    let resetTimer: number | undefined;

    const randomGlyph = () =>
      GLITCH_GLYPHS[Math.floor(Math.random() * GLITCH_GLYPHS.length)];

    const schedule = () => {
      startTimer = window.setTimeout(() => {
        if (cancelled) return;

        if (Math.random() < 0.002) {
          let step = 0;
          const showNextGlyph = () => {
            if (cancelled) return;
            setGlitch({ value: randomGlyph(), phase: "green" });
            step += 1;

            if (step < 4) {
              sequenceTimer = window.setTimeout(showNextGlyph, 75);
            } else {
              fadeTimer = window.setTimeout(() => {
                if (cancelled) return;
                setGlitch((current) => current ? { ...current, phase: "white" } : null);
                resetTimer = window.setTimeout(() => {
                  if (cancelled) return;
                  setGlitch(null);
                  schedule();
                }, 140);
              }, 75);
            }
          };

          showNextGlyph();
        } else {
          schedule();
        }
      }, 20000 + Math.floor(Math.random() * 40000));
    };

    schedule();
    return () => {
      cancelled = true;
      if (startTimer !== undefined) window.clearTimeout(startTimer);
      if (sequenceTimer !== undefined) window.clearTimeout(sequenceTimer);
      if (fadeTimer !== undefined) window.clearTimeout(fadeTimer);
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
