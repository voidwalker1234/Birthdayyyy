"use client";

import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { MoodSelector } from "@/components/MoodSelector";
import { ReadyPage } from "@/components/ReadyPage";
import { BirthdayReveal } from "@/components/BirthdayReveal";
import { BirthdayMessage } from "@/components/BirthdayMessage";
import { SecretNote } from "@/components/SecretNote";
import { VirtualHug } from "@/components/VirtualHug";
import { FloatingDecorations } from "@/components/FloatingDecorations";
import { moods, type Mood } from "@/lib/moods";

const transitions = {
  initial: { opacity: 0, y: 18, scale: .985, filter: "blur(5px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -14, scale: .99, filter: "blur(4px)" },
};

export default function Home() {
  const [page, setPage] = useState(0);
  const [mood, setMood] = useState<Mood | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [noCount, setNoCount] = useState(0);

  const chooseYes = () => {
    setConfetti(true);
    setPage(2);
  };
  const restart = () => {
    setPage(0);
    setMood(null);
    setConfetti(false);
    setNoCount(0);
  };

  return (
    <MotionConfig reducedMotion="user">
    <main className="experience" data-theme={mood ?? "pink"}>
      <div className="ambient-wash" aria-hidden="true" />
      <FloatingDecorations />
      <div className="top-note"><span className="top-note-star">✳</span> a tiny corner of the internet, just for you <span className="top-note-star">✳</span></div>
      {page !== 4 && <div className="progress" aria-label={`Page ${page + 1} of 6`}>
        {Array.from({ length: 6 }, (_, i) => <span key={i} className={i <= page ? "progress-dot active" : "progress-dot"} />)}
      </div>}
      <AnimatePresence mode="wait">
        <motion.div key={page} className="page-shell" variants={transitions} initial="initial" animate="animate" exit="exit" transition={{ duration: .52, ease: [.22, 1, .36, 1] }}>
          {page === 0 && <MoodSelector moods={moods} selected={mood} onSelect={setMood} onNext={() => setPage(1)} />}
          {page === 1 && <ReadyPage noCount={noCount} onNo={() => setNoCount((n) => n + 1)} onYes={chooseYes} />}
          {page === 2 && <BirthdayReveal mood={moods.find((m) => m.id === mood) ?? moods[0]} showConfetti={confetti} onNext={() => setPage(3)} />}
          {page === 3 && <BirthdayMessage onNext={() => setPage(4)} />}
          {page === 4 && <SecretNote onContinue={() => setPage(5)} />}
          {page === 5 && <VirtualHug onRestart={restart} />}
        </motion.div>
      </AnimatePresence>
      <footer className="footer-note">made with a little extra love <span>♡</span></footer>
    </main>
    </MotionConfig>
  );
}
