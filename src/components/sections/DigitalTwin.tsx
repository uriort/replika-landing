"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";

const ASPECTS = [
  {
    id: "psychometric",
    label: "Psychometric",
    color: "accent-purple",
    angle: 0,
    description:
      "Core Drivers, Core Values, personality dimensions, cognitive style -- sourced directly from Deeper Signals assessments. The twin reasons and decides in character.",
  },
  {
    id: "network",
    label: "Network Position",
    color: "accent-coral",
    angle: 60,
    description:
      "ONA edge data maps each twin's real relationships: who they collaborate with, trust, receive information from, and influence.",
  },
  {
    id: "context",
    label: "Contextual State",
    color: "accent-teal",
    angle: 120,
    description:
      "Role, tenure, compensation band, reporting structure, and team composition -- all dynamically updated as the simulation evolves.",
  },
  {
    id: "memory",
    label: "Behavioral Memory",
    color: "accent-purple",
    angle: 180,
    description:
      "Each twin maintains a decision history and interaction log -- allowing emergent patterns and behavioral drift to surface naturally.",
  },
  {
    id: "environment",
    label: "Environmental",
    color: "accent-coral",
    angle: 240,
    description:
      "Live market data, company performance, and macroeconomic conditions are injected into every simulation run.",
  },
  {
    id: "updating",
    label: "Continuous Sync",
    color: "accent-teal",
    angle: 300,
    description:
      "As new assessment data and relationship changes enter the system, profiles update -- reflecting your organization as it is now.",
  },
];

export default function DigitalTwin() {
  const [active, setActive] = useState<string | null>(null);
  const activeAspect = ASPECTS.find((a) => a.id === active);

  return (
    <SectionWrapper>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <Eyebrow>The Digital Twin</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Every signal that makes
            <br />a person{" "}
            <span className="gradient-text">predictable.</span>
          </h2>
        </motion.div>

        {/* Radial diagram - desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block relative mx-auto"
          style={{ width: 560, height: 560 }}
        >
          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-surface border border-white/[0.08] flex items-center justify-center z-10">
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-[0.15em] text-muted mb-1">
                Agent
              </div>
              <div className="text-lg font-semibold gradient-text">Twin</div>
            </div>
          </div>

          {/* Connecting rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-white/[0.04]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-white/[0.03]" />

          {/* Orbiting nodes */}
          {ASPECTS.map((aspect) => {
            const rad = (aspect.angle * Math.PI) / 180;
            const orbitRadius = 210;
            const x = Math.cos(rad) * orbitRadius;
            const y = Math.sin(rad) * orbitRadius;
            const isActive = active === aspect.id;

            return (
              <div key={aspect.id}>
                {/* Connecting line from center to node */}
                <svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  viewBox="0 0 560 560"
                >
                  <line
                    x1={280}
                    y1={280}
                    x2={280 + x}
                    y2={280 + y}
                    stroke={isActive ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)"}
                    strokeWidth={isActive ? 1.5 : 0.8}
                    strokeDasharray={isActive ? "none" : "4 4"}
                  />
                </svg>

                {/* Node */}
                <button
                  onClick={() => setActive(isActive ? null : aspect.id)}
                  onMouseEnter={() => setActive(aspect.id)}
                  className={`absolute z-10 flex items-center justify-center transition-all duration-500 rounded-full cursor-pointer ${
                    isActive
                      ? "w-28 h-28 glass-strong scale-110"
                      : "w-20 h-20 glass hover:scale-105"
                  }`}
                  style={{
                    left: 280 + x - (isActive ? 56 : 40),
                    top: 280 + y - (isActive ? 56 : 40),
                  }}
                >
                  <div className="text-center px-2">
                    <div
                      className={`w-2 h-2 rounded-full mx-auto mb-1.5 bg-${aspect.color}`}
                    />
                    <span className="text-[10px] font-medium text-foreground leading-tight block">
                      {aspect.label}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </motion.div>

        {/* Active description - desktop */}
        <motion.div
          initial={false}
          animate={{ opacity: activeAspect ? 1 : 0, y: activeAspect ? 0 : 10 }}
          className="hidden md:block text-center mt-10 max-w-lg mx-auto min-h-[60px]"
        >
          {activeAspect && (
            <p className="text-sm text-muted leading-relaxed">
              <span className={`text-${activeAspect.color} font-medium`}>
                {activeAspect.label}
              </span>{" "}
              -- {activeAspect.description}
            </p>
          )}
          {!activeAspect && (
            <p className="text-xs text-muted/50 italic">
              Hover over a node to explore
            </p>
          )}
        </motion.div>

        {/* Mobile: stacked list */}
        <div className="md:hidden flex flex-col gap-4">
          {ASPECTS.map((aspect, i) => (
            <motion.div
              key={aspect.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-4 py-4 border-b border-white/[0.04] last:border-0"
            >
              <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 bg-${aspect.color}`} />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {aspect.label}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {aspect.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
