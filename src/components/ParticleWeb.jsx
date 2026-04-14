import { useEffect, useRef } from "react";

// ─── Simulation constants ─────────────────────────────────────────────────────

const N          = 215;   // Total number of particles
const LINK       = 110;   // Max distance (px) to draw a line between two particles
const PUSH_R     = 85;    // Radius (px) of mouse repulsion field
const PUSH_FORCE = 3.8;   // Strength of mouse repulsion impulse
const FRICTION   = 0.94;  // Velocity multiplier per frame (< 1 = drag)
const ALIGN_R    = 90;    // Radius within which particles align their velocities (flocking)
const ALIGN_W    = 0.01;  // Weight of alignment steering (higher = snappier turns)
const SEP_R      = 30;    // Radius within which particles repel each other (separation)
const SEP_W      = 0.05;  // Weight of separation steering
const MAX_SPEED  = 0.55;  // Maximum velocity magnitude (px/frame)
const DRIFT      = 0.003; // Random noise added to velocity each frame
const CUT_R      = 50;    // Radius around the mouse that severs nearby lines

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Clamps particle speed to MAX_SPEED by scaling the velocity vector.
 * Mutates p.vx and p.vy in place.
 *
 * @param {{ vx: number, vy: number }} p - Particle to clamp
 * @param {number} max - Maximum allowed speed
 */
function clamp(p, max) {
  const s = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
  if (s > max) {
    p.vx = (p.vx / s) * max;
    p.vy = (p.vy / s) * max;
  }
}

/**
 * Creates N particles pre-grouped into K clusters so they start already
 * connected (all particles within a cluster spawn inside LINK range).
 *
 * K = round(sqrt(N)) clusters are placed at random canvas positions with a
 * safety margin. Particles inside each cluster are scattered within
 * CLUSTER_R = LINK * 0.45, guaranteeing intra-cluster connections at frame 0.
 *
 * @param {number} W - Canvas width in pixels
 * @param {number} H - Canvas height in pixels
 * @returns {{ x, y, vx, vy, r }[]} Array of N particle objects
 */
