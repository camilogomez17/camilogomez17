import Link from "next/link";
import styles from "./page.module.css";

const projects = [
  {
    number: "01",
    name: "Medical Translation App",
    category: "EN-ES INTERPRETATION",
    description:
      "Application to facilitate English-Spanish medical interpretation, focused on patient-provider communication, accurate medical terminology, and privacy-conscious handling of sensitive health information.",
    release: "11/13/2026",
    href: "https://github.com/camilogomez17/medical-transcription-app.git",
    action: "OPEN REPOSITORY",
    type: "SOURCE",
  },
  {
    number: "02",
    name: "Noise Gate App",
    category: "AUDIO / SIGNAL PROCESSING",
    description:
      "Real-time noise gate for microphone input, reducing background noise and improving recording clarity.",
    release: "11/13/2026",
    href: "https://github.com/camilogomez17/noise_gate_mac.git",
    action: "OPEN REPOSITORY",
    type: "SOURCE",
  },
  {
    number: "03",
    name: "Agent Place",
    category: "AI / SCRIPTURE AGENT",
    description:
      "An interactive Bible study experience powered by an AI agent.",
    release: "11/13/2026",
    href: "https://c3rvkpmmirwh.run.agentplace.io",
    action: "LAUNCH AGENT",
    type: "LIVE",
  },
  {
    number: "04",
    name: "Python Crunch",
    category: "PYTHON / LEARNING SYSTEM",
    description:
      "An interactive environment designed to drill Python concepts through focused practice.",
    release: "11/13/2026",
    href: "https://m6spxjeqt2hf.run.agentplace.io",
    action: "LAUNCH AGENT",
    type: "LIVE",
  },
];

export const metadata = {
  title: "Projects // Netrunner Archive",
  description: "Software projects and experiments by Camilo Gomez Valencia.",
};

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <div className="netrunner-shell">
        <div className="system-bar">
          <span className="system-brand"><i /> CAMILO.OS</span>
          <span className="system-center">PERSONAL NETWORK // PROJECT DIRECTORY</span>
          <span className="system-state"><i /> SYSTEM ONLINE</span>
        </div>

        <header className="deck-header">
          <div className="deck-kicker"><span>NC-17</span> / NET ARCHIVE / 2026</div>
          <div className="deck-title-row">
            <div>
              <p className="deck-overline">INDEPENDENT DEVELOPMENT // SELECTED WORK</p>
              <h1>PROJECT<span>_</span>INDEX</h1>
              <p className="deck-description">
                Software, experiments, and tools built to solve problems.
                Select a file to access its repository or live deployment.
              </p>
            </div>
            <div className="deck-readout" aria-label="Project count">
              <span className="readout-label">FILES INDEXED</span>
              <strong>{String(projects.length).padStart(2, "0")}</strong>
              <span className="readout-foot">ACTIVE DIRECTORY</span>
            </div>
          </div>
          <div className="deck-rule"><span>DIRECTORY CONTENTS</span><span>AUTH: PUBLIC</span></div>
        </header>

        <section className="projects-list" aria-label="Project directory">
          {projects.map((project) => {
            const external = project.href.startsWith("http");
            const content = (
              <>
                <div className="project-index">
                  <span>FILE</span>
                  <strong>{project.number}</strong>
                </div>
                <div className="project-main">
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span className="project-release">{project.release}</span>
                  </div>
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>
                  <span className="project-action">{project.action} <b aria-hidden="true">↗</b></span>
                </div>
                <div className="project-status">
                  <span className={project.type === "LIVE" ? "status-light live" : "status-light"} />
                  <span>{project.type}</span>
                </div>
              </>
            );

            return external ? (
              <a
                className="project-row"
                href={project.href}
                key={project.number}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} — ${project.action}`}
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
          <span>END OF DIRECTORY <b>{"///"}</b> MORE FILES IN DEVELOPMENT</span>
          <a href="https://github.com/camilogomez17" target="_blank" rel="noreferrer">
            GITHUB NODE ↗
          </a>
        </footer>
        <div className="system-footer">
          <span>CAMILO.OS // BUILD 2026.11</span>
          <span>CONNECTION ENCRYPTED <i /></span>
        </div>
      </div>
    </div>
  );
}
