import { useEffect, useRef } from "react";

const N = 90;
const LINK = 110;
const PUSH_R = 85;
const PUSH_FORCE = 2.8;
const FRICTION = 0.94;
const ALIGN_R = 90;
const ALIGN_W = 0.01;
const SEP_R = 30;
const SEP_W = 0.05;
const MAX_SPEED = 0.55;
const DRIFT = 0.003;
const CUT_R = 50;

function clamp(p, max) {
  const s = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
  if (s > max) {
    p.vx = (p.vx / s) * max;
    p.vy = (p.vy / s) * max;
  }
}

function createParticles(W, H) {
  const cols = Math.ceil(Math.sqrt(N * (W / H)));
  const rows = Math.ceil(N / cols);
  const cx = W / cols;
  const cy = H / rows;
  const list = [];
  let idx = 0;
  for (let r = 0; r < rows && idx < N; r++) {
    for (let c = 0; c < cols && idx < N; c++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 0.25 + 0.05;
      list.push({
        x: cx * (c + 0.2 + Math.random() * 0.6),
        y: cy * (r + 0.2 + Math.random() * 0.6),
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        r: Math.random() * 1.6 + 1.2,
      });
      idx++;
    }
  }
  return list;
}

export default function ParticleNetwork() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef([]);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.current = createParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const ps = particles.current;

      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        let ax = 0, ay = 0, sx = 0, sy = 0, na = 0, ns = 0;

        for (let j = 0; j < ps.length; j++) {
          if (i === j) continue;
          const q = ps[j];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < ALIGN_R) { ax += q.vx; ay += q.vy; na++; }
          if (d < SEP_R && d > 0) { sx -= dx / d; sy -= dy / d; ns++; }
        }

        if (na) { p.vx += (ax / na - p.vx) * ALIGN_W; p.vy += (ay / na - p.vy) * ALIGN_W; }
        if (ns) { p.vx += sx * SEP_W; p.vy += sy * SEP_W; }

        p.vx += (Math.random() - 0.5) * DRIFT;
        p.vy += (Math.random() - 0.5) * DRIFT;

        const mdx = p.x - mx, mdy = p.y - my;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < PUSH_R && md > 0) {
          const f = (1 - md / PUSH_R) * PUSH_FORCE;
          p.vx += (mdx / md) * f;
          p.vy += (mdy / md) * f;
        }

        p.vx *= FRICTION;
        p.vy *= FRICTION;
        clamp(p, MAX_SPEED);
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j];
          const ex = p.x - q.x, ey = p.y - q.y;
          const d = Math.sqrt(ex * ex + ey * ey);
          if (d >= LINK) continue;

          let cut = false;
          if (mx > -999) {
            const lx = q.x - p.x, ly = q.y - p.y;
            const len2 = lx * lx + ly * ly;
            const t = Math.max(0, Math.min(1, ((mx - p.x) * lx + (my - p.y) * ly) / len2));
            const cx = p.x + t * lx - mx, cy = p.y + t * ly - my;
            cut = cx * cx + cy * cy < CUT_R * CUT_R;
          }

          if (!cut) {
            const alpha = (1 - d / LINK) * 0.55;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(79,195,247,${alpha})`;
            ctx.lineWidth = alpha * 1.1;
            ctx.stroke();
          }
        }

        const dm = Math.hypot(p.x - mx, p.y - my);
        const glow = dm < PUSH_R ? (1 - dm / PUSH_R) * 0.8 : 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${180 + Math.round(glow * 75)},210,255,${0.7 + glow * 0.3})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

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
