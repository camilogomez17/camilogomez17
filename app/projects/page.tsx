import Link from "next/link";

export const metadata = {
  title: "Projects",
  description: "Software projects by Camilo Valencia, including implementation details, engineering decisions, and current limitations.",
};

export default function ProjectsPage() {
  return (
    <div className="projects-shell">
      <header className="projects-heading">
        <p className="resume-eyebrow">SELECTED WORK / 02</p>
        <h1>Projects<span>.</span></h1>
        <p>
          Working software and experiments. Each project shows its current capabilities,
          implementation, and next engineering steps.
        </p>
      </header>

      <article className="case-study">
        <div className="case-study-topline"><span>01 / FLAGSHIP PROJECT</span><span>WEB APPLICATION</span></div>
        <div className="case-study-grid">
          <div className="case-study-main">
            <h2>Habit Analytics</h2>
            <p className="case-study-summary">
              A browser-based activity log for recording sessions and reviewing patterns
              without requiring a cloud account.
            </p>
            <div className="case-study-actions">
              <Link className="resume-button resume-button-primary" href="/habitAnalytics">Open application ↗</Link>
              <a className="resume-button" href="https://github.com/camilogomez17/camilogomez17" target="_blank" rel="noreferrer">View source ↗</a>
            </div>
          </div>
          <div className="case-study-facts">
            <div><span>STACK</span><p>TypeScript, React, Next.js</p></div>
            <div><span>DATA</span><p>Browser local storage + JSON backup</p></div>
            <div><span>STATUS</span><p>Working project; actively evolving</p></div>
          </div>
        </div>

        <div className="case-study-details">
          <section>
            <h3>What it does</h3>
            <ul>
              <li>Records actions with start/end times, tags, and context notes.</li>
              <li>Searches entries and filters records by date.</li>
              <li>Provides a session timer and JSON import/export for backups.</li>
            </ul>
          </section>
          <section>
            <h3>Engineering decisions</h3>
            <ul>
              <li>Stores records locally so the current version works without an account or remote database.</li>
              <li>Validates imported backup structure, record counts, timestamps, and text limits before accepting data.</li>
              <li>Uses automated validation tests and CI checks for linting, type-checking, and production builds.</li>
            </ul>
          </section>
          <section>
            <h3>Trade-offs and limitations</h3>
            <ul>
              <li>Data is scoped to the browser profile; clearing site data can remove saved records.</li>
              <li>Users should export backups regularly. There is no cloud synchronization or multi-device account system.</li>
              <li>Validation tests cover backup data rules; broader end-to-end coverage remains an improvement area.</li>
            </ul>
          </section>
        </div>
        <div className="case-study-footer">
          <span>NEXT STEPS: EXPAND WORKFLOW TESTS / IMPROVE RECOVERY / GATHER USER FEEDBACK</span>
          <Link href="/">Back to resume ↑</Link>
        </div>
      </article>

      <article className="case-study">
        <div className="case-study-topline"><span>02 / LEARNING SYSTEM</span><span>INTERACTIVE PROTOTYPE</span></div>
        <div className="case-study-grid">
          <div className="case-study-main">
            <h2>Study Next</h2>
            <p className="case-study-summary">
              An adaptive diagnostic that asks programming questions, estimates skill gaps,
              and recommends the next topic in a Python full-stack curriculum.
            </p>
            <div className="case-study-actions">
              <Link className="resume-button resume-button-primary" href="/study-next">Run assessment ↗</Link>
              <a className="resume-button" href="https://github.com/camilogomez17/camilogomez17" target="_blank" rel="noreferrer">View source ↗</a>
            </div>
          </div>
          <div className="case-study-facts">
            <div><span>STACK</span><p>Next.js, React, TypeScript</p></div>
            <div><span>ENGINE</span><p>Adaptive, rule-based question selection</p></div>
            <div><span>STATUS</span><p>Frontend prototype; backend planned</p></div>
          </div>
        </div>
        <div className="case-study-details">
          <section>
            <h3>What it does</h3>
            <ul>
              <li>Assesses Python, HTTP, FastAPI, SQL, integration, testing, and deployment.</li>
              <li>Changes question priority based on answers and prerequisite gaps.</li>
              <li>Produces a recommended next topic and a skill-signal summary.</li>
            </ul>
          </section>
          <section>
            <h3>Engineering direction</h3>
            <ul>
              <li>Keep the first recommendation engine deterministic and explainable.</li>
              <li>Move assessment logic into a Python FastAPI service.</li>
              <li>Persist sessions, responses, curriculum relationships, and progress in PostgreSQL.</li>
            </ul>
          </section>
          <section>
            <h3>Current limitations</h3>
            <ul>
              <li>Assessment state is currently held in the page session and is not saved to a database.</li>
              <li>Multiple-choice answers indicate familiarity, not demonstrated coding mastery.</li>
              <li>Next milestone: practical exercises, automated tests, and a persistent backend.</li>
            </ul>
          </section>
        </div>
        <div className="case-study-footer">
          <span>NEXT STEPS: FASTAPI / POSTGRESQL / PRACTICE TASKS</span>
          <Link href="/study-next">Open prototype ↗</Link>
        </div>
      </article>

      <section className="projects-next">
        <p className="resume-eyebrow">CURRENT FOCUS</p>
        <h2>Frontend JavaScript, Python Backend.</h2>
        <p>
          My current frontend stack is TypeScript, React, and Next.js. I am learning Python
          as my next step toward backend development, with a focus on APIs, data modeling,
          testing, and reliable server-side behavior.
        </p>
      </section>
    </div>
  );
}
