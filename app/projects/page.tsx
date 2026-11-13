import Link from "next/link";
import styles from "./page.module.css";

const projects = [
  {
    number: "01",
    name: "Scripture Agents",
    category: "AI / Scripture study",
    description:
      "An expanding collection of tradition-specific agents for exploring scripture, asking questions, and studying religious texts. Choose from Christian, Jewish, Muslim, and Buddhist perspectives.",
    release: "11/13/2026",
    href: "/Agents",
    action: "OPEN AGENT",
  },
  {
    number: "02",
    name: "Medical Translation App",
    category: "EN-ES Interpretation",
    description:
      "Application to faciliate English-Spanish medical interpretation, with a focus on patient-provider communication and accurate translation of medical terminology. Along with privacy and security features to protect sensitive health information.",
    release: "11/13/2026",
    href: "https://github.com/camilogomez17/medical-transcription-app.git",
    action: "OPEN REPO",
  },
  {
    number: "03",
    name: "Noise Gate App",
    category: "Microphone Noise Reduction",
    description:
      "An application that uses a noise gate algorithm to reduce background noise in real-time audio input, improving the clarity of microphone recordings.",
    release: "11/13/2026",
    href: "https://github.com/camilogomez17/noise_gate_mac.git",
    action: "OPEN APP",
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
                  <span className="project-release">{project.release}</span>
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
