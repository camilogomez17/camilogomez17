"use client";

import { useEffect, useState, type ReactNode } from "react";

const links = [
  { label: "GitHub", href: "https://github.com/camilogomez17" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/camilogomezvalencia/" },
  { label: "Email", href: "mailto:c6m1lo@proton.me" },
];

const skills = [
  { label: "Frontend", value: "HTML, CSS, JavaScript, TypeScript, React, Next.js" },
  { label: "Backend", value: "Node.js, Express, Python, REST APIs, FastAPI, PostgreSQL" },
  { label: "Cloud & services", value: "Vercel, AWS, OAuth, Stripe" },
  { label: "Tools", value: "VS Code, Git, GitHub, Quality Assurance" },
  { label: "Languages", value: "English, Spanish" },
  { label: "Operating systems", value: "Linux, Windows, macOS" },
];

const experience = [
  { role: "Certified Medical Interpreter", company: "Propio Language Services", dates: "August 2024 – Present" },
  { role: "Spanish Data Annotation Specialist", company: "Uber AI Solutions", dates: "February 2026 – August 2026" },
  { role: "Cook", company: "KPOT", dates: "October 2025 – December 2025" },
  { role: "Clinical NLP Annotation Specialist", company: "Centific", dates: "June 2025 – August 2025" },
  { role: "Legal Interpreter", company: "Kate Nussman Ellis Farhi & Earle, LLP", dates: "January 2024 – July 2024" },
  { role: "Certified Medical Interpreter", company: "Kelly Services", dates: "January 2023 – July 2024" },
  { role: "Barista", company: "Gongcha Taiwan", dates: "June 2022 – August 2022" },
  { role: "Cook", company: "Chipotle", dates: "August 2019 – December 2021" },
];

type TypedTextProps = {
  children: ReactNode;
  className?: string;
};

function TypedText({ children, className }: TypedTextProps) {
  const text = String(children ?? "");
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
      {text.slice(0, visibleCount)}
      <span className="sr-only">{text.slice(visibleCount)}</span>
    </span>
  );
}

export default function TypedResume() {
  return (
    <main className="professional-resume" aria-label="Professional resume">
      <header className="professional-resume-header">
        <h1><TypedText>Juan Camilo Gomez Valencia</TypedText></h1>
        <p className="professional-resume-headline"><TypedText>Software Engineering Fellow</TypedText></p>
        <div className="professional-resume-contact" aria-label="Contact information">
          <span><TypedText>New York, NY</TypedText></span>
          <a href="mailto:c6m1l00@gmail.com"><TypedText>c6m1l00@gmail.com</TypedText></a>
          <a href="https://github.com/camilogomez17" target="_blank" rel="noreferrer"><TypedText>github.com/camilogomez17</TypedText></a>
        </div>
      </header>

      <section className="professional-resume-section" aria-labelledby="professional-summary">
        <h2 id="professional-summary"><TypedText>Professional Summary</TypedText></h2>
        <p><TypedText>Software engineering fellow at Marcy Labs with a foundation in front-end development and experience in bilingual medical and legal interpretation, as well as AI data annotation. Building practical skills in modern web development, backend technologies, and software delivery.</TypedText></p>
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

      <footer className="professional-resume-footer">
        <span><TypedText>Juan Camilo Gomez Valencia</TypedText></span>
        <nav aria-label="Professional links">
          {links.map((link) => (
            <a key={link.label} href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}>
              <TypedText>{link.label}</TypedText>
            </a>
          ))}
        </nav>
      </footer>
    </main>
  );
}
