"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const sparkles = [
  { x: "7%", y: "22%", size: 12, delay: 0, duration: 8, symbol: "✦" },
  { x: "18%", y: "78%", size: 9, delay: 1.8, duration: 9, symbol: "✧" },
  { x: "29%", y: "12%", size: 8, delay: 3, duration: 7, symbol: "·" },
  { x: "42%", y: "87%", size: 11, delay: 2.2, duration: 8, symbol: "✧" },
  { x: "57%", y: "18%", size: 10, delay: 4, duration: 9, symbol: "✦" },
  { x: "69%", y: "81%", size: 8, delay: .8, duration: 7, symbol: "·" },
  { x: "81%", y: "28%", size: 12, delay: 2.8, duration: 8, symbol: "✧" },
  { x: "93%", y: "68%", size: 9, delay: 1.2, duration: 10, symbol: "✦" },
  { x: "11%", y: "52%", size: 7, delay: 3.7, duration: 8, symbol: "·" },
  { x: "89%", y: "9%", size: 8, delay: 2.5, duration: 9, symbol: "·" },
] as const;

const ornaments = [
  { x: "4%", y: "34%", size: 58, delay: 0, duration: 17, symbol: "✿", kind: "flower" },
  { x: "17%", y: "83%", size: 43, delay: 2.5, duration: 20, symbol: "♡", kind: "heart" },
  { x: "89%", y: "36%", size: 64, delay: 1.2, duration: 19, symbol: "❀", kind: "flower" },
  { x: "83%", y: "78%", size: 48, delay: 3.8, duration: 18, symbol: "♥", kind: "heart" },
  { x: "69%", y: "7%", size: 42, delay: 4.5, duration: 21, symbol: "✽", kind: "flower" },
  { x: "31%", y: "8%", size: 38, delay: 1.8, duration: 16, symbol: "♡", kind: "heart" },
  { x: "6%", y: "66%", size: 42, delay: 3.2, duration: 22, symbol: "✧", kind: "sparkle" },
  { x: "91%", y: "61%", size: 44, delay: .6, duration: 18, symbol: "❋", kind: "flower" },
  { x: "76%", y: "91%", size: 34, delay: 5.1, duration: 20, symbol: "✿", kind: "flower" },
  { x: "25%", y: "43%", size: 32, delay: 4.2, duration: 19, symbol: "♡", kind: "heart" },
  { x: "12%", y: "55%", size: 56, delay: 2.1, duration: 21, symbol: "", kind: "teddy" },
  { x: "86%", y: "15%", size: 50, delay: 4.7, duration: 18, symbol: "", kind: "teddy" },
] as const;

