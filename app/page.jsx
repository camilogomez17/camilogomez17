import Link from "next/link";

const profileLinks = [
  { label: "GitHub", href: "https://github.com/camilogomez17", detail: "Source code" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/camilogomezvalencia", detail: "Professional profile" },
  { label: "Email", href: "mailto:c6m1lo@proton.me", detail: "Get in touch" },
];

const stack = [
  { label: "Frontend", value: "TypeScript · React · Next.js" },
  { label: "Web fundamentals", value: "JavaScript · HTML · CSS" },
  { label: "Backend", value: "Python — currently learning" },
  { label: "Tools & deployment", value: "Git · Linux/Bash · Vercel · AWS" },
];

export const metadata = {
  title: "Camilo Valencia — Software Engineering",
  description: "Resume and selected software projects by Camilo Valencia, a software engineering student focused on TypeScript, React, Next.js, and learning Python for backend development.",
};

export default function HomePage() {
  return (
    <article className="resume-shell">
      <header className="resume-topline">
        <span>INDEPENDENT DEVELOPER / 2026</span>
        <span className="resume-status"><i aria-hidden="true" /> OPEN TO OPPORTUNITIES</span>
      </header>

      <section className="resume-intro-block" aria-labelledby="resume-name">
        <p className="resume-eyebrow">SOFTWARE ENGINEERING STUDENT</p>
        <h1 id="resume-name">Camilo<br /><span>Valencia.</span></h1>
        <p className="resume-lede">
          Building practical web applications with TypeScript, React, and Next.js.
          Currently learning Python for backend engineering.
        </p>
        <div className="resume-actions">
          <Link className="resume-button resume-button-primary" href="/projects">Explore projects <span aria-hidden="true">↗</span></Link>
          <a className="resume-button" href="mailto:c6m1lo@proton.me">Contact me <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="resume-section-block" aria-labelledby="profile-heading">
        <div className="resume-section-label"><span>01</span><h2 id="profile-heading">Profile</h2></div>
        <div className="resume-section-content">
          <p>
            I am a software engineering student who learns by designing, building, testing,
            and iterating on useful software. My current work focuses on web interfaces,
            browser-based tools, data validation, and reliable client-side behavior.
          </p>
          <p>
            I aim to write software that is understandable and maintainable, with clear
            limitations, thoughtful error handling, and tests for important behavior.
            I am expanding from frontend development into backend engineering with Python.
          </p>
        </div>
      </section>

      <section className="resume-section-block" aria-labelledby="stack-heading">
        <div className="resume-section-label"><span>02</span><h2 id="stack-heading">Technical skills</h2></div>
        <div className="resume-section-content resume-stack">
          {stack.map((item) => (
            <div className="resume-stack-row" key={item.label}>
              <h3>{item.label}</h3><p>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="resume-section-block" aria-labelledby="experience-heading">
        <div className="resume-section-label"><span>03</span><h2 id="experience-heading">Education</h2></div>
        <div className="resume-section-content">
          <div className="resume-education-row">
            <div><h3>Marcy Labs</h3><p>Software Engineering Fellowship</p></div>
            <span>2026–2027</span>
          </div>
        </div>
      </section>

      <section className="resume-section-block" aria-labelledby="work-heading">
        <div className="resume-section-label"><span>04</span><h2 id="work-heading">Selected work</h2></div>
        <div className="resume-section-content">
          <article className="resume-project">
            <div className="resume-project-meta"><span>FEATURED PROJECT</span><span>01 / WEB APP</span></div>
            <h3>Habit Analytics</h3>
            <p>
              A local-first activity log for recording sessions with timestamps, tags, and notes,
              then exploring records through search and date filters. Includes a session timer
              and JSON backup/import.
            </p>
            <p className="resume-project-tech">NEXT.JS · REACT · TYPESCRIPT · LOCAL STORAGE</p>
            <div className="resume-project-links">
              <Link href="/habitAnalytics">Live application ↗</Link>
              <a href="https://github.com/camilogomez17/camilogomez17" target="_blank" rel="noreferrer">Source code ↗</a>
              <Link href="/projects">Technical notes ↗</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="resume-section-block" aria-labelledby="engineering-heading">
        <div className="resume-section-label"><span>05</span><h2 id="engineering-heading">Engineering practice</h2></div>
        <div className="resume-section-content">
          <ul className="resume-practice-list">
            <li>Automated checks for linting, TypeScript, tests, and production builds through GitHub Actions.</li>
            <li>Input validation and backup-file checks for safer handling of user data.</li>
            <li>Version control, documented limitations, and iterative improvements based on testing.</li>
          </ul>
        </div>
      </section>

      <footer className="resume-contact">
        <p className="resume-eyebrow">LINKS / CONTACT</p>
        <div className="resume-contact-links">
          {profileLinks.map((link) => (
            <a href={link.href} key={link.label} target={link.href.startsWith("mailto:") ? undefined : "_blank"} rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}>
              <span>{link.label}</span><small>{link.detail}</small><b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </footer>
    </article>
  );
}
