'use client';

import { AnimatePresence, motion, type TargetAndTransition } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from './categories';

interface AnimatedWordProps {
  activeIndex: number;
}

/**
 * Physics:
 *  - 3D trapezoid platform (perspective + rotateX) sits below the word,
 *    anchored to the LEFT. Width tracks the current word + 8px overhang
 *    on each side; left edge never moves.
 *  - Word drops in from above, lands with a spring bounce (platform
 *    compresses for ~120ms), dwells, then sinks DOWN through the
 *    platform. As it crosses the platform line a bottom-up gradient on
 *    its text fill sweeps from brand color to stone — so the portion
 *    below the platform reads as neutral while the portion above stays
 *    brand. Below the platform it disintegrates (blur + fade).
 *  - Width is measured via refs INSIDE the headline so it uses the
 *    correct font context, not document.body.
 */

const INITIAL = {
  y: '-0.9em',
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

const PLATFORM_OVERHANG = 8; // px on each side beyond the word

export function AnimatedWord({ activeIndex }: AnimatedWordProps) {
  const current = CATEGORIES[activeIndex];
  const probesRef = useRef<HTMLSpanElement | null>(null);
  const sizerRef = useRef<HTMLSpanElement | null>(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const [currentWordWidth, setCurrentWordWidth] = useState(0);
  const [landing, setLanding] = useState(false);

  // Measure max width across all labels — in the correct font context
  // (probes are rendered INSIDE the headline so they inherit the h1 font).
  useEffect(() => {
    if (!probesRef.current) return;
    const measureMax = () => {
      if (!probesRef.current) return;
      let widest = 0;
      for (const child of Array.from(probesRef.current.children) as HTMLElement[]) {
        widest = Math.max(widest, child.offsetWidth);
      }
      setMaxWidth(widest);
    };
    measureMax();
    const ro = new ResizeObserver(measureMax);
    for (const child of Array.from(probesRef.current.children) as HTMLElement[]) {
      ro.observe(child);
    }
    return () => ro.disconnect();
  }, []);

  // Measure current word width when active label changes (or font loads)
  useEffect(() => {
    if (!sizerRef.current) return;
    const update = () => {
      if (sizerRef.current) setCurrentWordWidth(sizerRef.current.offsetWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(sizerRef.current);
    return () => ro.disconnect();
  }, [activeIndex, maxWidth]);

  // Platform spring-compress when the new word lands
  useEffect(() => {
    const t1 = setTimeout(() => setLanding(true), 260);
    const t2 = setTimeout(() => setLanding(false), 380);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeIndex]);

  return (
    <span
      className="relative inline-block align-baseline"
      style={{
        minWidth: maxWidth ? `${maxWidth + 8}px` : undefined,
        perspective: '480px',
      }}
    >
      {/* Hidden probes for max width — inside the h1 so they inherit font */}
      <span
        ref={probesRef}
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: 0,
          pointerEvents: 'none',
          visibility: 'hidden',
        }}
      >
        {CATEGORIES.map((c) => (
          <span
            key={c.id}
            className="font-bold tracking-tight"
            style={{ position: 'absolute', whiteSpace: 'nowrap' }}
          >
            {c.label}
          </span>
        ))}
      </span>

      {/* In-flow sizer — reserves layout space and anchors baseline */}
      <span
        ref={sizerRef}
        aria-hidden
        className="invisible font-bold tracking-tight whitespace-nowrap"
      >
        {current.label}
      </span>

      {/* 3D trapezoid platform — left edge fixed, width = word + 16px */}
      <motion.span
        aria-hidden
        className="absolute z-[2]"
        style={{
          left: `-${PLATFORM_OVERHANG}px`,
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
          width: currentWordWidth + PLATFORM_OVERHANG * 2,
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

      {/* Rotating word — drops in, dwells, sinks DOWN through the platform.
          A vertical gradient on the text fill is keyed off --mask-stop:
          above the cursor = brand color, below = neutral stone. As the
          word descends, --mask-stop sweeps 100% → 0% so the stone region
          rises up the word in sync with crossing the platform line. */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={current.id}
          initial={INITIAL}
          animate={ANIMATE}
          exit={EXIT}
          transition={TRANSITION}
          className="absolute left-0 top-0 font-bold tracking-tight whitespace-nowrap z-[3]"
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
    </span>
  );
}
