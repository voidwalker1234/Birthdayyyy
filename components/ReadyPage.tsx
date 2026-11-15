"use client";
import { motion, useReducedMotion } from "framer-motion";

const notes = ["are you suuuure?", "hmm, I’d reconsider 😌", "the YES button is right there hehe", "okay okay, last chance! ♡"];

type Props = { noCount: number; onNo: () => void; onYes: () => void };
export function ReadyPage({ noCount, onNo, onYes }: Props) {
  const reduce = useReducedMotion();
  return <section className="ready-page content-card centered-card">
    <motion.div className="question-sticker" initial={{ scale: 0, rotate: -22 }} animate={{ scale: 1, rotate: 9 }} transition={{ type: "spring", delay: .2 }} aria-hidden="true">♡</motion.div>
    <div className="eyebrow"><span>✿</span> JUST ONE LITTLE QUESTION <span>✿</span></div>
    <h2 className="ready-title">Are you ready<br /><span>to see your gift?</span></h2>
    <div className="ready-doodle" aria-hidden="true"><span>｡</span><span>✦</span><span>｡</span></div>
    <div className="choice-row">
      <motion.button className="button-primary yes-button" onClick={onYes} whileHover={{ scale: 1.06, rotate: -1 }} whileTap={{ scale: .94 }}>YES! <span>❤️</span></motion.button>
      <motion.button className="button-secondary no-button" onClick={onNo} animate={noCount > 0 && !reduce ? { x: noCount % 2 ? 12 : -12, y: noCount % 2 ? -5 : 5, rotate: noCount % 2 ? 3 : -3 } : undefined} whileTap={{ scale: .95 }} transition={{ type: "spring", stiffness: 360, damping: 14 }}>NO <span>🙃</span></motion.button>
    </div>
    <motion.p className="no-message" key={Math.min(noCount, notes.length) } initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>{noCount > 0 ? notes[Math.min(noCount - 1, notes.length - 1)] : "(the no button gets a little shy)"}</motion.p>
    <div className="ready-sparkle sparkle-a" aria-hidden="true">✧</div><div className="ready-sparkle sparkle-b" aria-hidden="true">✧</div>
  </section>;
}
