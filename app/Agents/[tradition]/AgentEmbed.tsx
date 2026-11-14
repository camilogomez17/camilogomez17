"use client";

import { useEffect, useRef } from "react";

type AgentEmbedProps = {
  url: string;
  mode: "iframe" | "script";
  title: string;
};

export default function AgentEmbed({ url, mode, title }: AgentEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode !== "script") return;
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = "https://agentplace.io/admin/embed/v1.js";
    script.dataset.agentUrl = url;
    script.dataset.controls = "input";
    script.async = true;
    container.appendChild(script);

    return () => container.replaceChildren();
  }, [mode, url]);

  if (mode === "iframe") {
    return (
      <div className="agent-embed">
        <iframe
          src={url}
          title={title}
          allow="microphone; clipboard-write"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="agent-embed"
      aria-label={title}
    />
  );
}
