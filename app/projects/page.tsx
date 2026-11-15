import Link from "next/link";
import styles from "./page.module.css";

const projects = [
  {
    name: "Medical Translation App",
    href: "https://github.com/camilogomez17/medical-transcription-app.git",
  },
  {
    name: "Noise Gate App",
    href: "https://github.com/camilogomez17/noise_gate_mac.git",
  },
  {
    name: "Agent Place",
    href: "https://c3rvkpmmirwh.run.agentplace.io",
  },
  {
    name: "Python Crunch",
    href: "https://m6spxjeqt2hf.run.agentplace.io",
  },
];

export const metadata = {
  title: "Projects",
  description: "Selected software projects.",
};

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.chapel} aria-hidden="true">
        <div className={styles.vault}>
          <div className={styles.fresco}>
            <span className={styles.frescoHalo} />
            <span className={styles.frescoFigure} />
          </div>
          <div className={styles.vaultRib} />
        </div>

        <div className={styles.architecture}>
          <span className={styles.capital} />
          <span className={styles.column} />
          <span className={styles.base} />
        </div>
        <div className={styles.architectureRight}>
          <span className={styles.capital} />
          <span className={styles.column} />
          <span className={styles.base} />
        </div>
      </div>

      <section className={styles.gallery} aria-labelledby="projects-title">
        <div className={styles.innerFrame}>
          <header className={styles.heading}>
            <span className={styles.ornament} aria-hidden="true">✦</span>
            <h1 id="projects-title">PROJECT</h1>
            <span className={styles.ornament} aria-hidden="true">✦</span>
          </header>

          <nav className={styles.projectList} aria-label="Projects">
            {projects.map((project) => (
              <Link
                className={styles.projectLink}
                href={project.href}
                key={project.name}
                target="_blank"
                rel="noreferrer"
              >
                {project.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
