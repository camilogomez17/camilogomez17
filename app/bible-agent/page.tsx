import Script from "next/script";
import styles from "./page.module.css";

export const metadata = {
  title: "Bible Agent",
  description:
    "An AI-assisted space for asking questions and exploring the Bible through Scripture.",
};

export default function BibleAgentPage() {
  return (
    <section className={styles.page}>
      <header className="page-header">
        <span className="page-kicker">PROJECT / SCRIPTURE STUDY</span>
        <h1 className="page-title">Bible Agent</h1>
        <p className="bible-agent-intro">
          Ask questions, examine passages, and explore biblical themes. Use
          Scripture as the primary reference and verify interpretations in
          context.
        </p>
      </header>

      <div className="agent-frame" aria-label="Bible Agent">
        <div className="agent-frame-header">
          <span><span className="agent-live-dot" /> AGENTPLACE / BIBLE STUDY</span>
          <span>INTERACTIVE SESSION</span>
        </div>
        <div className="agent-embed">
          <div
            className="agentplace-embed"
            data-agent-url="https://c3rvkpmmirwh.run.agentplace.io/"
            data-controls="input"
          />
        </div>
        <p className="agent-note">
          The agent is provided by AgentPlace. Do not enter passwords,
          authentication codes, or other sensitive personal information.
        </p>
      </div>


      <Script
        src="https://agentplace.io/admin/embed/v1.js"
        strategy="afterInteractive"
        data-agent-url="https://c3rvkpmmirwh.run.agentplace.io/"
        data-controls="input"
      />
    </section>
  );
}
