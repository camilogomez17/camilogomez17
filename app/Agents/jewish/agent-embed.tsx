"use client";

import { useEffect, useRef } from "react";

export default function JewishAgentEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = "https://agentplace.io/admin/embed/v1.js";
    script.dataset.agentUrl = "https://9kw4exiawayx.run.agentplace.io/";
    script.dataset.controls = "input";
    script.async = true;

    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, []);

  return <div ref={containerRef} className="agent-embed" aria-label="Jewish Scripture Agent" />;
}
