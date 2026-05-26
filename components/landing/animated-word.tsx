'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/css';

const WORDS = [
  'Code',
  'Design',
  'Writing',
  'Music',
  'Meetings',
  'Research',
  'Studying',
  'Trading',
  'Editing',
  'Strategy',
];

export function AnimatedWord() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const active = ref.current.querySelector<HTMLElement>('[data-active="true"]');
      if (active) setWidth(active.offsetWidth);
    };
    requestAnimationFrame(measure);
  }, [index]);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % WORDS.length;
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-baseline align-baseline">
      <motion.span
        className="relative inline-flex items-center justify-center px-4 py-1 rounded-xl border border-brand-500/30 bg-gradient-to-br from-brand-500/10 to-accent-500/10 backdrop-blur-sm shadow-sm shadow-brand-500/10"
        style={{ boxSizing: 'content-box' }}
        animate={{ width: width > 0 ? width : 'auto' }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <span ref={ref} className="relative inline-block" style={{ height: '1.1em' }}>
          {WORDS.map((word, i) => (
            <span
              key={word}
              data-active={i === index}
              className={cn(
                'absolute left-1/2 -translate-x-1/2 top-0 whitespace-nowrap text-gradient font-semibold transition-all duration-500 ease-out',
                i === index
                  ? 'opacity-100 translate-y-0 scale-100'
                  : i === prevIndex
                    ? 'opacity-0 translate-y-full scale-90'
                    : 'opacity-0 -translate-y-full scale-90',
              )}
            >
              {word}
            </span>
          ))}
        </span>
      </motion.span>
    </span>
  );
}
