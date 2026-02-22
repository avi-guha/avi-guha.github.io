import { useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

/* ───────── project data ───────── */
const projects = [
  { title: "ToneLens", categories: ["AI & Machine Learning"], slug: "tonelens" },
  { title: "Autonomous Pet Rescuing Robot", categories: ["Embedded Systems", "AI & Machine Learning", "Robotics", "Mechatronics", "Hardware Design"], slug: "autonomous-pet-rescuing-robot" },
  { title: "Servo Speed Motor Control", categories: ["Hardware Design"], slug: "servo-motor-control" },
  { title: "PS4 Controller RC Car", categories: ["Embedded Systems", "Mechatronics", "Hardware Design"], slug: "rc-car" },
  { title: "UBC Thunderbots Power Board", categories: ["Hardware Design", "Embedded Systems", "Robotics"], slug: "thunderbots-power-board" },
  { title: "2D Materials AFM Analysis", categories: ["Research", "AI & Machine Learning"], slug: "afm-materials-analysis" },
  { title: "APSC 101 Autonomous Claw", categories: ["Embedded Systems", "Hardware Design", "Mechatronics"], slug: "autonomous-claw" },
  { title: "Break Beam Board", categories: ["Hardware Design", "Robotics", "Embedded Systems"], slug: "break-beam-board" },
  { title: "ROS Clue Detective", categories: ["AI & Machine Learning", "Robotics"], slug: "ros-clue-detective" },
  { title: "CAN Prototype Board", categories: ["Hardware Design", "Embedded Systems", "Robotics"], slug: "can-prototype" },
  { title: "Thunderbots Motor Driver", categories: ["Embedded Systems", "Robotics", "Hardware Design"], slug: "thunderbots-motor-driver" },
];

interface CategoryData {
  name: string;
  projects: { title: string; slug: string }[];
}

function buildCategories(): CategoryData[] {
  const map = new Map<string, { title: string; slug: string }[]>();
  for (const p of projects) {
    for (const c of p.categories) {
      if (!map.has(c)) map.set(c, []);
      if (!map.get(c)!.find((x) => x.slug === p.slug)) {
        map.get(c)!.push({ title: p.title, slug: p.slug });
      }
    }
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([name, projs]) => ({ name, projects: projs }));
}

/* ───────── shapes ───────── */
type ShapeKind = "circle" | "roundedRect" | "hexagon" | "diamond" | "pill";
const SHAPE_KINDS: ShapeKind[] = ["circle", "roundedRect", "hexagon", "diamond", "pill"];
function pickShape(): ShapeKind {
  return SHAPE_KINDS[Math.floor(Math.random() * SHAPE_KINDS.length)];
}

/** Compute a base radius that grows with text length */
function sizeForLabel(label: string, base: number, isMobile: boolean): number {
  const len = label.length;
  const scale = isMobile ? 0.55 : 0.7;
  // short labels keep the base; longer labels grow logarithmically
  return base + Math.log2(Math.max(1, len / 6)) * base * scale * 0.35;
}

/* ───────── physics body ───────── */
interface Body {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  label: string;
  type: "root" | "category" | "project";
  slug?: string;
  parentIds: string[];
  orbitAngle: number;
  orbitSpeed: number;
  orbitDist: number;
  mass: number;
  visible: boolean;
  opacity: number;
  targetOpacity: number;
  jitterPhase: number;
  jitterAmp: number;
  shape: ShapeKind;
}

/* ───────── helpers ───────── */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Draw a shape path centred at (x, y) with effective radius r */
function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: ShapeKind,
  x: number,
  y: number,
  r: number,
) {
  ctx.beginPath();
  switch (shape) {
    case "circle":
      ctx.arc(x, y, r, 0, Math.PI * 2);
      break;
    case "roundedRect": {
      const hw = r * 1.15;
      const hh = r * 0.85;
      const cr = r * 0.3;
      ctx.moveTo(x - hw + cr, y - hh);
      ctx.arcTo(x + hw, y - hh, x + hw, y + hh, cr);
      ctx.arcTo(x + hw, y + hh, x - hw, y + hh, cr);
      ctx.arcTo(x - hw, y + hh, x - hw, y - hh, cr);
      ctx.arcTo(x - hw, y - hh, x + hw, y - hh, cr);
      ctx.closePath();
      break;
    }
    case "hexagon": {
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + r * Math.cos(a);
        const py = y + r * Math.sin(a);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      break;
    }
    case "diamond": {
      const hw = r * 1.05;
      const hh = r * 0.9;
      ctx.moveTo(x, y - hh);
      ctx.lineTo(x + hw, y);
      ctx.lineTo(x, y + hh);
      ctx.lineTo(x - hw, y);
      ctx.closePath();
      break;
    }
    case "pill": {
      const hw = r * 1.3;
      const hh = r * 0.65;
      ctx.moveTo(x - hw + hh, y - hh);
      ctx.lineTo(x + hw - hh, y - hh);
      ctx.arc(x + hw - hh, y, hh, -Math.PI / 2, Math.PI / 2);
      ctx.lineTo(x - hw + hh, y + hh);
      ctx.arc(x - hw + hh, y, hh, Math.PI / 2, -Math.PI / 2);
      ctx.closePath();
      break;
    }
  }
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Maximum extent from centre to shape boundary (for shape-aware collisions) */
function maxExtent(shape: ShapeKind, r: number): number {
  switch (shape) {
    case "circle": return r;
    case "roundedRect": return r * 1.15;
    case "hexagon": return r;
    case "diamond": return r * 1.05;
    case "pill": return r * 1.3;
    default: return r;
  }
}

const CATEGORY_HUES = [210, 350, 130, 40, 280, 175, 65];

/* ── RYB ↔ HSL hue conversion for paint-like mixing ── */
// Key points mapping HSL hue → RYB hue (Red=0, Yellow=120, Blue=240)
const HSL_TO_RYB: [number, number][] = [
  [0, 0],      // red
  [30, 20],    // orange → RYB ~20
  [60, 60],    // yellow → RYB 60 (shifted down from HSL 60)
  [120, 120],  // green → RYB 120 (between yellow & blue in RYB)
  [180, 180],  // cyan → RYB 180
  [240, 240],  // blue → RYB 240
  [300, 300],  // magenta → RYB 300
  [360, 360],  // red (wrap)
];
// RYB → HSL inverse (swap columns)
const RYB_TO_HSL: [number, number][] = HSL_TO_RYB.map(([h, r]) => [r, h]);

function interpMap(map: [number, number][], val: number): number {
  const v = ((val % 360) + 360) % 360;
  for (let i = 0; i < map.length - 1; i++) {
    const [a0, b0] = map[i];
    const [a1, b1] = map[i + 1];
    if (v >= a0 && v <= a1) {
      const t = (v - a0) / (a1 - a0);
      return b0 + t * (b1 - b0);
    }
  }
  return val;
}

function hslToRyb(hue: number): number { return interpMap(HSL_TO_RYB, hue); }
function rybToHsl(ryb: number): number { return interpMap(RYB_TO_HSL, ryb); }

/**
 * Mix hues like paint using RYB colour space.
 *
 * 1. Convert each parent HSL hue → RYB
 * 2. Circular-mean in RYB (where red+yellow→orange, blue+yellow→green,
 *    red+blue→purple naturally)
 * 3. Convert back to HSL
 * 4. If the result is too close to any parent (< 25°), nudge it away
 * 5. If the result lands in the muddy olive zone (48-72°), shift out
 */
function mixHues(hues: number[]): number {
  if (hues.length <= 1) return hues[0] ?? 0;

  // convert to RYB, then circular mean
  const rybHues = hues.map(hslToRyb);
  let sinSum = 0, cosSum = 0;
  for (const h of rybHues) {
    const rad = (h * Math.PI) / 180;
    sinSum += Math.sin(rad);
    cosSum += Math.cos(rad);
  }

  const magnitude = Math.sqrt(sinSum * sinSum + cosSum * cosSum) / hues.length;
  let rybAvg = (Math.atan2(sinSum, cosSum) * 180) / Math.PI;
  if (rybAvg < 0) rybAvg += 360;

  // if vectors nearly cancel (opposing colours), rotate 90° in RYB to escape
  if (magnitude < 0.3) {
    rybAvg = (rybAvg + 90) % 360;
  }

  // convert back to HSL
  let result = rybToHsl(rybAvg);
  result = ((result % 360) + 360) % 360;

  // ensure result isn't too close to any parent hue (min 25° away)
  const MIN_DIST = 25;
  const tooClose = () => hues.some((ph) => {
    let d = Math.abs(result - ph);
    if (d > 180) d = 360 - d;
    return d < MIN_DIST;
  });
  let nudges = 0;
  while (tooClose() && nudges < 6) {
    result = (result + 35) % 360;
    nudges++;
  }

  // avoid muddy olive zone (48-72°)
  if (result > 48 && result < 72) {
    result = result < 60 ? 42 : 78;
  }

  return result;
}

/* ───────── component ───────── */
const ProjectsMindMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const categories = useMemo(buildCategories, []);

  const bodiesRef = useRef<Body[]>([]);
  const expandedRef = useRef<Set<string>>(new Set());
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const hoveredRef = useRef<Body | null>(null);
  const dragRef = useRef<{ body: Body; offX: number; offY: number; startX: number; startY: number; moved: number } | null>(null);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const timeRef = useRef(0);

  /* colour helpers – read CSS vars from DOM */
  const getHSL = useCallback((varName: string, fallback: string) => {
    if (!containerRef.current) return fallback;
    const raw = getComputedStyle(containerRef.current).getPropertyValue(varName).trim();
    return raw ? `hsl(${raw})` : fallback;
  }, []);

  const getHSLA = useCallback((varName: string, a: number, fallback: string) => {
    if (!containerRef.current) return fallback;
    const raw = getComputedStyle(containerRef.current).getPropertyValue(varName).trim();
    return raw ? `hsl(${raw} / ${a})` : fallback;
  }, []);

  /* ───────── initialise bodies ───────── */
  const initBodies = useCallback((w: number, h: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const isMobile = w < 640;
    const bodies: Body[] = [];

    // invisible anchor (not rendered) – categories orbit around this
    bodies.push({
      id: "root", x: cx, y: cy, vx: 0, vy: 0,
      r: 0, label: "", type: "root",
      mass: 0, visible: false, opacity: 0, targetOpacity: 0,
      orbitAngle: 0, orbitSpeed: 0, orbitDist: 0,
      parentIds: [], jitterPhase: 0, jitterAmp: 0, shape: "circle",
    });

    // category nodes – orbit the root
    const catR = isMobile ? Math.min(w, h) * 0.26 : Math.min(w, h) * 0.25;
    categories.forEach((cat, i) => {
      const angle = (2 * Math.PI * i) / categories.length - Math.PI / 2;
      // wider speed range + random direction for stochastic feel
      const speed = (0.08 + Math.random() * 0.24) * (Math.random() < 0.5 ? 1 : -1);
      const catBase = isMobile ? 28 : 40;
      const catSize = sizeForLabel(cat.name, catBase, isMobile);
      bodies.push({
        id: `cat-${i}`,
        x: cx + catR * Math.cos(angle),
        y: cy + catR * Math.sin(angle),
        vx: 0, vy: 0,
        r: catSize,
        label: cat.name, type: "category",
        mass: 30,
        orbitAngle: angle, orbitSpeed: speed, orbitDist: catR,
        visible: true, opacity: 1, targetOpacity: 1,
        parentIds: [],
        jitterPhase: Math.random() * 100,
        jitterAmp: 15 + Math.random() * 25,
        shape: pickShape(),
      });
    });

    // deduplicated project nodes – one body per unique slug
    const seen = new Set<string>();
    for (let i = 0; i < categories.length; i++) {
      for (const proj of categories[i].projects) {
        if (seen.has(proj.slug)) {
          // add this category as an additional parent
          const existing = bodies.find((b) => b.slug === proj.slug);
          if (existing) existing.parentIds.push(`cat-${i}`);
          continue;
        }
        seen.add(proj.slug);
        const pAngle = Math.random() * Math.PI * 2;
        const pDist = isMobile ? 65 : 100;
        const pSpeed = (0.15 + Math.random() * 0.4) * (Math.random() < 0.5 ? 1 : -1);
        const projBase = isMobile ? 20 : 28;
        const projSize = sizeForLabel(proj.title, projBase, isMobile);
        bodies.push({
          id: `proj-${proj.slug}`,
          x: cx + (Math.random() - 0.5) * 100,
          y: cy + (Math.random() - 0.5) * 100,
          vx: 0, vy: 0,
          r: projSize,
          label: proj.title, type: "project", slug: proj.slug,
          parentIds: [`cat-${i}`],
          mass: 10,
          orbitAngle: pAngle, orbitSpeed: pSpeed, orbitDist: pDist,
          visible: false, opacity: 0, targetOpacity: 0,
          jitterPhase: Math.random() * 100,
          jitterAmp: 25 + Math.random() * 35,
          shape: pickShape(),
        });
      }
    }

    bodiesRef.current = bodies;
    expandedRef.current = new Set();
  }, [categories]);

  /* ───────── physics tick ───────── */
  const tick = useCallback((dt: number) => {
    const bodies = bodiesRef.current;
    const { w, h } = sizeRef.current;
    if (!w || !h) return;

    timeRef.current += dt;
    const t = timeRef.current;

    const root = bodies[0];
    const cx = w / 2;
    const cy = h / 2;

    // gently re-centre root
    root.x = lerp(root.x, cx, 0.03);
    root.y = lerp(root.y, cy, 0.03);

    const mouse = mouseRef.current;
    const MOUSE_RADIUS = 130;
    const MOUSE_FORCE = 5000;
    const dragging = dragRef.current;
    const expanded = expandedRef.current;

    for (const b of bodies) {
      if (b.type === "root") continue;
      if (!b.visible && b.opacity < 0.01) continue;

      // fade opacity
      b.opacity = lerp(b.opacity, b.targetOpacity, 0.08);

      // skip physics for body being dragged
      if (dragging && dragging.body === b) continue;

      // stochastic jitter – unique per body via jitterPhase
      const jx = Math.sin(t * 1.7 + b.jitterPhase) * Math.cos(t * 0.9 + b.jitterPhase * 1.3);
      const jy = Math.cos(t * 1.3 + b.jitterPhase * 0.7) * Math.sin(t * 2.1 + b.jitterPhase);
      b.vx += jx * b.jitterAmp * dt;
      b.vy += jy * b.jitterAmp * dt;

      // randomly perturb orbit speed slightly each frame
      b.orbitSpeed += (Math.random() - 0.5) * 0.03 * dt;

      if (b.type === "category") {
        // orbit around root
        b.orbitAngle += b.orbitSpeed * dt;
        const tx = root.x + b.orbitDist * Math.cos(b.orbitAngle);
        const ty = root.y + b.orbitDist * Math.sin(b.orbitAngle);
        const stiffness = 2.5;
        const damping = 0.92;
        b.vx += (tx - b.x) * stiffness * dt;
        b.vy += (ty - b.y) * stiffness * dt;
        b.vx *= damping;
        b.vy *= damping;
      }

      if (b.type === "project") {
        // orbit around centroid of all expanded parent categories
        const expandedParents = b.parentIds
          .filter((pid) => expanded.has(pid))
          .map((pid) => bodies.find((p) => p.id === pid))
          .filter(Boolean) as Body[];

        if (expandedParents.length > 0) {
          const centroidX = expandedParents.reduce((s, p) => s + p.x, 0) / expandedParents.length;
          const centroidY = expandedParents.reduce((s, p) => s + p.y, 0) / expandedParents.length;
          b.orbitAngle += b.orbitSpeed * dt;
          const tx = centroidX + b.orbitDist * Math.cos(b.orbitAngle);
          const ty = centroidY + b.orbitDist * Math.sin(b.orbitAngle);
          const stiffness = 3.0;
          const damping = 0.88;
          b.vx += (tx - b.x) * stiffness * dt;
          b.vy += (ty - b.y) * stiffness * dt;
          b.vx *= damping;
          b.vy *= damping;
        }
      }

      // mouse repulsion
      if (mouse.active) {
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 1) {
          const force = MOUSE_FORCE / (dist * dist);
          b.vx += (dx / dist) * force * dt;
          b.vy += (dy / dist) * force * dt;
        }
      }

      // apply velocity
      b.x += b.vx * dt;
      b.y += b.vy * dt;

      // soft wall bounce
      const pad = maxExtent(b.shape, b.r) + 4;
      if (b.x < pad) { b.x = pad; b.vx = Math.abs(b.vx) * 0.5; }
      if (b.x > w - pad) { b.x = w - pad; b.vx = -Math.abs(b.vx) * 0.5; }
      if (b.y < pad) { b.y = pad; b.vy = Math.abs(b.vy) * 0.5; }
      if (b.y > h - pad) { b.y = h - pad; b.vy = -Math.abs(b.vy) * 0.5; }
    }

    // force-field repulsion + elastic collisions
    for (let i = 0; i < bodies.length; i++) {
      const a = bodies[i];
      if (a.type === "root") continue;
      if (!a.visible && a.opacity < 0.01) continue;
      for (let j = i + 1; j < bodies.length; j++) {
        const bObj = bodies[j];
        if (bObj.type === "root") continue;
        if (!bObj.visible && bObj.opacity < 0.01) continue;

        const dx = bObj.x - a.x;
        const dy = bObj.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.1) continue;

        const nx = dx / dist;
        const ny = dy / dist;

        // generous force-field buffer around each bubble (shape-aware)
        const repulsionDist = maxExtent(a.shape, a.r) + maxExtent(bObj.shape, bObj.r) + 120;
        if (dist < repulsionDist) {
          const overlap = 1 - dist / repulsionDist;
          const strength = 5000 * overlap * overlap * overlap;
          const totalMass = a.mass + bObj.mass;
          a.vx -= nx * strength * dt * (bObj.mass / totalMass);
          a.vy -= ny * strength * dt * (bObj.mass / totalMass);
          bObj.vx += nx * strength * dt * (a.mass / totalMass);
          bObj.vy += ny * strength * dt * (a.mass / totalMass);
        }

        // hard collision (shape-aware)
        const minDist = maxExtent(a.shape, a.r) + maxExtent(bObj.shape, bObj.r) + 10;
        if (dist < minDist) {
          const overlap = minDist - dist;
          const totalMass = a.mass + bObj.mass;

          // push apart fully – no remaining overlap
          const correction = 1.05;
          a.x -= nx * overlap * correction * (bObj.mass / totalMass);
          a.y -= ny * overlap * correction * (bObj.mass / totalMass);
          bObj.x += nx * overlap * correction * (a.mass / totalMass);
          bObj.y += ny * overlap * correction * (a.mass / totalMass);

          // elastic impulse
          const dvx = a.vx - bObj.vx;
          const dvy = a.vy - bObj.vy;
          const dvDotN = dvx * nx + dvy * ny;
          if (dvDotN > 0) {
            const restitution = 0.7;
            const impulse = dvDotN * restitution;
            a.vx -= impulse * nx * (bObj.mass / totalMass);
            a.vy -= impulse * ny * (bObj.mass / totalMass);
            bObj.vx += impulse * nx * (a.mass / totalMass);
            bObj.vy += impulse * ny * (a.mass / totalMass);
          }
        }
      }
    }
  }, []);

  /* ───────── drawing ───────── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    sizeRef.current = { w, h };

    const bg = getHSL("--background", "#dcdcdc");
    const fg = getHSL("--foreground", "#2a2d2a");
    const mutedFg = getHSL("--muted-foreground", "#666");
    const cardBg = getHSL("--card", "#d3d3d3");
    const borderCol = getHSLA("--border", 1, "#bbb");
    const expanded = expandedRef.current;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    const bodies = bodiesRef.current;
    const hovered = hoveredRef.current;
    const isMobile = w < 640;

    // edges – only from projects to their expanded parent categories
    const isDark = document.documentElement.classList.contains("dark");
    ctx.lineWidth = 2.8;
    for (const b of bodies) {
      if (b.opacity < 0.02 || b.type !== "project") continue;
      for (const pid of b.parentIds) {
        if (!expanded.has(pid)) continue;
        const parent = bodies.find((p) => p.id === pid);
        if (parent) {
          const parentIdx = parseInt(pid.replace("cat-", ""));
          const edgeHue = CATEGORY_HUES[parentIdx % CATEGORY_HUES.length];
          ctx.beginPath();
          ctx.moveTo(parent.x, parent.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `hsla(${edgeHue}, 55%, ${isDark ? 50 : 45}%, ${b.opacity * 0.7})`;
          ctx.stroke();
        }
      }
    }

    // nodes
    for (const b of bodies) {
      if (b.opacity < 0.02) continue;
      const isHovered = hovered === b;
      const r = isHovered ? b.r * 1.12 : b.r;

      ctx.globalAlpha = b.opacity;

      // shadow
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.12)";
      ctx.shadowBlur = isHovered ? 16 : 8;
      ctx.shadowOffsetY = 2;

      if (b.type === "root") {
        // invisible anchor – skip rendering
        ctx.restore();
        ctx.globalAlpha = 1;
        continue;
      }

      // draw the shape
      drawShape(ctx, b.shape, b.x, b.y, r);

      if (b.type === "category") {
        const isExpanded = expanded.has(b.id);
        const catIdx = parseInt(b.id.replace("cat-", ""));
        const catHue = CATEGORY_HUES[catIdx % CATEGORY_HUES.length];
        if (isExpanded) {
          ctx.fillStyle = isHovered
            ? `hsl(${catHue}, 62%, ${isDark ? 48 : 56}%)`
            : `hsl(${catHue}, 58%, ${isDark ? 42 : 50}%)`;
        } else {
          ctx.fillStyle = isHovered
            ? `hsl(${catHue}, 45%, ${isDark ? 35 : 62}%)`
            : cardBg;
        }
        ctx.fill();
        ctx.strokeStyle = isExpanded || isHovered
          ? `hsl(${catHue}, 50%, ${isDark ? 55 : 60}%)`
          : borderCol;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
        ctx.globalAlpha = b.opacity;

        ctx.font = `500 ${isMobile ? 8 : 11}px "Avenir Next", Avenir, Montserrat, sans-serif`;
        ctx.fillStyle = (isExpanded || isHovered) ? "#fff" : fg;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const tw = b.shape === "pill" ? r * 2 : b.shape === "diamond" ? r * 1.2 : r * 1.5;
        const lines = wrapText(ctx, b.label, tw);
        const lh = isMobile ? 10 : 13;
        const startY = b.y - ((lines.length - 1) * lh) / 2;
        lines.forEach((line, li) => ctx.fillText(line, b.x, startY + li * lh));
      } else {
        // project — inherit expanded parent colour(s)
        const expandedHues = b.parentIds
          .filter((pid) => expanded.has(pid))
          .map((pid) => CATEGORY_HUES[parseInt(pid.replace("cat-", "")) % CATEGORY_HUES.length]);
        const projHue = expandedHues.length > 0 ? mixHues(expandedHues) : null;
        const projSat = expandedHues.length > 1 ? 62 : 52;
        if (projHue !== null) {
          ctx.fillStyle = isHovered
            ? `hsl(${projHue}, ${projSat + 8}%, ${isDark ? 38 : 55}%)`
            : `hsl(${projHue}, ${projSat}%, ${isDark ? 30 : 65}%)`;
        } else {
          ctx.fillStyle = cardBg;
        }
        ctx.fill();
        ctx.strokeStyle = projHue !== null
          ? `hsl(${projHue}, 50%, ${isDark ? 50 : 55}%)`
          : borderCol;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
        ctx.globalAlpha = b.opacity;

        ctx.font = `400 ${isMobile ? 7 : 9.5}px "Avenir Next", Avenir, Montserrat, sans-serif`;
        ctx.fillStyle = projHue !== null ? "#fff" : (isHovered ? fg : mutedFg);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const tw = b.shape === "pill" ? r * 2 : b.shape === "diamond" ? r * 1.2 : r * 1.5;
        const lines = wrapText(ctx, b.label, tw);
        const lh = isMobile ? 9 : 11;
        const startY = b.y - ((lines.length - 1) * lh) / 2;
        lines.forEach((line, li) => ctx.fillText(line, b.x, startY + li * lh));
      }

      ctx.globalAlpha = 1;
    }
  }, [getHSL, getHSLA]);

  /* ───────── animation loop ───────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    initBodies(rect.width, rect.height);
    lastTimeRef.current = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;
      tick(dt);
      draw();
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [initBodies, tick, draw]);

  /* ───────── resize ───────── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      sizeRef.current = { w: rect.width, h: rect.height };
      initBodies(rect.width, rect.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [initBodies]);

  /* ───────── hit test ───────── */
  const hitTest = useCallback((clientX: number, clientY: number): Body | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;
    for (let i = bodiesRef.current.length - 1; i >= 0; i--) {
      const b = bodiesRef.current[i];
      if (b.opacity < 0.1) continue;
      const dx = mx - b.x;
      const dy = my - b.y;
      const ext = maxExtent(b.shape, b.r) + 6;
      if (dx * dx + dy * dy <= ext * ext) return b;
    }
    return null;
  }, []);

  /* ───────── expand / collapse (multi-select) ───────── */
  const toggleCategory = useCallback((catId: string) => {
    const bodies = bodiesRef.current;
    const expanded = expandedRef.current;
    const wasExpanded = expanded.has(catId);

    if (wasExpanded) {
      // collapse only this category
      expanded.delete(catId);
      // hide projects whose ALL parents are now collapsed
      for (const b of bodies) {
        if (b.type === "project" && b.parentIds.includes(catId)) {
          const stillVisible = b.parentIds.some((pid) => expanded.has(pid));
          if (!stillVisible) {
            b.targetOpacity = 0;
            setTimeout(() => {
              // re-check in case user expanded again during fade
              const stillVis = b.parentIds.some((pid) => expandedRef.current.has(pid));
              if (!stillVis) b.visible = false;
            }, 350);
          }
        }
      }
    } else {
      // expand this category
      expanded.add(catId);
      for (const b of bodies) {
        if (b.type === "project" && b.parentIds.includes(catId)) {
          if (!b.visible) {
            // spawn near parent with a random kick
            const parent = bodies.find((p) => p.id === catId);
            if (parent) {
              b.x = parent.x + (Math.random() - 0.5) * 20;
              b.y = parent.y + (Math.random() - 0.5) * 20;
              b.vx = (Math.random() - 0.5) * 50;
              b.vy = (Math.random() - 0.5) * 50;
            }
            b.visible = true;
          }
          b.targetOpacity = 1;
        }
      }
    }
  }, []);

  /* ───────── pointer events ───────── */
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };

    if (dragRef.current) {
      const b = dragRef.current.body;
      b.x = e.clientX - rect.left - dragRef.current.offX;
      b.y = e.clientY - rect.top - dragRef.current.offY;
      b.vx = 0;
      b.vy = 0;
      dragRef.current.moved += Math.abs(e.movementX) + Math.abs(e.movementY);
      canvas.style.cursor = "grabbing";
      return;
    }

    const hit = hitTest(e.clientX, e.clientY);
    hoveredRef.current = hit;
    canvas.style.cursor = hit && hit.type !== "root" ? "pointer" : "default";
  }, [hitTest]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    const hit = hitTest(e.clientX, e.clientY);
    if (hit && hit.type !== "root") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dragRef.current = {
        body: hit,
        offX: e.clientX - rect.left - hit.x,
        offY: e.clientY - rect.top - hit.y,
        startX: e.clientX,
        startY: e.clientY,
        moved: 0,
      };
    }
  }, [hitTest]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (dragRef.current) {
      const body = dragRef.current.body;
      const moved = dragRef.current.moved;
      dragRef.current = null;
      if (moved > 8) return; // was a drag, not a click
      if (body.type === "category") toggleCategory(body.id);
      else if (body.type === "project" && body.slug) navigate(`/projects/${body.slug}`);
      return;
    }
    const hit = hitTest(e.clientX, e.clientY);
    if (!hit) return; // clicking empty space does nothing
    if (hit.type === "category") toggleCategory(hit.id);
    else if (hit.type === "project" && hit.slug) navigate(`/projects/${hit.slug}`);
  }, [hitTest, navigate, toggleCategory]);

  const handlePointerLeave = useCallback(() => {
    mouseRef.current.active = false;
    hoveredRef.current = null;
    dragRef.current = null;
  }, []);

  /* ───────── touch ───────── */
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      touchStartRef.current = { x: t.clientX, y: t.clientY, time: Date.now() };
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: t.clientX - rect.left, y: t.clientY - rect.top, active: false };
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: t.clientX - rect.left, y: t.clientY - rect.top, active: true };
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    mouseRef.current.active = false;
    if (!touchStartRef.current) return;
    const t = e.changedTouches[0];
    const dist = Math.abs(t.clientX - touchStartRef.current.x) + Math.abs(t.clientY - touchStartRef.current.y);
    if (dist < 15 && Date.now() - touchStartRef.current.time < 400) {
      const hit = hitTest(t.clientX, t.clientY);
      if (hit && hit.type === "category") {
        toggleCategory(hit.id);
      } else if (hit && hit.type === "project" && hit.slug) {
        navigate(`/projects/${hit.slug}`);
      }
    }
    touchStartRef.current = null;
  }, [hitTest, toggleCategory, navigate]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "70vh", minHeight: 420 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-2xl border border-border"
        style={{ touchAction: "none" }}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <p className="absolute top-3 left-4 text-xs text-muted-foreground select-none pointer-events-none">
        Click categories to expand
      </p>
    </div>
  );
};

export default ProjectsMindMap;
