"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const TERMINAL_LINES = [
  { text: "$ init org_twin --employees 340 --horizon 180d", delay: 0 },
  { text: "  loading psychometric profiles...  \u2713 340", delay: 400 },
  { text: "  loading ONA edge graph...         \u2713 2,847 edges", delay: 800 },
  { text: "  loading market context...         \u2713 live", delay: 1200 },
  { text: "", delay: 1500 },
  {
    text: '$ test intervention --type "comp_band_change" --scope eng',
    delay: 1800,
  },
  { text: "  running 1,000 Monte Carlo branches...", delay: 2200 },
  { text: "  simulating daily agent interactions...", delay: 2800 },
  { text: "", delay: 3200 },
  { text: "RESULTS @ day 90 (p50 / p90)", delay: 3500 },
  { text: "  attrition risk:       -18% / -6%", delay: 3800 },
  { text: "  engagement delta:     +0.31\u03c3 / +0.12\u03c3", delay: 4100 },
  { text: "  hotspot clusters:     2 flagged (teams 7, 12)", delay: 4400 },
  {
    text: "  conflict probability: \u2191 23% in senior IC band",
    delay: 4700,
  },
  { text: "", delay: 5000 },
  { text: "\u203a recommendation ready", delay: 5300 },
];

export default function TerminalBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    TERMINAL_LINES.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
    });
  }, [isInView]);

  return (
    <div ref={ref} className="w-full max-w-2xl mx-auto">
      <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0c0c14] shadow-2xl">
        <div className="flex items-center gap-2 px-5 py-3.5 bg-white/[0.03] border-b border-white/[0.06]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          <span className="ml-3 text-[11px] text-muted font-mono">
            replika-sim
          </span>
        </div>
        <div className="p-6 font-mono text-[13px] leading-relaxed min-h-[380px]">
          {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`${
                line.text.startsWith("$")
                  ? "text-accent-teal"
                  : line.text.startsWith("RESULTS")
                  ? "text-accent-coral font-semibold"
                  : line.text.startsWith("\u203a")
                  ? "text-accent-purple"
                  : "text-muted"
              } ${line.text === "" ? "h-4" : ""}`}
            >
              {line.text}
            </div>
          ))}
          {visibleLines < TERMINAL_LINES.length && (
            <span
              className="inline-block w-2 h-4 bg-accent-teal ml-0.5"
              style={{ animation: "terminal-blink 1s infinite" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
