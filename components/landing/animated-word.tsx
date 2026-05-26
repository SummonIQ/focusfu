'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CATEGORIES } from './categories';

interface AnimatedWordProps {
  activeIndex: number;
}

/**
 * Headline rotating word with a 3D-perspective "stage" floor beneath it
 * (the marker bar tilts back to look like the word is standing on a stage).
 * A thin blinking caret sits to the right.
 */
export function AnimatedWord({ activeIndex }: AnimatedWordProps) {
  const current = CATEGORIES[activeIndex];

  // Reserve width to the widest label so the headline never reflows
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

  return (
    <span
      className="relative inline-flex items-end justify-center align-baseline"
      style={{
        minWidth: maxWidth ? `${maxWidth + 32}px` : undefined,
        height: '1.15em',
        perspective: 600,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current.id}
          initial={{ y: '0.45em', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-0.45em', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.42, ease: [0.25, 0.8, 0.25, 1] }}
          className="relative inline-flex flex-col items-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Stage floor — perspective-tilted bar so the word stands on it */}
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 bottom-[0.04em] h-[0.42em] w-[112%] rounded-[3px] bg-gradient-to-b from-brand-400/55 via-brand-500/45 to-brand-600/55 dark:from-brand-400/35 dark:via-brand-500/30 dark:to-brand-600/35"
            style={{
              transform: 'rotateX(58deg)',
              transformOrigin: 'center top',
              filter: 'blur(0.5px)',
              boxShadow:
                '0 8px 18px -6px rgba(245,158,11,0.45), 0 -1px 0 rgba(255,255,255,0.18) inset',
            }}
          />
          {/* Soft front-edge highlight on the stage */}
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 bottom-[0.04em] h-[2px] w-[112%] rounded-full bg-white/60 dark:bg-white/30 mix-blend-overlay"
            style={{ transform: 'rotateX(58deg)', transformOrigin: 'center top' }}
          />

          <span className="relative font-bold tracking-tight text-brand-700 dark:text-brand-300">
            {current.label}
          </span>
        </motion.span>
      </AnimatePresence>

      {/* Thin blinking caret */}
      <span
        aria-hidden
        className="caret ml-[0.15em] inline-block bg-brand-600 dark:bg-brand-300"
      />
    </span>
  );
}
