const links = [
  { label: "GITHUB", href: "https://github.com/camilogomez17" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/camilogomezvalencia" },
  { label: "EMAIL", href: "mailto:c6m1lo@proton.me" },
];
const skills = [
  { label: "Frontend", value: "TypeScript · JavaScript · React · Next.js" },
  { label: "Web fundamentals", value: "HTML · CSS · Responsive design · Accessibility" },
  { label: "Backend — learning", value: "Python · REST APIs · Server-side development" },
  { label: "Data — learning", value: "SQL · Relational databases · Data modeling" },
  { label: "Tools", value: "Git · GitHub · Linux · Vercel" },
  { label: "Engineering practices", value: "Debugging · Testing fundamentals · Clean code" },
];
const learningGoals = [
  { title: "Python", detail: "Core syntax, functions, data structures, modules, and object-oriented programming." },
  { title: "Backend development", detail: "HTTP, REST API design, request validation, and server-side application structure." },
  { title: "Databases", detail: "SQL, relational modeling, queries, and persistent application data." },
  { title: "Software quality", detail: "Automated tests, debugging, Git workflows, and maintainable code." },
];
export const metadata = {
  title: "Camilo Valencia — Software Engineering Resume",
  description: "Software engineering student at Marcy Labs building frontend skills with TypeScript, React, and Next.js while learning Python backend development, APIs, and databases.",
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
        <div className="sim-intro"><p>Software engineering student focused on frontend development and building backend skills with Python.</p></div>
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
            <h2>Marcy Labs</h2><p>Software Engineering Fellowship</p><p className="sim-muted">2026—2027</p>
          </section>
          <section className="sim-block" aria-labelledby="skills-title">
            <p className="sim-label" id="skills-title">SKILLS IN PROGRESS</p>
            {skills.map((skill) => <div className="sim-skill-row" key={skill.label}><span>{skill.label}</span><span>{skill.value}</span></div>)}
          </section>
        </div>
        <div className="sim-rule" />
        <section className="sim-block" aria-labelledby="learning-title">
          <p className="sim-label" id="learning-title">CURRENT LEARNING ROADMAP</p>
          {learningGoals.map((goal, index) => (
            <div className="sim-learning-row" key={goal.title}>
              <span className="sim-muted">{String(index + 1).padStart(2, "0")}</span>
              <div><h2>{goal.title}</h2><p>{goal.detail}</p></div>
              <span className="sim-learning-status">IN PROGRESS</span>
            </div>
          ))}
        </section>
        <div className="sim-rule" />
        <section className="sim-block" aria-labelledby="objective-title">
          <p className="sim-label" id="objective-title">CAREER OBJECTIVE</p>
          <p>Develop strong full-stack engineering fundamentals, deepen practical experience with modern web technologies, and prepare to contribute to a software engineering team.</p>
        </section>
      </section>
    </main>
  );
}