function createParticles(W, H) {
  const CLUSTER_R = LINK * 0.45; // Max spawn radius inside a cluster
  const K         = Math.round(Math.sqrt(N)); // Number of clusters
  const margin    = CLUSTER_R + 20;           // Keep cluster centers away from edges
  const list      = [];

  for (let k = 0; k < K; k++) {
    // Random cluster center, respecting margin
    const cx    = margin + Math.random() * (W - margin * 2);
    const cy    = margin + Math.random() * (H - margin * 2);

    // Distribute N evenly across K clusters; first (N % K) clusters get one extra
    const count = k < N % K ? Math.ceil(N / K) : Math.floor(N / K);

    for (let i = 0; i < count && list.length < N; i++) {
      const angle = Math.random() * Math.PI * 2;        // Spawn direction from center
      const dist  = Math.random() * CLUSTER_R;          // Spawn distance from center
      const va    = Math.random() * Math.PI * 2;        // Initial velocity direction
      const spd   = Math.random() * 0.25 + 0.05;       // Initial speed

      list.push({
        x:  cx + Math.cos(angle) * dist,
        y:  cy + Math.sin(angle) * dist,
        vx: Math.cos(va) * spd,
        vy: Math.sin(va) * spd,
        r:  Math.random() * 1.6 + 1.2, // Visual radius (px)
      });
    }
  }
  return list;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Full-screen canvas background that renders an animated particle network.
 *
 * Behaviour:
 *  - Particles move using a simplified flocking model (alignment + separation).
 *  - Lines are drawn between any two particles closer than LINK px.
 *  - The mouse repels nearby particles and severs lines passing within CUT_R px.
 *  - The canvas resets and particles are regenerated on window resize.
 *  - Rendered behind all content via `position: fixed; z-index: -1`.
 */
export default function ParticleNetwork() {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 }); // Off-screen sentinel = no cursor
  const particles = useRef([]);
  const animRef   = useRef(0); // requestAnimationFrame handle for cleanup

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Resize handler: fills viewport and regenerates particles
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.current = createParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    // Track cursor position; reset to sentinel when cursor leaves the window
    const onMouseMove  = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = ()  => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    // ── Main animation loop ──────────────────────────────────────────────────
    const draw = () => {
      const W  = canvas.width;
      const H  = canvas.height;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const ps = particles.current;

      ctx.clearRect(0, 0, W, H);

      // ── Phase 1: physics update ──────────────────────────────────────────
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        // Accumulators for flocking forces
        let ax = 0, ay = 0; // Alignment: average neighbour velocity
        let sx = 0, sy = 0; // Separation: push away from too-close neighbours
        let na = 0, ns = 0; // Neighbour counts

        for (let j = 0; j < ps.length; j++) {
          if (i === j) continue;
          const q  = ps[j];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const d  = Math.sqrt(dx * dx + dy * dy);

          // Alignment: steer toward average heading of nearby particles
          if (d < ALIGN_R) { ax += q.vx; ay += q.vy; na++; }

          // Separation: flee from particles that are too close
          if (d < SEP_R && d > 0) { sx -= dx / d; sy -= dy / d; ns++; }
        }

        // Apply flocking forces
        if (na) { p.vx += (ax / na - p.vx) * ALIGN_W; p.vy += (ay / na - p.vy) * ALIGN_W; }
        if (ns) { p.vx += sx * SEP_W; p.vy += sy * SEP_W; }

        // Random drift to prevent particles from freezing in place
        p.vx += (Math.random() - 0.5) * DRIFT;
        p.vy += (Math.random() - 0.5) * DRIFT;

        // Mouse repulsion: push particle radially away from cursor
        const mdx = p.x - mx, mdy = p.y - my;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < PUSH_R && md > 0) {
          const f  = (1 - md / PUSH_R) * PUSH_FORCE; // Stronger when closer
          p.vx += (mdx / md) * f;
          p.vy += (mdy / md) * f;
        }

        // Apply friction, speed cap, and integrate position
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        clamp(p, MAX_SPEED);
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around canvas edges (toroidal topology)
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }

      // ── Phase 2: render lines then dots ─────────────────────────────────
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        // Draw edges to all j > i (avoids drawing each pair twice)
        for (let j = i + 1; j < ps.length; j++) {
          const q  = ps[j];
          const ex = p.x - q.x, ey = p.y - q.y;
          const d  = Math.sqrt(ex * ex + ey * ey);
          if (d >= LINK) continue; // Too far — no line

          // Line-cursor intersection test:
          // Project cursor onto segment p→q; check if closest point < CUT_R.
          let cut = false;
          if (mx > -999) {
            const lx   = q.x - p.x, ly = q.y - p.y;
            const len2 = lx * lx + ly * ly;
            const t    = Math.max(0, Math.min(1, ((mx - p.x) * lx + (my - p.y) * ly) / len2));
            const cx   = p.x + t * lx - mx, cy = p.y + t * ly - my;
            cut = cx * cx + cy * cy < CUT_R * CUT_R;
          }

          // Only draw if cursor doesn't sever the line
          if (!cut) {
            const alpha = (1 - d / LINK) * 0.55; // Fade out with distance
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(79,195,247,${alpha})`;
            ctx.lineWidth   = alpha * 1.1;
            ctx.stroke();
          }
        }

        // Draw the particle dot with a glow effect near the cursor
        const dm   = Math.hypot(p.x - mx, p.y - my);
        const glow = dm < PUSH_R ? (1 - dm / PUSH_R) * 0.8 : 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${180 + Math.round(glow * 75)},210,255,${0.7 + glow * 0.3})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    // Cleanup: cancel animation loop and remove all event listeners
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: "#0a0f1e",
        display: "block",
      }}
    />
  );
}
