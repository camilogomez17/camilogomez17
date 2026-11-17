"use client";

import { useEffect, useState } from "react";
import GlitchCharacter from "./GlitchCharacter";

const skills = [
  { label: "Frontend", value: "HTML, CSS, JavaScript, TypeScript, React, Next.js" },
  { label: "Backend", value: "Node.js, Express, Python," },
  { label: "Cloud & services", value: "Vercel, OAuth, Stripe, AWS" },
  { label: "Tools", value: "VS Code, Git, GitHub, Quality Assurance" },
  { label: "Operating systems", value: "Linux, Windows, macOS" },
  { label: "Languages", value: "English, Spanish" },
];

const experience = [
  { role: "Spanish Data Annotation Specialist", company: "Uber AI Solutions", dates: "February 2026 – August 2026" },
  { role: "Clinical NLP Annotation Specialist", company: "Centific", dates: "June 2025 – August 2025" },
];

type TypedTextProps = {
  children: string;
  className?: string;
};

function TypedText({ children, className }: TypedTextProps) {
  const text = children;
  const [visibleCount, setVisibleCount] = useState(0);
  const [wordsPerMinute] = useState(() => 70 + Math.floor(Math.random() * 31));

  useEffect(() => {
    setVisibleCount(0);
    let index = 0;
    let timeoutId: number | undefined;

    const typeNextCharacter = () => {
      index += 1;
      setVisibleCount(index);
      if (index < text.length) {
        timeoutId = window.setTimeout(typeNextCharacter, 12000 / wordsPerMinute);
      }
    };

    if (text.length > 0) {
      timeoutId = window.setTimeout(typeNextCharacter, 12000 / wordsPerMinute);
    }

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [text, wordsPerMinute]);

  return (
    <span className={className} aria-label={text}>
      {Array.from(text.slice(0, visibleCount)).map((character, index) => (
        <GlitchCharacter character={character} key={`${index}-${character}`} />
      ))}
      <span className="sr-only">{text.slice(visibleCount)}</span>
    </span>
  );
}

export default function TypedResume() {
  return (
    <main className="professional-resume" aria-label="Professional resume">
      <header className="professional-resume-header">
        <h1><TypedText>Camilo Gomez</TypedText></h1>
        <p className="professional-resume-headline"><TypedText>Software Engineering Fellow</TypedText></p>
        <div className="professional-resume-contact" aria-label="Contact information">
          <span><TypedText>New York, NY</TypedText></span>
          <a href="mailto:jgomezval@icloud.com"><TypedText>Email</TypedText></a>
          <a href="https://github.com/camilogomez17" target="_blank" rel="noreferrer"><TypedText>GitHub</TypedText></a>
          <a href="https://www.linkedin.com/in/camilogomezvalencia" target="_blank" rel="noreferrer"><TypedText>LinkedIn</TypedText></a>
        </div>
      </header>

      <section className="professional-resume-section" aria-labelledby="professional-summary">
        <h2 id="professional-summary"><TypedText>Professional Summary</TypedText></h2>
        <p><TypedText>Software engineering fellow at Marcy Labs, with a background in front-end development with React and TypeScript, as well as LLM agents.</TypedText></p>
      </section>

      <section className="professional-resume-section" aria-labelledby="professional-experience">
        <h2 id="professional-experience"><TypedText>Professional Experience</TypedText></h2>
        <div className="professional-resume-entries">
          {experience.map((item) => (
            <article className="professional-resume-entry" key={item.company}>
              <div className="professional-resume-entry-heading">
                <h3><TypedText>{item.role}</TypedText></h3>
                <span className="professional-resume-dates"><TypedText>{item.dates}</TypedText></span>
              </div>
              <p className="professional-resume-company"><TypedText>{item.company}</TypedText></p>
            </article>
          ))}
        </div>
      </section>

      <section className="professional-resume-section" aria-labelledby="professional-education">
        <h2 id="professional-education"><TypedText>Education</TypedText></h2>
        <article className="professional-resume-entry">
          <div className="professional-resume-entry-heading">
            <h3><TypedText>Marcy Labs</TypedText></h3>
            <span className="professional-resume-dates"><TypedText>September 2026 – Present</TypedText></span>
          </div>
          <p className="professional-resume-company"><TypedText>Software Engineering Fellowship</TypedText></p>
        </article>
      </section>

      <section className="professional-resume-section" aria-labelledby="professional-skills">
        <h2 id="professional-skills"><TypedText>Technical Skills</TypedText></h2>
        <dl className="professional-resume-skills">
          {skills.map((skill) => (
            <div className="professional-resume-skill" key={skill.label}>
              <dt><TypedText>{skill.label}</TypedText></dt>
              <dd><TypedText>{skill.value}</TypedText></dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
