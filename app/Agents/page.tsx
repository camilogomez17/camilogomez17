import Link from "next/link";
import styles from "./page.module.css";
import { SCRIPTURE_AGENT_IDS, SCRIPTURE_AGENTS } from "@/lib/scripture-agents";

export const metadata = {
  title: "Scripture Agents",
  description: "Choose a Scripture study agent for Christian, Jewish, Muslim, or Buddhist traditions.",
};

export default function AgentsPage() {
  return (
    <section className={styles.page}>
      <header className="page-header">
        <span className="page-kicker">PROJECT / SCRIPTURE STUDY</span>
        <h1 className="page-title">Scripture Agents</h1>
        <p className="agents-intro">
          Select a tradition to explore its scriptures, teachings, and
          interpretive perspectives. Each agent has its own textual scope,
          source library, and study instructions.
        </p>
      </header>
      <div className="agent-grid" aria-label="Choose a Scripture agent">
        {SCRIPTURE_AGENT_IDS.map((id, index) => {
          const agent = SCRIPTURE_AGENTS[id];
          return (
            <Link className="agent-option" href={`/Agents/${id}`} key={id}>
              <div className="option-topline">
                <span className="option-number">0{index + 1}</span>
                <span className={agent.status === "available" ? "option-status available" : "option-status"}>
                  {agent.status === "available" ? "AVAILABLE" : "IN DEVELOPMENT"}
                </span>
              </div>
              <span className="option-tradition">{agent.tradition}</span>
              <h2>{agent.name}</h2>
              <p>{agent.summary}</p>
              <span className="option-action">
                {agent.status === "available" ? "OPEN AGENT" : "VIEW FRAMEWORK"} <span aria-hidden="true">↗</span>
              </span>
            </Link>
          );
        })}
      </div>
      <p className="agents-footnote">
        Each agent is designed to distinguish primary texts, commentary, and
        differences within its tradition.
      </p>
    </section>
  );
}
