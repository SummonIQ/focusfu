'use client';

import { AnimatePresence, motion, type TargetAndTransition } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CATEGORIES } from './categories';

interface AnimatedWordProps {
  activeIndex: number;
}

const INITIAL = {
  y: '-0.95em',
  opacity: 0,
  scale: 0.96,
  filter: 'blur(0px)',
  '--mask-stop': '100%',
} as unknown as TargetAndTransition;

const ANIMATE = {
  y: 0,
  opacity: 1,
  scale: 1,
  filter: 'blur(0px)',
  '--mask-stop': '100%',
} as unknown as TargetAndTransition;

const EXIT = {
  y: ['0em', '0.55em', '1.4em'],
  opacity: [1, 1, 0],
  scale: [1, 1, 0.92],
  filter: ['blur(0px)', 'blur(0.5px)', 'blur(10px)'],
  '--mask-stop': ['100%', '38%', '0%'],
  transition: {
    duration: 0.78,
    times: [0, 0.4, 1],
    ease: [0.5, 0, 0.7, 1],
  },
} as unknown as TargetAndTransition;

const TRANSITION = {
  y: { type: 'spring', stiffness: 360, damping: 16, mass: 1 },
  opacity: { duration: 0.28 },
  scale: { duration: 0.4 },
  filter: { duration: 0.4 },
} as const;

/**
 * Physics:
 *  1. New word drops in from above, fades in, lands on the platform with a
 *     spring overshoot. The platform stays put — except for one quick
 *     spring-compress when the word lands.
 *  2. After dwelling, the word sinks straight down through the platform.
 *     A vertical color gradient on the text shifts the portion that has
 *     crossed the platform line from the brand color to neutral stone.
 *  3. Below the platform the word continues falling, blurring + fading
 *     out — disintegrates.
 */
export function AnimatedWord({ activeIndex }: AnimatedWordProps) {
  const current = CATEGORIES[activeIndex];

  // Reserve width to widest label so the headline never reflows
  const [maxWidth, setMaxWidth] = useState<number | null>(null);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const probe = document.createElement('span');
    probe.style.visibility = 'hidden';
    probe.style.position = 'absolute';
    probe.style.whiteSpace = 'nowrap';
    probe.style.font = 'inherit';
    probe.className = 'font-bold tracking-tight';
    document.body.appendChild(probe);
    let widest = 0;
    for (const c of CATEGORIES) {
      probe.textContent = c.label;
      widest = Math.max(widest, probe.offsetWidth);
    }
    document.body.removeChild(probe);
    setMaxWidth(widest);
  }, []);

  // Trigger a platform compress-spring when the new word lands.
  const [landing, setLanding] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setLanding(true), 260);  // word reaches platform
    const t2 = setTimeout(() => setLanding(false), 380); // release
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeIndex]);

  return (
    <span
      className="relative inline-flex items-end justify-center align-baseline"
      style={{
        minWidth: maxWidth ? `${maxWidth + 16}px` : undefined,
        height: '1.15em',
      }}
    >
      {/* Neutral stone trapezoid platform — narrow, mostly static. */}
      <motion.span
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-[0.1em] h-[0.28em] w-[58%] z-[2]"
        animate={{
          scaleY: landing ? 0.55 : 1,
          scaleX: landing ? 1.08 : 1,
        }}
        transition={
          landing
            ? { type: 'spring', stiffness: 900, damping: 16 }
            : { type: 'spring', stiffness: 240, damping: 11 }
        }
        style={{
          clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
          background:
            'linear-gradient(to bottom, rgba(var(--stage-rgb), 0.45), rgba(var(--stage-rgb), 0.62))',
          boxShadow:
            '0 6px 14px -6px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Word: drops in, sinks through, disintegrates */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={current.id}
          initial={INITIAL}
          animate={ANIMATE}
          exit={EXIT}
          transition={TRANSITION}
          className="relative font-bold tracking-tight z-[1]"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, var(--word-above) 0%, var(--word-above) var(--mask-stop, 100%), var(--word-below) var(--mask-stop, 100%), var(--word-below) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {current.label}
        </motion.span>
      </AnimatePresence>

      <span
        aria-hidden
        className="caret ml-[0.12em] inline-block bg-brand-600 dark:bg-brand-300"
      />
    </span>
  );
}
