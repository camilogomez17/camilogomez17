import styles from "./page.module.css";

export const metadata = {
  title: "Christian Scripture Agent",
  description:
    "An AI-assisted space for asking questions and exploring the Bible through Scripture.",
};

export default function ChristianAgentPage() {
  return (
    <section className={styles.page}>
      <header className="page-header">
        <span className="page-kicker">SCRIPTURE AGENTS / CHRISTIAN</span>
        <h1 className="page-title">Christian Scripture Agent</h1>
        <p className="agent-intro">
          Ask questions, examine passages, and explore biblical themes. Use
          Scripture as the primary reference and verify interpretations in
          context.
        </p>
      </header>

      <div className="agent-frame" aria-label="Christian Scripture Agent">
        <div className="agent-frame-header">
          <span><span className="agent-live-dot" /> AGENTPLACE / BIBLE STUDY</span>
          <span>INTERACTIVE SESSION</span>
        </div>
        <div className="agent-embed">
          <iframe
            src="https://c3rvkpmmirwh.run.agentplace.io/"
            title="Christian Scripture Agent"
            allow="microphone; clipboard-write"
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p className="agent-note">
          The agent is provided by AgentPlace. Do not enter passwords,
          authentication codes, or other sensitive personal information.
        </p>
      </div>
    </section>
  );
}
