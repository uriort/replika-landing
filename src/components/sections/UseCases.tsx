"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";

const CASES = [
  {
    id: "hiring",
    tab: "Hiring",
    tag: "Executive Hiring",
    title: "Critical Hiring Decisions",
    description:
      "Before making a critical executive hire, simulate how they'll interact with the board, influence team dynamics, and ripple across the entire organization. See how their leadership style, personality, and decision-making patterns will reshape culture, power structures, and performance before the offer letter goes out.",
    metrics: [
      { label: "Board Fit", value: "94%" },
      { label: "Org Impact", value: "3.2x" },
      { label: "Time to Insight", value: "< 6min" },
    ],
    gradient: "from-[#7B61FF] to-[#A78BFA]",
  },
  {
    id: "compensation",
    tab: "Compensation",
    tag: "Total Rewards",
    title: "Compensation Strategy",
    description:
      "Simulate compensation band changes across a thousand simulated futures before rolling them out. Predict how employees, regions, teams, and functions will react based on their values, personality, dynamics and historical signals.",
    metrics: [
      { label: "Attrition Risk", value: "-18%" },
      { label: "Engagement Lift", value: "+0.31\u03c3" },
      { label: "Scenarios Tested", value: "1,000" },
    ],
    gradient: "from-[#F97066] to-[#FBB4A5]",
  },
  {
    id: "leadership",
    tab: "Leadership",
    tag: "L&D / Coaching",
    title: "Leadership Development",
    description:
      "Simulate leadership impact before making a succession decision. Model how their values will cascade through their organization and the team culture that will emerge in a year from now.",
    metrics: [
      { label: "Cascade Depth", value: "4 tiers" },
      { label: "Culture Shift", value: "Mapped" },
      { label: "Coaching ROI", value: "2.7x" },
    ],
    gradient: "from-[#2DD4BF] to-[#67E8D0]",
  },
  {
    id: "reorg",
    tab: "Org Design",
    tag: "Restructuring",
    title: "Org Design & Restructuring",
    description:
      "Before announcing a reorg, run it. Simulate the information flow disruption, relationship network fragmentation, trust dynamics, and productivity curves across every proposed structure.",
    metrics: [
      { label: "Network Impact", value: "Full graph" },
      { label: "Trust Dynamics", value: "Modeled" },
      { label: "Hidden Costs", value: "Surfaced" },
    ],
    gradient: "from-[#7B61FF] to-[#2DD4BF]",
  },
  {
    id: "attrition",
    tab: "Attrition",
    tag: "Retention",
    title: "Attrition & Engagement",
    description:
      "Identify hotspots -- individuals and clusters -- at elevated attrition risk months before they surface in exit data. Replika detects emerging disengagement by modeling how individual-level signals compound across team dynamics.",
    metrics: [
      { label: "Early Warning", value: "4-6mo" },
      { label: "Cluster Detection", value: "Teams" },
      { label: "Precision", value: "p90" },
    ],
    gradient: "from-[#F97066] to-[#7B61FF]",
  },
  {
    id: "executive",
    tab: "C-Suite",
    tag: "Executive Decisions",
    title: "Executive Decision Testing",
    description:
      "Before the C-suite announces a strategic shift, simulate how it will land across every demographic, team, and tenure band in your organization. Quantify the gap between intent and likely impact.",
    metrics: [
      { label: "Coverage", value: "Org-wide" },
      { label: "Segments", value: "All bands" },
      { label: "Intent vs Impact", value: "Measured" },
    ],
    gradient: "from-[#2DD4BF] to-[#F97066]",
  },
];

export default function UseCases() {
  const [activeId, setActiveId] = useState("hiring");
  const activeCase = CASES.find((c) => c.id === activeId)!;

  return (
    <SectionWrapper id="use-cases">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <Eyebrow>Applications</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground">
            Every organizational decision,
            <br />
            <span className="gradient-text">stress-tested.</span>
          </h2>
        </motion.div>

        {/* Tab pills */}
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
              className={`relative px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                activeId === c.id
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {/* Gradient border for active tab */}
              {activeId === c.id && (
                <motion.span
                  layoutId="tab-border"
                  className={`absolute inset-0 rounded-full p-px bg-gradient-to-r ${c.gradient}`}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                >
                  <span className="block w-full h-full rounded-full bg-white" />
                </motion.span>
              )}
              <span className="relative z-10">{c.tab}</span>
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
          >
            {/* Gradient border wrapper */}
            <div className={`relative rounded-2xl p-px bg-gradient-to-r ${activeCase.gradient}`}>
              {/* Glow */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${activeCase.gradient} opacity-[0.1] blur-2xl -z-10`}
              />

              <div className="relative rounded-[15px] bg-white p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-muted block mb-3">
                      {activeCase.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-5 font-serif">
                      {activeCase.title}
                    </h3>
                    <p className="text-sm text-muted leading-[1.8]">
                      {activeCase.description}
                    </p>
                  </div>

                  {/* Metrics with gradient divider */}
                  <div className="flex flex-row md:flex-col gap-6 md:gap-7 md:w-44 md:pl-8 relative">
                    {/* Gradient vertical line on desktop */}
                    <div
                      className={`hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b ${activeCase.gradient} opacity-30`}
                    />
                    {activeCase.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="font-mono text-xl md:text-2xl font-bold text-foreground mb-1">
                          {m.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.12em] text-muted">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
