'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CATEGORIES } from './categories';

interface AnimatedWordProps {
  activeIndex: number;
}

/**
 * Distinctive headline word — marker-highlighted underline (not a gradient pill).
 * Width is reserved to the widest word so the headline never wraps/shifts.
 */
export function AnimatedWord({ activeIndex }: AnimatedWordProps) {
  const current = CATEGORIES[activeIndex];

  // measure widest word once so we can reserve space and never reflow
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
      className="relative inline-flex items-baseline justify-center align-baseline overflow-visible"
      style={{
        minWidth: maxWidth ? `${maxWidth + 16}px` : undefined,
        height: '1.05em',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current.id}
          initial={{ y: '0.6em', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-0.55em', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.42, ease: [0.25, 0.8, 0.25, 1] }}
          className="relative inline-flex items-baseline"
        >
          <span className="marker-bg px-2 -mx-1 rounded-[2px] font-bold tracking-tight text-brand-700 dark:text-brand-300">
            {current.label}
          </span>
        </motion.span>
      </AnimatePresence>
      <span className="caret text-brand-600 dark:text-brand-300" aria-hidden />
    </span>
  );
}
