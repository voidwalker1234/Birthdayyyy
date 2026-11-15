"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Mood, MoodOption } from "@/lib/moods";

type Props = { moods: MoodOption[]; selected: Mood | null; onSelect: (mood: Mood) => void; onNext: () => void };

function WavingHand() {
  return <svg viewBox="0 0 96 100" role="presentation">
    <defs>
      <linearGradient id="hand-skin" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#ffd1ad" /><stop offset=".55" stopColor="#efad87" /><stop offset="1" stopColor="#d98f76" /></linearGradient>
      <linearGradient id="hand-cuff" x1="0" x2="1"><stop stopColor="var(--accent)" /><stop offset="1" stopColor="var(--accent-strong)" /></linearGradient>
    </defs>
    <path d="M31 81 20 59c-2-5-8-11-12-16-4-5 1-11 6-8l12 10-7-24c-2-7 7-11 11-4l10 23-4-27c-1-8 10-10 13-2l8 28-1-24c0-8 11-9 14-1l3 30 7-15c3-7 13-3 10 4L82 60c-2 13-12 24-25 27-8 2-18 1-26-6Z" fill="url(#hand-skin)" stroke="#b77763" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="m25 42 8 10m9-25 3 15m14-12 1 16m17-2-5 11" fill="none" stroke="#ffe2c7" strokeWidth="2.2" strokeLinecap="round" opacity=".8" />
    <path d="M39 59q8 6 15 3m-10 10q8 4 16 1" fill="none" stroke="#bf7c68" strokeWidth="1.6" strokeLinecap="round" opacity=".58" />
    <path d="M31 76q13 10 29 5l5 12q-18 8-31-2Z" fill="url(#hand-cuff)" stroke="#fff8f2" strokeWidth="2" strokeLinejoin="round" />
    <path d="m39 82 2 8m9-6 1 8m8-10 1 7" fill="none" stroke="#fff8f2" strokeWidth="1.3" strokeLinecap="round" opacity=".85" />
  </svg>;
}

export function MoodSelector({ moods, selected, onSelect, onNext }: Props) {
  const reduce = useReducedMotion();
  return <section className="welcome-page content-card">
    <motion.div className="hello-hand" initial={{ rotate: -18, y: 16, opacity: 0 }} animate={reduce ? { rotate: 0, y: 0, opacity: 1 } : { rotate: [-8, 14, -8, 17, -8], y: [0, -2, 0], opacity: 1 }} transition={reduce ? { duration: .35 } : { rotate: { duration: 1.15, delay: .2, repeat: Infinity, repeatDelay: .7, ease: "easeInOut" }, y: { duration: 1.15, delay: .2, repeat: Infinity, repeatDelay: .7, ease: "easeInOut" }, opacity: { duration: .35 } }} aria-hidden="true"><WavingHand /></motion.div>
    <div className="eyebrow"><span>✦</span> YOUR VERY OWN BIRTHDAY SURPRISE <span>✦</span></div>
    <h1>Hey there<span className="pink-dot">!</span></h1>
    <p className="intro-copy">Before we begin, pick a colour<br className="mobile-break" /> that feels like you<span className="scribble"> ♡</span></p>
    <div className="mood-grid" role="radiogroup" aria-label="Pick your mood colour">
      {moods.map((mood, i) => <motion.button key={mood.id} type="button" className={`mood-option ${selected === mood.id ? "selected" : ""}`} onClick={() => onSelect(mood.id)} role="radio" aria-checked={selected === mood.id} whileHover={{ y: -4, rotate: i % 2 ? 1.5 : -1.5, scale: 1.025 }} whileTap={{ scale: .97 }}>
        <span className="swatch" style={{ "--swatch": mood.color } as CSSProperties}>{selected === mood.id ? <span className="swatch-check">✓</span> : <span className="swatch-spark">✧</span>}</span>
        <span className="mood-copy"><span className="mood-name">{mood.name}</span><span className="mood-note">{mood.note}</span></span>
        <span className="mood-flower" aria-hidden="true">✿</span>
      </motion.button>)}
    </div>
    <div className="welcome-bottom">
      <span className="tiny-hint">{selected ? "oh, this one suits you ♡" : "there’s no wrong answer, promise"}</span>
      {selected && <motion.button className="button-primary next-button" onClick={onNext} initial={{ opacity: 0, y: 5, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }}>
        let’s go <span>→</span>
      </motion.button>}
    </div>
  </section>;
}
