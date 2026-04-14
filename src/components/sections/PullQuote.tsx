"use client";

import { motion } from "framer-motion";

export default function PullQuote() {
  return (
    <section className="relative min-h-[70vh] w-full flex items-center justify-center bg-background overflow-hidden px-6 py-24">
      {/* Large decorative quotation mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-serif text-white/[0.02] select-none pointer-events-none leading-none">
        &ldquo;
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-purple/[0.04] rounded-full blur-[120px]" />

      <motion.blockquote
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <p className="font-serif text-2xl md:text-3xl lg:text-4xl italic leading-relaxed gradient-text">
          &ldquo;You can&apos;t survey a future that hasn&apos;t happened yet.
          But you can simulate it -- and run it a thousand times before
          committing to any one version of it.&rdquo;
        </p>
        <cite className="block mt-8 text-sm text-muted not-italic tracking-wide">
          -- The Replika Thesis
        </cite>
      </motion.blockquote>
    </section>
  );
}
