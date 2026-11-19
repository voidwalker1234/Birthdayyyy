"use client";

import { motion, useReducedMotion } from "framer-motion";

export function BirthdayCake() {
  const reduce = useReducedMotion();
  return <motion.div
    className="cake-illustration"
    initial={{ opacity: 0, y: 18, scale: .8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: .95, duration: reduce ? .2 : .7, ease: [.22, 1, .36, 1] }}
    aria-hidden="true"
  >
    <svg viewBox="0 0 200 170" role="presentation">
      <ellipse cx="100" cy="153" rx="72" ry="9" fill="#d7c1b6" />
      <path d="M47 147h106l-8-10H55z" fill="#eee0d6" />
      <rect x="45" y="91" width="110" height="50" rx="13" fill="#f1c49f" />
      <path d="M45 101c9-10 17 8 27-1 10-9 16 8 27-1 10-9 18 8 29-1 11-9 17 7 27-1v15c-8 9-16-6-26 2-11 9-19-7-29 2-12 9-18-7-29 2-10 8-18-7-26 1z" fill="var(--accent)" />
      <rect x="61" y="54" width="78" height="43" rx="12" fill="#fff1db" />
      <path d="M61 65c8-9 14 6 22-1 8-7 14 7 22 0 9-7 15 6 23 0 5-4 8 1 11 2v16c-8 8-14-5-22 2-9 8-15-6-24 2-9 8-15-6-23 2-4 3-7 1-9-1z" fill="#f6bdd0" />
      <circle cx="71" cy="113" r="3" fill="#fff8ec" /><circle cx="91" cy="127" r="3" fill="#fff8ec" />
      <circle cx="111" cy="112" r="3" fill="#fff8ec" /><circle cx="133" cy="127" r="3" fill="#fff8ec" />
      <circle cx="82" cy="79" r="3" fill="#eaa0b4" /><circle cx="119" cy="79" r="3" fill="#eaa0b4" />
      <rect x="78" y="35" width="6" height="21" rx="3" fill="#9cc9ba" />
      <rect x="97" y="31" width="6" height="25" rx="3" fill="#b6a5df" />
      <rect x="116" y="35" width="6" height="21" rx="3" fill="#8fbdd9" />
      <path className="cake-flame" d="M81 33c-9-9 5-13 0-21 12 8 8 15 3 21z" fill="#f2b95f" />
      <path className="cake-flame flame-two" d="M100 29c-9-9 5-13 0-21 12 8 8 15 3 21z" fill="#f2b95f" />
      <path className="cake-flame flame-three" d="M119 33c-9-9 5-13 0-21 12 8 8 15 3 21z" fill="#f2b95f" />
      <path d="M34 77c-10-8-21 5-12 13 9 6 18-3 12-13zm132 5c6-12 22-5 17 6-5 10-19 5-17-6z" fill="#f5b8c6" />
      <circle cx="30" cy="83" r="3" fill="#e6bf67" /><circle cx="174" cy="85" r="3" fill="#e6bf67" />
    </svg>
  </motion.div>;
}
