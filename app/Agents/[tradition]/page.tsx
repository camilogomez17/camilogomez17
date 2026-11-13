import Link from "next/link";
import styles from "./page.module.css";
import { getScriptureAgent, SCRIPTURE_AGENT_IDS } from "@/lib/scripture-agents";

export function generateStaticParams() {
  return SCRIPTURE_AGENT_IDS.filter((id) => id !== "christian").map((tradition) => ({ tradition }));
}

export async function generateMetadata({ params }: { params: Promise<{ tradition: string }> }) {
  const { tradition } = await params;
  const selected = getScriptureAgent(tradition);
  return { title: selected ? `${selected.name} Scripture Agent` : "Agent unavailable", description: selected?.summary ?? "Scripture Agents" };
}

export default async function TraditionAgentPage({ params }: { params: Promise<{ tradition: string }> }) {
  const { tradition } = await params;
  const selected = getScriptureAgent(tradition);
  if (!selected || selected.id === "christian") {
    return <section className={styles.page}><span className="page-kicker">SCRIPTURE AGENTS</span><h1 className="page-title">Agent not found</h1><Link className="back-link" href="/Agents">← All agents</Link></section>;
  }
  return (
    <section className={styles.page}>
      <header className="page-header">
        <span className="page-kicker">SCRIPTURE AGENTS / {selected.tradition}</span>
        <h1 className="page-title">{selected.name} Agent</h1>
        <p className="agent-intro">{selected.focus}</p>
      </header>
      <div className="framework-panel">
        <div className="framework-heading">
          <span className="status">AGENT FRAMEWORK / IN DEVELOPMENT</span>
          <h2>Dedicated study framework</h2><p>{selected.summary}</p>
        </div>
        <div className="framework-section">
          <h3>Textual scope and instructions</h3>
          <p className="framework-description">This agent has a separate instruction set designed to keep its tradition's texts, interpretive methods, and internal differences distinct.</p>
          <pre className="instruction-preview">{selected.systemInstructions}</pre>
        </div>
        <div className="framework-section">
          <h3>Knowledge sources</h3>
          <p className="framework-description">These are proposed source collections for a future retrieval system. They are reference links, not yet connected or indexed in an automated knowledge base.</p>
          <div className="source-list">
            {selected.sources.map((source) => (
              <a className="source-item" href={source.url} key={source.name} target="_blank" rel="noreferrer">
                <span className="source-type">{source.role.replace("-", " ")}</span><strong>{source.name} ↗</strong><span>{source.description}</span>
              </a>
            ))}
          </div>
        </div>
        <p className="framework-note">The conversational agent is not connected yet. This page documents its independent configuration without presenting an unconnected placeholder as a functioning AI assistant.</p>
      </div>
      <Link className="back-link" href="/Agents">← Choose another agent</Link>
    </section>
  );
}
