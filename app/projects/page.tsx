"use client";

import Link from "next/link";

const projects = [
  {
    number: "01",
    name: "Bible Agent",
    category: "AI / Scripture study",
    description:
      "An embedded conversational agent for exploring Scripture, asking questions, and studying biblical themes.",
    status: "IN DEVELOPMENT",
    href: "/bible-agent",
    action: "OPEN AGENT",
  },
  {
    number: "02",
    name: "Study.py",
    category: "Python / Education",
    description:
      "An interactive learning experience designed to make technical concepts easier to practice through structured lessons and questions.",
    status: "PROJECT",
    href: "https://github.com/camilogomez17",
    action: "VIEW GITHUB",
  },
  {
    number: "03",
    name: "Developer Portfolio",
    category: "Next.js / TypeScript",
    description:
      "This site: a personal engineering portfolio built with Next.js, React, and TypeScript.",
    status: "LIVE",
    href: "https://github.com/camilogomez17/camilogomez17",
    action: "VIEW SOURCE",
  },
];

export const metadata = {
  title: "Projects",
  description: "Selected software engineering projects by Camilo Gomez Valencia.",
};

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <header className="page-header">
        <span className="page-kicker">PORTFOLIO / SELECTED WORK</span>
        <h1 className="page-title">Projects</h1>
        <p className="projects-intro">
          Software, experiments, and tools built to solve problems and make
          useful ideas accessible.
        </p>
        <p className="page-counter">{String(projects.length).padStart(2, "0")} PROJECTS</p>
      </header>

      <section className="projects-list" aria-label="Project directory">
        {projects.map((project) => {
          const external = project.href.startsWith("http");
          const content = (
            <>
              <div className="project-number">{project.number}</div>
              <div className="project-main">
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span className="project-status">{project.status}</span>
                </div>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
              </div>
              <span className="project-action">{project.action} <span aria-hidden="true">↗</span></span>
            </>
          );

          return external ? (
            <a
              className="project-row"
              href={project.href}
              key={project.number}
              target="_blank"
              rel="noreferrer"
            >
              {content}
            </a>
          ) : (
            <Link className="project-row" href={project.href} key={project.number}>
              {content}
            </Link>
          );
        })}
      </section>

      <footer className="projects-footnote">
        <span>MORE WORK IN PROGRESS</span>
        <a href="https://github.com/camilogomez17" target="_blank" rel="noreferrer">
          GITHUB PROFILE ↗
        </a>
      </footer>

      <style jsx>{`
        .projects-intro { max-width: 560px; margin-top: 14px; color: var(--text-secondary); line-height: 1.8; }
        .projects-list { display: grid; margin-top: 34px; border-top: 1px solid var(--border-default); }
        .project-row { display: grid; grid-template-columns: 48px minmax(0, 1fr) auto; gap: 18px; align-items: start; padding: 24px 8px; border-bottom: 1px solid var(--border-default); transition: background .2s ease, padding .2s ease; }
        .project-row:hover { background: var(--bg-secondary); padding-inline: 14px; }
        .project-number { color: var(--text-muted); font-size: 11px; padding-top: 3px; }
        .project-meta { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; color: var(--text-muted); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; }
        .project-status { color: var(--text-secondary); border: 1px solid var(--border-default); padding: 2px 7px; }
        .project-main h2 { margin-top: 12px; font-size: 16px; letter-spacing: .02em; }
        .project-main p { max-width: 590px; margin-top: 8px; color: var(--text-secondary); font-size: 12px; line-height: 1.8; }
        .project-action { color: var(--text-secondary); font-size: 10px; letter-spacing: .1em; white-space: nowrap; padding-top: 3px; }
        .project-row:hover .project-action { color: var(--text-primary); }
        .projects-footnote { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 22px; color: var(--text-muted); font-size: 10px; letter-spacing: .1em; }
        .projects-footnote a:hover { color: var(--text-primary); }
        @media (max-width: 620px) { .project-row { grid-template-columns: 28px minmax(0, 1fr); gap: 10px; } .project-action { grid-column: 2; } }
      `}</style>
    </div>
  );
}