export function FloatingDecorations() {
  const reduce = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;

    const reset = () => {
      sceneRef.current?.querySelectorAll<HTMLElement>(".ambient-ornament").forEach((element) => {
        element.style.setProperty("--cursor-x", "0px");
        element.style.setProperty("--cursor-y", "0px");
      });
      sceneRef.current?.style.setProperty("--scene-touch-x", "0px");
      sceneRef.current?.style.setProperty("--scene-touch-y", "0px");
    };
    const move = (clientX: number, clientY: number) => {
      sceneRef.current?.querySelectorAll<HTMLElement>(".ambient-ornament").forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const dx = bounds.left + bounds.width / 2 - clientX;
        const dy = bounds.top + bounds.height / 2 - clientY;
        const distance = Math.hypot(dx, dy);
        const radius = 165;
        const amount = distance < radius ? (1 - distance / radius) * 12 : 0;
        const angle = Math.atan2(dy, dx);
        element.style.setProperty("--cursor-x", `${Math.cos(angle) * amount}px`);
        element.style.setProperty("--cursor-y", `${Math.sin(angle) * amount}px`);
      });
      const scene = sceneRef.current;
      if (scene) {
        scene.style.setProperty("--scene-touch-x", `${((clientX / window.innerWidth) - .5) * 14}px`);
        scene.style.setProperty("--scene-touch-y", `${((clientY / window.innerHeight) - .5) * 10}px`);
      }
    };
    const pointerMove = (event: PointerEvent) => move(event.clientX, event.clientY);
    const touchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) move(touch.clientX, touch.clientY);
    };
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) reset();
    };

    window.addEventListener("pointermove", pointerMove, { passive: true });
    window.addEventListener("touchstart", touchMove, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("touchend", reset, { passive: true });
    window.addEventListener("touchcancel", reset, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("touchstart", touchMove);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", reset);
      window.removeEventListener("touchcancel", reset);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", reset);
    };
  }, [reduce]);

  return (
    <div ref={sceneRef} className="ambient-scene" aria-hidden="true">
      <motion.div className="aurora aurora-one" animate={reduce ? undefined : { x: [0, 34, -20, 0], y: [0, 22, 48, 0], scale: [1, 1.08, .96, 1], rotate: [0, 5, -4, 0] }} transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="aurora aurora-two" animate={reduce ? undefined : { x: [0, -40, 18, 0], y: [0, -28, -8, 0], scale: [1, .94, 1.08, 1], rotate: [0, -6, 3, 0] }} transition={{ duration: 33, delay: -8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="ambient-orb orb-one" animate={reduce ? undefined : { x: [0, 25, -14, 0], y: [0, -24, 12, 0] }} transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="ambient-orb orb-two" animate={reduce ? undefined : { x: [0, -19, 22, 0], y: [0, 18, -17, 0] }} transition={{ duration: 23, delay: -5, repeat: Infinity, ease: "easeInOut" }} />
      <div className="ambient-grain" />
      {ornaments.map((ornament, index) => (
        <motion.span
          key={`ornament-${index}`}
          className={`ambient-ornament ornament-${ornament.kind}`}
          style={{ left: ornament.x, top: ornament.y, fontSize: ornament.size }}
          animate={reduce ? undefined : { y: [0, -21, 8, 0], x: [0, 10, -8, 0], rotate: [0, 12, -9, 0], scale: [1, 1.08, .96, 1] }}
          transition={{ duration: ornament.duration, delay: ornament.delay, repeat: Infinity, ease: "easeInOut" }}
        >{ornament.kind === "teddy" ? (
          <svg className="ambient-teddy" viewBox="0 0 64 72" aria-hidden="true">
            <circle cx="17" cy="15" r="10" fill="var(--accent)" />
            <circle cx="47" cy="15" r="10" fill="var(--accent)" />
            <ellipse cx="32" cy="27" rx="21" ry="20" fill="var(--accent-soft)" stroke="var(--accent-strong)" strokeWidth="2.5" />
            <ellipse cx="32" cy="57" rx="18" ry="14" fill="var(--accent-soft)" stroke="var(--accent-strong)" strokeWidth="2.5" />
            <ellipse cx="14" cy="52" rx="7" ry="12" transform="rotate(25 14 52)" fill="var(--accent)" stroke="var(--accent-strong)" strokeWidth="2" />
            <ellipse cx="50" cy="52" rx="7" ry="12" transform="rotate(-25 50 52)" fill="var(--accent)" stroke="var(--accent-strong)" strokeWidth="2" />
            <ellipse cx="23" cy="27" rx="2" ry="2.8" fill="var(--accent-deep)" />
            <ellipse cx="41" cy="27" rx="2" ry="2.8" fill="var(--accent-deep)" />
            <ellipse cx="32" cy="34" rx="5" ry="3.6" fill="var(--accent)" />
            <path d="M29 37q3 3 6 0" fill="none" stroke="var(--accent-deep)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="14" cy="33" r="3.5" fill="var(--accent)" opacity=".55" />
            <circle cx="50" cy="33" r="3.5" fill="var(--accent)" opacity=".55" />
          </svg>
        ) : ornament.symbol}</motion.span>
      ))}
      {sparkles.map((sparkle, index) => (
        <motion.span
          key={index}
          className={`ambient-sparkle${index % 3 === 0 ? " sparkle-bright" : ""}`}
          style={{ left: sparkle.x, top: sparkle.y, fontSize: sparkle.size }}
          animate={reduce ? undefined : { y: [0, -15, 4, 0], x: [0, 7, -5, 0], opacity: [.24, .9, .42, .24], rotate: [0, 35, -15, 0], scale: [.8, 1.16, .9, .8] }}
          transition={{ duration: sparkle.duration, delay: sparkle.delay, repeat: Infinity, ease: "easeInOut" }}
        >{sparkle.symbol}</motion.span>
      ))}
    </div>
  );
}
