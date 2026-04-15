"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import ArrowCTA from "@/components/ui/ArrowCTA";

const RING1 = [
  { label: "Core Drivers", color: "#635bff" },
  { label: "Network Position", color: "#ff6b6b" },
  { label: "Contextual State", color: "#00d4aa" },
  { label: "Core Values", color: "#635bff" },
  { label: "Environmental", color: "#ff6b6b" },
  { label: "Continuous Sync", color: "#00d4aa" },
];

const RING2 = [
  "Driven", "Relationships", "Team Dynamics", "Role Context",
  "Integrity", "Market Signals", "Engagement", "Trust Network",
  "Grit", "Tenure", "Influence", "Collaboration",
];

interface Node {
  baseAngle: number;
  radius: number;
  size: number;
  color: string;
  label?: string;
  ring: number;
  opacity: number;
  drift: number;
  driftSpeed: number;
  driftPhase: number;
}

interface Connection {
  from: number;
  to: number;
  color1: string;
  color2: string;
  phase: number;
  speed: number;
}

function polarToXY(angle: number, radius: number, cx: number, cy: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + Math.cos(rad) * radius, y: cy + Math.sin(rad) * radius };
}

function drawPerson(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) {
  ctx.globalAlpha = opacity;
  // Head
  const headR = size * 0.32;
  const bodyY = y + headR * 0.4;
  ctx.beginPath();
  ctx.arc(x, y - headR * 0.8, headR, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  // Body (rounded trapezoid shape)
  ctx.beginPath();
  ctx.moveTo(x - size * 0.35, bodyY + size * 0.7);
  ctx.quadraticCurveTo(x - size * 0.38, bodyY + size * 0.15, x, bodyY);
  ctx.quadraticCurveTo(x + size * 0.38, bodyY + size * 0.15, x + size * 0.35, bodyY + size * 0.7);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
}

function NetworkDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const initedRef = useRef(false);

  const buildNodes = useCallback((isMobile: boolean) => {
    const nodes: Node[] = [];
    const colors = ["#635bff", "#00d4aa", "#ff6b6b"];
    const r1 = isMobile ? 90 : 150;
    const r2 = isMobile ? 160 : 260;
    const r3 = isMobile ? 220 : 350;
    const r4 = isMobile ? 270 : 430;

    // Ring 1
    RING1.forEach((n, i) => {
      nodes.push({
        baseAngle: i * 60 - 90, radius: r1, size: isMobile ? 16 : 22,
        color: n.color, label: n.label, ring: 1, opacity: 1,
        drift: 3, driftSpeed: 0.3 + Math.random() * 0.2, driftPhase: Math.random() * Math.PI * 2,
      });
    });
    // Ring 2
    RING2.forEach((label, i) => {
      nodes.push({
        baseAngle: i * 30 - 90, radius: r2, size: isMobile ? 11 : 16,
        color: colors[i % 3], label, ring: 2, opacity: 0.85,
        drift: 4, driftSpeed: 0.25 + Math.random() * 0.2, driftPhase: Math.random() * Math.PI * 2,
      });
    });
    // Ring 3
    for (let i = 0; i < 18; i++) {
      nodes.push({
        baseAngle: i * 20 - 90, radius: r3, size: isMobile ? 7 : 10,
        color: colors[i % 3], ring: 3, opacity: 0.5,
        drift: 5, driftSpeed: 0.2 + Math.random() * 0.15, driftPhase: Math.random() * Math.PI * 2,
      });
    }
    // Ring 4
    for (let i = 0; i < 24; i++) {
      nodes.push({
        baseAngle: i * 15 - 90, radius: r4, size: isMobile ? 4 : 6,
        color: colors[i % 3], ring: 4, opacity: 0.25,
        drift: 6, driftSpeed: 0.15 + Math.random() * 0.1, driftPhase: Math.random() * Math.PI * 2,
      });
    }
    return nodes;
  }, []);

  const buildConnections = useCallback((nodes: Node[]) => {
    const conns: Connection[] = [];
    // Connect center to ring 1
    for (let i = 0; i < 6; i++) {
      conns.push({ from: -1, to: i, color1: "#635bff", color2: nodes[i].color, phase: Math.random() * Math.PI * 2, speed: 0.4 + Math.random() * 0.3 });
    }
    // Ring 1 to Ring 2
    for (let i = 0; i < 12; i++) {
      const r1Idx = Math.floor(i / 2);
      conns.push({ from: r1Idx, to: 6 + i, color1: nodes[r1Idx].color, color2: nodes[6 + i].color, phase: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.3 });
    }
    // Ring 2 to Ring 3 (sparse)
    for (let i = 0; i < 18; i++) {
      const r2Idx = 6 + Math.floor(i * 12 / 18);
      conns.push({ from: r2Idx, to: 18 + i, color1: nodes[r2Idx].color, color2: nodes[18 + i].color, phase: Math.random() * Math.PI * 2, speed: 0.2 + Math.random() * 0.2 });
    }
    // Some cross-ring connections for network feel
    for (let i = 0; i < 8; i++) {
      const a = 6 + Math.floor(Math.random() * 12);
      const b = 6 + Math.floor(Math.random() * 12);
      if (a !== b) {
        conns.push({ from: a, to: b, color1: nodes[a].color, color2: nodes[b].color, phase: Math.random() * Math.PI * 2, speed: 0.5 + Math.random() * 0.4 });
      }
    }
    return conns;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = rect.width < 640;
      nodesRef.current = buildNodes(isMobile);
      connectionsRef.current = buildConnections(nodesRef.current);
      initedRef.current = true;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = (time: number) => {
      if (!initedRef.current) { animRef.current = requestAnimationFrame(animate); return; }
      const t = time / 1000;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h * 0.5;

      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const conns = connectionsRef.current;

      // Calculate current positions
      const positions = nodes.map((n) => {
        const angleDrift = Math.sin(t * n.driftSpeed + n.driftPhase) * n.drift;
        return polarToXY(n.baseAngle + angleDrift, n.radius, cx, cy);
      });

      // Draw connections with animated gradient opacity
      conns.forEach((conn) => {
        const fromPos = conn.from === -1 ? { x: cx, y: cy } : positions[conn.from];
        const toPos = positions[conn.to];
        if (!fromPos || !toPos) return;

        // Pulsing opacity — connections appear and fade
        const pulse = Math.sin(t * conn.speed + conn.phase);
        const opacity = Math.max(0, pulse * 0.4 + 0.1);
        if (opacity < 0.02) return;

        const grad = ctx.createLinearGradient(fromPos.x, fromPos.y, toPos.x, toPos.y);
        grad.addColorStop(0, conn.color1);
        grad.addColorStop(1, conn.color2);

        ctx.beginPath();
        ctx.moveTo(fromPos.x, fromPos.y);
        ctx.lineTo(toPos.x, toPos.y);
        ctx.strokeStyle = grad;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = conn.from === -1 ? 1.2 : 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Draw concentric ring guides
      [nodes[0]?.radius, nodes[6]?.radius, nodes[18]?.radius, nodes[36]?.radius].forEach((r, i) => {
        if (!r) return;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(10,37,64,${0.04 - i * 0.008})`;
        ctx.lineWidth = 0.8 - i * 0.15;
        ctx.stroke();
      });

      // Draw nodes (person icons)
      positions.forEach((pos, i) => {
        const node = nodes[i];
        drawPerson(ctx, pos.x, pos.y, node.size, node.color, node.opacity);

        // Labels for ring 1 and 2
        if (node.label && node.ring <= 2) {
          ctx.globalAlpha = node.ring === 1 ? 0.85 : 0.6;
          const isMobile = w < 640;
          ctx.font = `500 ${node.ring === 1 ? (isMobile ? "8px" : "10px") : (isMobile ? "6px" : "8px")} system-ui, sans-serif`;
          ctx.fillStyle = "#0a2540";
          ctx.textAlign = "center";
          ctx.fillText(node.label, pos.x, pos.y + node.size + (isMobile ? 8 : 12));
          ctx.globalAlpha = 1;
        }
      });

      // Center hub — gradient fill
      const hubR = w < 640 ? 30 : 48;
      const hubGrad = ctx.createLinearGradient(cx - hubR, cy - hubR, cx + hubR, cy + hubR);
      hubGrad.addColorStop(0, "#7B61FF");
      hubGrad.addColorStop(0.5, "#F97066");
      hubGrad.addColorStop(1, "#2DD4BF");
      ctx.beginPath();
      ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
      ctx.fillStyle = hubGrad;
      ctx.globalAlpha = 0.25;
      ctx.fill();
      ctx.globalAlpha = 1;
      // White overlay for softer look
      ctx.beginPath();
      ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fill();
      // Gradient stroke
      ctx.beginPath();
      ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
      ctx.strokeStyle = hubGrad;
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.fillStyle = "#0a2540";
      ctx.globalAlpha = 0.55;
      ctx.font = `600 ${w < 640 ? "5px" : "7px"} system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.letterSpacing = "0.15em";
      ctx.fillText("AGENTIC", cx, cy - (w < 640 ? 5 : 8));
      ctx.globalAlpha = 1;
      ctx.font = `700 ${w < 640 ? "12px" : "16px"} system-ui, sans-serif`;
      ctx.fillText("Twin", cx, cy + (w < 640 ? 7 : 10));

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [buildNodes, buildConnections]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(123,97,255,0.18) 0%, rgba(168,139,250,0.1) 25%, rgba(249,112,102,0.06) 40%, rgba(45,212,191,0.04) 55%, rgba(255,255,255,0.95) 80%, #ffffff 100%)",
      }}
    >
      {/* Soft edge fades */}
      <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-white to-transparent z-[5]" />

      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent-purple/[0.08] rounded-full blur-[150px]" />
      <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-accent-teal/[0.06] rounded-full blur-[130px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-coral/[0.05] rounded-full blur-[120px]" />

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

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="relative w-full mt-2 md:mt-4"
      >
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-white/50 to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-white/50 to-transparent" />
        </div>

        <div className="w-full max-w-5xl mx-auto aspect-square md:aspect-[4/3]">
          <NetworkDiagram />
        </div>
      </motion.div>
    </section>
  );
}
