"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import type { MoodOption } from "@/lib/moods";
import { Confetti } from "@/components/Confetti";
import { BirthdayCake } from "@/components/BirthdayCake";

type Props = { mood: MoodOption; showConfetti: boolean; onNext: () => void };
const balloons = ["#eaa0b4", "#b6a5df", "#92bedb", "#f0bd73", "#94c5ae", "#edb3a5", "#efaac2"];
const buntingColors = ["#efafbd", "#bca9e2", "#9bc8df", "#efd17c", "#a1cfb9", "#f0b8a6", "#e6a5ba"];
const wishSparkles = [
  { x: "9%", y: "26%", symbol: "✦", size: 18, delay: 0, duration: 7 },
  { x: "19%", y: "61%", symbol: "✧", size: 15, delay: .8, duration: 8 },
  { x: "31%", y: "36%", symbol: "·", size: 20, delay: 1.6, duration: 6.5 },
  { x: "72%", y: "33%", symbol: "✧", size: 17, delay: .5, duration: 7.5 },
  { x: "83%", y: "62%", symbol: "✦", size: 19, delay: 1.3, duration: 8.5 },
  { x: "93%", y: "29%", symbol: "·", size: 21, delay: 2, duration: 7 },
  { x: "41%", y: "18%", symbol: "✧", size: 13, delay: 2.5, duration: 8 },
  { x: "61%", y: "73%", symbol: "✦", size: 14, delay: 1, duration: 7 },
] as const;

function Teddy({ className, delay }: { className: string; delay: number }) {
  return <motion.div className={`teddy ${className}`} initial={{ y: 42, scale: .72, opacity: 0, rotate: -8 }} animate={{ y: 0, scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: .8, ease: [.22, 1, .36, 1], delay }} aria-hidden="true">🧸</motion.div>;
}

export function BirthdayReveal({ mood, showConfetti, onNext }: Props) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduce) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = stage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      stage.style.setProperty("--parallax-x", `${(x * 12).toFixed(1)}px`);
      stage.style.setProperty("--parallax-y", `${(y * 9).toFixed(1)}px`);
    };
    const reset = () => {
      stage.style.setProperty("--parallax-x", "0px");
      stage.style.setProperty("--parallax-y", "0px");
    };
    stage.addEventListener("pointermove", move, { passive: true });
    stage.addEventListener("pointerleave", reset, { passive: true });
    return () => { stage.removeEventListener("pointermove", move); stage.removeEventListener("pointerleave", reset); };
  }, [reduce]);
  return <section className="reveal-page content-card celebration-card">
    <Confetti active={showConfetti} />
    <div className="party-label"><span className="party-label-line" /> TODAY IS ALL ABOUT YOU <span className="party-label-line" /></div>
    <div className="celebration-stage" ref={stageRef}>
      <div className="balloon-field" aria-hidden="true">{balloons.map((color, i) => <motion.div key={color} className={`balloon balloon-${i + 1}`} style={{ "--balloon": color } as CSSProperties} initial={{ y: "120%", opacity: 0 }} animate={{ y: reduce ? 0 : ["7%", "-5%", "7%"], opacity: 1 }} transition={{ y: { duration: reduce ? .3 : 6.5 + i * .6, delay: .15 + i * .12, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }, opacity: { duration: .75, delay: .15 + i * .12 } }}><span /></motion.div>)}</div>
      {wishSparkles.map((sparkle, i) => <motion.span key={`wish-sparkle-${i}`} className="wish-sparkle" style={{ left: sparkle.x, top: sparkle.y, fontSize: sparkle.size }} initial={reduce ? false : { opacity: 0, scale: .65 }} animate={reduce ? { opacity: .46, scale: 1 } : { opacity: [.24, .82, .35, .24], y: [0, -13, 3, 0], x: [0, 5, -3, 0], rotate: [0, 18, -12, 0], scale: [.8, 1.1, .9, .8] }} transition={{ duration: sparkle.duration, delay: sparkle.delay, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }} aria-hidden="true">{sparkle.symbol}</motion.span>)}
      <div className="party-bunting" aria-hidden="true">{buntingColors.map((color, i) => <span key={color} className={`bunting-flag flag-${i + 1}`} style={{ "--flag": color } as CSSProperties} />)}</div>
      <div className="birthday-heading">
        <motion.span className="tiny-crown" initial={{ y: -20, opacity: 0, rotate: -15 }} animate={{ y: 0, opacity: 1, rotate: 0 }} transition={{ delay: .35, duration: .7, ease: [.22, 1, .36, 1] }}>♕</motion.span>
        <motion.div className="birthday-word birthday-word-top" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .65 }}>HAPPY</motion.div>
        <motion.div className="birthday-word birthday-word-main" initial={{ opacity: 0, y: 24, scale: .9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .45, duration: .9, ease: [.22, 1, .36, 1] }}>BIRTHDAY</motion.div>
        <motion.div className="birthday-name" initial={{ opacity: 0, scale: .8, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: -3 }} transition={{ delay: .75, duration: .85, ease: [.22, 1, .36, 1] }}>Shrey<span>!</span></motion.div>
        <motion.p className="birthday-subline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>today gets a little more magical because it’s yours ♡</motion.p>
      </div>
      <Teddy className="teddy-left" delay={.7} /><Teddy className="teddy-right" delay={.9} />
      <BirthdayCake />
      <span className="stage-flower flower-stage-one" aria-hidden="true">✿</span><span className="stage-flower flower-stage-two" aria-hidden="true">❀</span>
      <span className="stage-flower flower-stage-three" aria-hidden="true">✿</span><span className="stage-flower flower-stage-four" aria-hidden="true">❀</span>
      <span className="celebration-star star-one" aria-hidden="true">✧</span><span className="celebration-star star-two" aria-hidden="true">✦</span>
      <span className="party-badge">{mood.name} mood <span>✿</span></span>
    </div>
    <div className="reveal-bottom"><span className="next-hint">psst… there’s more ↓</span><motion.button className="button-primary" onClick={onNext} whileHover={{ scale: 1.05 }} whileTap={{ scale: .96 }}>NEXT <span>→</span></motion.button><span className="next-hint right-hint">make a little wish ✷</span></div>
  </section>;
}
