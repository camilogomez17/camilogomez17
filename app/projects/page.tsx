import Link from "next/link";
import styles from "./page.module.css";

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
    <div className={styles.page}>
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

    </div>
  );
}
