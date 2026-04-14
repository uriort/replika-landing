"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";

const CASES = [
  {
    id: "hiring",
    tab: "Hiring",
    tag: "Talent Acquisition",
    title: "Hiring & Candidate Fit",
    description:
      "Simulate a candidate's insertion into your actual org -- their psychometric profile against real team dynamics, ONA clusters, and reporting relationships. See how they'll interact, where friction will emerge, and whether they'll accelerate or destabilize the system around them.",
    metrics: [
      { label: "Fit Prediction", value: "94%" },
      { label: "Friction Detection", value: "3.2x" },
      { label: "Time to Insight", value: "< 6min" },
    ],
    accent: "accent-purple",
  },
  {
    id: "compensation",
    tab: "Compensation",
    tag: "Total Rewards",
    title: "Compensation Strategy",
    description:
      "Test compensation band changes across a thousand simulated futures before rolling them out. Predict how specific employees -- and teams -- will react based on their Core Drivers, peer comparison sensitivity, and historical engagement signals. Quantify attrition risk with distributional precision.",
    metrics: [
      { label: "Attrition Risk", value: "-18%" },
      { label: "Engagement Lift", value: "+0.31\u03c3" },
      { label: "Scenarios Tested", value: "1,000" },
    ],
    accent: "accent-coral",
  },
  {
    id: "leadership",
    tab: "Leadership",
    tag: "L&D / Coaching",
    title: "Leadership Development",
    description:
      "Simulate a leader's impact before they're promoted. Model how their decisions will cascade through their team, what team culture will emerge, and where coaching interventions are most likely to unlock performance -- individualized, at scale, before investment is made.",
    metrics: [
      { label: "Cascade Depth", value: "4 tiers" },
      { label: "Culture Shift", value: "Mapped" },
      { label: "Coaching ROI", value: "2.7x" },
    ],
    accent: "accent-teal",
  },
  {
    id: "reorg",
    tab: "Org Design",
    tag: "Restructuring",
    title: "Org Design & Restructuring",
    description:
      "Before announcing a reorg, run it. Simulate the information flow disruption, relationship network fragmentation, trust dynamics, and productivity curves across every proposed structure. Identify the hidden costs of restructuring before your people absorb them.",
    metrics: [
      { label: "Network Impact", value: "Full graph" },
      { label: "Trust Dynamics", value: "Modeled" },
      { label: "Hidden Costs", value: "Surfaced" },
    ],
    accent: "accent-purple",
  },
  {
    id: "attrition",
    tab: "Attrition",
    tag: "Retention",
    title: "Attrition & Engagement",
    description:
      "Identify hotspots -- individuals and clusters -- at elevated attrition risk months before they surface in exit data. Replika detects emerging disengagement by modeling how individual-level signals compound across team dynamics, manager relationships, and compensation context.",
    metrics: [
      { label: "Early Warning", value: "4-6mo" },
      { label: "Cluster Detection", value: "Teams" },
      { label: "Precision", value: "p90" },
    ],
    accent: "accent-coral",
  },
  {
    id: "executive",
    tab: "C-Suite",
    tag: "Executive Decisions",
    title: "Executive Decision Testing",
    description:
      "Before the C-suite announces a strategic shift -- a new performance framework, a values initiative, a policy change -- simulate how it will land across every demographic, team, and tenure band in your organization. Quantify the gap between intent and likely impact.",
    metrics: [
      { label: "Coverage", value: "Org-wide" },
      { label: "Segments", value: "All bands" },
      { label: "Intent vs Impact", value: "Measured" },
    ],
    accent: "accent-teal",
  },
];

export default function UseCases() {
  const [activeId, setActiveId] = useState("hiring");
  const activeCase = CASES.find((c) => c.id === activeId)!;

  return (
    <SectionWrapper id="use-cases">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <Eyebrow>Applications</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Every organizational decision,
            <br />
            <span className="gradient-text">stress-tested.</span>
          </h2>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                activeId === c.id
                  ? "bg-white/[0.08] text-foreground border border-white/[0.12]"
                  : "text-muted hover:text-foreground hover:bg-white/[0.03] border border-transparent"
              }`}
            >
              {c.tab}
            </button>
          ))}
        </motion.div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="glass rounded-2xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row gap-10">
              {/* Left: content */}
              <div className="flex-1">
                <span className="text-[10px] uppercase tracking-[0.15em] text-muted block mb-3">
                  {activeCase.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-5 font-serif">
                  {activeCase.title}
                </h3>
                <p className="text-base text-muted leading-relaxed">
                  {activeCase.description}
                </p>
              </div>

              {/* Right: metrics */}
              <div className="flex flex-row md:flex-col gap-6 md:gap-8 md:w-48 md:border-l md:border-white/[0.06] md:pl-10">
                {activeCase.metrics.map((m) => (
                  <div key={m.label}>
                    <div
                      className={`font-mono text-2xl md:text-3xl font-bold text-${activeCase.accent} mb-1`}
                    >
                      {m.value}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.12em] text-muted">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
