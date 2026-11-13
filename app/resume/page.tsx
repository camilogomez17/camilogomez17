const links = [
  { label: "GITHUB", href: "https://github.com/camilogomez17" },
  { label: "EMAIL", href: "mailto:c6m1l00@gmail.com" },
];

const skills = [
  { label: "Frontend", value: "HTML · CSS · JavaScript · TypeScript · React · Next.js" },
  { label: "Backend", value: "Node.js · Express · Python · REST/FAST API · PostgreSQL" },
  { label: "Services", value: "Vercel · AWS · OAuth · Stripe" },
  { label: "Tools", value: "VS Code · Git · GitHub · Quality assurance" },
  { label: "Languages", value: "English · Spanish" },
  { label: "Systems", value: "Linux · Windows · macOS" },
];

const experience = [
  { role: "Certified Medical Interpreter", company: "Propio Language Services", dates: "August 2024 — Present" },
  { role: "Spanish Data Annotation Specialist", company: "Uber AI Solutions", dates: "February 2026 — August 2026" },
  { role: "Cook", company: "KPOT", dates: "October 2025 — December 2025" },
  { role: "Clinical NLP Annotation Specialist", company: "Centific", dates: "June 2025 — August 2025" },
  { role: "Legal Interpreter", company: "Kate Nussman Ellis Farhi & Earle, LLP", dates: "January 2024 - July 2024"},
  { role: "Certified Medical Interpreter", company: "Kelly Services", dates: "January 2023 — July 2024" },
  { role: "Barista", company: "Gongcha Taiwan", dates: "June 2022 - August 2022"},
  { role: "Cook", company: "Chipotle", dates: "August 2019 — December 2021" },
];

export const metadata = {
  title: "Resume — Juan Camilo Gomez Valencia",
  description:
    "Resume of Juan Camilo Gomez Valencia, software engineering fellow at Marcy Labs, with experience in frontend development, bilingual interpretation, and AI data annotation.",
};

export default function ResumePage() {
  return (
    <div className="sim-page">
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
    </div>
  );
}
