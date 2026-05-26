'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CATEGORIES } from './categories';

interface AnimatedWordProps {
  activeIndex: number;
}

/**
 * Headline rotating word with a trapezoidal "stage" beneath it.
 * The stage is a clip-path trapezoid (wider at the front, tapered toward
 * the back) with a luminous gradient — the word visibly stands on a
 * receding 3D platform rather than a flat bar.
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
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current.id}
          initial={{ y: '0.4em', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-0.4em', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.42, ease: [0.25, 0.8, 0.25, 1] }}
          className="relative inline-flex flex-col items-center"
        >
          {/* Trapezoidal stage floor — wider in front, tapered back */}
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 bottom-[0.08em] h-[0.6em] w-[145%]"
            style={{
              clipPath: 'polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)',
              background:
                'linear-gradient(to bottom, rgba(245,158,11,0.28), rgba(245,158,11,0.85))',
              boxShadow:
                '0 14px 28px -10px rgba(245,158,11,0.55), 0 -1px 0 rgba(255,200,120,0.4) inset',
            }}
          />
          {/* Soft outer glow extending past the stage edges */}
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 bottom-[-0.05em] h-[0.7em] w-[170%] rounded-[50%] blur-xl opacity-60"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(245,158,11,0.55), rgba(245,158,11,0) 70%)',
            }}
          />

          <span className="relative font-bold tracking-tight text-brand-700 dark:text-brand-300">
            {current.label}
          </span>
        </motion.span>
      </AnimatePresence>

      <span
        aria-hidden
        className="caret ml-[0.12em] inline-block bg-brand-600 dark:bg-brand-300"
      />
    </span>
  );
}
