"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

function Penguin({ flip = false }: { flip?: boolean }) {
  const gradientId = flip ? "penguin-teal" : "penguin-ink";
  const coat = flip ? ["#557574", "#253b3c"] : ["#454644", "#171d1d"];

  return (
    <svg className={`penguin-svg${flip ? " flip" : ""}`} viewBox="0 0 200 220" role="img" aria-label="A little penguin leaning in for a hug">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1"><stop stopColor={coat[0]} /><stop offset="1" stopColor={coat[1]} /></linearGradient>
        <linearGradient id={`${gradientId}-belly`} x1="0" x2=".9" y1="0" y2="1"><stop stopColor="#fffaf0" /><stop offset="1" stopColor="#e9e1d5" /></linearGradient>
        <linearGradient id={`${gradientId}-beak`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#ffd080" /><stop offset="1" stopColor="#df8840" /></linearGradient>
      </defs>
      <ellipse cx="98" cy="211" rx="64" ry="7" fill="#493a3420" />
      {/* softly brushed side-facing silhouette */}
      <path d="M96 205 C67 211 38 201 27 180 C17 161 20 136 24 108 C22 78 32 49 52 31 C69 15 96 14 118 27 C143 40 158 63 162 89 C167 111 161 137 156 158 C151 181 147 197 130 204 C119 208 106 207 96 205Z" fill={`url(#${gradientId})`} stroke={coat[1]} strokeWidth="2" strokeLinejoin="round" />
      {/* creamy face and belly, shaped like the reference illustration */}
      <path d="M79 51 C103 42 130 55 144 77 C155 95 154 116 150 137 C146 157 143 178 132 190 C121 201 99 200 80 195 C59 190 47 178 44 159 C40 137 43 107 47 84 C51 67 62 56 79 51Z" fill={`url(#${gradientId}-belly)`} />
      {/* quiet painterly feather strokes */}
      <path d="M40 127 Q35 151 43 171 M48 165 Q51 181 63 189 M145 144 Q142 165 136 176" fill="none" stroke={flip ? "#829990" : "#929084"} strokeWidth="2" strokeLinecap="round" opacity=".3" />
      <path d="M59 43 Q76 27 97 28 M43 75 Q48 59 58 52" fill="none" stroke="#fff8ec" strokeWidth="2" strokeLinecap="round" opacity=".14" />
      {/* little tail and tucked wing */}
      <path d="M31 159 Q18 173 8 190 Q27 190 43 177Z" fill={coat[1]} />
      <path d="M41 116 C26 127 22 149 27 165 C30 176 38 177 44 166 L61 132Z" fill={coat[1]} opacity=".92" />
      <path d="M132 119 C148 125 153 144 146 160 C143 168 135 168 132 158 L119 134Z" fill={coat[1]} stroke={coat[0]} strokeWidth="1.2" />
      {/* soft closed eye, blush and little profile beak */}
      <path d="M117 80 Q125 88 133 79" fill="none" stroke="#303332" strokeWidth="3.2" strokeLinecap="round" />
      <ellipse cx="115" cy="99" rx="10" ry="6" fill="#e99491" opacity=".62" />
      <path d="M145 82 Q160 80 190 91 Q168 101 149 98 Q144 92 145 82Z" fill={`url(#${gradientId}-beak)`} stroke="#bd7541" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M151 91 Q166 92 181 89" fill="none" stroke="#ffe3b4" strokeWidth="1.3" strokeLinecap="round" opacity=".85" />
      {/* tiny orange feet */}
      <path d="M68 194 C58 198 53 207 59 210 Q73 212 91 206 Q94 201 84 197Z" fill="#e99a4c" />
      <path d="M110 198 C102 202 101 209 108 211 Q123 212 139 206 Q142 201 130 198Z" fill="#efa752" />
      <path d="M66 207l-7 2m17-2-2 3m42-3-1 3m11-4 7 2" fill="none" stroke="#bd7041" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function EmbraceWing({ side, hugging, reduce }: { side: "left" | "right"; hugging: boolean; reduce: boolean | null }) {
  const coat = side === "left" ? "#292d2c" : "#365656";
  const edge = side === "left" ? "#525754" : "#64817e";
  return (
    <svg className={`embrace-wing ${side}`} viewBox="0 0 100 90" aria-hidden="true">
      <motion.g
        className="embrace-wing-motion"
        initial={{ opacity: 0, rotate: 0, scale: 0.82, y: 8 }}
        animate={hugging && !reduce
          ? { opacity: 1, rotate: [-43, -49, -43], scale: [1, 1.04, 1], y: [0, -2, 0] }
          : { opacity: hugging ? 1 : 0, rotate: hugging ? -46 : 0, scale: 1, y: 0 }}
        transition={reduce
          ? { duration: 0 }
          : { opacity: { duration: 0.18 }, rotate: { duration: 0.9, repeat: hugging ? Infinity : 0, repeatDelay: 1.5, ease: "easeInOut", delay: 0.08 }, scale: { duration: 1.1, repeat: hugging ? Infinity : 0, repeatDelay: 1.5, ease: "easeInOut" }, y: { duration: 1.1, repeat: hugging ? Infinity : 0, repeatDelay: 1.5, ease: "easeInOut" } }}
        style={{ transformOrigin: "25px 17px" }}
      >
        <path d="M24 13 C39 3 55 10 68 23 C78 34 86 42 98 49 C107 55 105 66 97 70 C88 75 79 69 70 63 C56 54 48 42 36 36 C31 33 26 32 21 32Z" fill={coat} stroke={edge} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M91 65 Q99 59 105 66 Q108 73 100 78 Q92 77 89 71Z" fill="var(--accent)" />
        <path d="M98 68 Q101 65 103 68" fill="none" stroke="#fff8f3" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

const floatingHearts = [
  { left: "13%", top: "43%", size: 19, delay: 0.1 },
  { left: "29%", top: "19%", size: 14, delay: 0.7 },
  { left: "68%", top: "26%", size: 18, delay: 0.35 },
  { left: "83%", top: "48%", size: 14, delay: 1 },
  { left: "49%", top: "10%", size: 13, delay: 0.5 },
] as const;

export function VirtualHug({ onRestart }: { onRestart: () => void }) {
  const reduce = useReducedMotion();
  const [hugging, setHugging] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHugging(true), reduce ? 0 : 2200);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  return (
    <section className="hug-page content-card centered-card">
      <div className="hug-topper"><span>✦</span> THE LAST LITTLE THING <span>✦</span></div>
      <h2 className="hug-title">one more thing<span>…</span></h2>

      <div className={`hug-scene${hugging ? " is-hugging" : ""}`}>
        <div className="hug-glow" aria-hidden="true" />
        {floatingHearts.map((heart, index) => (
          <motion.span
            key={`${heart.left}-${heart.top}`}
            className={`hug-particle${index % 2 ? " hug-particle-star" : ""}`}
            style={{ left: heart.left, top: heart.top, fontSize: heart.size }}
            initial={{ opacity: 0, y: 8, scale: 0.7 }}
            animate={hugging && !reduce
              ? { opacity: [0.35, 1, 0.35], y: [0, -18, -34], scale: [0.85, 1.08, 0.9], rotate: [-8, 8, -5] }
              : { opacity: hugging ? 0.75 : 0, y: 0, scale: 1 }}
            transition={{ duration: reduce ? 0 : 2.8, delay: reduce ? 0 : heart.delay, repeat: hugging && !reduce ? Infinity : 0, ease: "easeInOut" }}
            aria-hidden="true"
          >{index % 2 ? "✦" : "♡"}</motion.span>
        ))}

        <div className={`penguin-pair${hugging ? " hugging" : ""}`}>
          <motion.div
            className="penguin-wrap penguin-left"
            initial={{ x: -42, rotate: -5, y: 0 }}
            animate={hugging && !reduce
              ? { x: 11, rotate: 5, scaleX: [1, 0.92, 0.97], scaleY: [1, 1.035, 1.015], y: [0, -3, 0] }
              : { x: 0, rotate: 0, y: [0, -6, 0] }}
            transition={{ x: { duration: reduce ? 0 : 1.8, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }, rotate: { type: "spring", stiffness: 100, damping: 14 }, y: { duration: hugging ? 1 : 0.42, repeat: hugging && !reduce ? Infinity : 1, repeatDelay: 1.4, ease: "easeInOut" }, scaleX: { duration: 0.9, repeat: hugging && !reduce ? Infinity : 0, repeatDelay: 1.5, ease: "easeInOut" }, scaleY: { duration: 0.9, repeat: hugging && !reduce ? Infinity : 0, repeatDelay: 1.5, ease: "easeInOut" } }}
          ><Penguin /></motion.div>
          <motion.div
            className="penguin-wrap penguin-right"
            initial={{ x: 42, rotate: 5, y: 0 }}
            animate={hugging && !reduce
              ? { x: -11, rotate: -5, scaleX: [1, 0.92, 0.97], scaleY: [1, 1.035, 1.015], y: [0, -3, 0] }
              : { x: 0, rotate: 0, y: [0, -6, 0] }}
            transition={{ x: { duration: reduce ? 0 : 1.8, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }, rotate: { type: "spring", stiffness: 100, damping: 14 }, y: { duration: hugging ? 1 : 0.42, repeat: hugging && !reduce ? Infinity : 1, repeatDelay: 1.4, ease: "easeInOut" }, scaleX: { duration: 0.9, repeat: hugging && !reduce ? Infinity : 0, repeatDelay: 1.5, ease: "easeInOut" }, scaleY: { duration: 0.9, repeat: hugging && !reduce ? Infinity : 0, repeatDelay: 1.5, ease: "easeInOut" } }}
          ><Penguin flip /></motion.div>
        </div>
        <EmbraceWing side="left" hugging={hugging} reduce={reduce} />
        <EmbraceWing side="right" hugging={hugging} reduce={reduce} />
        <motion.span className="hug-center-heart" initial={{ opacity: 0, scale: 0 }} animate={hugging ? { opacity: [0, 1, 0.8], scale: [0, 1.25, 1] } : { opacity: 0, scale: 0 }} transition={{ delay: reduce ? 0 : 0.15, duration: reduce ? 0 : 0.6 }} aria-hidden="true">♥</motion.span>
      </div>

      <motion.p className="hug-message" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        Sending you the biggest virtual hug! <span>🐧❤️</span>
      </motion.p>
      <p className="hug-subtext">squeeze received? hold onto it for a second ♡</p>
      <motion.button
        className="button-secondary restart-button"
        onClick={onRestart}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
      ><span>↶</span> go back to the beginning</motion.button>
      <div className="hug-stamp" aria-hidden="true">100%<br /><span>HUG</span><br />CERTIFIED</div>
    </section>
  );
}
