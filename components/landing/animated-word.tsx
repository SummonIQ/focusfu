'use client';

import { AnimatePresence, motion, type TargetAndTransition } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CATEGORIES } from './categories';

interface AnimatedWordProps {
  activeIndex: number;
}

/**
 * Physics:
 *  - The trapezoid platform is a real 3D object (perspective + rotateX tilt
 *    + clip-path) — it sits below the word, anchored to the LEFT so its
 *    left edge never moves. It stays put except for a sharp scaleY-compress
 *    spring when each new word lands on it.
 *  - The word drops in from above, lands on the platform, dwells, then
 *    "evaporates" upward — opacity + blur + a small lift. It never passes
 *    through the platform.
 */

const INITIAL = {
  y: '-0.9em',
  opacity: 0,
  scale: 0.96,
  filter: 'blur(0px)',
} as unknown as TargetAndTransition;

const ANIMATE = {
  y: 0,
  opacity: 1,
  scale: 1,
  filter: 'blur(0px)',
} as unknown as TargetAndTransition;

const EXIT = {
  y: ['0em', '-0.15em', '-0.55em'],
  opacity: [1, 1, 0],
  scale: [1, 1, 0.95],
  filter: ['blur(0px)', 'blur(2px)', 'blur(10px)'],
  transition: {
    duration: 0.7,
    times: [0, 0.35, 1],
    ease: [0.4, 0, 0.7, 1],
  },
} as unknown as TargetAndTransition;

const TRANSITION = {
  y: { type: 'spring', stiffness: 360, damping: 16, mass: 1 },
  opacity: { duration: 0.28 },
  scale: { duration: 0.4 },
  filter: { duration: 0.4 },
} as const;

export function AnimatedWord({ activeIndex }: AnimatedWordProps) {
  const current = CATEGORIES[activeIndex];
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const [labelWidths, setLabelWidths] = useState<number[]>([]);
  const [landing, setLanding] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const probe = document.createElement('span');
    probe.style.visibility = 'hidden';
    probe.style.position = 'absolute';
    probe.style.whiteSpace = 'nowrap';
    probe.style.font = 'inherit';
    probe.className = 'font-bold tracking-tight';
    document.body.appendChild(probe);
    const widths: number[] = [];
    let widest = 0;
    for (const c of CATEGORIES) {
      probe.textContent = c.label;
      const w = probe.offsetWidth;
      widths.push(w);
      if (w > widest) widest = w;
    }
    document.body.removeChild(probe);
    setLabelWidths(widths);
    setMaxWidth(widest);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setLanding(true), 260);
    const t2 = setTimeout(() => setLanding(false), 380);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeIndex]);

  const currentWidth = labelWidths[activeIndex] ?? 0;

  return (
    <span
      className="relative inline-block align-baseline"
      style={{
        minWidth: maxWidth ? `${maxWidth + 8}px` : undefined,
        // gives the platform real depth when rotated
        perspective: '480px',
      }}
    >
      {/* Sizer establishes baseline + reserves vertical/horizontal space */}
      <span
        aria-hidden
        className="invisible font-bold tracking-tight whitespace-nowrap"
      >
        {current.label}
      </span>

      {/* 3D trapezoid platform — tilted back like a stage floor.
          Left-anchored: only the right edge moves when the word width changes. */}
      <motion.span
        aria-hidden
        className="absolute left-0 z-[2]"
        style={{
          bottom: '-0.18em',
          height: '0.42em',
          transformOrigin: 'bottom left',
          clipPath: 'polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)',
          background:
            'linear-gradient(to bottom, rgba(var(--stage-rgb), 0.32), rgba(var(--stage-rgb), 0.68))',
          boxShadow:
            '0 10px 20px -8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)',
        }}
        animate={{
          width: currentWidth,
          rotateX: 52,
          scaleY: landing ? 0.55 : 1,
        }}
        transition={{
          width: { type: 'spring', stiffness: 230, damping: 26, mass: 0.7 },
          rotateX: { duration: 0 },
          scaleY: landing
            ? { type: 'spring', stiffness: 900, damping: 16 }
            : { type: 'spring', stiffness: 240, damping: 11 },
        }}
      />

      {/* Rotating word — solid brand color, drops in from above, dwells,
          evaporates upward. Never crosses the platform. */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={current.id}
          initial={INITIAL}
          animate={ANIMATE}
          exit={EXIT}
          transition={TRANSITION}
          className="absolute left-0 top-0 font-bold tracking-tight whitespace-nowrap text-brand-700 dark:text-brand-300 z-[3]"
        >
          {current.label}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
