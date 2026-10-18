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
          <p>Frontend React.js developer. Python backend.</p>
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
          <p>Visualize habit data with interactive 3D charts.</p>
          <p className="sim-muted">NEXT.JS / REACT / TYPESCRIPT / LOCAL STORAGE</p>
          <div className="sim-links">
            <a href="/habitAnalytics">OPEN PROJECT ↗</a>
            <a href="https://github.com/camilogomez17/camilogomez17" target="_blank" rel="noreferrer">SOURCE ↗</a>
          </div>
        </section>

        <div className="sim-rule" />
        <section className="sim-project" aria-labelledby="study-py-title">
          <div className="sim-project-head">
            <p className="sim-label">SELECTED PROJECT / 002</p>
            <span className="sim-muted">INTERACTIVE PROTOTYPE</span>
          </div>
          <h2 id="study-py-title">study.py</h2>
          <p>Adaptive Python practice that identifies skill gaps and recommends what to learn next.</p>
          <p className="sim-muted">NEXT.JS / REACT / TYPESCRIPT / LOCAL STATE</p>
          <div className="sim-links">
            <a href="/study.py">OPEN PROJECT ↗</a>
            <a href="https://github.com/camilogomez17/camilogomez17" target="_blank" rel="noreferrer">SOURCE ↗</a>
          </div>
        </section>
      </section>
    </main>
  );
}
