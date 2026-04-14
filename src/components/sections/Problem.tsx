"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const STATS = [
  {
    value: "67",
    suffix: "%",
    description:
      "of organizational decisions are made without modeling downstream human consequences",
    gradient: "/gradients/bg.png",
  },
  {
    value: "1.5",
    prefix: "$",
    suffix: "T",
    description:
      "in annual productivity lost globally to avoidable attrition, poor hiring, and disengagement",
    gradient: "/gradients/bg-1.png",
  },
  {
    value: "12",
    suffix: "-18mo",
    description:
      "the average delay before a bad organizational decision becomes fully visible in performance data",
    gradient: "/gradients/bg-5.png",
  },
];

export default function Problem() {
  return (
    <SectionWrapper dark={false}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <Eyebrow>The Problem</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            You&apos;re making irreversible decisions
            <br />
            <span className="italic text-muted">with no rehearsal.</span>
          </h2>
          <p className="mt-8 text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Traditional HR analytics describes what happened. Replika shows you
            what will.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative rounded-2xl overflow-hidden border border-white/[0.06] p-8 group hover:border-white/[0.12] transition-all duration-500"
            >
              {/* Gradient background at low opacity */}
              <div
                className="absolute inset-0 opacity-[0.12] bg-cover bg-center transition-opacity duration-500 group-hover:opacity-[0.2]"
                style={{ backgroundImage: `url(${stat.gradient})` }}
              />
              <div className="absolute inset-0 bg-surface/80" />

              <div className="relative z-10">
                <div className="font-mono text-5xl md:text-6xl font-bold mb-4 gradient-text">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
