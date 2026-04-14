"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";

// --- Types ---
interface Agent {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  tier: number; // 0=CEO, 1=VP, 2=Dir, 3=Mgr, 4=IC
  parentId: number | null;
  radius: number;
  psychology: {
    type: number; // 0=purple, 1=coral, 2=teal
    energy: number; // 0-1 activity level
    label: string;
  };
  pulsePhase: number;
}

interface Interaction {
  from: number;
  to: number;
  progress: number;
  color: string;
  speed: number;
}

// --- Constants ---
const TIER_LABELS = ["CEO", "VP", "Director", "Manager", "IC"];
const TIER_COUNTS = [1, 3, 6, 12, 18];
const PSYCHOLOGY_COLORS = [
  { r: 124, g: 92, b: 191 },  // purple
  { r: 232, g: 115, b: 74 },  // coral
  { r: 61, g: 189, b: 167 },  // teal
];
const DRIVER_LABELS = [
  ["Visionary", "Strategic", "Analytical"],
  ["Collaborative", "Decisive", "Adaptive"],
  ["Empathetic", "Resilient", "Innovative"],
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function buildOrg(width: number, height: number): Agent[] {
  const agents: Agent[] = [];
  const centerX = width / 2;
  let id = 0;

  // Vertical distribution of tiers
  const tierY = (tier: number) => {
    const topPad = height * 0.08;
    const botPad = height * 0.08;
    const usable = height - topPad - botPad;
    return topPad + (tier / (TIER_COUNTS.length - 1)) * usable;
  };

  for (let tier = 0; tier < TIER_COUNTS.length; tier++) {
    const count = TIER_COUNTS[tier];
    const y = tierY(tier);
    const spread = width * (0.15 + tier * 0.17);

    for (let i = 0; i < count; i++) {
      const xOffset =
        count === 1 ? 0 : ((i / (count - 1)) - 0.5) * spread * 2;
      const targetX = centerX + xOffset + (Math.random() - 0.5) * 20;
      const targetY = y + (Math.random() - 0.5) * 20;

      const psychType = id % 3;
      const driverIdx = Math.floor(Math.random() * 3);

      // Find parent in tier above
      let parentId: number | null = null;
      if (tier > 0) {
        const parentsInTier = agents.filter((a) => a.tier === tier - 1);
        const parentIndex = Math.floor(i / Math.ceil(count / parentsInTier.length));
        parentId = parentsInTier[Math.min(parentIndex, parentsInTier.length - 1)].id;
      }

      agents.push({
        id: id++,
        x: centerX + (Math.random() - 0.5) * 100,
        y: height / 2 + (Math.random() - 0.5) * 100,
        vx: 0,
        vy: 0,
        targetX,
        targetY,
        tier,
        parentId,
        radius: Math.max(4, 12 - tier * 2),
        psychology: {
          type: psychType,
          energy: 0.3 + Math.random() * 0.7,
          label: DRIVER_LABELS[psychType][driverIdx],
        },
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  return agents;
}

function buildEdges(agents: Agent[]): [number, number][] {
  const edges: [number, number][] = [];
  // Hierarchy edges
  for (const a of agents) {
    if (a.parentId !== null) {
      edges.push([a.parentId, a.id]);
    }
  }
  // Add some cross-tier informal connections (ONA edges)
  const icAgents = agents.filter((a) => a.tier >= 3);
  for (let i = 0; i < 8; i++) {
    const a = icAgents[Math.floor(Math.random() * icAgents.length)];
    const b = icAgents[Math.floor(Math.random() * icAgents.length)];
    if (a.id !== b.id && !edges.some(([x, y]) => (x === a.id && y === b.id) || (x === b.id && y === a.id))) {
      edges.push([a.id, b.id]);
    }
  }
  return edges;
}

export default function OrgSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });
  const animRef = useRef<number>(0);
  const agentsRef = useRef<Agent[]>([]);
  const edgesRef = useRef<[number, number][]>([]);
  const interactionsRef = useRef<Interaction[]>([]);
  const timeRef = useRef(0);
  const hoveredRef = useRef<number | null>(null);
  const [hoveredAgent, setHoveredAgent] = useState<Agent | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const sizeRef = useRef({ w: 0, h: 0 });

  const initSim = useCallback((width: number, height: number) => {
    sizeRef.current = { w: width, h: height };
    agentsRef.current = buildOrg(width, height);
    edgesRef.current = buildEdges(agentsRef.current);
    interactionsRef.current = [];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initSim(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse hover handling
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let closest: Agent | null = null;
      let minDist = 30;
      for (const a of agentsRef.current) {
        const d = Math.hypot(a.x - mx, a.y - my);
        if (d < minDist) {
          minDist = d;
          closest = a;
        }
      }
      hoveredRef.current = closest?.id ?? null;
      setHoveredAgent(closest);
      if (closest) {
        setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };

    const handleMouseLeave = () => {
      hoveredRef.current = null;
      setHoveredAgent(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initSim]);

  // Animation loop
  useEffect(() => {
    if (!isInView) {
      cancelAnimationFrame(animRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const { w, h } = sizeRef.current;
      timeRef.current += 0.016;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      const agents = agentsRef.current;
      const edges = edgesRef.current;
      const interactions = interactionsRef.current;

      // Physics: move agents toward targets with gentle spring
      for (const a of agents) {
        const dx = a.targetX - a.x;
        const dy = a.targetY - a.y;
        a.vx += dx * 0.02;
        a.vy += dy * 0.02;
        a.vx *= 0.92;
        a.vy *= 0.92;

        // Gentle floating motion
        a.vx += Math.sin(t * 0.5 + a.id * 0.7) * 0.15;
        a.vy += Math.cos(t * 0.3 + a.id * 1.1) * 0.1;

        a.x += a.vx;
        a.y += a.vy;
      }

      // Draw edges
      for (const [fromId, toId] of edges) {
        const from = agents[fromId];
        const to = agents[toId];
        if (!from || !to) continue;

        const isHovered =
          hoveredRef.current === fromId || hoveredRef.current === toId;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);

        // Curved edges
        const midX = (from.x + to.x) / 2 + (from.x - to.x) * 0.1;
        const midY = (from.y + to.y) / 2;
        ctx.quadraticCurveTo(midX, midY, to.x, to.y);

        ctx.strokeStyle = isHovered
          ? "rgba(255,255,255,0.25)"
          : "rgba(255,255,255,0.06)";
        ctx.lineWidth = isHovered ? 1.5 : 0.7;
        ctx.stroke();
      }

      // Spawn new interactions periodically
      if (Math.random() < 0.04) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        if (edge) {
          const fromAgent = agents[edge[0]];
          const col = PSYCHOLOGY_COLORS[fromAgent.psychology.type];
          interactions.push({
            from: edge[0],
            to: edge[1],
            progress: 0,
            color: `rgba(${col.r},${col.g},${col.b},0.9)`,
            speed: 0.008 + Math.random() * 0.012,
          });
        }
      }

      // Draw and update interaction pulses
      for (let i = interactions.length - 1; i >= 0; i--) {
        const inter = interactions[i];
        inter.progress += inter.speed;

        if (inter.progress > 1) {
          // Boost target agent energy
          const target = agents[inter.to];
          if (target) target.psychology.energy = Math.min(1, target.psychology.energy + 0.15);
          interactions.splice(i, 1);
          continue;
        }

        const from = agents[inter.from];
        const to = agents[inter.to];
        if (!from || !to) continue;

        const px = lerp(from.x, to.x, inter.progress);
        const py = lerp(from.y, to.y, inter.progress);

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = inter.color;
        ctx.fill();

        // Trail
        const trailP = Math.max(0, inter.progress - 0.08);
        const tx = lerp(from.x, to.x, trailP);
        const ty = lerp(from.y, to.y, trailP);
        ctx.beginPath();
        ctx.arc(tx, ty, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = inter.color.replace("0.9", "0.3");
        ctx.fill();
      }

      // Draw agents
      for (const a of agents) {
        const col = PSYCHOLOGY_COLORS[a.psychology.type];
        const isHovered = hoveredRef.current === a.id;
        const pulse = Math.sin(t * 2 + a.pulsePhase) * 0.3 + 0.7;
        const energyPulse = a.psychology.energy * pulse;

        // Glow
        const glowRadius = a.radius * (2 + energyPulse);
        const glow = ctx.createRadialGradient(
          a.x, a.y, 0,
          a.x, a.y, glowRadius
        );
        glow.addColorStop(0, `rgba(${col.r},${col.g},${col.b},${isHovered ? 0.4 : 0.15 * energyPulse})`);
        glow.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`);
        ctx.beginPath();
        ctx.arc(a.x, a.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(a.x, a.y, isHovered ? a.radius * 1.5 : a.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${0.6 + energyPulse * 0.4})`;
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.3 + energyPulse * 0.4})`;
        ctx.fill();

        // Decay energy
        a.psychology.energy = Math.max(0.2, a.psychology.energy - 0.001);
      }

      // Tier labels on the right
      ctx.font = "10px monospace";
      ctx.textAlign = "right";
      for (let tier = 0; tier < TIER_COUNTS.length; tier++) {
        const tierAgents = agents.filter((a) => a.tier === tier);
        if (tierAgents.length === 0) continue;
        const avgY = tierAgents.reduce((s, a) => s + a.y, 0) / tierAgents.length;
        ctx.fillStyle = "rgba(136,136,160,0.4)";
        ctx.fillText(TIER_LABELS[tier], w - 12, avgY + 3);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [isInView]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[500px]">
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Tooltip */}
      {hoveredAgent && (
        <div
          className="absolute pointer-events-none z-20 glass-strong rounded-xl px-4 py-3 text-xs max-w-[180px]"
          style={{
            left: Math.min(tooltipPos.x + 16, sizeRef.current.w - 200),
            top: tooltipPos.y - 60,
          }}
        >
          <div className="font-semibold text-foreground mb-1">
            {TIER_LABELS[hoveredAgent.tier]}{" "}
            <span className="text-muted font-normal">#{hoveredAgent.id}</span>
          </div>
          <div className="text-muted space-y-0.5">
            <div>
              Driver:{" "}
              <span
                className={
                  hoveredAgent.psychology.type === 0
                    ? "text-accent-purple"
                    : hoveredAgent.psychology.type === 1
                    ? "text-accent-coral"
                    : "text-accent-teal"
                }
              >
                {hoveredAgent.psychology.label}
              </span>
            </div>
            <div>
              Energy:{" "}
              <span className="text-foreground">
                {Math.round(hoveredAgent.psychology.energy * 100)}%
              </span>
            </div>
            <div>
              Connections:{" "}
              <span className="text-foreground">
                {edgesRef.current.filter(
                  ([a, b]) => a === hoveredAgent.id || b === hoveredAgent.id
                ).length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
