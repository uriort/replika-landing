"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";

const STEPS = [
  {
    num: "01",
    title: "INGEST",
    subtitle: "Build the Twin",
    description:
      "Each employee becomes an agent twin -- grounded in their Core Drivers, Core Values, personality profile, role, tenure, and ONA edge data. The twin knows who they talk to, who they trust, and what motivates them.",
  },
  {
    num: "02",
    title: "CONTEXT",
    subtitle: "Set the World",
    description:
      "Live variables feed the simulation: stock price, P&L, headcount changes, market shifts. Your digital org operates inside a faithful replica of its actual industry context -- updated continuously.",
  },
  {
    num: "03",
    title: "SIMULATE",
    subtitle: "Run at Scale",
    description:
      "Monte Carlo simulation runs thousands of scenario branches simultaneously. Each branch evolves through daily agent interactions -- producing emergent outcomes no survey could predict.",
  },
  {
    num: "04",
    title: "INTERVENE",
    subtitle: "Act with Confidence",
    description:
      "Test a hire. Change a compensation band. Restructure a team. See the probability distribution of outcomes across a thousand simulated futures before a single real decision is made.",
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <SectionWrapper id="how-it-works">
      <div className="max-w-6xl mx-auto w-full" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <Eyebrow>Architecture</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            A living replica of your
            <br />
            <span className="italic gradient-text">entire organization.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-[28px] md:left-[40px] top-0 bottom-0 w-[1px] bg-white/[0.06]">
            <motion.div
              className="w-full bg-gradient-to-b from-accent-purple via-accent-coral to-accent-teal"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-16 md:gap-20">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-8 md:gap-12 items-start pl-2 md:pl-4"
              >
                <div className="relative z-10 flex-shrink-0 w-14 h-14 md:w-18 md:h-18 rounded-full bg-surface border border-white/[0.08] flex items-center justify-center">
                  <span className="font-mono text-sm gradient-text font-bold">
                    {step.num}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-purple">
                      {step.title}
                    </span>
                    <span className="text-xs text-muted">
                      {step.subtitle}
                    </span>
                  </div>
                  <p className="text-muted text-base leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
