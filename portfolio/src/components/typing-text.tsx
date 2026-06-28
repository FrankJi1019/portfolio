"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "front_end_developer",
  "angular_specialist",
  "building_for_the_web",
];

const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 500;

export function TypingText() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIndex];

    if (!isDeleting && text === current) {
      const timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % PHRASES.length);
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => {
        setText(
          isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)
        );
      },
      isDeleting ? DELETE_SPEED : TYPE_SPEED
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <span>
      &gt; {text}
      <span className="inline-block w-[0.6em] h-[1.1em] translate-y-[0.15em] bg-[var(--muted)] animate-[blink_1s_step-end_infinite]" />
    </span>
  );
}
