'use client';

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/css';
import { CATEGORIES, type Category } from './categories';

interface SpacesStackProps {
  activeIndex: number;
}

/**
 * Splayed-out arrangement: 3 windows visible side-by-side (back-left, front
 * center, back-right). On category change, every slot does a coordinated
 * exit + enter so the whole set swaps as one motion.
 */
export function SpacesStack({ activeIndex }: SpacesStackProps) {
  const category = CATEGORIES[activeIndex];

  // pointer parallax — tilts the whole arrangement
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 65, damping: 20, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 65, damping: 20, mass: 0.7 });
  const rotY = useTransform(sx, [-1, 1], [8, -8]);
  const rotX = useTransform(sy, [-1, 1], [-6, 6]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  // Splay positions: back-left, front-center, back-right.
  // Index in this array maps to a *category window* index (1, 0, 2) so
  // window[0] is the hero/front card.
  const SLOTS = [
    {
      windowIdx: 1, // back-left
      x: '-46%',
      y: '6%',
      scale: 0.78,
      rotateZ: -7,
      z: -120,
      zIndex: 1,
      blur: 0.8,
      opacity: 0.95,
      exitX: -80,
      enterX: -40,
    },
    {
      windowIdx: 0, // front
      x: '0%',
      y: '-2%',
      scale: 1,
      rotateZ: 0,
      z: 60,
      zIndex: 3,
      blur: 0,
      opacity: 1,
      exitX: 0,
      enterX: 0,
    },
    {
      windowIdx: 2, // back-right
      x: '46%',
      y: '6%',
      scale: 0.78,
      rotateZ: 7,
      z: -120,
      zIndex: 2,
      blur: 0.8,
      opacity: 0.95,
      exitX: 80,
      enterX: 40,
    },
  ] as const;

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative h-[600px] sm:h-[700px] lg:h-[820px] w-full select-none -mt-20 lg:ml-8"
      style={{ perspective: 1600 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d', rotateX: rotX, rotateY: rotY }}
      >
        {SLOTS.map((slot, i) => {
          const win = category.windows[slot.windowIdx];
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '88%',
                maxWidth: 720,
                transform: `translate(-50%, -50%) translate3d(${slot.x}, ${slot.y}, ${slot.z}px) rotateZ(${slot.rotateZ}deg) scale(${slot.scale})`,
                transformStyle: 'preserve-3d',
                zIndex: slot.zIndex,
                filter: slot.blur ? `blur(${slot.blur}px)` : undefined,
                opacity: slot.opacity,
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={category.id}
                  // Float UP into position, splay outward (x to slot
                  // offset is already on the parent div), no rotation
                  // on entry/exit — reads as cards rising into place
                  // rather than tumbling in.
                  initial={{
                    opacity: 0,
                    y: 40,
                    scale: 0.92,
                    filter: 'blur(8px)',
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  exit={{
                    opacity: 0,
                    y: 40,
                    scale: 0.94,
                    filter: 'blur(8px)',
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.06,
                    ease: [0.32, 0.72, 0.32, 1],
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Window win={win} active={i === 1} />
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>

      {/* Floor reflection */}
      <div
        aria-hidden
        className="absolute left-1/2 bottom-4 -translate-x-1/2 h-12 w-[70%] rounded-full bg-brand-500/30 dark:bg-brand-400/20 blur-3xl"
      />

    </motion.div>
  );
}

function Window({ win, active }: { win: Category['windows'][number]; active: boolean }) {
  return (
    <div
      className={cn(
        'relative rounded-[14px] overflow-hidden border aspect-[16/10] shadow-2xl',
        active
          ? 'border-white/20 shadow-[0_50px_140px_-30px_rgba(245,158,11,0.5)] dark:shadow-[0_50px_140px_-30px_rgba(252,184,64,0.45)]'
          : 'border-white/10 shadow-[0_25px_80px_-25px_rgba(0,0,0,0.55)]',
      )}
    >
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

      <div className="absolute inset-x-3 top-9 bottom-3">{win.render()}</div>

      {active && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-[14px] pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1px ${win.accent}50, 0 0 0 1px ${win.accent}30`,
          }}
        />
      )}
    </div>
  );
}

