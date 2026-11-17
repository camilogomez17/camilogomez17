"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import styles from "./page.module.css";
import GlitchCharacter from "../../components/GlitchCharacter";

const projects = [
  { name: "Portfolio", href: "https://www.c6m1lo.com" },
  { name: "Python Agent", href: "https://m6spxjeqt2hf.run.agentplace.io" },
];

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>[]{}?/\\|";

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [rendered, setRendered] = useState<{ value: string; settled: boolean }[]>([]);

  useEffect(() => {
    let cancelled = false;
    const pause = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    async function animate() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setRendered(Array.from(text, (value) => ({ value, settled: true })));
        return;
      }

      await pause(delay);
      let output: { value: string; settled: boolean }[] = [];

      for (const character of text) {
        if (cancelled) return;
        if (character === " ") {
          output = [...output, { value: character, settled: true }];
          setRendered(output);
          continue;
        }

        const changes = 2 + Math.floor(Math.random() * 6);
        for (let i = 0; i < changes; i += 1) {
          if (cancelled) return;
          const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          setRendered([...output, { value: glyph, settled: false }]);
          await pause(24 + Math.floor(Math.random() * 34));
        }

        output = [...output, { value: character, settled: true }];
        setRendered(output);
        await pause(34);
      }
    }

    animate();
    return () => { cancelled = true; };
  }, [text, delay]);

  return (
    <span aria-hidden="true">
      {rendered.map((character, index) => (
        <span
          className={`${styles.scrambleCharacter} ${character.settled ? styles.settled : ""}`}
          key={index}
        >
          <GlitchCharacter character={character.value} />
        </span>
      ))}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="projects-title">
        <h1 id="projects-title" className={styles.heading}>
          <span className={styles.screenReaderOnly}>PROJECTS</span>
          <ScrambleText text="PROJECTS" delay={220} />
        </h1>
        <nav className={styles.projectList} aria-label="Projects">
          {projects.map((project, index) => (
            <Link
              className={styles.projectLink}
              href={project.href}
              key={project.name}
              target="_blank"
              rel="noreferrer"
              aria-label={project.name}
              style={{ "--cascade-index": index } as CSSProperties & { "--cascade-index": number }}
            >
              <ScrambleText text={project.name} delay={1050 + index * 520} />
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
