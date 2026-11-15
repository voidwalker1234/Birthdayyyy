"use client";
import { motion, useReducedMotion } from "framer-motion";

const bits = [
  ["✦", "deco-one", .1, 0], ["♡", "deco-two", .35, .4], ["✿", "deco-three", .6, .2], ["✧", "deco-four", .85, .7],
  ["·", "deco-five", .2, .8], ["♡", "deco-six", .7, .5], ["❀", "deco-seven", .45, .3], ["✷", "deco-eight", .15, .6],
  ["⋆", "deco-nine", .8, .5], ["♡", "deco-ten", .55, .9], ["✿", "deco-eleven", .3, .7], ["✧", "deco-twelve", .65, .1],
] as const;

export function FloatingDecorations() {
  const reduce = useReducedMotion();
  return <div className="floating-decor" aria-hidden="true">{bits.map(([symbol, className, delay, duration]) => <motion.span key={className} className={className} animate={reduce ? undefined : { y: [0, -13, 3, 0], rotate: [0, 9, -7, 0], scale: [1, 1.08, .98, 1] }} transition={{ duration: 5 + duration * 2, delay, repeat: Infinity, ease: "easeInOut" }}>{symbol}</motion.span>)}</div>;
}
