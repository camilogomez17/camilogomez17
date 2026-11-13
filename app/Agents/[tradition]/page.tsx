import Link from "next/link";
import styles from "./page.module.css";

const traditions: Record<string, { name: string; focus: string }> = {
  jewish: { name: "Jewish", focus: "the Hebrew Bible and Jewish interpretive traditions" },
  muslim: { name: "Muslim", focus: "the Qur’an and Islamic scholarship" },
  buddhist: { name: "Buddhist", focus: "Buddhist texts, teachings, and traditions" },
};

export function generateStaticParams() {
  return Object.keys(traditions).map((tradition) => ({ tradition }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tradition: string }>;
}) {
  const { tradition } = await params;
  const selected = traditions[tradition];
  return { title: selected ? `${selected.name} Scripture Agent` : "Agent unavailable" };
}

export default async function PlaceholderAgentPage({
  params,
}: {
  params: Promise<{ tradition: string }>;
}) {
  const { tradition } = await params;
  const selected = traditions[tradition];

  if (!selected) {
    return (
      <section className={styles.page}>
        <span className="page-kicker">SCRIPTURE AGENTS</span>
        <h1 className="page-title">Agent not found</h1>
        <Link className="back-link" href="/Agents">← All agents</Link>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <span className="page-kicker">SCRIPTURE AGENTS / {selected.name.toUpperCase()}</span>
      <h1 className="page-title">{selected.name} Agent</h1>
      <div className="placeholder-panel">
        <span className="status">IN DEVELOPMENT</span>
        <h2>This agent is not available yet.</h2>
        <p>
          This space is reserved for an agent focused on {selected.focus}.
          It will be added as the project expands.
        </p>
        <Link className="back-link" href="/Agents">← Choose another agent</Link>
      </div>
    </section>
  );
}
