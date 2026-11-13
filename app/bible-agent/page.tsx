import Script from "next/script";

export const metadata = {
  title: "Bible Agent",
  description:
    "An AI-assisted space for asking questions and exploring the Bible through Scripture.",
};

export default function BibleAgentPage() {
  return (
    <section className="bible-agent-page">
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

      <style jsx>{`
        .bible-agent-intro { max-width: 620px; margin-top: 14px; color: var(--text-secondary); line-height: 1.8; }
        .agent-frame { margin-top: 30px; border: 1px solid var(--border-default); background: var(--bg-secondary); }
        .agent-frame-header { min-height: 42px; padding: 0 14px; display: flex; justify-content: space-between; align-items: center; gap: 12px; border-bottom: 1px solid var(--border-default); color: var(--text-muted); font-size: 10px; letter-spacing: .1em; }
        .agent-live-dot { display: inline-block; width: 6px; height: 6px; margin-right: 8px; border-radius: 50%; background: var(--text-secondary); }
        .agent-embed { min-height: 620px; padding: 14px; }
        .agent-embed :global(iframe) { width: 100%; min-height: 590px; border: 0; }
        .agent-note { padding: 12px 14px; border-top: 1px solid var(--border-default); color: var(--text-muted); font-size: 10px; line-height: 1.7; }
        @media (max-width: 620px) { .agent-embed { min-height: 70vh; padding: 8px; } .agent-embed :global(iframe) { min-height: 68vh; } .agent-frame-header { font-size: 9px; } }
      `}</style>

      <Script
        src="https://agentplace.io/admin/embed/v1.js"
        strategy="afterInteractive"
        data-agent-url="https://c3rvkpmmirwh.run.agentplace.io/"
        data-controls="input"
      />
    </section>
  );
}
