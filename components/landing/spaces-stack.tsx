'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/css';

type Space = {
  id: string;
  title: string;
  badge: string;
  gradient: string;
  accent: string;
  render: () => React.ReactNode;
};

const SPACES: Space[] = [
  {
    id: 'code',
    title: 'Code',
    badge: 'Cursor',
    gradient: 'from-[#1e1b4b] via-[#312e81] to-[#0f172a]',
    accent: '#a78bfa',
    render: () => (
      <div className="font-mono text-[10px] leading-[1.55] text-slate-300/90 select-none">
        <div className="text-slate-500">// focus.ts</div>
        <div><span className="text-pink-400">export</span> <span className="text-violet-300">const</span> <span className="text-sky-300">enterFocus</span> = () =&gt; {'{'}</div>
        <div className="pl-3"><span className="text-violet-300">const</span> spaces = <span className="text-amber-300">await</span> getSpaces();</div>
        <div className="pl-3">spaces.filter(s =&gt; s.tag === <span className="text-emerald-300">&apos;code&apos;</span>);</div>
        <div className="pl-3"><span className="text-pink-400">return</span> swap(0);</div>
        <div>{'}'}</div>
        <div className="text-emerald-400 mt-2">✓ compiled in 23ms</div>
      </div>
    ),
  },
  {
    id: 'design',
    title: 'Design',
    badge: 'Figma',
    gradient: 'from-[#0c1f2e] via-[#103044] to-[#08111a]',
    accent: '#22d3ee',
    render: () => (
      <div className="relative h-full w-full">
        <div className="absolute left-2 top-1 flex gap-1.5">
          <div className="h-2 w-2 rounded-sm bg-cyan-400/80" />
          <div className="h-2 w-2 rounded-sm bg-fuchsia-400/80" />
          <div className="h-2 w-2 rounded-sm bg-amber-300/80" />
        </div>
        <div className="absolute left-6 top-7 h-14 w-20 rounded-md bg-gradient-to-br from-cyan-300/30 to-cyan-500/10 border border-cyan-300/30" />
        <div className="absolute left-28 top-5 h-10 w-10 rounded-full bg-gradient-to-br from-fuchsia-400/40 to-fuchsia-700/20 border border-fuchsia-400/30" />
        <div className="absolute right-3 top-12 h-8 w-16 rounded-md bg-gradient-to-br from-amber-300/30 to-amber-500/10 border border-amber-300/30" />
        <div className="absolute left-3 bottom-3 right-3 h-1 rounded-full bg-cyan-400/40" />
      </div>
    ),
  },
  {
    id: 'writing',
    title: 'Writing',
    badge: 'iA Writer',
    gradient: 'from-[#fafaf5] via-[#f3f1e7] to-[#e9e7dd]',
    accent: '#0f172a',
    render: () => (
      <div className="font-mono text-[10px] leading-[1.7] text-slate-700 select-none">
        <div className="text-slate-400"># A Quiet Morning</div>
        <div className="h-1.5" />
        <div>The cursor blinked, patient.</div>
        <div>Outside, fog clung to the firs.</div>
        <div>She wrote the first true sentence</div>
        <div>she had written in a year.</div>
        <div className="mt-2 inline-block h-2 w-1 bg-slate-700 animate-pulse" />
      </div>
    ),
  },
  {
    id: 'music',
    title: 'Music',
    badge: 'Logic Pro',
    gradient: 'from-[#1c0a1f] via-[#3d0d3a] to-[#0a0314]',
    accent: '#f0abfc',
    render: () => (
      <div className="relative h-full w-full">
        <div className="flex items-end gap-0.5 absolute left-2 right-2 bottom-3 h-12">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-fuchsia-500/70 to-fuchsia-300/90"
              style={{ height: `${20 + Math.sin(i * 0.7) * 28 + 36}%` }}
            />
          ))}
        </div>
        <div className="absolute left-3 top-2 right-3 flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-3/5 bg-gradient-to-r from-fuchsia-300 to-pink-300" />
          </div>
          <span className="text-[9px] font-mono text-fuchsia-200">02:14</span>
        </div>
      </div>
    ),
  },
  {
    id: 'meetings',
    title: 'Meetings',
    badge: 'Zoom',
    gradient: 'from-[#0a1424] via-[#0d2540] to-[#040b18]',
    accent: '#60a5fa',
    render: () => (
      <div className="grid grid-cols-2 gap-1.5 h-full w-full p-1">
        {[
          'bg-gradient-to-br from-sky-300/40 to-sky-700/20',
          'bg-gradient-to-br from-emerald-300/40 to-emerald-700/20',
          'bg-gradient-to-br from-rose-300/40 to-rose-700/20',
          'bg-gradient-to-br from-amber-300/40 to-amber-700/20',
        ].map((g, i) => (
          <div key={i} className={cn('relative rounded-md border border-white/10 overflow-hidden', g)}>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white/60" />
            <div className="absolute bottom-0.5 left-1 right-1 h-0.5 rounded-full bg-white/30" />
          </div>
        ))}
      </div>
    ),
  },
];

