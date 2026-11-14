import styles from "../christian/page.module.css";
import JewishAgentEmbed from "./agent-embed";

export const metadata = {
  title: "Jewish Scripture Agent",
  description:
    "An AI-assisted space for studying the Tanakh and exploring Jewish textual and interpretive traditions.",
};

export default function JewishAgentPage() {
  return (
    <section className={styles.page}>
      <header className="page-header">
        <span className="page-kicker">SCRIPTURE AGENTS / JUDAISM</span>
        <h1 className="page-title">Jewish Scripture Agent</h1>
        <p className="agent-intro">
          Study the Tanakh, examine Hebrew wording, and explore Jewish
          interpretation across historical traditions. Distinguish the biblical
          text from rabbinic literature and later commentary.
        </p>
      </header>

      <div className="agent-frame" aria-label="Jewish Scripture Agent">
        <div className="agent-frame-header">
          <span><span className="agent-live-dot" /> AGENTPLACE / JEWISH TEXT STUDY</span>
          <span>INTERACTIVE SESSION</span>
        </div>
        <JewishAgentEmbed />
        <p className="agent-note">
          The agent is provided by AgentPlace. Do not enter passwords,
          authentication codes, or other sensitive personal information.
        </p>
      </div>
    </section>
  );
}
