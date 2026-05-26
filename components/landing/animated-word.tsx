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

// Disintegrate runs concurrently with the brand→stone mask sweep —
// blur, scale-down and opacity fade ramp from the same keyframe the
// color shift begins, so the word visibly comes apart AS it turns gray.
const EXIT = {
  y: ['0em', '0.45em', '1.1em', '1.9em', '2.6em'],
  opacity: [1, 0.92, 0.7, 0.32, 0],
  scale: [1, 0.96, 0.84, 0.68, 0.5],
  filter: [
    'blur(0px)',
    'blur(2.5px)',
    'blur(9px)',
    'blur(22px)',
    'blur(40px)',
  ],
  '--mask-stop': ['100%', '54%', '14%', '0%', '0%'],
  transition: {
    duration: 0.78,
    times: [0, 0.22, 0.48, 0.76, 1],
    ease: [0.4, 0, 0.7, 1],
  },
} as unknown as TargetAndTransition;

// Springy landing — damping 15 keeps a small overshoot so the new label
// "bounces" lightly off the platform. Delay keeps the outgoing word
// mid-fall when the new one drops in.
const TRANSITION = {
  y: { type: 'spring', stiffness: 360, damping: 15, mass: 1, delay: 0.12 },
  opacity: { duration: 0.24, delay: 0.12 },
  scale: { duration: 0.36, delay: 0.12 },
  filter: { duration: 0.4 },
} as unknown as Transition;

/**
 * Per-character diagonal gradient overlay for the rotating headline word.
 * Each letter has its own 135° gradient (lighter top-left → darker
 * bottom-right) so the typography reads with subtle facet shading. The
 * brand→stone mask-stop sweep still applies on top via a stacked
 * vertical gradient that reveals stone from the bottom as the word
 * descends through the platform.
 */
function PerCharGradientLabel({ text }: { text: string }) {
  const chars = Array.from(text);
  return (
    <>
      {chars.map((char, i) => (
        <span
          key={`${i}-${char}`}
          style={{
            display: 'inline-block',
            whiteSpace: 'pre',
            // Two stacked backgrounds, clipped to the glyph:
            //   1. (top layer) stone color revealed bottom-up via --mask-stop
            //   2. (bottom layer) diagonal lighter→darker brand gradient
            backgroundImage:
              'linear-gradient(to bottom, transparent calc(var(--mask-stop, 100%) - 2%), var(--word-below) calc(var(--mask-stop, 100%) + 2%)), linear-gradient(135deg, var(--char-light) 0%, var(--char-dark) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {char}
        </span>
      ))}
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

  // Word arrives at platform around: delay(120ms) + spring-rise(~210ms)
  // → land at ~330ms. Compress-spring fires *exactly* when the word
  // contacts the slab, not after.
  useEffect(() => {
    const t1 = setTimeout(() => setLanding(true), 330);
    const t2 = setTimeout(() => setLanding(false), 470);
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
          bottom: '-0.03em',
          height: '0.52em',
          transformOrigin: 'bottom left',
          clipPath: PLATFORM_CLIP,
          background:
            'linear-gradient(to bottom, rgba(var(--stage-rgb), 0.34), rgba(var(--stage-rgb), 0.7))',
          // 0 4px 0 darker = a slim bottom face that reads as platform
          // thickness once the slab is tilted; the longer-blur shadow
          // sits below that for ambient occlusion. No top highlight.
          boxShadow:
            '0 4px 0 rgba(var(--stage-rgb), 0.85), 0 12px 22px -8px rgba(0,0,0,0.6)',
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
          bottom: '-0.03em',
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
              // Uniform skew — reads cleaner than the per-letter
              // fan-out experiment.
              transform: 'translateY(0.36em) skewX(-22deg)',
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
            // Emboss the glyphs: dark drop below + light rim above.
            // Stacked drop-shadows respect the glyph alpha so the
            // result hugs each letter shape rather than the bounding
            // box.
            filter:
              'drop-shadow(0 1px 0 rgba(0,0,0,0.35)) drop-shadow(0 -0.5px 0 rgba(255,255,255,0.18)) drop-shadow(0 2px 4px rgba(0,0,0,0.18))',
          }}
        >
          <PerCharGradientLabel text={current.label} />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
