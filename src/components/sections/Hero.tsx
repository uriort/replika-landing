"use client";

import { motion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import ArrowCTA from "@/components/ui/ArrowCTA";

const RING1 = [
  { label: "Core Drivers", color: "#635bff" },
  { label: "Network\nPosition", color: "#ff6b6b" },
  { label: "Contextual\nState", color: "#00d4aa" },
  { label: "Core Values", color: "#635bff" },
  { label: "Environmental", color: "#ff6b6b" },
  { label: "Continuous\nSync", color: "#00d4aa" },
];

const RING2 = [
  "Driven", "Relationships", "Team Dynamics", "Role Context",
  "Integrity", "Market Signals", "Engagement", "Trust Network",
  "Grit", "Tenure", "Influence", "Collaboration",
];

const RING3 = Array.from({ length: 18 }, (_, i) => i);
const RING4 = Array.from({ length: 24 }, (_, i) => i);

function polarToXY(angle: number, radius: number, cx: number, cy: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + Math.cos(rad) * radius, y: cy + Math.sin(rad) * radius };
}

function FlowParticles({ cx, cy, r1, r2, r3, r4 }: { cx: number; cy: number; r1: number; r2: number; r3: number; r4: number }) {
  const particles: { fromAngle: number; fromR: number; toR: number; delay: number; duration: number; color: string }[] = [];
  const colors = ["#635bff", "#00d4aa", "#ff6b6b"];

  for (let i = 0; i < 8; i++) {
    particles.push({ fromAngle: i * 45 - 90, fromR: r4, toR: r3, delay: i * 0.8, duration: 3, color: colors[i % 3] });
  }
  for (let i = 0; i < 6; i++) {
    particles.push({ fromAngle: i * 60 - 90, fromR: r3, toR: r2, delay: i * 1.1 + 0.5, duration: 2.5, color: colors[i % 3] });
  }
  for (let i = 0; i < 6; i++) {
    particles.push({ fromAngle: i * 60 - 90, fromR: r2, toR: r1, delay: i * 0.9 + 1, duration: 2, color: colors[i % 3] });
  }
  for (let i = 0; i < 6; i++) {
    particles.push({ fromAngle: i * 60 - 90, fromR: r1, toR: 0, delay: i * 0.7 + 1.5, duration: 1.8, color: colors[i % 3] });
  }

  return (
    <>
      {particles.map((p, idx) => {
        const from = polarToXY(p.fromAngle, p.fromR, cx, cy);
        const to = p.toR === 0 ? { x: cx, y: cy } : polarToXY(p.fromAngle, p.toR, cx, cy);
        return (
          <circle key={`particle-${idx}`} r={1.5} fill={p.color} opacity={0}>
            <animate attributeName="cx" values={`${from.x};${to.x}`} dur={`${p.duration}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${from.y};${to.y}`} dur={`${p.duration}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.5;0.3;0" dur={`${p.duration}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
    </>
  );
}

export default function Hero() {
  const cx = 500;
  const cy = 380;
  const r1 = 150;
  const r2 = 260;
  const r3 = 350;
  const r4 = 430;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: "url(/gradients/bg-crl-fade.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* White overlay: light at top for readability, transparent in middle to show gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/10 via-60% to-transparent" />
      {/* Hard bottom fade to white - covers last 25% of section */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-white via-white/90 to-transparent z-[5]" />

      {/* Ambient blobs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent-purple/[0.08] rounded-full blur-[150px]" />
      <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-accent-teal/[0.06] rounded-full blur-[130px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-coral/[0.05] rounded-full blur-[120px]" />

      {/* Everything in one flow - text, CTAs, diagram */}
      <div className="relative z-10 text-center px-6 pt-28 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Eyebrow>Replika</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-[0.95] tracking-tight mb-5 max-w-5xl mx-auto text-foreground"
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
          We&apos;re building a living replica of your organization powered by
          thousands of agent twins, so every critical decision can be simulated
          before it&apos;s made.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <ArrowCTA href="#early-access">Explore more</ArrowCTA>
        </motion.div>
      </div>

      {/* Radial diagram - same section, same gradient behind it */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="relative w-full mt-2 md:mt-4"
      >
        {/* Side fades only */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-white/50 to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-white/50 to-transparent" />
        </div>

        <svg
          viewBox="0 0 1000 850"
          className="w-full max-w-5xl mx-auto"
          style={{ overflow: "visible" }}
        >
          <defs>
            <clipPath id="hub-clip">
              <circle cx={cx} cy={cy} r={48} />
            </clipPath>
          </defs>

          {/* Concentric ring guides */}
          <circle cx={cx} cy={cy} r={r1} fill="none" stroke="rgba(10,37,64,0.04)" strokeWidth="0.8" />
          <circle cx={cx} cy={cy} r={r2} fill="none" stroke="rgba(10,37,64,0.03)" strokeWidth="0.6" />
          <circle cx={cx} cy={cy} r={r3} fill="none" stroke="rgba(10,37,64,0.02)" strokeWidth="0.5" />
          <circle cx={cx} cy={cy} r={r4} fill="none" stroke="rgba(10,37,64,0.015)" strokeWidth="0.4" />

          {/* Lines from center to Ring 1 */}
          {RING1.map((_, i) => {
            const angle = i * 60 - 90;
            const p = polarToXY(angle, r1, cx, cy);
            return (
              <line key={`l1-${i}`} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(10,37,64,0.06)" strokeWidth="0.8" strokeDasharray="4 3" />
            );
          })}

          {/* Lines from Ring 1 to Ring 2 */}
          {RING2.map((_, i) => {
            const angle2 = i * 30 - 90;
            const p2 = polarToXY(angle2, r2, cx, cy);
            const nearestR1Angle = Math.round(i / 2) * 60 - 90;
            const p1 = polarToXY(nearestR1Angle, r1, cx, cy);
            return (
              <line key={`l2-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(10,37,64,0.04)" strokeWidth="0.6" strokeDasharray="3 3" />
            );
          })}

          {/* Lines from Ring 2 to Ring 3 */}
          {RING3.map((_, i) => {
            const angle3 = i * 20 - 90;
            const p3 = polarToXY(angle3, r3, cx, cy);
            const nearestR2Angle = Math.round(i * 12 / 18 * 1.5) * (360 / 12) - 90;
            const p2 = polarToXY(nearestR2Angle, r2, cx, cy);
            return (
              <line key={`l3-${i}`} x1={p2.x} y1={p2.y} x2={p3.x} y2={p3.y} stroke="rgba(10,37,64,0.025)" strokeWidth="0.5" strokeDasharray="2 3" />
            );
          })}

          {/* Lines from Ring 3 to Ring 4 */}
          {RING4.map((_, i) => {
            const angle4 = i * 15 - 90;
            const p4 = polarToXY(angle4, r4, cx, cy);
            const nearestR3Angle = Math.round(i * 18 / 24) * 20 - 90;
            const p3 = polarToXY(nearestR3Angle, r3, cx, cy);
            return (
              <line key={`l4-${i}`} x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} stroke="rgba(10,37,64,0.015)" strokeWidth="0.4" strokeDasharray="2 4" />
            );
          })}

          {/* Animated particles flowing inward */}
          <FlowParticles cx={cx} cy={cy} r1={r1} r2={r2} r3={r3} r4={r4} />

          {/* Center hub - gradient background */}
          <image href="/gradients/bg-crl-fade.jpg" x={cx - 48} y={cy - 48} width={96} height={96} clipPath="url(#hub-clip)" preserveAspectRatio="xMidYMid slice" />
          <circle cx={cx} cy={cy} r={48} fill="rgba(255,255,255,0.35)" stroke="rgba(99,91,255,0.2)" strokeWidth="1.5" />
          <text x={cx} y={cy - 10} textAnchor="middle" fill="#0a2540" fontFamily="sans-serif" fontSize="7" letterSpacing="0.15em" opacity={0.6}>
            DIGITAL
          </text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="700" fill="#0a2540">
            Twin
          </text>

          {/* Ring 1 */}
          {RING1.map((node, i) => {
            const angle = i * 60 - 90;
            const p = polarToXY(angle, r1, cx, cy);
            const lines = node.label.split("\n");
            return (
              <g key={`r1-${i}`}>
                <circle cx={p.x} cy={p.y} r={32} fill="white" stroke="rgba(10,37,64,0.08)" strokeWidth="0.8" />
                <circle cx={p.x} cy={p.y - (lines.length > 1 ? 12 : 8)} r={3} fill={node.color} />
                {lines.map((line, li) => (
                  <text key={li} x={p.x} y={p.y + (lines.length > 1 ? -2 + li * 11 : 5)} textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="500" fill="#0a2540">
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* Ring 2 */}
          {RING2.map((label, i) => {
            const angle = i * 30 - 90;
            const p = polarToXY(angle, r2, cx, cy);
            const colors = ["#635bff", "#00d4aa", "#ff6b6b"];
            return (
              <g key={`r2-${i}`}>
                <circle cx={p.x} cy={p.y} r={22} fill="white" stroke="rgba(10,37,64,0.06)" strokeWidth="0.6" />
                <circle cx={p.x} cy={p.y - 6} r={2} fill={colors[i % 3]} opacity={0.7} />
                <text x={p.x} y={p.y + 5} textAnchor="middle" fontFamily="sans-serif" fontSize="5.5" fill="#0a2540" opacity={0.7}>
                  {label}
                </text>
              </g>
            );
          })}

          {/* Ring 3 */}
          {RING3.map((_, i) => {
            const angle = i * 20 - 90;
            const p = polarToXY(angle, r3, cx, cy);
            const colors = ["#635bff", "#00d4aa", "#ff6b6b"];
            return (
              <g key={`r3-${i}`}>
                <circle cx={p.x} cy={p.y} r={12} fill="white" stroke="rgba(10,37,64,0.04)" strokeWidth="0.5" />
                <circle cx={p.x} cy={p.y} r={2.5} fill={colors[i % 3]} opacity={0.4} />
              </g>
            );
          })}

          {/* Ring 4 */}
          {RING4.map((_, i) => {
            const angle = i * 15 - 90;
            const p = polarToXY(angle, r4, cx, cy);
            const colors = ["#635bff", "#00d4aa", "#ff6b6b"];
            return (
              <circle key={`r4-${i}`} cx={p.x} cy={p.y} r={6} fill="white" stroke={colors[i % 3]} strokeWidth="0.4" opacity={0.25} />
            );
          })}
        </svg>
      </motion.div>
    </section>
  );
}
