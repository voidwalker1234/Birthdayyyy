"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

const secretMessage = [
  "Lesgooooooo, u remembered the password 😚",
  "So this section is actually a secret only we both can open 😉😉 fun, right!!!! Well, as u know, I’ve lost u many times before because of shitty decisions I made 🥲🥲 and I can’t do anything about the past now other than sit and think about how I could do stuff differently, ugghhhh. But anyways, coming to the present!!! Now that I have u back, it feels like life has flipped to the good side again.",
  "Butttt, we haven’t been talking much lately cause of all the xyz reasons, and it does suck (I should stop being so clingy 😑😑). It is wat it is.",
  "And once again, let me wish u a very happy birthday for the millionth time, and ily more than u can imagine 😙♾️",
];

export function SecretNote({ onContinue }: { onContinue: () => void }) {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === "1222") {
      setIncorrect(false);
      setUnlocked(true);
    } else {
      setIncorrect(true);
      setPassword("");
    }
  };

  return (
    <section className="secret-page" aria-label="Secret note">
      <motion.span className="secret-doodle doodle-heart" aria-hidden="true" animate={{ y: [0, -9, 0], rotate: [-10, 4, -10], scale: [1, 1.08, 1] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}>♡</motion.span>
      <motion.span className="secret-doodle doodle-flower" aria-hidden="true" animate={{ y: [0, 8, 0], rotate: [0, 14, 0] }} transition={{ duration: 4.4, delay: .4, repeat: Infinity, ease: "easeInOut" }}>✿</motion.span>
      <motion.span className="secret-doodle doodle-sparkle" aria-hidden="true" animate={{ y: [0, -7, 0], rotate: [0, 24, 0], opacity: [.55, 1, .55] }} transition={{ duration: 3.2, delay: .8, repeat: Infinity, ease: "easeInOut" }}>✦</motion.span>
      <motion.span className="secret-doodle doodle-heart-two" aria-hidden="true" animate={{ y: [0, 7, 0], rotate: [8, -8, 8] }} transition={{ duration: 4.1, delay: .3, repeat: Infinity, ease: "easeInOut" }}>♡</motion.span>
      <motion.span className="secret-doodle doodle-sparkle-two" aria-hidden="true" animate={{ y: [0, -6, 0], rotate: [0, -18, 0], opacity: [.5, .95, .5] }} transition={{ duration: 3.5, delay: 1.1, repeat: Infinity, ease: "easeInOut" }}>✧</motion.span>
      <AnimatePresence mode="wait" initial={false}>
        {!unlocked ? (
          <motion.div key="password" className="secret-gate" initial={{ opacity: 0, y: 16, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: .98 }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }}>
            <p className="secret-intro">A 4-digit password that only we both know.</p>
            <form className="secret-form" onSubmit={submit}>
              <label className="sr-only" htmlFor="secret-password">4-digit password</label>
              <input id="secret-password" className="secret-input" type="password" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} autoComplete="off" aria-describedby={incorrect ? "secret-error" : undefined} value={password} onChange={(event) => { setPassword(event.target.value.replace(/\D/g, "").slice(0, 4)); setIncorrect(false); }} required aria-label="4-digit password" />
              <button className="button-primary secret-unlock" type="submit" disabled={password.length !== 4}>Unlock <span>→</span></button>
            </form>
            {incorrect && <p id="secret-error" className="secret-error" role="alert">Hehe, not quite! Try again ❤️</p>}
            <button className="secret-skip" type="button" onClick={onContinue}>Skip →</button>
          </motion.div>
        ) : (
          <motion.div key="note" className="secret-unlocked" initial={{ opacity: 0, y: 20, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .58, ease: [.22, 1, .36, 1] }}>
            <div className="secret-paper">
              {secretMessage.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <button className="button-primary secret-continue" type="button" onClick={onContinue}>Okay, now one last thing 🫂</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
