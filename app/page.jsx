import Link from "next/link";

const sectionStyle = {
  maxWidth: "820px",
  margin: "0 auto",
  padding: "64px 24px",
  color: "#d4c9b0",
  lineHeight: 1.7,
};

const headingStyle = {
  margin: "0 0 16px",
  color: "#fff",
  fontFamily: "var(--font-valencia), Georgia, serif",
  fontSize: "clamp(28px, 5vw, 42px)",
  fontWeight: 400,
};

export default function HomePage() {
  return (
    <div style={{ background: "#080808" }}>
      <section
        style={{
          minHeight: "72svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: "16px",
          padding: "72px 24px",
          background: "#080808",
        }}
      >
        <h1 style={{
          margin: 0,
          fontFamily: "var(--font-valencia)",
          fontWeight: 300,
          fontSize: "clamp(40px, 10vw, 72px)",
          letterSpacing: "clamp(0.12em, 1.2vw, 0.25em)",
          color: "white",
          lineHeight: 1.05,
        }}>
          CAMILO<br />VALENCIA
        </h1>
        <div style={{ width: "48px", height: "1px", background: "rgba(212, 201, 176, 0.35)", margin: "8px auto" }} />
        <p style={{
          maxWidth: "560px",
          margin: 0,
          fontFamily: "var(--font-valencia), Georgia, serif",
          fontSize: "clamp(18px, 2.4vw, 23px)",
          color: "rgba(212, 201, 176, 0.75)",
          lineHeight: 1.6,
        }}>
          Software engineering, small useful tools, and experiments in making everyday work clearer.
        </p>
        <Link href="/projects" style={{
          marginTop: "12px",
          fontFamily: "var(--font-valencia)",
          fontSize: "12px",
          letterSpacing: "0.2em",
          color: "#d4c9b0",
          border: "1px solid rgba(212, 201, 176, 0.35)",
          padding: "12px 18px",
          textDecoration: "none",
        }}>
          EXPLORE PROJECTS
        </Link>
      </section>

      <section style={{ ...sectionStyle, borderTop: "1px solid rgba(212, 201, 176, 0.18)" }}>
        <p style={{ margin: "0 0 10px", color: "rgba(212, 201, 176, 0.65)", fontSize: "11px", letterSpacing: "0.2em" }}>ABOUT</p>
        <h2 style={headingStyle}>Learning by building</h2>
        <p>
          I am a software engineering student interested in how systems work and how software can solve practical problems. I use this site to document my work, share projects, and make small tools available for people to try.
        </p>
        <p>
          My approach is iterative: identify a problem, build a focused first version, test it in real use, and improve it when I find limitations. I am especially interested in useful interfaces, browser-based tools, and software that gives people more control over their own information.
        </p>
        <p>
          The projects here are works in progress. Their pages describe what each tool does, how it stores information, and what limitations visitors should understand before using it.
        </p>
        <Link href="/resume" style={{ color: "#d4c9b0", textUnderlineOffset: "4px" }}>Read my résumé and technical skills →</Link>
      </section>

      <section style={{ ...sectionStyle, borderTop: "1px solid rgba(212, 201, 176, 0.18)" }}>
        <p style={{ margin: "0 0 10px", color: "rgba(212, 201, 176, 0.65)", fontSize: "11px", letterSpacing: "0.2em" }}>FEATURED PROJECT</p>
        <h2 style={headingStyle}>Habit Analytics</h2>
        <p>
          Habit Analytics is a browser-based activity log for recording what you did, when you did it, and the context around it. Entries can include tags and notes, then be searched and explored by date. A timer can help record a session without manually entering both times.
        </p>
        <p>
          The current version stores entries in the browser's local storage rather than in a remote account. That means the information stays in that browser profile, but it also means clearing browser data can erase it. The app includes JSON export and import so users can make a backup and move their own records.
        </p>
        <p>
          The project explores a simple question: can a lightweight log make patterns in everyday time use easier to inspect without requiring a cloud account?
        </p>
        <Link href="/habitAnalytics" style={{ color: "#d4c9b0", textUnderlineOffset: "4px" }}>Open Habit Analytics →</Link>
      </section>

      <section style={{ ...sectionStyle, borderTop: "1px solid rgba(212, 201, 176, 0.18)", paddingBottom: "80px" }}>
        <h2 style={headingStyle}>Contact and site information</h2>
        <p>
          If you find a problem, have a correction, or want to discuss a project, you can contact me by email. This is a personal portfolio, not a substitute for professional legal, financial, medical, or other specialist advice.
        </p>
        <p><a href="mailto:c6m1lo@proton.me" style={{ color: "#d4c9b0" }}>c6m1lo@proton.me</a></p>
        <p style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          <Link href="/projects" style={{ color: "#d4c9b0" }}>Projects</Link>
          <Link href="/privacy" style={{ color: "#d4c9b0" }}>Privacy policy</Link>
          <Link href="/tos" style={{ color: "#d4c9b0" }}>Terms of service</Link>
          <Link href="/support" style={{ color: "#d4c9b0" }}>Support</Link>
        </p>
      </section>
    </div>
  );
}
