'use client';

import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  type Transition,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from './categories';

interface AnimatedWordProps {
  activeIndex: number;
}

/**
 * Physics:
 *  - 3D trapezoid platform sits below the word, anchored LEFT, width =
 *    current word width + 32px overhang. Spring-compresses on landing.
 *  - Word drops in from above with a short delay so the outgoing word
 *    is already mid-fall when the new one arrives — reads as the new
 *    word pushing the old one through.
 *  - Word's text fill is a vertical brand → stone gradient keyed off
 *    --mask-stop. At rest the stop is 100% (all brand). On exit the
 *    stop sweeps to 0% as the word descends, so the portion that has
 *    crossed below the platform line reads stone.
 *  - Past the platform the word continues falling with aggressive
 *    blur + scale-down + fade — disintegrates.
 *  - Shadow layer sits on the platform surface (same clip + 3D tilt),
 *    containing only the deepest descender slice of the word so
 *    letters with descenders cast denser shadow tips.
 */

const PLATFORM_OVERHANG = 24;
// Light inset so the trapezoid still narrows toward the back but the
// platform's top edge always extends fully past the word's left/right
// letters regardless of word length.
const PLATFORM_CLIP = 'polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)';

const INITIAL = {
  y: '-0.95em',
  opacity: 0,
  scale: 0.94,
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
  y: ['0em', '0.45em', '1.1em', '1.9em', '2.6em'],
  opacity: [1, 1, 0.78, 0.3, 0],
  scale: [1, 0.98, 0.9, 0.72, 0.54],
  filter: [
    'blur(0px)',
    'blur(1px)',
    'blur(6px)',
    'blur(18px)',
    'blur(36px)',
  ],
  '--mask-stop': ['100%', '54%', '14%', '0%', '0%'],
  transition: {
    duration: 0.78,
    times: [0, 0.22, 0.48, 0.76, 1],
    ease: [0.4, 0, 0.7, 1],
  },
} as unknown as TargetAndTransition;

// Tighter spring (more damping, slightly less stiffness) so the incoming
// label settles cleanly without overshoot. Delay keeps the outgoing word
// mid-fall when the new one drops in.
const TRANSITION = {
  y: { type: 'spring', stiffness: 340, damping: 20, mass: 1, delay: 0.14 },
  opacity: { duration: 0.26, delay: 0.14 },
  scale: { duration: 0.38, delay: 0.14 },
  filter: { duration: 0.4 },
} as unknown as Transition;

/**
 * Per-character skew for the cast shadow. Letters near the centre stay
 * nearly vertical; letters at the ends fan INWARD (left edge tilts right,
 * right edge tilts left). Quadratic falloff keeps the middle clean and
 * ramps to full skew only at the outermost characters.
 */
function SkewedShadow({ text, maxSkew = 22 }: { text: string; maxSkew?: number }) {
  const chars = Array.from(text);
  const lastIdx = chars.length - 1;
  const center = Math.max(lastIdx / 2, 1);
  return (
    <>
      {chars.map((char, i) => {
        const offset = (i - lastIdx / 2) / center; // -1..1
        const intensity = offset * Math.abs(offset); // quadratic, signed
        const skew = -intensity * maxSkew;
        return (
          <span
            key={`${i}-${char}`}
            style={{
              display: 'inline-block',
              transform: `skewX(${skew}deg)`,
              transformOrigin: 'bottom center',
              whiteSpace: 'pre',
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}

export function AnimatedWord({ activeIndex }: AnimatedWordProps) {
  const current = CATEGORIES[activeIndex];
  const probesRef = useRef<HTMLSpanElement | null>(null);
  const sizerRef = useRef<HTMLSpanElement | null>(null);
  const [maxWidth, setMaxWidth] = useState(0);
  const [currentWordWidth, setCurrentWordWidth] = useState(0);
  const [landing, setLanding] = useState(false);

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

  // Word arrives at platform around: delay(140ms) + spring-rise(~240ms)
  // → land at ~380ms. Compress-spring fires there.
  useEffect(() => {
    const t1 = setTimeout(() => setLanding(true), 380);
    const t2 = setTimeout(() => setLanding(false), 510);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeIndex]);

  const platformWidth = currentWordWidth + PLATFORM_OVERHANG * 2;
  const platformAnimate = {
    width: platformWidth,
    rotateX: 52,
    scaleY: landing ? 0.55 : 1,
  };
  const platformTransition: Transition = {
    width: { type: 'spring', stiffness: 230, damping: 26, mass: 0.7 },
    rotateX: { duration: 0 },
    scaleY: { type: 'spring', stiffness: landing ? 900 : 240, damping: landing ? 16 : 11 },
  };

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

      {/* In-flow sizer */}
      <span
        ref={sizerRef}
        aria-hidden
        className="invisible font-bold tracking-tight whitespace-nowrap"
      >
        {current.label}
      </span>

      {/* 3D trapezoid platform — moved up so the word sits more clearly on it */}
      <motion.span
        aria-hidden
        className="absolute z-[2]"
        style={{
          left: `-${PLATFORM_OVERHANG}px`,
          bottom: '-0.08em',
          height: '0.52em',
          transformOrigin: 'bottom left',
          clipPath: PLATFORM_CLIP,
          background:
            'linear-gradient(to bottom, rgba(var(--stage-rgb), 0.34), rgba(var(--stage-rgb), 0.7))',
          // 0 4px 0 darker = a slim bottom face that reads as platform
          // thickness once the slab is tilted; the longer-blur shadow
          // sits below that for ambient occlusion.
          boxShadow:
            '0 4px 0 rgba(var(--stage-rgb), 0.85), 0 12px 22px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.22)',
        }}
        animate={platformAnimate}
        transition={platformTransition}
      />

      {/* Cast shadow on the platform — clipped to platform shape + 3D
          tilt. Only the deepest pixels of the word are visible inside;
          letters with descenders project further into the shadow region
          so their tips render denser via the bottom-heavy gradient. */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none z-[2]"
        style={{
          left: `-${PLATFORM_OVERHANG}px`,
          bottom: '-0.08em',
          height: '0.52em',
          transformOrigin: 'bottom left',
          clipPath: PLATFORM_CLIP,
          overflow: 'hidden',
          // Match the platform's apparent thickness so the shadow region
          // sits on the top face, not the side face.
          marginBottom: 0,
        }}
        animate={platformAnimate}
        transition={platformTransition}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="font-bold tracking-tight whitespace-nowrap"
            style={{
              position: 'absolute',
              left: PLATFORM_OVERHANG,
              bottom: '100%',
              // Skew the cast shadow so it reads as cast from an off-axis
              // light source onto the tilted platform — not a flat dupe.
              transform: 'translateY(0.36em)',
              transformOrigin: 'left bottom',
              backgroundImage:
                'linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,0.42) 88%, rgba(0,0,0,0.74) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              filter: 'blur(0.6px)',
            }}
          >
            {current.label}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* Rotating word — drops in, dwells, sinks through with brand→stone
          gradient sweep, then disintegrates with aggressive blur + shrink. */}
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
              'linear-gradient(to bottom, var(--word-above) 0%, var(--word-above) calc(var(--mask-stop, 100%) - 2%), var(--word-below) calc(var(--mask-stop, 100%) + 2%), var(--word-below) 100%)',
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
