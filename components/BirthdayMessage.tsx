"use client";
import { motion } from "framer-motion";

const message = [
  "Happiest birthday, Shreyyyyyyyyyyyyy!",
  "I know I'm there for some birthdays and then go MIA for others, but this year, I get to be part of yours!",
  "I wanted to get you something, but the cosmos seems to have other plans (hopefully not for long 😭😭), so I made you this little virtual whatever-this-is instead, lol.",
  "It's not much, but I wanted to make sure you still got a little something from me.",
  "I hope your day has lots of good food, plenty of cake, and as little stress as possible. And if this little website makes you smile even once, I'll call it a win.",
  "I don't think you realise how important you are to me, but I just wanna let you know that no matter wat happens, I shall always protect you and be there for you, no matter wat. And that's a promise 😉",
  "Anyways, I hope you stay happy forever and ever and everrrrrrrrr, and I pray that you're hella successful and healthy!",
  "Cheers to celebrating all your birthdays together 🥂",
  "And the rest? I think you already know it all 😙",
];

export function BirthdayMessage({ onNext }: { onNext: () => void }) {
  return <section className="letter-page">
    <div className="letter-side-note note-left" aria-hidden="true">♡<br /><span>for my<br />favourite<br />human</span></div>
    <motion.div className="letter-envelope" initial={{ y: 28, opacity: 0, rotate: 2 }} animate={{ y: 0, opacity: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 100, damping: 17 }}>
      <div className="letter-paper">
        <div className="paper-topline"><span>THE IMPORTANT STUFF</span><span>✿ &nbsp; BIRTHDAY EDITION &nbsp; ✿</span></div>
        <div className="letter-heading"><span className="letter-scribble">a little note</span><span className="letter-date">for Shreya ♡</span></div>
        <div className="letter-copy">
          {message.map((line, i) => <motion.p key={line} className={i === 0 ? "message-greeting" : ""} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 + i * .09, duration: .45 }}>{line}</motion.p>)}
          <motion.p className="letter-signoff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 + message.length * .09 + .25 }}>Yours truly,<br /><span>&mdash; you know who &#128521;&#128521;</span></motion.p>
        </div>
        <div className="letter-seal" aria-hidden="true">♡</div>
        <span className="paper-flower flower-left" aria-hidden="true">✿</span><span className="paper-star" aria-hidden="true">✧</span>
      </div>
      <div className="envelope-back" aria-hidden="true" />
    </motion.div>
    <div className="letter-footer"><span>made of pixels, delivered with love</span><motion.button className="button-primary" onClick={onNext} whileHover={{ scale: 1.05 }} whileTap={{ scale: .96 }}>NEXT <span>→</span></motion.button><span>p.s. i meant every word ♡</span></div>
    <div className="letter-side-note note-right" aria-hidden="true">✧<br /><span>open<br />whenever<br />you need</span></div>
  </section>;
}
