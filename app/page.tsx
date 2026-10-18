const links = [
  { label: "GITHUB", href: "https://github.com/camilogomez17" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/camilogomezvalencia" },
  { label: "EMAIL", href: "mailto:c6m1lo@proton.me" },
];

const skills = [
  { label: "Frontend", value: "TypeScript · React · Next.js" },
  { label: "Web", value: "JavaScript · HTML · CSS" },
  { label: "Backend", value: "Python · learning" },
  { label: "Tools", value: "Git · Linux · Vercel · AWS" },
];

const frontendMilestones = ["UI", "STATE", "ROUTING", "DEPLOY"];
const backendMilestones = ["PYTHON", "API", "DATABASE", "AUTH"];

export const metadata = {
  title: "Camilo Valencia — Software Engineer",
  description:
    "Resume and engineering progress for Camilo Valencia. Frontend roadmap complete; backend development underway.",
};

function MilestoneTrack({
  title,
  items,
  completed,
}: {
  title: string;
  items: string[];
  completed: number;
}) {
  return (
    <div className="sim-track">
      <div className="sim-track-heading">
        <span>{title}</span>
        <span>{completed}/{items.length}</span>
      </div>
      <div className="sim-track-bars" aria-label={`${title}: ${completed} of ${items.length} stages`}>
        {items.map((item, index) => (
          <div className="sim-track-step" key={item}>
            <span className={index < completed ? "sim-track-fill is-done" : "sim-track-fill"} />
            <small>{item}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="sim-page">
      <header className="sim-topline">
        <span><i className="sim-live-dot" /> PERSONAL SYSTEM / 001</span>
        <span>NYC · 2026</span>
      </header>

      <section className="sim-resume" aria-labelledby="resume-name">
        <p className="sim-kicker">RESUME / SOFTWARE ENGINEERING</p>
        <h1 id="resume-name">Camilo<br /><span>Valencia</span></h1>
        <div className="sim-intro">
          <p>Frontend engineer in training.</p>
          <p>Frontend roadmap complete. Backend now in progress.</p>
        </div>
        <nav className="sim-links" aria-label="Contact links">
          {links.map((link) => (
            <a key={link.label} href={link.href} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}>
              {link.label}<span aria-hidden="true"> ↗</span>
            </a>
          ))}
        </nav>

        <div className="sim-rule" />
        <div className="sim-resume-grid">
          <section className="sim-block" aria-labelledby="education-title">
            <p className="sim-label" id="education-title">EDUCATION</p>
            <h2>Marcy Labs</h2>
            <p>Software Engineering Fellowship</p>
            <p className="sim-muted">2026—2027</p>
          </section>
          <section className="sim-block" aria-labelledby="stack-title">
            <p className="sim-label" id="stack-title">STACK</p>
            {skills.map((skill) => (
              <div className="sim-skill-row" key={skill.label}>
                <span>{skill.label}</span><span>{skill.value}</span>
              </div>
            ))}
          </section>
        </div>

        <div className="sim-rule" />
        <section className="sim-project" aria-labelledby="project-title">
          <div className="sim-project-head">
            <p className="sim-label">SELECTED PROJECT / 001</p>
            <span className="sim-muted">LIVE BUILD</span>
          </div>
          <h2 id="project-title">Habit Analytics</h2>
          <p>Log sessions. Filter activity. Export JSON.</p>
          <p className="sim-muted">NEXT.JS / REACT / TYPESCRIPT / LOCAL STORAGE</p>
          <div className="sim-links">
            <a href="/habitAnalytics">OPEN PROJECT ↗</a>
            <a href="https://github.com/camilogomez17/camilogomez17" target="_blank" rel="noreferrer">SOURCE ↗</a>
          </div>
        </section>
      </section>

      <section className="sim-console" aria-labelledby="telemetry-title">
        <div className="sim-console-head">
          <div>
            <p className="sim-kicker">LIVE SELF-ASSESSMENT / 002</p>
            <h2 id="telemetry-title">Development telemetry<span className="sim-cursor">_</span></h2>
          </div>
          <span className="sim-muted">ROADMAP STATUS</span>
        </div>

        <div className="sim-metrics">
          <div className="sim-metric">
            <span className="sim-label">FRONTEND</span>
            <strong>COMPLETE</strong>
            <span className="sim-muted">Roadmap finished</span>
            <div className="sim-meter" role="img" aria-label="Frontend roadmap complete">
              <span style={{ width: "100%" }} />
            </div>
          </div>
          <div className="sim-metric">
            <span className="sim-label">BACKEND</span>
            <strong>INITIALIZING</strong>
            <span className="sim-muted">Python foundations</span>
            <div className="sim-meter" role="img" aria-label="Backend learning has started">
              <span style={{ width: "25%" }} />
            </div>
          </div>
        </div>

        <div className="sim-tracks">
          <MilestoneTrack title="FRONTEND ROADMAP" items={frontendMilestones} completed={4} />
          <MilestoneTrack title="BACKEND ROADMAP" items={backendMilestones} completed={1} />
        </div>

        <div className="sim-log">
          <p className="sim-label">SYSTEM LOG</p>
          <p><span>01</span> UI / STATE / ROUTING / DEPLOY — COMPLETE</p>
          <p><span>02</span> PYTHON — STARTED</p>
          <p><span>03</span> APIs / DATABASES / AUTH — NEXT</p>
        </div>
      </section>

      <footer className="sim-footer">
        <span>CAMilo VALENCIA / PORTFOLIO</span>
        <span>BUILDING IN PUBLIC <i className="sim-live-dot" /></span>
      </footer>
    </main>
  );
}
