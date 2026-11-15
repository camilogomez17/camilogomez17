"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import styles from "./page.module.css";

const projects = [
  { name: "Medical Translation App", href: "https://github.com/camilogomez17/medical-transcription-app.git" },
  { name: "Noise Gate App", href: "https://github.com/camilogomez17/noise_gate_mac.git" },
  { name: "Agent Place", href: "https://c3rvkpmmirwh.run.agentplace.io" },
  { name: "Python Crunch", href: "https://m6spxjeqt2hf.run.agentplace.io" },
];

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>[]{}?/\\|";

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [rendered, setRendered] = useState("");
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const pause = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    async function animate() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setRendered(text);
        setSettled(true);
        return;
      }

      await pause(delay);
      let output = "";

      for (const character of text) {
        if (cancelled) return;
        if (character === " ") {
          output += character;
          setRendered(output);
          continue;
        }

        const changes = 2 + Math.floor(Math.random() * 6);
        for (let i = 0; i < changes; i += 1) {
          if (cancelled) return;
          const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          setRendered(output + glyph);
          await pause(24 + Math.floor(Math.random() * 34));
        }

        output += character;
        setRendered(output);
        await pause(34);
      }

      if (!cancelled) setSettled(true);
    }

    animate();
    return () => { cancelled = true; };
  }, [text, delay]);

  return <span className={`${styles.scrambleText} ${settled ? styles.settled : ""}`} aria-hidden="true">{rendered}</span>;
}

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby="projects-title">
        <h1 id="projects-title" className={styles.heading}>
          <span className={styles.screenReaderOnly}>PROJECTS</span>
          <ScrambleText text="PROJECT" delay={220} />
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
