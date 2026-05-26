import type { ReactNode } from 'react';
import { cn } from '@/lib/css';

export type WindowKind = {
  app: string;
  accent: string;
  toneClass: string;
  render: () => ReactNode;
};

export type Category = {
  id: string;
  label: string;
  windows: [WindowKind, WindowKind, WindowKind];
};

/* =============== DEVELOPMENT =============== */

function CodeWindow() {
  return (
    <div className="font-mono text-[10px] leading-[1.55] text-amber-50/90 select-none">
      <div className="text-amber-200/40 text-[8px]">// lib/focus.ts</div>
      <div>
        <span className="text-rose-300">export</span>{' '}
        <span className="text-amber-200">const</span>{' '}
        <span className="text-sky-200">enterFocus</span> = (
        <span className="text-sky-200">space</span>) =&gt; {'{'}
      </div>
      <div className="pl-3">
        <span className="text-amber-200">await</span> spaces.swap(space.id);
      </div>
      <div className="pl-3 text-amber-200/80">mute(<span className="text-emerald-300">&apos;notifications&apos;</span>);</div>
      <div className="pl-3 text-amber-200/80">hideDock();</div>
      <div className="pl-3"><span className="text-rose-300">return</span> session.start();</div>
      <div>{'}'}</div>
      <div className="text-emerald-300/90 mt-2 text-[8px]">✓ compiled in 23ms · 0 errors</div>
    </div>
  );
}

function TerminalWindow() {
  return (
    <div className="font-mono text-[10px] leading-[1.6] text-emerald-200/90 select-none">
      <div><span className="text-emerald-300/70">~/focusfu</span> <span className="text-amber-200/70">main</span> $ bun dev</div>
      <div className="text-emerald-300/50 text-[8px]">  → next start --turbopack :3030</div>
      <div className="text-amber-200/80 mt-1">▲ Ready in 1.2s</div>
      <div className="text-emerald-200/70 text-[8px]">  compiled 38 modules</div>
      <div className="text-sky-200/80 text-[8px] mt-0.5">→ GET / 200 in 42ms</div>
      <div className="text-sky-200/80 text-[8px]">→ GET /api/auth 200 in 18ms</div>
      <div className="mt-1.5 inline-block h-2.5 w-1 bg-emerald-200 animate-pulse" />
    </div>
  );
}

function BrowserWindow() {
  return (
    <div className="relative h-full w-full">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-[9px] text-amber-300/70">←</span>
        <span className="text-[9px] text-amber-300/40">→</span>
        <div className="ml-1 flex-1 h-4 rounded-sm bg-white/10 border border-white/10 px-1.5 flex items-center gap-1">
          <span className="text-[8px] font-mono text-emerald-300/80">●</span>
          <span className="text-[8px] font-mono text-white/55">focusfu.com/docs</span>
        </div>
        <span className="text-[9px] text-amber-300/40">⋯</span>
      </div>
      <div className="h-2.5 w-3/5 rounded-sm bg-white/20 mb-1" />
      <div className="h-1.5 w-full rounded-sm bg-white/10 mb-0.5" />
      <div className="h-1.5 w-4/5 rounded-sm bg-white/10 mb-2" />
      <div className="grid grid-cols-3 gap-1">
        <div className="aspect-[4/3] rounded bg-gradient-to-br from-amber-300/30 to-rose-400/20" />
        <div className="aspect-[4/3] rounded bg-gradient-to-br from-sky-300/30 to-indigo-400/20" />
        <div className="aspect-[4/3] rounded bg-gradient-to-br from-emerald-300/30 to-teal-400/20" />
      </div>
      <div className="flex gap-1 mt-1.5">
        {['Get started', 'API', 'Spaces'].map((t) => (
          <span key={t} className="text-[7px] font-mono rounded px-1 py-0.5 bg-white/8 border border-white/10 text-white/70">{t}</span>
        ))}
      </div>
    </div>
  );
}

/* =============== SPECIFIC PROJECTS — dino encyclopedia =============== */

