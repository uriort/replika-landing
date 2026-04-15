"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import OrgSimulation from "@/components/ui/OrgSimulation";

export default function DigitalTwin() {
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
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground">
            Every signal that makes
            <br />a person{" "}
            <span className="gradient-text">predictable.</span>
          </h2>
        </motion.div>

        {/* Interactive org simulation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
        >
          {/* Fade edges */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
          </div>
          <OrgSimulation />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
