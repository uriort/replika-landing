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
  tier: number;
  parentId: number | null;
  radius: number;
  psychology: {
    type: number;
    energy: number;
    trait: string;
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
  { r: 99, g: 91, b: 255 },   // purple
  { r: 232, g: 115, b: 74 },  // coral
  { r: 0, g: 212, b: 170 },   // teal
];

// Single-word traits for circle labels
const TRAITS = [
  "Driven", "Curious", "Cautious", "Principled", "Restless",
  "Focused", "Empathic", "Ambitious", "Skeptical", "Collaborative",
  "Independent", "Deliberate", "Resilient", "Adaptive", "Analytical",
  "Visionary", "Guarded", "Expressive", "Grounded", "Conflicted",
  "Overloaded", "Disorganized", "Checked-out", "Stretched", "Siloed",
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildOrg(width: number, height: number): Agent[] {
  const agents: Agent[] = [];
  const centerX = width / 2;
  let id = 0;

  const tierY = (tier: number) => {
    const topPad = height * 0.1;
    const botPad = height * 0.08;
    const usable = height - topPad - botPad;
    return topPad + (tier / (TIER_COUNTS.length - 1)) * usable;
  };

  for (let tier = 0; tier < TIER_COUNTS.length; tier++) {
    const count = TIER_COUNTS[tier];
    const y = tierY(tier);
    const spread = width * (0.12 + tier * 0.16);

    for (let i = 0; i < count; i++) {
      const xOffset =
        count === 1 ? 0 : ((i / (count - 1)) - 0.5) * spread * 2;
      const targetX = centerX + xOffset + (Math.random() - 0.5) * 15;
      const targetY = y + (Math.random() - 0.5) * 15;

      const psychType = id % 3;

      // Pick a single trait for this agent
      const trait = TRAITS[id % TRAITS.length];

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
        radius: Math.max(8, 22 - tier * 3),
        psychology: {
          type: psychType,
          energy: 0.3 + Math.random() * 0.7,
          trait,
        },
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  return agents;
}

function buildEdges(agents: Agent[]): [number, number][] {
  const edges: [number, number][] = [];
  for (const a of agents) {
    if (a.parentId !== null) {
      edges.push([a.parentId, a.id]);
    }
  }
  const lateralAgents = agents.filter((a) => a.tier >= 3);
  for (let i = 0; i < 8; i++) {
    const a = lateralAgents[Math.floor(Math.random() * lateralAgents.length)];
    const b = lateralAgents[Math.floor(Math.random() * lateralAgents.length)];
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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let closest: Agent | null = null;
      let minDist = 40;
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

      // Physics
      for (const a of agents) {
        const dx = a.targetX - a.x;
        const dy = a.targetY - a.y;
        a.vx += dx * 0.02;
        a.vy += dy * 0.02;
        a.vx *= 0.92;
        a.vy *= 0.92;
        a.vx += Math.sin(t * 0.5 + a.id * 0.7) * 0.12;
        a.vy += Math.cos(t * 0.3 + a.id * 1.1) * 0.08;
        a.x += a.vx;
        a.y += a.vy;
      }

      // Draw edges
      for (const [fromId, toId] of edges) {
        const from = agents[fromId];
        const to = agents[toId];
        if (!from || !to) continue;
        const isHovered = hoveredRef.current === fromId || hoveredRef.current === toId;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        const midX = (from.x + to.x) / 2 + (from.x - to.x) * 0.1;
        const midY = (from.y + to.y) / 2;
        ctx.quadraticCurveTo(midX, midY, to.x, to.y);
        ctx.strokeStyle = isHovered ? "rgba(10,37,64,0.15)" : "rgba(10,37,64,0.06)";
        ctx.lineWidth = isHovered ? 1.5 : 0.7;
        ctx.stroke();
      }

      // Spawn interactions
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

      // Draw interaction pulses
      for (let i = interactions.length - 1; i >= 0; i--) {
        const inter = interactions[i];
        inter.progress += inter.speed;
        if (inter.progress > 1) {
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
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = inter.color;
        ctx.fill();
      }

      // Draw agents (bigger circles with labels inside)
      for (const a of agents) {
        const col = PSYCHOLOGY_COLORS[a.psychology.type];
        const isHovered = hoveredRef.current === a.id;
        const pulse = Math.sin(t * 2 + a.pulsePhase) * 0.3 + 0.7;
        const energyPulse = a.psychology.energy * pulse;
        const r = isHovered ? a.radius * 1.4 : a.radius;

        // Soft glow
        const glowRadius = r * 2.5;
        const glow = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, glowRadius);
        glow.addColorStop(0, `rgba(${col.r},${col.g},${col.b},${isHovered ? 0.2 : 0.08 * energyPulse})`);
        glow.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`);
        ctx.beginPath();
        ctx.arc(a.x, a.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // White circle with colored border
        ctx.beginPath();
        ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,0.95)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${0.4 + energyPulse * 0.4})`;
        ctx.lineWidth = isHovered ? 2.5 : 1.5;
        ctx.stroke();

        // Single trait label inside circle
        if (a.tier <= 2 && r > 12) {
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `600 ${Math.max(7, r * 0.42)}px system-ui, sans-serif`;
          ctx.fillStyle = `rgb(${col.r},${col.g},${col.b})`;
          ctx.fillText(a.psychology.trait, a.x, a.y);
        } else if (a.tier === 3 && r > 8) {
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `500 ${Math.max(6, r * 0.4)}px system-ui, sans-serif`;
          ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},0.8)`;
          ctx.fillText(a.psychology.trait.slice(0, 3), a.x, a.y);
        }

        // Colored inner dot for ICs (smallest)
        if (a.tier === 4) {
          ctx.beginPath();
          ctx.arc(a.x, a.y, r * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},0.5)`;
          ctx.fill();
        }

        a.psychology.energy = Math.max(0.2, a.psychology.energy - 0.001);
      }

      // Tier labels
      ctx.font = "10px system-ui, sans-serif";
      ctx.textAlign = "right";
      for (let tier = 0; tier < TIER_COUNTS.length; tier++) {
        const tierAgents = agents.filter((a) => a.tier === tier);
        if (tierAgents.length === 0) continue;
        const avgY = tierAgents.reduce((s, a) => s + a.y, 0) / tierAgents.length;
        ctx.fillStyle = "rgba(10,37,64,0.2)";
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
          className="absolute pointer-events-none z-20 bg-white rounded-xl card-shadow-lg px-5 py-4 text-xs max-w-[220px] border border-foreground/[0.06]"
          style={{
            left: Math.min(tooltipPos.x + 16, sizeRef.current.w - 240),
            top: tooltipPos.y - 80,
          }}
        >
          <div className="font-semibold text-foreground mb-2 text-sm">
            {TIER_LABELS[hoveredAgent.tier]}{" "}
            <span className="text-muted font-normal">#{hoveredAgent.id}</span>
          </div>
          <div className="text-muted space-y-1.5">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-muted/70">Trait</span>
              <div className="mt-0.5">
                <span
                  className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    hoveredAgent.psychology.type === 0
                      ? "bg-accent-purple/10 text-accent-purple"
                      : hoveredAgent.psychology.type === 1
                      ? "bg-accent-coral/10 text-accent-coral"
                      : "bg-accent-teal/10 text-accent-teal"
                  }`}
                >
                  {hoveredAgent.psychology.trait}
                </span>
              </div>
            </div>
            <div className="pt-1 border-t border-foreground/[0.06] flex justify-between">
              <span>
                Energy: <span className="text-foreground font-medium">{Math.round(hoveredAgent.psychology.energy * 100)}%</span>
              </span>
              <span>
                Links: <span className="text-foreground font-medium">
                  {edgesRef.current.filter(([a, b]) => a === hoveredAgent.id || b === hoveredAgent.id).length}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