interface SpacesStackProps {
  activeId?: string;
}

export function SpacesStack({ activeId }: SpacesStackProps) {
  const [order, setOrder] = useState(SPACES.map((s) => s.id));
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });
  const rotY = useTransform(sx, [-1, 1], [12, -12]);
  const rotX = useTransform(sy, [-1, 1], [-8, 8]);

  // Auto-cycle when no activeId provided
  useEffect(() => {
    if (activeId) return;
    const id = setInterval(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
    }, 3200);
    return () => clearInterval(id);
  }, [activeId]);

  // Sync order with rotating word
  useEffect(() => {
    if (!activeId) return;
    setOrder((current) => {
      if (current[0] === activeId) return current;
      const idx = current.indexOf(activeId);
      if (idx <= 0) return current;
      return [...current.slice(idx), ...current.slice(0, idx)];
    });
  }, [activeId]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    px.set(nx);
    py.set(ny);
  };
  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative h-[420px] sm:h-[480px] lg:h-[540px] w-full select-none"
      style={{ perspective: 1400 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: rotX,
          rotateY: rotY,
        }}
      >
        {order.map((id, i) => {
          const space = SPACES.find((s) => s.id === id)!;
          const depth = i;
          const z = -depth * 70;
          const y = depth * 28;
          const x = depth * 18;
          const rotate = depth * -2.4;
          const opacity = 1 - depth * 0.12;
          return (
            <motion.div
              key={id}
              layout
              initial={false}
              animate={{
                z,
                y,
                x,
                rotateZ: rotate,
                opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 18,
                mass: 0.8,
              }}
              onClick={() => setOrder((o) => [id, ...o.filter((v) => v !== id)])}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                translateX: '-50%',
                translateY: '-50%',
                zIndex: SPACES.length - depth,
                transformStyle: 'preserve-3d',
                cursor: depth === 0 ? 'default' : 'pointer',
              }}
              className="w-[88%] max-w-[440px]"
            >
              <SpaceCard space={space} active={depth === 0} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Floor reflection / shadow */}
      <div
        aria-hidden
        className="absolute left-1/2 bottom-2 -translate-x-1/2 h-8 w-[60%] rounded-full bg-brand-500/30 blur-2xl"
      />

      {/* Keyboard hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] text-muted-foreground/70 font-mono">
        <Kbd>⌘</Kbd>
        <Kbd>⇥</Kbd>
        <span className="ml-1.5">to switch</span>
      </div>
    </motion.div>
  );
}

function SpaceCard({ space, active }: { space: Space; active: boolean }) {
  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden shadow-2xl border',
        'aspect-[16/10]',
        active
          ? 'border-white/20 shadow-[0_30px_90px_-30px_rgba(99,102,241,0.55)]'
          : 'border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)]',
      )}
    >
      <div className={cn('absolute inset-0 bg-gradient-to-br', space.gradient)} />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage:
          'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 60%)',
      }} />

      {/* Window chrome */}
      <div className="absolute top-0 inset-x-0 h-7 flex items-center px-3 gap-1.5 bg-black/20 backdrop-blur-md border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span
            className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded text-white/80 bg-white/10 border border-white/10"
            style={{ color: space.accent }}
          >
            {space.badge}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-x-3 top-9 bottom-3">
        {space.render()}
      </div>

      {/* Active glow ring */}
      {active && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1px ${space.accent}40, 0 0 0 1px ${space.accent}30`,
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

export { SPACES };
