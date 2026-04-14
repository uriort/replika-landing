"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";

const ROWS = [
  "Individual-level behavioral modeling",
  "Forward-looking simulation",
  "Tests specific interventions",
  "Agent-level personality modeling",
  "Network-aware dynamics",
  "Live market / business context",
  "Emergent outcome detection",
  "Continuous twin updating",
];

const COLUMNS = [
  { label: "People Analytics", values: [false, false, false, false, "partial", false, false, false] },
  { label: "Engagement Surveys", values: [false, false, false, false, false, false, false, false] },
  { label: "HR Digital Twins", values: [false, "partial", "partial", false, false, false, false, "partial"] },
];

export default function WhyReplika() {
  return (
    <SectionWrapper dark={false}>
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <Eyebrow>Why Replika</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight">
            Not analytics. Not surveys.
            <br />
            <span className="italic gradient-text">Simulation.</span>
          </h2>
        </motion.div>

        {/* Desktop table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:block overflow-x-auto"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-xs uppercase tracking-[0.15em] text-muted font-medium py-4 pr-4">
                  Capability
                </th>
                {COLUMNS.map((col) => (
                  <th
                    key={col.label}
                    className="text-center text-xs uppercase tracking-[0.15em] text-muted font-medium py-4 px-3"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="text-center text-xs uppercase tracking-[0.15em] font-medium py-4 px-3 gradient-text">
                  Replika
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, ri) => (
                <tr
                  key={row}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="text-foreground py-4 pr-4">{row}</td>
                  {COLUMNS.map((col) => (
                    <td key={col.label} className="text-center py-4 px-3">
                      {col.values[ri] === "partial" ? (
                        <span className="text-yellow-500/60 text-xs">Partial</span>
                      ) : col.values[ri] ? (
                        <span className="text-accent-teal">&#10003;</span>
                      ) : (
                        <span className="text-white/10">--</span>
                      )}
                    </td>
                  ))}
                  <td className="text-center py-4 px-3">
                    <span className="text-accent-teal font-bold">&#10003;</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden flex flex-col gap-4">
          {ROWS.map((row, ri) => (
            <motion.div
              key={row}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ri * 0.05 }}
              className="glass rounded-xl p-5"
            >
              <h4 className="text-sm font-medium text-foreground mb-3">
                {row}
              </h4>
              <div className="flex items-center justify-between text-xs text-muted">
                {COLUMNS.map((col) => (
                  <span key={col.label}>
                    {col.label.split(" ")[0]}:{" "}
                    {col.values[ri] === "partial" ? (
                      <span className="text-yellow-500/60">~</span>
                    ) : (
                      <span className="text-white/10">--</span>
                    )}
                  </span>
                ))}
                <span className="text-accent-teal font-bold">
                  Replika &#10003;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
