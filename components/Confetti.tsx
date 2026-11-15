"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Piece = { x: number; y: number; vx: number; vy: number; size: number; spin: number; angle: number; color: string; shape: number };
const colors = ["#ee90ae", "#f2c56e", "#9fc9e3", "#b4a3df", "#94c8ad", "#f5a88f"];

export function Confetti({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !active || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const pieces: Piece[] = Array.from({ length: 100 }, (_, i) => ({
      x: window.innerWidth * (.35 + Math.random() * .3), y: window.innerHeight * (.32 + Math.random() * .14),
      vx: (Math.random() - .5) * 9, vy: -Math.random() * 8 - 1.5, size: Math.random() * 7 + 4,
      spin: (Math.random() - .5) * .18, angle: Math.random() * Math.PI, color: colors[i % colors.length], shape: i % 3,
    }));
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      let live = false;
      for (const p of pieces) {
        if (p.y < window.innerHeight + 24 && frame < 250) live = true;
        p.vy += .12; p.x += p.vx; p.y += p.vy; p.angle += p.spin; p.vx *= .994;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle); ctx.fillStyle = p.color;
        if (p.shape === 0) ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * .6);
        else if (p.shape === 1) { ctx.beginPath(); ctx.arc(0, 0, p.size * .38, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.beginPath(); ctx.moveTo(0, -p.size / 2); ctx.lineTo(p.size / 2, p.size / 2); ctx.lineTo(-p.size / 2, p.size / 2); ctx.closePath(); ctx.fill(); }
        ctx.restore();
      }
      if (live) raf = requestAnimationFrame(draw); else ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); };
  }, [active, reduce]);
  return <canvas className="confetti-canvas" ref={ref} aria-hidden="true" />;
}
