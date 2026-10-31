const links = [
  { label: "GITHUB", href: "https://github.com/camilogomez17" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/camilogomezvalencia" },
  { label: "EMAIL", href: "mailto:c6m1lo@proton.me" },
];
const skills = [
  { label: "Frontend", value: "HTML · CSS · JavaScript · npm · TypeScript · React · Next.js · Prettier · Electron" },
  { label: "Backend", value: "JavaScript · Node.js · Python · PostgreSQL · REST · OAuth" },
  { label: "DevOps", value: "Bash · Power Shell · Vim / Nano / Emacs · Linux · Docker · AWS" },
  { label: "Version Control", value: "Git · GitHub · Vercel · DNS" },
  { label: "Cybersecurity", value: "IT · Networking · MacOS / Windows / Linux" }
];
export const metadata = {
  title: "Camilo Valencia — Software Engineering Resume",
  description: "Future full-stack software engineering student at Marcy Labs, self taught front-end developer, currently learning Python & back-end.",
};
export default function HomePage() {
  return (
    <main className="sim-page">
      <header className="sim-topline">
        <span><i className="sim-live-dot" /> SOFTWARE ENGINEERING / RESUME</span>
        <span>NYC · 2026</span>
      </header>
      <section className="sim-resume" aria-labelledby="resume-name">
        <p className="sim-kicker">RESUME / SOFTWARE ENGINEERING</p>
        <h1 id="resume-name">Camilo<br /><span>Valencia</span></h1>
        <div className="sim-intro"><p>Software engineering student focused on becoming a Full Stack Software Engineer.</p></div>
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
            <h2>Self Taught</h2><p>Front-End Development</p><p
              className="sim-muted">2024-2026</p>

            <h2>Marcy Labs</h2><p>Software Engineering Fellowship</p><p className="sim-muted">2026—2027</p>
          </section>
          <section className="sim-block" aria-labelledby="skills-title">
            <p className="sim-label" id="skills-title">SKILLS</p>
            {skills.map((skill) => <div className="sim-skill-row" key={skill.label}><span>{skill.label}</span><span>{skill.value}</span></div>)}
          </section>
        </div>
      </section>
    </main>
  );
}
