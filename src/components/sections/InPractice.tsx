"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import TerminalBlock from "@/components/ui/TerminalBlock";

export default function InPractice() {
  return (
    <SectionWrapper dark={false}>
      {/* Ambient teal accent */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-[0.06]">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(/gradients/bg-5.png)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <Eyebrow>In Practice</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Fast forward{" "}
            <span className="italic gradient-text">six months.</span>
          </h2>
          <p className="mt-8 text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            What used to take six months of lived experience now takes six
            minutes of simulation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TerminalBlock />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
