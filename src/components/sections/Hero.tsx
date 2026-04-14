"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import ArrowCTA from "@/components/ui/ArrowCTA";
import OrgSimulation from "@/components/ui/OrgSimulation";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden min-h-screen flex flex-col">
      {/* Background gradient image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/gradients/bg-crl-fade.jpg)" }}
      />
      {/* Dark overlay + vignette */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,6,11,0.6)_70%,rgba(6,6,11,0.95)_100%)]" />

      {/* Floating ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/[0.08] rounded-full blur-[120px] animate-[pulse-glow_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent-coral/[0.06] rounded-full blur-[100px] animate-[pulse-glow_10s_ease-in-out_infinite_2s]" />

      {/* Top section: headline + CTAs */}
      <div className="relative z-10 text-center px-6 pt-28 md:pt-32 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Eyebrow>Organizational Intelligence</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-[0.95] tracking-tight mb-4 max-w-5xl mx-auto"
        >
          Your organization,{" "}
          <span className="italic gradient-text">simulated.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base md:text-lg text-muted max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Agent digital twins of every person in your organization.
          Thousands of simulations. See what&apos;s coming before it arrives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <ArrowCTA href="#early-access">Request Early Access</ArrowCTA>
          <ArrowCTA href="#how-it-works" variant="secondary">
            See How It Works
          </ArrowCTA>
        </motion.div>
      </div>

      {/* Simulation canvas - fills remaining space */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-6 pb-6 min-h-[350px] md:min-h-[420px]"
      >
        <div className="w-full h-full rounded-2xl overflow-hidden border border-white/[0.04] bg-black/20">
          <OrgSimulation />
        </div>

        {/* Legend overlay - bottom of simulation */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[10px] text-muted/60">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-accent-purple" />
            <span>Visionary</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-accent-coral" />
            <span>Collaborative</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-accent-teal" />
            <span>Empathetic</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