function DinoBrowser() {
  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="flex items-center gap-1.5 mb-1.5 shrink-0">
        <div className="text-[8px] text-emerald-300/80">●</div>
        <div className="flex-1 h-4 rounded-sm bg-white/10 border border-white/10 px-1.5 flex items-center gap-1">
          <span className="text-[7px] font-mono text-white/40">🔒</span>
          <span className="text-[7px] font-mono text-white/60">dinosaurs.world/t-rex</span>
        </div>
      </div>
      <div className="text-[10px] font-bold text-amber-200 shrink-0">🦖 Dinosaur Encyclopedia</div>
      <div className="mt-1 rounded-md border border-amber-400/40 bg-gradient-to-br from-amber-800/40 to-rose-900/30 p-1.5 shrink-0">
        <div className="flex items-start gap-1.5">
          <div className="h-12 w-12 rounded-sm bg-gradient-to-br from-amber-400/60 via-orange-500/50 to-rose-500/40 border border-amber-300/40 shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-white/15 to-transparent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-amber-100 leading-tight">Tyrannosaurus rex</div>
            <div className="text-[7px] font-mono text-amber-200/70 mt-0.5">Late Cretaceous · 68–66M ya</div>
            <div className="text-[8px] text-white/75 mt-0.5 leading-tight">12.3 m · 8.4 t · Carnivore · 50 fossils</div>
          </div>
        </div>
      </div>
      <div className="flex gap-1 mt-1.5 shrink-0">
        {['Theropoda', 'North America', 'Apex'].map((t) => (
          <span key={t} className="text-[6px] font-mono rounded px-1 py-0.5 bg-white/[0.08] border border-white/10 text-white/70">{t}</span>
        ))}
      </div>

      {/* Description */}
      <div className="mt-2 space-y-[2px] shrink-0">
        <div className="text-[7px] text-white/75 leading-[1.5]">One of the largest land predators that ever lived. The T. rex roamed western North America at the end of the Cretaceous Period.</div>
      </div>

      {/* Classification table */}
      <div className="mt-2 grid grid-cols-2 gap-1 shrink-0">
        {[
          ['Kingdom', 'Animalia'],
          ['Phylum', 'Chordata'],
          ['Class', 'Reptilia'],
          ['Order', 'Saurischia'],
          ['Family', 'Tyrannosauridae'],
          ['Genus', 'Tyrannosaurus'],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline gap-1 text-[6.5px] font-mono">
            <span className="text-amber-300/70 w-12 shrink-0">{k}</span>
            <span className="text-white/80 truncate">{v}</span>
          </div>
        ))}
      </div>

      {/* Notable facts */}
      <div className="mt-2 space-y-[2px] shrink-0">
        <div className="text-[7px] font-mono text-amber-300/80">Notable</div>
        {[
          'Could grow up to 12.3 m long',
          'Skull alone weighed ~600 kg',
          'Bite force exceeded 12,800 lbs',
          'Lived in herds, hunted in packs',
        ].map((f) => (
          <div key={f} className="text-[6.5px] text-white/65 flex items-start gap-1">
            <span className="text-amber-300/60 mt-[1px]">▸</span>
            <span>{f}</span>
          </div>
        ))}
      </div>

      {/* Related grid */}
      <div className="mt-auto pt-2 shrink-0">
        <div className="text-[7px] font-mono text-amber-300/80 mb-0.5">Related species</div>
        <div className="grid grid-cols-3 gap-1">
          {[
            { n: 'Triceratops', g: 'from-emerald-400/40 to-teal-500/30' },
            { n: 'Velociraptor', g: 'from-cyan-400/40 to-sky-500/30' },
            { n: 'Stegosaurus', g: 'from-rose-400/40 to-orange-500/30' },
          ].map((d) => (
            <div key={d.n} className="rounded-sm bg-white/5 border border-white/10 p-1 flex items-center gap-1">
              <div className={cn('h-3 w-3 rounded-sm bg-gradient-to-br', d.g)} />
              <span className="text-[6px] font-mono text-white/70 truncate">{d.n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DinoEditor() {
  return (
    <div className="font-mono text-[9px] leading-[1.55] text-amber-50/90 select-none">
      <div className="text-amber-200/40 text-[7px]">src/data/tyrannosaurus.ts</div>
      <div className="mt-0.5">
        <span className="text-rose-300">import</span>{' '}
        <span className="text-sky-200">{'{ Period }'}</span>{' '}
        <span className="text-rose-300">from</span>{' '}
        <span className="text-emerald-300">&apos;./types&apos;</span>;
      </div>
      <div className="mt-1">
        <span className="text-rose-300">export const</span>{' '}
        tyrannosaurus = {'{'}
      </div>
      <div className="pl-2"><span className="text-sky-200">name</span>: <span className="text-emerald-300">&apos;T. rex&apos;</span>,</div>
      <div className="pl-2"><span className="text-sky-200">period</span>: Period.<span className="text-amber-200">LateCretaceous</span>,</div>
      <div className="pl-2"><span className="text-sky-200">length</span>: <span className="text-amber-200">12.3</span>,</div>
      <div className="pl-2"><span className="text-sky-200">weight</span>: <span className="text-amber-200">8400</span>,</div>
      <div className="pl-2"><span className="text-sky-200">diet</span>: <span className="text-emerald-300">&apos;carnivore&apos;</span>,</div>
      <div className="pl-2"><span className="text-sky-200">fossils</span>: <span className="text-amber-200">50</span>,</div>
      <div>{'};'}</div>
      <div className="text-emerald-300/90 mt-1 text-[7px]">✓ saved · 23 species indexed</div>
    </div>
  );
}

function DinoTerminal() {
  return (
    <div className="font-mono text-[9px] leading-[1.55] text-emerald-200/90 select-none">
      <div><span className="text-emerald-300/70">dinos</span> <span className="text-amber-200/70">main</span> $ git log --oneline</div>
      <div className="text-amber-200/80 text-[8px]">a3f2c19</div>
      <div className="text-white/70 text-[8px]">  add T. rex profile + hero image</div>
      <div className="text-amber-200/80 text-[8px] mt-0.5">b8d4e22</div>
      <div className="text-white/70 text-[8px]">  era timeline component</div>
      <div className="text-amber-200/80 text-[8px] mt-0.5">c1f5d33</div>
      <div className="text-white/70 text-[8px]">  set up vite + react router</div>
      <div className="text-emerald-300 mt-1.5">$ npm run dev</div>
      <div className="text-amber-200/80">► http://localhost:5173</div>
      <div className="text-emerald-200/60 text-[8px]">✓ ready in 142ms</div>
      <div className="mt-0.5 inline-block h-2 w-1 bg-emerald-200 animate-pulse" />
    </div>
  );
}

/* =============== DESIGN — beefed up =============== */

function FigmaCanvas() {
  return (
    <div className="relative h-full w-full flex gap-1.5">
      <div className="w-12 shrink-0 bg-black/25 rounded-sm border border-cyan-300/15 p-1">
        <div className="text-[6px] font-mono text-cyan-300/70 mb-1 px-0.5">Layers</div>
        {['Hero', 'Card', 'Nav', 'CTA', 'Footer'].map((l, i) => (
          <div key={l} className="flex items-center gap-1 py-0.5 px-0.5 rounded-sm" style={{ background: i === 1 ? 'rgba(34, 211, 238, 0.18)' : 'transparent' }}>
            <div className={cn('h-1.5 w-1.5 rounded-sm', i === 1 ? 'bg-cyan-300' : 'bg-cyan-300/30')} />
            <span className="text-[6px] font-mono text-cyan-100/85 truncate">{l}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 relative rounded-sm border border-dashed border-cyan-300/30 bg-cyan-950/10">
        <div className="absolute left-2 top-2 right-2 h-5 rounded bg-gradient-to-r from-cyan-400/30 to-cyan-600/15 border border-cyan-300/40 flex items-center px-1.5">
          <div className="h-1 w-10 rounded-sm bg-cyan-100/60" />
          <div className="ml-auto h-1.5 w-5 rounded-sm bg-cyan-300/50" />
        </div>
        <div className="absolute left-2 top-9 h-12 w-16 rounded bg-gradient-to-br from-rose-300/40 to-rose-500/20 border border-rose-300/50 p-1">
          <div className="h-1.5 w-3/4 rounded-sm bg-white/40 mb-0.5" />
          <div className="h-1 w-full rounded-sm bg-white/20" />
          <div className="h-1 w-2/3 rounded-sm bg-white/20 mt-0.5" />
        </div>
        <div className="absolute right-2 top-9 flex flex-col gap-1">
          <div className="h-3.5 w-12 rounded bg-amber-300/60 border border-amber-300/50" />
          <div className="h-3.5 w-12 rounded border border-amber-300/40" />
        </div>
        <div className="absolute right-2 bottom-2 h-3 w-10 rounded bg-gradient-to-r from-cyan-400/40 to-cyan-300/30 border border-cyan-300/40" />
        {/* Selection handles around the card */}
        <div className="absolute left-1.5 top-8.5 h-13 w-17 pointer-events-none">
          {[
            { c: 'top-0 left-0' },
            { c: 'top-0 right-0' },
            { c: 'bottom-0 left-0' },
            { c: 'bottom-0 right-0' },
          ].map((h, i) => (
            <div key={i} className={cn('absolute h-1.5 w-1.5 -m-0.5 bg-cyan-300 rounded-[1px]', h.c)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PaletteWindow() {
  const colors = [
    { hex: 'F5A623', cls: 'bg-amber-300' },
    { hex: 'FB7185', cls: 'bg-rose-400' },
    { hex: 'FB923C', cls: 'bg-orange-400' },
    { hex: '34D399', cls: 'bg-emerald-400' },
    { hex: '38BDF8', cls: 'bg-sky-400' },
    { hex: 'FCD34D', cls: 'bg-amber-200' },
    { hex: 'FECDD3', cls: 'bg-rose-200' },
    { hex: 'FED7AA', cls: 'bg-orange-200' },
    { hex: 'A7F3D0', cls: 'bg-emerald-200' },
    { hex: 'BAE6FD', cls: 'bg-sky-200' },
  ];
  return (
    <div>
      <div className="text-[7px] font-mono text-rose-200/70 mb-1">Sunrise palette · 10</div>
      <div className="grid grid-cols-5 gap-1">
        {colors.map((c) => (
          <div key={c.hex} className="flex flex-col items-center">
            <div className={cn('w-full aspect-square rounded-md border border-white/25 shadow-sm', c.cls)} />
            <span className="text-[6px] font-mono text-white/65 mt-0.5">{c.hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssetsWindow() {
  const items = [
    { name: 'hero.jpg', g: 'from-amber-300/60 to-rose-400/40' },
    { name: 'logo.svg', g: 'from-cyan-300/60 to-violet-400/40' },
    { name: 'palm.png', g: 'from-emerald-300/60 to-cyan-400/40' },
    { name: 'sun.svg', g: 'from-rose-300/60 to-orange-400/40' },
    { name: 'wave.png', g: 'from-violet-300/60 to-fuchsia-400/40' },
    { name: 'cta.psd', g: 'from-amber-200/60 to-rose-300/40' },
  ];
  return (
    <div>
      <div className="flex items-center gap-1 mb-1">
        <div className="flex-1 h-3 rounded-sm bg-white/10 border border-white/10 px-1 flex items-center">
          <span className="text-[6px] font-mono text-white/45">search assets…</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {items.map((item) => (
          <div key={item.name} className={cn('aspect-square rounded-md border border-white/20 bg-gradient-to-br relative overflow-hidden', item.g)}>
            <div className="absolute inset-0 bg-gradient-radial from-white/15 to-transparent" />
            <div className="absolute inset-x-0.5 bottom-0.5 text-[6px] font-mono text-white/85 truncate text-center bg-black/30 rounded-sm px-0.5">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =============== CREATIVITY =============== */

function PaintCanvas() {
  return (
    <div className="relative h-full w-full flex gap-1.5">
      <div className="w-7 flex flex-col gap-0.5 bg-black/25 rounded-sm p-1 border border-white/10 shrink-0">
        {['✎', '◯', '◫', '⊞', '⊕', '✚'].map((t, i) => (
          <div key={i} className={cn('h-4 w-full rounded text-center text-[8px] leading-4', i === 0 ? 'bg-fuchsia-400/50 text-white' : 'text-white/50 hover:bg-white/5')}>{t}</div>
        ))}
      </div>
      <div className="flex-1 relative rounded-md bg-gradient-to-br from-violet-100/8 via-fuchsia-100/5 to-rose-100/8 border border-white/10 overflow-hidden">
        <div className="absolute left-2 top-2 h-10 w-12 rounded-full bg-gradient-to-br from-rose-400/70 to-amber-300/50 blur-[2px]" />
        <div className="absolute left-7 top-5 h-8 w-14 rounded-tr-3xl bg-gradient-to-br from-fuchsia-500/60 to-rose-500/40 blur-[1px]" />
        <div className="absolute right-3 top-3 h-12 w-8 rounded-full bg-gradient-to-br from-cyan-300/50 to-violet-400/50 blur-[2px]" />
        <div className="absolute right-1 bottom-3 h-6 w-10 rounded-tl-3xl bg-gradient-to-br from-amber-300/60 to-orange-400/50" />
        <div className="absolute left-12 top-12 h-4 w-16 bg-gradient-to-r from-emerald-300/60 to-cyan-400/40 blur-[1px] rounded-full -rotate-12" />
        {/* brush cursor */}
        <div className="absolute left-[55%] top-[40%] h-3 w-3 rounded-full border-2 border-fuchsia-200 shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
      </div>
      <div className="w-4 flex flex-col gap-0.5 bg-black/25 rounded-sm p-0.5 border border-white/10 shrink-0">
        {['bg-rose-400', 'bg-amber-300', 'bg-cyan-300', 'bg-fuchsia-400', 'bg-emerald-300', 'bg-violet-400', 'bg-orange-400'].map((c, i) => (
          <div key={i} className={cn('aspect-square w-full rounded-sm border', c, i === 0 ? 'border-white shadow-[0_0_6px_rgba(255,255,255,0.4)]' : 'border-white/25')} />
        ))}
      </div>
    </div>
  );
}

function VideoEditor() {
  return (
    <div className="relative h-full w-full">
      <div className="relative h-14 rounded-md bg-gradient-to-br from-violet-500/30 to-indigo-700/30 border border-white/15 overflow-hidden mb-1">
        <div className="absolute inset-x-2 top-2 h-6 rounded-sm bg-gradient-to-br from-amber-300/40 to-rose-400/30" />
        <div className="absolute inset-0 flex items-center justify-center text-white/80 text-[10px]">▶</div>
        <div className="absolute bottom-0.5 right-1 text-[6px] font-mono text-white/70">01:24 / 04:38</div>
      </div>
      <div className="flex items-center gap-1 mb-0.5">
        <span className="text-[6px] font-mono text-violet-200/70">00:00</span>
        <div className="flex-1 h-px bg-violet-300/15" />
        <span className="text-[6px] font-mono text-violet-200/70">04:38</span>
      </div>
      {[
        { label: 'V1', clips: [{ x: 4, w: 26, color: 'from-violet-500 to-fuchsia-500' }, { x: 33, w: 32, color: 'from-rose-500 to-amber-500' }, { x: 70, w: 24, color: 'from-cyan-500 to-sky-500' }] },
        { label: 'A1', clips: [{ x: 0, w: 95, color: 'from-emerald-500 to-teal-500' }] },
        { label: 'A2', clips: [{ x: 38, w: 30, color: 'from-amber-400 to-orange-500' }] },
      ].map((track, i) => (
        <div key={i} className="flex items-center gap-1 mb-0.5">
          <span className="text-[6px] font-mono text-violet-300/70 w-3">{track.label}</span>
          <div className="flex-1 h-3 rounded-sm bg-white/[0.04] relative">
            {track.clips.map((clip, j) => (
              <div
                key={j}
                className={cn('absolute top-0 bottom-0 rounded-sm bg-gradient-to-r border border-white/25 opacity-90', clip.color)}
                style={{ left: `${clip.x}%`, width: `${clip.w}%` }}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="absolute top-14 bottom-0 left-[40%] w-px bg-amber-300 pointer-events-none">
        <div className="absolute -top-1 -left-1 h-1.5 w-2.5 bg-amber-300 rounded-sm" />
      </div>
    </div>
  );
}

function PhotoEditor() {
  return (
    <div className="relative h-full w-full flex gap-1.5">
      <div className="flex-1 rounded-md bg-gradient-to-br from-amber-300/50 via-rose-400/40 to-violet-500/35 border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-yellow-200/25 to-transparent" />
        <div className="absolute left-0 right-0 top-[62%] h-px bg-amber-100/40" />
        <div className="absolute left-4 bottom-4 h-3 w-12 rounded-sm bg-stone-700/40 backdrop-blur-sm border border-stone-400/20" />
        <div className="absolute inset-x-1 bottom-0.5 text-[6px] font-mono text-white/75">IMG_4823.RAW · 24mp</div>
      </div>
      <div className="w-20 space-y-1.5 bg-black/25 rounded-sm p-1.5 border border-white/10 shrink-0">
        {[
          { label: 'Exposure', value: 60 },
          { label: 'Contrast', value: 45 },
          { label: 'Sat.', value: 70 },
          { label: 'Highlights', value: 35 },
        ].map((adj) => (
          <div key={adj.label}>
            <div className="flex items-baseline justify-between">
              <span className="text-[6px] font-mono text-amber-200/85">{adj.label}</span>
              <span className="text-[6px] font-mono text-amber-200/50">+{adj.value}</span>
            </div>
            <div className="h-1 mt-0.5 rounded-full bg-white/10 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-300 to-rose-400" style={{ width: `${adj.value}%` }} />
              <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white border border-amber-400 shadow-sm" style={{ left: `calc(${adj.value}% - 3px)` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =============== WRITING — fixed text colors (always dark, card bgs are light) =============== */

function MarkdownEditor() {
  return (
    <div className="font-mono text-[10px] leading-[1.7] text-stone-700 select-none">
      <div className="text-stone-400"># A Quiet Morning</div>
      <div className="h-1.5" />
      <div>The cursor blinked, patient.</div>
      <div>Outside, fog clung to the firs.</div>
      <div>She wrote the first true sentence</div>
      <div>she had written in a year.</div>
      <div className="mt-2 inline-block h-2.5 w-1 bg-stone-700 animate-pulse" />
    </div>
  );
}

function OutlineWindow() {
  return (
    <div className="font-mono text-[10px] leading-[1.75] text-stone-800 select-none space-y-0.5">
      <div className="text-amber-800 font-semibold">⌃ Draft 2</div>
      <div className="pl-3">• Premise</div>
      <div className="pl-3">• Conflict</div>
      <div className="pl-6 text-amber-700/85">↳ revise pp. 4–6</div>
      <div className="pl-3">• Resolution</div>
      <div className="pl-3 text-stone-500">+ new scene?</div>
      <div className="pl-3 text-stone-500">+ epilogue?</div>
    </div>
  );
}

function NotesWindow() {
  return (
    <div className="space-y-1.5">
      <div className="text-[9px] font-mono text-stone-700/80 mb-1">— scribbles</div>
      {[0.78, 0.66, 0.52, 0, 0.84, 0.6, 0.4].map((w, i) => {
        if (w === 0) return <div key={i} className="h-1" />;
        return <div key={i} className="h-2 rounded-sm bg-stone-500/40" style={{ width: `${w * 100}%` }} />;
      })}
    </div>
  );
}

/* =============== ENTERTAINMENT (replaces Music) =============== */

function MusicPlayer() {
  return (
    <div className="relative h-full w-full">
      <div className="flex gap-2 mb-2">
        <div className="h-16 w-16 rounded-md bg-gradient-to-br from-fuchsia-400 via-rose-500 to-amber-300 shadow-[0_4px_20px_rgba(244,114,182,0.4)] shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent" />
          <div className="absolute right-1 bottom-1 h-3 w-3 rounded-full bg-white/40 backdrop-blur-sm border border-white/30 flex items-center justify-center text-[7px] text-white">▶</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-bold text-fuchsia-100 truncate">Cosmic Drift</div>
          <div className="text-[8px] font-mono text-fuchsia-200/75 truncate">Long Nights · Vol 2</div>
          <div className="mt-1.5 flex items-center gap-1">
            <span className="text-[7px] font-mono text-fuchsia-200/80">2:14</span>
            <div className="flex-1 h-1 rounded-full bg-white/10 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-fuchsia-300 to-amber-300" />
              <div className="absolute left-[60%] top-1/2 -translate-y-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-white shadow" />
            </div>
            <span className="text-[7px] font-mono text-fuchsia-200/55">3:48</span>
          </div>
          <div className="flex items-center justify-center gap-3 mt-1.5">
            <span className="text-[10px] text-fuchsia-200/75">⏮</span>
            <span className="text-[11px] text-fuchsia-50 bg-white/15 rounded-full h-5 w-5 flex items-center justify-center">▶</span>
            <span className="text-[10px] text-fuchsia-200/75">⏭</span>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-[1.5px] h-7 mt-1">
        {Array.from({ length: 38 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-rose-500/85 via-fuchsia-400/85 to-amber-200/90"
            style={{
              animation: `wave-bounce ${1.2 + (i % 5) * 0.18}s ease-in-out ${(i % 7) * 0.07}s infinite`,
              transformOrigin: 'bottom',
              height: `${30 + Math.abs(Math.sin(i * 0.45)) * 60 + 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function VideoPlayer() {
  return (
    <div className="relative h-full w-full">
      <div className="relative h-16 rounded-md overflow-hidden bg-gradient-to-br from-rose-500/40 to-orange-700/30 border border-white/15 mb-1.5">
        <div className="absolute inset-x-3 top-3 h-7 rounded-sm bg-gradient-to-br from-amber-300/30 to-rose-500/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full bg-black/40 backdrop-blur flex items-center justify-center border border-white/25 shadow-lg">
            <span className="text-white text-[8px] ml-0.5">▶</span>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-1 inset-x-1 h-0.5 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full w-2/5 bg-red-500" />
          </div>
        </div>
        <div className="absolute top-1 left-1 text-[6px] font-mono text-white/85 bg-black/40 px-1 rounded">HD</div>
      </div>
      <div className="text-[10px] font-bold text-rose-100 leading-tight">Top 10 Productivity Hacks for 2026</div>
      <div className="text-[8px] font-mono text-rose-200/75 mt-0.5">TechFocused · 1.2M views · 3d</div>
      <div className="flex items-center gap-3 mt-1.5">
        <span className="text-[7px] font-mono text-rose-200/80">👍 24k</span>
        <span className="text-[7px] font-mono text-rose-200/80">💬 1.1k</span>
        <span className="text-[7px] font-mono text-rose-200/80">↗ share</span>
        <span className="ml-auto text-[7px] font-mono text-rose-200/70">+ Subscribe</span>
      </div>
    </div>
  );
}

function SocialFeed() {
  const posts = [
    { name: 'Indie Dev', handle: '@indie_dev', text: 'Just shipped my Mac focus app 🚀', time: '2h', likes: 89 },
    { name: 'Cat 🐱', handle: '@catlover', text: 'Sunday afternoon coding mood', time: '4h', likes: 142 },
    { name: 'Design Notes', handle: '@dsgn', text: 'Stop using purple gradients.', time: '6h', likes: 318 },
  ];
  return (
    <div className="space-y-1">
      {posts.map((p, i) => (
        <div key={i} className="rounded-md bg-white/[0.06] border border-white/10 p-1.5">
          <div className="flex items-start gap-1.5">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-amber-300 via-rose-400 to-fuchsia-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1 flex-wrap">
                <span className="text-[8px] font-bold text-white">{p.name}</span>
                <span className="text-[7px] font-mono text-white/45">{p.handle}</span>
                <span className="text-[7px] font-mono text-white/40">· {p.time}</span>
              </div>
              <div className="text-[8px] text-white/85 leading-tight mt-0.5">{p.text}</div>
              <div className="flex gap-2.5 mt-1 text-[6px] font-mono text-white/45">
                <span>💬 12</span>
                <span>♺ 4</span>
                <span>♥ {p.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =============== MEETINGS =============== */

function ZoomGrid() {
  return (
    <div className="grid grid-cols-2 gap-1.5 h-full w-full">
      {[
        { g: 'from-sky-300/40 to-sky-700/20', name: 'Steven' },
        { g: 'from-emerald-300/40 to-emerald-700/20', name: 'Priya' },
        { g: 'from-rose-300/40 to-rose-700/20', name: 'Marcus' },
        { g: 'from-amber-300/40 to-amber-700/20', name: 'Lena' },
      ].map((p, i) => (
        <div key={i} className={cn('relative rounded-md border border-white/15 overflow-hidden bg-gradient-to-br', p.g)}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white/70" />
          <div className="absolute bottom-0.5 left-1 right-1 flex items-center justify-between">
            <span className="text-[7px] font-mono text-white/90">{p.name}</span>
            <span className="text-[7px] text-white/70">🔇</span>
          </div>
          {i === 0 && <div className="absolute inset-0 border-2 border-emerald-400/60 rounded-md" />}
        </div>
      ))}
    </div>
  );
}

function CalendarWindow() {
  return (
    <div>
      <div className="text-[7px] font-mono text-sky-200/75 mb-1">March 2026</div>
      <div className="grid grid-cols-7 gap-0.5 text-[7px] text-sky-100/80 font-mono">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'aspect-square rounded-sm border flex items-start justify-end px-0.5 pt-0.5',
              i === 12
                ? 'bg-amber-400/50 border-amber-300/50 text-amber-50'
                : i === 18
                  ? 'bg-rose-400/30 border-rose-300/30 text-rose-100'
                  : 'bg-white/[0.04] border-white/8',
            )}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

function MeetingNotes() {
  return (
    <div className="font-mono text-[9px] leading-[1.7] text-sky-100/90 select-none space-y-0.5">
      <div className="text-amber-300 font-semibold">▸ Weekly sync · Mar 12</div>
      <div className="pl-2">— ship onboarding fix</div>
      <div className="pl-2">— hire designer (Q2)</div>
      <div className="pl-2">— launch waitlist Tues</div>
      <div className="pl-2 text-emerald-200">✓ pricing approved</div>
      <div className="pl-2 text-emerald-200">✓ analytics wired</div>
      <div className="pl-2 text-rose-200">! reschedule investor call</div>
    </div>
  );
}

/* =============== RESEARCH =============== */

function PDFWindow() {
  return (
    <div className="space-y-1">
      <div className="text-[7px] font-mono text-cyan-700/70 mb-1">attention-economy.pdf · p.3</div>
      <div className="h-2.5 w-2/3 rounded-sm bg-cyan-200/60" />
      <div className="h-1.5 w-full rounded-sm bg-stone-400/40" />
      <div className="h-1.5 w-full rounded-sm bg-stone-400/40" />
      <div className="h-1.5 w-4/5 rounded-sm bg-amber-300/70" />
      <div className="h-1.5 w-full rounded-sm bg-stone-400/40" />
      <div className="h-1.5 w-3/5 rounded-sm bg-stone-400/40" />
      <div className="h-1.5 w-5/6 rounded-sm bg-stone-400/40" />
    </div>
  );
}

function HighlightsWindow() {
  return (
    <div className="space-y-1 text-[9px] font-mono">
      <div className="text-amber-300/80 mb-1 text-[7px]">Readwise · 3 today</div>
      <div className="rounded bg-amber-300/25 border-l-2 border-amber-300 px-1.5 py-0.5 text-amber-100 leading-snug">
        &quot;attention is the new currency&quot;
      </div>
      <div className="rounded bg-rose-300/15 border-l-2 border-rose-300 px-1.5 py-0.5 text-rose-100 leading-snug">
        &quot;contexts cost more than tasks&quot;
      </div>
      <div className="rounded bg-emerald-300/15 border-l-2 border-emerald-300 px-1.5 py-0.5 text-emerald-100 leading-snug">
        &quot;flow is fragile&quot;
      </div>
    </div>
  );
}

function SidebarNotes() {
  return (
    <div className="text-[9px] font-mono text-emerald-100/90 space-y-1">
      <div className="text-emerald-300 mb-1 text-[7px]">Annotations · 12</div>
      <div className="rounded bg-white/5 px-1.5 py-1 border border-white/10 leading-snug">p.4 — research gap</div>
      <div className="rounded bg-white/5 px-1.5 py-1 border border-white/10 leading-snug">p.7 — cite for intro</div>
      <div className="rounded bg-white/5 px-1.5 py-1 border border-white/10 leading-snug">p.12 — counterargument</div>
    </div>
  );
}

/* =============== PROJECTS (planning) =============== */

type KanbanCard = { t: string; tag: string; p?: number; who?: string };
type KanbanCol = { title: string; count: number; color: 'rose' | 'amber' | 'emerald'; items: KanbanCard[] };

function KanbanWindow() {
  const cols: KanbanCol[] = [
    {
      title: 'Todo', count: 9, color: 'rose',
      items: [
        { t: 'Spec the migration plan', tag: 'eng', p: 2 },
        { t: 'Sketch onboarding v2', tag: 'design', p: 1 },
        { t: 'Audit dependency tree', tag: 'eng', p: 3 },
        { t: 'Draft Q2 OKRs', tag: 'ops' },
        { t: 'Investor update', tag: 'ops', p: 1 },
        { t: 'Review legal contract', tag: 'biz' },
        { t: 'Hire mobile dev', tag: 'biz', p: 2 },
        { t: 'Update changelog', tag: 'docs' },
        { t: 'Triage inbox bugs', tag: 'eng' },
      ],
    },
    {
      title: 'Doing', count: 4, color: 'amber',
      items: [
        { t: 'Wire Stripe checkout', tag: 'eng', p: 1, who: 'SB' },
        { t: 'Redesign settings panel', tag: 'design', who: 'PR' },
        { t: 'Pricing landing page', tag: 'web', p: 1, who: 'LM' },
        { t: 'Auth refactor', tag: 'eng', who: 'SB' },
      ],
    },
    {
      title: 'Done', count: 12, color: 'emerald',
      items: [
        { t: 'Approve pricing tiers', tag: 'biz' },
        { t: 'Wire analytics events', tag: 'eng' },
        { t: 'Onboarding video', tag: 'design' },
        { t: 'Replay user sessions', tag: 'ux' },
        { t: 'Polish hero animation', tag: 'web' },
        { t: 'FAQ copy', tag: 'docs' },
        { t: 'Set up status page', tag: 'eng' },
        { t: 'Press release draft', tag: 'biz' },
        { t: 'A11y pass on forms', tag: 'eng' },
      ],
    },
  ];
  const accent = (c: 'rose' | 'amber' | 'emerald') =>
    c === 'rose' ? 'bg-rose-400/35 border-rose-300/50' :
    c === 'amber' ? 'bg-amber-400/35 border-amber-300/55' :
    'bg-emerald-400/30 border-emerald-300/45';
  const tagTone: Record<string, string> = {
    eng: 'text-sky-200/85',
    design: 'text-fuchsia-200/85',
    web: 'text-cyan-200/85',
    biz: 'text-amber-200/85',
    ops: 'text-emerald-200/85',
    docs: 'text-violet-200/85',
    ux: 'text-rose-200/85',
  };
  return (
    <div className="grid grid-cols-3 gap-1 h-full w-full">
      {cols.map((col) => (
        <div key={col.title} className="rounded-md bg-white/[0.05] border border-white/10 p-1.5 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-1 shrink-0">
            <span className="text-[8px] font-mono text-violet-100/90">{col.title}</span>
            <span className="text-[8px] font-mono text-violet-200/55">{col.count}</span>
          </div>
          <div className="space-y-[3px] overflow-hidden flex-1">
            {col.items.map((it, i) => (
              <div
                key={i}
                className={cn('rounded-sm border px-1 py-[2px] flex items-center gap-1', accent(col.color))}
              >
                {it.p && (
                  <span className={cn(
                    'h-1 w-1 rounded-full shrink-0',
                    it.p === 1 ? 'bg-rose-300' : it.p === 2 ? 'bg-amber-300' : 'bg-emerald-300'
                  )} />
                )}
                <span className="text-[6.5px] font-mono text-white/85 truncate flex-1">{it.t}</span>
                <span className={cn('text-[6px] font-mono shrink-0', tagTone[it.tag] ?? 'text-white/55')}>
                  {it.tag}
                </span>
                {it.who && (
                  <span className="text-[6px] font-mono text-white/70 bg-white/10 rounded-sm px-[2px] shrink-0">
                    {it.who}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TimelineWindow() {
  return (
    <div className="space-y-2">
      {[
        { phase: 'Discover', left: 0, w: 22 },
        { phase: 'Design', left: 18, w: 30 },
        { phase: 'Build', left: 44, w: 38 },
        { phase: 'Ship', left: 78, w: 18 },
      ].map((p) => (
        <div key={p.phase} className="flex items-center gap-1.5">
          <div className="text-[7px] font-mono text-violet-100/85 w-12 shrink-0">{p.phase}</div>
          <div className="flex-1 h-2.5 rounded-full bg-white/5 relative overflow-hidden">
            <div
              className="absolute inset-y-0 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 shadow-sm"
              style={{ left: `${p.left}%`, width: `${p.w}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TasksWindow() {
  return (
    <div className="space-y-1 text-[9px] font-mono text-violet-100/90">
      {[
        { done: true, t: 'Spec the migration' },
        { done: true, t: 'Sketch onboarding' },
        { done: false, t: 'Wire Stripe checkout', active: true },
        { done: false, t: 'Replay user video' },
        { done: false, t: 'Email investor update' },
      ].map((task, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div
            className={cn(
              'h-2.5 w-2.5 rounded-sm border',
              task.done
                ? 'bg-emerald-400/60 border-emerald-300/60'
                : task.active
                  ? 'bg-violet-400/40 border-violet-300/60'
                  : 'border-violet-300/30',
            )}
          />
          <span className={task.done ? 'line-through text-violet-200/55' : ''}>{task.t}</span>
        </div>
      ))}
    </div>
  );
}

/* =============== Categories list =============== */

export const CATEGORIES: Category[] = [
  {
    id: 'development',
    label: 'Development',
    windows: [
      { app: 'Cursor', accent: '#fbbf24', toneClass: 'from-[#1a1408] via-[#2d1f0a] to-[#0f0a05]', render: CodeWindow },
      { app: 'Arc', accent: '#fb923c', toneClass: 'from-[#1a0f12] via-[#2a1820] to-[#100808]', render: BrowserWindow },
      { app: 'Terminal', accent: '#34d399', toneClass: 'from-[#08120e] via-[#0d2519] to-[#040a08]', render: TerminalWindow },
    ],
  },
  {
    id: 'specific-projects',
    label: 'Specific Projects',
    windows: [
      { app: 'Safari', accent: '#fbbf24', toneClass: 'from-[#1a0c08] via-[#2a1408] to-[#0c0604]', render: DinoBrowser },
      { app: 'Cursor', accent: '#fb923c', toneClass: 'from-[#1a1408] via-[#2d1f0a] to-[#0f0a05]', render: DinoEditor },
      { app: 'iTerm', accent: '#34d399', toneClass: 'from-[#08120e] via-[#0d2519] to-[#040a08]', render: DinoTerminal },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    windows: [
      { app: 'Figma', accent: '#22d3ee', toneClass: 'from-[#08151c] via-[#0a2030] to-[#04080d]', render: FigmaCanvas },
      { app: 'Palette', accent: '#fb7185', toneClass: 'from-[#1c0a15] via-[#2a0e1f] to-[#0a0408]', render: PaletteWindow },
      { app: 'Assets', accent: '#fcd34d', toneClass: 'from-[#1c1408] via-[#2c1f0a] to-[#0e0805]', render: AssetsWindow },
    ],
  },
  {
    id: 'creativity',
    label: 'Creativity',
    windows: [
      { app: 'Procreate', accent: '#f0abfc', toneClass: 'from-[#1a081c] via-[#2a0e30] to-[#0a040c]', render: PaintCanvas },
      { app: 'Final Cut', accent: '#a78bfa', toneClass: 'from-[#100a1c] via-[#1f1233] to-[#08040c]', render: VideoEditor },
      { app: 'Lightroom', accent: '#fcd34d', toneClass: 'from-[#1c1408] via-[#2c1f0a] to-[#0e0805]', render: PhotoEditor },
    ],
  },
  {
    id: 'writing',
    label: 'Writing',
    windows: [
      { app: 'iA Writer', accent: '#78716c', toneClass: 'from-[#fafaf5] via-[#f1ede0] to-[#e6e1d2]', render: MarkdownEditor },
      { app: 'Outline', accent: '#92400e', toneClass: 'from-[#fef3c7] via-[#fde68a] to-[#fcd34d]', render: OutlineWindow },
      { app: 'Notes', accent: '#0f172a', toneClass: 'from-[#fef7e7] via-[#fbeac6] to-[#f5dba5]', render: NotesWindow },
    ],
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    windows: [
      { app: 'Music', accent: '#f0abfc', toneClass: 'from-[#1a0716] via-[#2e0b28] to-[#0a0308]', render: MusicPlayer },
      { app: 'YouTube', accent: '#fb7185', toneClass: 'from-[#1c0a10] via-[#33121a] to-[#0a0408]', render: VideoPlayer },
      { app: 'X', accent: '#e7e5e4', toneClass: 'from-[#0a0a0e] via-[#15151c] to-[#04040a]', render: SocialFeed },
    ],
  },
  {
    id: 'meetings',
    label: 'Meetings',
    windows: [
      { app: 'Zoom', accent: '#60a5fa', toneClass: 'from-[#08111f] via-[#0d213a] to-[#040814]', render: ZoomGrid },
      { app: 'Calendar', accent: '#fbbf24', toneClass: 'from-[#0a1422] via-[#0e213a] to-[#040814]', render: CalendarWindow },
      { app: 'Notes', accent: '#34d399', toneClass: 'from-[#08120e] via-[#0c1f1a] to-[#040806]', render: MeetingNotes },
    ],
  },
  {
    id: 'research',
    label: 'Research',
    windows: [
      { app: 'Preview', accent: '#67e8f9', toneClass: 'from-[#f1f5fa] via-[#e5edf5] to-[#d6e1ed]', render: PDFWindow },
      { app: 'Readwise', accent: '#fbbf24', toneClass: 'from-[#1a1408] via-[#241a0d] to-[#0c0805]', render: HighlightsWindow },
      { app: 'Sidebar', accent: '#34d399', toneClass: 'from-[#0a141c] via-[#0e1f28] to-[#040a0d]', render: SidebarNotes },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    windows: [
      { app: 'Linear', accent: '#a78bfa', toneClass: 'from-[#14081c] via-[#1f0e30] to-[#08040c]', render: KanbanWindow },
      { app: 'Timeline', accent: '#f0abfc', toneClass: 'from-[#180a1c] via-[#241030] to-[#08040c]', render: TimelineWindow },
      { app: 'Tasks', accent: '#c4b5fd', toneClass: 'from-[#100a1c] via-[#1c1030] to-[#08040c]', render: TasksWindow },
    ],
  },
];
