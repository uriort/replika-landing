"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";

const METHODS = [
  {
    id: "monte-carlo",
    title: "Monte Carlo Simulation",
    tag: "Core Method",
    description:
      "Each organizational scenario is run across thousands of stochastic branches. Outcomes are expressed as full probability distributions -- p50, p90, confidence intervals -- rather than single-point forecasts. Decision quality is measured, not guessed.",
    accent: "accent-purple",
  },
  {
    id: "multi-agent",
    title: "Multi-Agent LLM + OODA Loop",
    tag: "Agent Architecture",
    description:
      "Each twin operates through an Observe-Orient-Decide-Act feedback loop. A separation between a strategic Decision layer and tactical Execution layer mirrors the cognitive architecture of real decision-makers -- reducing hallucination and improving behavioral fidelity.",
    accent: "accent-coral",
  },
  {
    id: "ona",
    title: "Organizational Network Analysis",
    tag: "Network Science",
    description:
      "Agent relationships are modeled as a dynamic graph. Centrality measures, bridge detection, and cluster analysis identify influence networks, communication bottlenecks, and isolation risks -- and update as the simulation evolves.",
    accent: "accent-teal",
  },
  {
    id: "psychometric",
    title: "Trait-Based Behavioral Modeling",
    tag: "Psychometric Grounding",
    description:
      "Agent decision-making is constrained and guided by validated psychometric dimensions -- Core Drivers, Core Values, and personality traits -- functioning as a Vector Knowledge Base that prevents behavioral drift.",
    accent: "accent-purple",
  },
  {
    id: "validation",
    title: "Ablation Testing & Benchmarking",
    tag: "Validation",
    description:
      "Twin configurations are benchmarked against real organizational outcomes -- measuring decision accuracy, attrition prediction precision/recall, and intervention effect size using standardized composite scoring.",
    accent: "accent-coral",
  },
  {
    id: "branching",
    title: "Branching Sequential Simulation",
    tag: "Scenario Design",
    description:
      "Nested decision trees capture cascading second and third-order effects. What happens in month 3 depends on what emerged in month 1 -- the simulation captures consequences that single-variable models systematically miss.",
    accent: "accent-teal",
  },
];

export default function Science() {
  const [openId, setOpenId] = useState<string | null>("monte-carlo");

  return (
    <SectionWrapper id="science" surface>
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
        style={{ backgroundImage: "url(/gradients/bg-crl-fade.jpg)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <Eyebrow>Scientific Foundation</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground">
            Grounded in the science of
            <br />
            <span className="gradient-text">simulation.</span>
          </h2>
          <p className="mt-6 text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Every output is a probability distribution, not a point prediction.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-2">
          {METHODS.map((method, i) => {
            const isOpen = openId === method.id;
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : method.id)}
                  className={`w-full text-left px-6 py-5 rounded-xl transition-all duration-300 flex items-center justify-between gap-4 ${
                    isOpen
                      ? "bg-white card-shadow"
                      : "hover:bg-white/60"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-1.5 h-8 rounded-full bg-${method.accent} transition-opacity ${
                        isOpen ? "opacity-100" : "opacity-30"
                      }`}
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-muted block mb-0.5">
                        {method.tag}
                      </span>
                      <span
                        className={`text-base font-medium transition-colors ${
                          isOpen ? "text-foreground" : "text-muted"
                        }`}
                      >
                        {method.title}
                      </span>
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-muted transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-muted leading-relaxed px-6 pl-[52px] pb-4 pt-1">
                        {method.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
