"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const STATS = [
  {
    value: "10",
    suffix: "³",
    description:
      "scenario branches per simulation run",
    gradient: "/gradients/bg.png",
  },
  {
    value: "40",
    suffix: "%",
    description:
      "better decisions than human-only planning, in military contexts",
    gradient: "/gradients/bg-1.png",
  },
  {
    value: "6",
    suffix: " min",
    description:
      "to simulate six months of org behavior",
    gradient: "/gradients/bg-5.png",
  },
];

export default function Problem() {
  return (
    <SectionWrapper surface>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <Eyebrow>The Problem</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground">
            See ahead before making
            <br />
            <span className="italic gradient-text">irreversible costly decisions</span>
          </h2>
          <p className="mt-8 text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Traditional analytics describe what happened. Replika shows you
            what will happen.
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
              className="relative rounded-2xl overflow-hidden bg-white p-8 card-shadow group hover:shadow-xl transition-all duration-500"
            >
              {/* Gradient background at low opacity */}
              <div
                className="absolute inset-0 opacity-[0.08] bg-cover bg-center transition-opacity duration-500 group-hover:opacity-[0.15]"
                style={{ backgroundImage: `url(${stat.gradient})` }}
              />

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
