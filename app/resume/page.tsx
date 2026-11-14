"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "GITHUB", href: "https://github.com/camilogomez17" },
  { label: "EMAIL", href: "mailto:c6m1l00@gmail.com" },
];

const skills = [
  { label: "Frontend", value: "HTML · CSS · JavaScript · TypeScript · React · Next.js" },
  { label: "Backend", value: "Node.js · Express · Python · REST/FAST API · PostgreSQL" },
  { label: "Services", value: "Vercel · AWS · OAuth · Stripe" },
  { label: "Tools", value: "VS Code · Git · GitHub · Quality assurance" },
  { label: "Languages", value: "English · Spanish" },
  { label: "Systems", value: "Linux · Windows · macOS" },
];

const experience = [
  { role: "Certified Medical Interpreter", company: "Propio Language Services", dates: "August 2024 — Present" },
  { role: "Spanish Data Annotation Specialist", company: "Uber AI Solutions", dates: "February 2026 — August 2026" },
  { role: "Cook", company: "KPOT", dates: "October 2025 — December 2025" },
  { role: "Clinical NLP Annotation Specialist", company: "Centific", dates: "June 2025 — August 2025" },
  { role: "Legal Interpreter", company: "Kate Nussman Ellis Farhi & Earle, LLP", dates: "January 2024 - July 2024" },
  { role: "Certified Medical Interpreter", company: "Kelly Services", dates: "January 2023 — July 2024" },
  { role: "Barista", company: "Gongcha Taiwan", dates: "June 2022 - August 2022" },
  { role: "Cook", company: "Chipotle", dates: "August 2019 — December 2021" },
];

export const metadata = {
  title: "Resume — Juan Camilo Gomez Valencia",
  description:
    "Resume of Juan Camilo Gomez Valencia, software engineering fellow at Marcy Labs, with experience in frontend development, bilingual interpretation, and AI data annotation.",
};

function TypedText({ children, className }) {
  const text = String(children ?? "");
  const [visibleCount, setVisibleCount] = useState(0);
  const [wordsPerMinute] = useState(() => 70 + Math.floor(Math.random() * 31));

  useEffect(() => {
    setVisibleCount(0);
    let index = 0;
    let timeoutId;

    const typeNextCharacter = () => {
      index += 1;
      setVisibleCount(index);

      if (index < text.length) {
        // A typing WPM convention treats one word as five characters.
        timeoutId = window.setTimeout(typeNextCharacter, 12000 / wordsPerMinute);
      }
    };

    if (text.length > 0) {
      timeoutId = window.setTimeout(typeNextCharacter, 12000 / wordsPerMinute);
    }

    return () => window.clearTimeout(timeoutId);
  }, [text, wordsPerMinute]);

  return (
    <span className={className} aria-label={text}>
      {text.slice(0, visibleCount)}
      <span className="sr-only">{text.slice(visibleCount)}</span>
    </span>
  );
}

export default function ResumePage() {
  return (
    <div className="sim-page">
      <header className="sim-topline">
        <span><i className="sim-live-dot" /> <TypedText>SOFTWARE ENGINEERING / PORTFOLIO</TypedText></span>
        <span><TypedText>NYC · 2026</TypedText></span>
      </header>

      <section className="sim-resume" aria-labelledby="resume-name">
        <p className="sim-kicker"><TypedText>PORTFOLIO / SOFTWARE ENGINEERING</TypedText></p>
        <h1 id="resume-name"><TypedText>Juan Camilo</TypedText><br /><span><TypedText>Gomez Valencia</TypedText></span></h1>
        <div className="sim-intro">
          <p><TypedText>Software engineering fellow at Marcy Labs with experience in front-end development, bilingual medical interpretation, and AI data annotation.</TypedText></p>
          <p><TypedText>English / Spanish</TypedText></p>
        </div>

        <nav className="sim-links" aria-label="Contact links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
              <TypedText>{link.label}</TypedText><span aria-hidden="true"> ↗</span>
            </a>
          ))}
        </nav>

        <div className="sim-rule" />

        <div className="sim-resume-grid">
          <section className="sim-block" aria-labelledby="education-title">
            <p className="sim-label" id="education-title"><TypedText>EDUCATION</TypedText></p>
            <h2><TypedText>Marcy Labs</TypedText></h2>
            <p><TypedText>Software Engineering Fellowship</TypedText></p>
            <p className="sim-muted"><TypedText>September 2026 — Present</TypedText></p>
            <h2><TypedText>Independent Study</TypedText></h2>
            <p><TypedText>Front-End Development</TypedText></p>
          </section>

          <section className="sim-block" aria-labelledby="skills-title">
            <p className="sim-label" id="skills-title"><TypedText>SKILLS</TypedText></p>
            {skills.map((skill) => (
              <div className="sim-skill-row" key={skill.label}>
                <span><TypedText>{skill.label}</TypedText></span>
                <span><TypedText>{skill.value}</TypedText></span>
              </div>
            ))}
          </section>
        </div>

        <div className="sim-rule" />

        <section className="sim-block" aria-labelledby="experience-title">
          <p className="sim-label" id="experience-title"><TypedText>PROFESSIONAL EXPERIENCE</TypedText></p>
          <div className="sim-experience-list">
            {experience.map((item, index) => (
              <article className="sim-experience-row" key={item.company}>
                <span className="sim-experience-index"><TypedText>{String(index + 1).padStart(2, "0")}</TypedText></span>
                <div>
                  <h2><TypedText>{item.role}</TypedText></h2>
                  <p><TypedText>{item.company}</TypedText></p>
                </div>
                <span className="sim-muted sim-experience-dates"><TypedText>{item.dates}</TypedText></span>
              </article>
            ))}
          </div>
        </section>
      </section>

      <footer className="sim-footer">
        <span><TypedText>JUAN CAMILO GOMEZ VALENCIA</TypedText></span>
        <span><TypedText>SOFTWARE ENGINEERING · 2026</TypedText></span>
      </footer>
    </div>
  );
}
