"use client";
import { motion } from "framer-motion";

const message = [
  "Happiest birthday, Shreyyyyyyyyyyyyy!",
  "I know it's crazy that I'm there with you for some birthdays and go MIA for others, but hey, this birthday is going to be different!",
  "I realised that giving you a materialistic gift would be cool, but, as you can see, the cosmos is kinda against us (I hope not for long 😭😭). So I made you this virtual whatever-you-call-this, lol.",
  "I know it's nothing crazy, but at least this way, I can be a part of your birthday, so the effort is worth it, lol.",
  "Also, I hope your day is filled with good food, lots of cake, and as little stress as humanly possible (we can aim high, lol). If this little website makes you smile even once, I'm counting it as a very successful gift.",
  "i dont think you realise how important you are to me but i just wanna let you know that no matter wat happens i shall always protect you and be there for you no matter wat and that's a promise😉",
  "Anyways, may you get everything good you deserve, and be happy forever and ever and everrrrrrrrrrrrrr!",
  "Cheers to celebrating all your birthdays together 🥂",
  "And the rest, I guess you know it all 😘",
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
