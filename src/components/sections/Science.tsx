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
      "Each organizational scenario is run across thousands of stochastic branches. Outcomes are expressed as full probability distributions — p50, p90, confidence intervals — rather than single-point forecasts. Decision quality is measured, not guessed.",
    gradient: "from-[#7B61FF] to-[#A78BFA]",
  },
  {
    id: "multi-agent",
    title: "Multi-Agent LLM + OODA Loop",
    tag: "Agent Architecture",
    description:
      "Each twin operates through an Observe-Orient-Decide-Act feedback loop. A separation between a strategic Decision layer and tactical Execution layer mirrors the cognitive architecture of real decision-makers — reducing hallucination and improving behavioral fidelity.",
    gradient: "from-[#F97066] to-[#FBB4A5]",
  },
  {
    id: "ona",
    title: "Organizational Network Analysis",
    tag: "Network Science",
    description:
      "Agent relationships are modeled as a dynamic graph. Centrality measures, bridge detection, and cluster analysis identify influence networks, communication bottlenecks, and isolation risks — and update as the simulation evolves.",
    gradient: "from-[#2DD4BF] to-[#67E8D0]",
  },
  {
    id: "psychometric",
    title: "Trait-Based Behavioral Modeling",
    tag: "Psychometric Grounding",
    description:
      "Agent decision-making is constrained and guided by validated psychometric dimensions — Core Drivers, Core Values, and personality traits — functioning as a Vector Knowledge Base that prevents behavioral drift.",
    gradient: "from-[#7B61FF] to-[#2DD4BF]",
  },
  {
    id: "validation",
    title: "Ablation Testing & Benchmarking",
    tag: "Validation",
    description:
      "Twin configurations are benchmarked against real organizational outcomes — measuring decision accuracy, attrition prediction precision/recall, and intervention effect size using standardized composite scoring.",
    gradient: "from-[#F97066] to-[#7B61FF]",
  },
  {
    id: "branching",
    title: "Branching Sequential Simulation",
    tag: "Scenario Design",
    description:
      "Nested decision trees capture cascading second and third-order effects. What happens in month 3 depends on what emerged in month 1 — the simulation captures consequences that single-variable models systematically miss.",
    gradient: "from-[#2DD4BF] to-[#F97066]",
  },
];

export default function Science() {
  const [openId, setOpenId] = useState<string | null>("monte-carlo");

  return (
    <SectionWrapper id="science" surface>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
        style={{ backgroundImage: "url(/gradients/bg-crl-fade.jpg)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto w-full">
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

        <div className="flex flex-col gap-3">
          {METHODS.map((method, i) => {
            const isOpen = openId === method.id;
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative"
              >
                {/* Gradient border wrapper */}
                <div
                  className={`relative rounded-2xl p-px transition-all duration-500 ${
                    isOpen ? "bg-gradient-to-r " + method.gradient : "bg-transparent"
                  }`}
                >
                  {/* Glow effect behind the card when open */}
                  {isOpen && (
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${method.gradient} opacity-[0.12] blur-xl -z-10`}
                    />
                  )}

                  <div
                    className={`relative rounded-[15px] transition-all duration-500 ${
                      isOpen ? "bg-white" : "bg-transparent"
                    }`}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : method.id)}
                      className="w-full text-left px-7 py-5 flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-5 min-w-0">
                        {/* Small gradient dot */}
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-br ${method.gradient} flex-shrink-0 transition-all duration-300 ${
                            isOpen ? "scale-100 opacity-100" : "scale-75 opacity-30 group-hover:opacity-60"
                          }`}
                        />
                        <div className="min-w-0">
                          <span
                            className={`text-[10px] uppercase tracking-[0.15em] block mb-0.5 transition-colors duration-300 ${
                              isOpen ? "text-muted" : "text-muted/50"
                            }`}
                          >
                            {method.tag}
                          </span>
                          <span
                            className={`text-[15px] font-medium transition-colors duration-300 ${
                              isOpen ? "text-foreground" : "text-muted group-hover:text-foreground"
                            }`}
                          >
                            {method.title}
                          </span>
                        </div>
                      </div>

                      {/* Animated plus/minus */}
                      <div className="relative w-5 h-5 flex-shrink-0">
                        <span
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-px bg-muted/60 transition-all duration-300"
                        />
                        <span
                          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3.5 bg-muted/60 transition-all duration-300 ${
                            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                          }`}
                        />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-muted leading-[1.8] px-7 pl-14 pb-6">
                            {method.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
