const links = [
  { label: "GITHUB", href: "https://github.com/camilogomez17" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/camilogomezvalencia" },
  { label: "EMAIL", href: "mailto:c6m1lo@proton.me" },
];

const skills = [
  { label: "Frontend", value: "HTML · CSS · JavaScript · TypeScript · React · Next.js" },
  { label: "Backend", value: "Node.js · Express · Python · REST APIs" },
  { label: "AI & Data", value: "Generative AI · Clinical NLP · Data annotation · Text classification · Dataset validation · Schema design" },
  { label: "Tools", value: "VS Code · Git · GitHub · Quality assurance" },
  { label: "Languages", value: "English · Spanish" },
];

const experience = [
  {
    role: "Medical Interpreter",
    company: "Propio Language Services",
    dates: "August 2024 — Present",
  },
  {
    role: "Spanish (US) Data Annotator",
    company: "Uber AI Solutions",
    dates: "February 2026 — August 2026",
  },
  {
    role: "Line Cook / Prep Cook",
    company: "KPOT",
    dates: "October 2025 — December 2025",
  },
  {
    role: "Clinical NLP Annotation Specialist",
    company: "Centific",
    dates: "June 2025 — August 2025",
  },
  {
    role: "Certified Medical Interpreter",
    company: "Kelly Services",
    dates: "January 2024 — July 2024",
  },
  {
    role: "Crew Member",
    company: "Chipotle",
    dates: "August 2020 — December 2023",
  },
];

export const metadata = {
  title: "Juan Camilo Gomez Valencia — Software Engineering",
  description:
    "Juan Camilo Gomez Valencia is a bilingual English and Spanish professional, medical interpreter, AI data annotator, and software engineering fellow at Marcy Labs.",
};

export default function HomePage() {
  return (
    <main className="sim-page">
      <header className="sim-topline">
        <span><i className="sim-live-dot" /> SOFTWARE ENGINEERING / PORTFOLIO</span>
        <span>NYC · 2026</span>
      </header>

      <section className="sim-resume" aria-labelledby="resume-name">
        <p className="sim-kicker">PORTFOLIO / SOFTWARE ENGINEERING</p>
        <h1 id="resume-name">Juan Camilo<br /><span>Gomez Valencia</span></h1>
        <div className="sim-intro">
          <p>Software engineering fellow at Marcy Labs with experience in front-end development, bilingual medical interpretation, and AI data annotation.</p>
          <p>English / Spanish</p>
        </div>

        <nav className="sim-links" aria-label="Contact links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
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
            <p className="sim-muted">September 2026 — Present</p>

            <h2>Independent Study</h2>
            <p>Front-End Development</p>
            <p className="sim-muted">2024 — 2026</p>

            <div className="sim-rule" />
            <p className="sim-label">PROFESSIONAL QUALIFICATION</p>
            <h2>Certified Medical Interpreter</h2>
            <p>Bilingual English / Spanish interpretation</p>
          </section>

          <section className="sim-block" aria-labelledby="skills-title">
            <p className="sim-label" id="skills-title">SKILLS</p>
            {skills.map((skill) => (
              <div className="sim-skill-row" key={skill.label}>
                <span>{skill.label}</span>
                <span>{skill.value}</span>
              </div>
            ))}
          </section>
        </div>

        <div className="sim-rule" />

        <section className="sim-block" aria-labelledby="experience-title">
          <p className="sim-label" id="experience-title">PROFESSIONAL EXPERIENCE</p>
          <div className="sim-experience-list">
            {experience.map((item, index) => (
              <article className="sim-experience-row" key={item.company}>
                <span className="sim-experience-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{item.role}</h2>
                  <p>{item.company}</p>
                </div>
                <span className="sim-muted sim-experience-dates">{item.dates}</span>
              </article>
            ))}
          </div>
        </section>
      </section>

      <footer className="sim-footer">
        <span>JUAN CAMILO GOMEZ VALENCIA</span>
        <span>SOFTWARE ENGINEERING · 2026</span>
      </footer>
    </main>
  );
}
