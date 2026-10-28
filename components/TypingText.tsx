"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypingTextProps {
  prefix: string;
  words: string[];
}

const TYPE_MS = 90;
const DELETE_MS = 45;
const HOLD_MS = 1600;

export function TypingText({ prefix, words }: TypingTextProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const word = words[index];
    let delay = deleting ? DELETE_MS : TYPE_MS;

    if (!deleting && count === word.length) delay = HOLD_MS;

    const timeout = setTimeout(() => {
      if (!deleting && count === word.length) {
        setDeleting(true);
      } else if (deleting && count === 0) {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      } else {
        setCount(count + (deleting ? -1 : 1));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [count, deleting, index, reduceMotion, words]);

  const text = reduceMotion ? words[0] : words[index].slice(0, count);

  return (
    <p
      aria-hidden="true"
      className="font-mono text-2xl text-foreground/90 sm:text-3xl md:text-4xl"
    >
      {prefix}
      <span className="text-highlight">{text}</span>
      <span className="ml-0.5 animate-blink text-highlight motion-reduce:animate-none">
        |
      </span>
    </p>
  );
}
