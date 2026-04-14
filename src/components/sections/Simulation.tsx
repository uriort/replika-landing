"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import OrgSimulation from "@/components/ui/OrgSimulation";

export default function Simulation() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-6 py-24">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-accent-purple/[0.03] rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-teal/[0.03] rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 relative z-10"
      >
        <Eyebrow>Live Simulation</Eyebrow>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
          40 agents. One{" "}
          <span className="gradient-text">living organization.</span>
        </h2>
        <p className="mt-6 text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Each node is a digital twin with its own psychology, drivers, and
          values. Watch them interact across the hierarchy in real time.
          Hover to inspect any agent.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 w-full max-w-5xl h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-white/[0.06] bg-black/30"
      >
        <OrgSimulation />
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] text-muted"
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-purple" />
          <span>Visionary / Strategic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-coral" />
          <span>Collaborative / Decisive</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-teal" />
          <span>Empathetic / Resilient</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-white/10 rounded" />
          <span>Hierarchy edges</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white/40" />
          </div>
          <span>Interaction pulse</span>
        </div>
      </motion.div>
    </section>
  );
}
