'use client';

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/css';
import { CATEGORIES, type Category } from './categories';

interface SpacesStackProps {
  activeIndex: number;
}

/**
 * 3 themed app-windows for the active category, in a 3D parallax stack.
 * - Pointer move tilts the whole stack.
 * - When `activeIndex` changes, each slot cross-fades its window content
 *   (the slots themselves don't move — they stay anchored).
 */
export function SpacesStack({ activeIndex }: SpacesStackProps) {
  const category = CATEGORIES[activeIndex];

  // pointer parallax
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 18, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 70, damping: 18, mass: 0.7 });
  const rotY = useTransform(sx, [-1, 1], [10, -10]);
  const rotX = useTransform(sy, [-1, 1], [-7, 7]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  // Slot geometry: 0 = front (largest), 1 = mid, 2 = back
  const slots = [
    { z: 0, x: 0, y: 0, rotZ: 0, scale: 1, opacity: 1, blur: 0 },
    { z: -90, x: -36, y: -32, rotZ: -4.5, scale: 0.86, opacity: 0.85, blur: 0.6 },
    { z: -180, x: 28, y: 36, rotZ: 4, scale: 0.78, opacity: 0.7, blur: 1.2 },
  ] as const;

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative h-[440px] sm:h-[520px] lg:h-[580px] w-full select-none"
      style={{ perspective: 1500 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d', rotateX: rotX, rotateY: rotY }}
      >
        {slots.map((slot, i) => {
          // back card renders deepest in DOM so front overlaps it
          const slotIndex = slots.length - 1 - i;
          const s = slots[slotIndex];
          const win = category.windows[slotIndex];
          return (
            <motion.div
              key={slotIndex}
              animate={{
                z: s.z,
                x: s.x,
                y: s.y,
                rotateZ: s.rotZ,
                scale: s.scale,
                opacity: s.opacity,
              }}
              transition={{ type: 'spring', stiffness: 110, damping: 20, mass: 0.7 }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                translateX: '-50%',
                translateY: '-50%',
                transformStyle: 'preserve-3d',
                zIndex: 10 - slotIndex,
                filter: s.blur ? `blur(${s.blur}px)` : undefined,
              }}
              className="w-full max-w-[560px] px-2"
            >
              <SlotCard category={category} win={win} active={slotIndex === 0} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Floor shadow */}
      <div
        aria-hidden
        className="absolute left-1/2 bottom-3 -translate-x-1/2 h-10 w-[60%] rounded-full bg-brand-500/30 dark:bg-brand-400/20 blur-3xl"
      />

      {/* Keyboard hint */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] text-muted-foreground/70 font-mono z-20">
        <Kbd>⌘</Kbd>
        <Kbd>⇥</Kbd>
        <span className="ml-1">switch · </span>
        <Kbd>⌥</Kbd>
        <Kbd>1</Kbd>
        <span className="ml-1">jump</span>
      </div>
    </motion.div>
  );
}

function SlotCard({
  category,
  win,
  active,
}: {
  category: Category;
  win: Category['windows'][number];
  active: boolean;
}) {
  return (
    <div
      className={cn(
        'relative rounded-[14px] overflow-hidden border aspect-[16/10] shadow-2xl',
        active
          ? 'border-white/20 shadow-[0_40px_120px_-30px_rgba(245,158,11,0.45)] dark:shadow-[0_40px_120px_-30px_rgba(252,184,64,0.4)]'
          : 'border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]',
      )}
    >
      {/* Card surface (per-window theme) */}
      <div className={cn('absolute inset-0 bg-gradient-to-br', win.toneClass)} />
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 18%, rgba(255,255,255,0.22), transparent 60%)',
        }}
      />

      {/* Window chrome */}
      <div className="absolute top-0 inset-x-0 h-7 flex items-center px-3 gap-1.5 bg-black/25 backdrop-blur-md border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span
            className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded text-white/90 bg-white/10 border border-white/10"
            style={{ color: win.accent }}
          >
            {win.app}
          </span>
        </div>
      </div>

      {/* Animated content swap on category change */}
      <div className="absolute inset-x-3 top-9 bottom-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={category.id + ':' + win.app}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.32, ease: [0.25, 0.8, 0.25, 1] }}
            className="h-full w-full"
          >
            {win.render()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Front-card accent ring */}
      {active && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-[14px] pointer-events-none transition-opacity"
          style={{
            boxShadow: `inset 0 0 0 1px ${win.accent}50, 0 0 0 1px ${win.accent}30`,
          }}
        />
      )}
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center h-5 min-w-[1.25rem] px-1 rounded border border-foreground/15 bg-foreground/5 text-[10px] text-foreground/80">
      {children}
    </kbd>
  );
}
