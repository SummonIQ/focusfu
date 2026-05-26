import type { ReactNode } from 'react';

export type WindowKind = {
  app: string;
  accent: string;
  toneClass: string; // gradient classes for the card background
  render: () => ReactNode;
};

export type Category = {
  id: string;
  label: string;
  windows: [WindowKind, WindowKind, WindowKind]; // front, mid, back
};

/* ------- Window content vignettes (intentionally tiny + stylized) ------- */

function CodeWindow() {
  return (
    <div className="font-mono text-[10px] leading-[1.55] text-amber-50/90 select-none">
      <div className="text-amber-200/40">// focus.ts</div>
      <div>
        <span className="text-rose-300">export</span>{' '}
        <span className="text-amber-200">const</span>{' '}
        <span className="text-sky-200">enterFocus</span> = () =&gt; {'{'}
      </div>
      <div className="pl-3">
        <span className="text-amber-200">await</span> spaces.swap(
        <span className="text-emerald-200">&apos;code&apos;</span>);
      </div>
      <div className="pl-3 text-amber-200/70">mute(notifications);</div>
      <div>{'}'}</div>
      <div className="text-emerald-300/90 mt-2">✓ 23ms · ready</div>
    </div>
  );
}

function TerminalWindow() {
  return (
    <div className="font-mono text-[10px] leading-[1.6] text-emerald-200/85 select-none">
      <div><span className="text-emerald-300/70">~/focusfu</span> $ bun dev</div>
      <div className="text-emerald-300/50">$ next start --turbopack</div>
      <div className="text-amber-200/80 mt-1">► Listening on :3030</div>
      <div className="text-emerald-200/60">  compiled 38 modules</div>
      <div className="mt-1.5 inline-block h-2.5 w-1 bg-emerald-200 animate-pulse" />
    </div>
  );
}

function BrowserWindow() {
  return (
    <div className="relative h-full w-full">
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="h-1 w-1 rounded-full bg-rose-400" />
        <div className="h-1 w-1 rounded-full bg-amber-300" />
        <div className="h-1 w-1 rounded-full bg-emerald-400" />
        <div className="ml-2 h-3.5 flex-1 rounded-sm bg-white/10 border border-white/10 px-1.5 flex items-center">
          <span className="text-[8px] font-mono text-white/50">localhost:3030</span>
        </div>
      </div>
      <div className="h-2.5 w-3/4 rounded-sm bg-white/15 mb-1" />
      <div className="h-2 w-1/2 rounded-sm bg-white/10 mb-2" />
      <div className="grid grid-cols-3 gap-1">
        <div className="aspect-[4/3] rounded bg-gradient-to-br from-amber-300/30 to-rose-400/20" />
        <div className="aspect-[4/3] rounded bg-gradient-to-br from-sky-300/30 to-indigo-400/20" />
        <div className="aspect-[4/3] rounded bg-gradient-to-br from-emerald-300/30 to-teal-400/20" />
      </div>
    </div>
  );
}

function FigmaCanvas() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1 top-0 flex gap-1.5">
        <div className="h-2 w-2 rounded-sm bg-cyan-300/80" />
        <div className="h-2 w-2 rounded-sm bg-rose-300/80" />
        <div className="h-2 w-2 rounded-sm bg-amber-300/80" />
      </div>
      <div className="absolute left-6 top-7 h-16 w-24 rounded-md bg-gradient-to-br from-cyan-300/30 to-cyan-500/10 border border-cyan-300/30" />
      <div className="absolute left-32 top-4 h-12 w-12 rounded-full bg-gradient-to-br from-rose-300/40 to-rose-600/15 border border-rose-300/30" />
      <div className="absolute right-3 top-12 h-9 w-20 rounded-md bg-gradient-to-br from-amber-200/40 to-amber-400/15 border border-amber-300/30" />
      <div className="absolute left-3 bottom-2 right-3 h-1 rounded-full bg-cyan-300/40" />
    </div>
  );
}

function PaletteWindow() {
  return (
    <div className="grid grid-cols-5 gap-1 h-full w-full">
      {[
        'bg-amber-300',
        'bg-rose-400',
        'bg-orange-400',
        'bg-emerald-300',
        'bg-sky-400',
        'bg-amber-200',
        'bg-rose-200',
        'bg-orange-200',
        'bg-emerald-200',
        'bg-sky-200',
      ].map((c, i) => (
        <div key={i} className={`rounded-md ${c} border border-white/20`} />
      ))}
    </div>
  );
}

function AssetsWindow() {
  return (
    <div className="grid grid-cols-3 gap-1.5 h-full w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-md border border-white/10 bg-gradient-to-br"
          style={{
            backgroundImage: [
              'linear-gradient(135deg,#fcd34d33,#fb718533)',
              'linear-gradient(135deg,#67e8f933,#a78bfa33)',
              'linear-gradient(135deg,#86efac33,#22d3ee33)',
              'linear-gradient(135deg,#fda4af33,#fb923c33)',
              'linear-gradient(135deg,#c4b5fd33,#f0abfc33)',
              'linear-gradient(135deg,#fde68a33,#fca5a533)',
            ][i],
          }}
        />
      ))}
    </div>
  );
}

function MarkdownEditor() {
  return (
    <div className="font-mono text-[10px] leading-[1.7] text-stone-700 dark:text-stone-200 select-none">
      <div className="text-stone-400 dark:text-stone-500"># A Quiet Morning</div>
      <div className="h-1.5" />
      <div>The cursor blinked, patient.</div>
      <div>Outside, fog clung to the firs.</div>
      <div>She wrote the first true sentence</div>
      <div>she had written in a year.</div>
      <div className="mt-2 inline-block h-2.5 w-1 bg-stone-700 dark:bg-stone-200 animate-pulse" />
    </div>
  );
}

function OutlineWindow() {
  return (
    <div className="font-mono text-[10px] leading-[1.75] text-stone-700 dark:text-stone-200/90 select-none space-y-0.5">
      <div className="text-amber-700 dark:text-amber-300">⌃ Draft 2</div>
      <div className="pl-3">• Premise</div>
      <div className="pl-3">• Conflict</div>
      <div className="pl-6 text-amber-700/80 dark:text-amber-300/80">↳ revise pp. 4–6</div>
      <div className="pl-3">• Resolution</div>
      <div className="pl-3 text-stone-400">+ new scene?</div>
    </div>
  );
}

function NotesWindow() {
  return (
    <div className="space-y-1">
      <div className="h-2 w-3/4 rounded-sm bg-stone-300/60 dark:bg-stone-500/40" />
      <div className="h-2 w-2/3 rounded-sm bg-stone-300/60 dark:bg-stone-500/40" />
      <div className="h-2 w-1/2 rounded-sm bg-stone-300/60 dark:bg-stone-500/40" />
      <div className="h-3" />
      <div className="h-2 w-4/5 rounded-sm bg-stone-300/60 dark:bg-stone-500/40" />
      <div className="h-2 w-3/5 rounded-sm bg-stone-300/60 dark:bg-stone-500/40" />
    </div>
  );
}

function WaveformWindow() {
  return (
    <div className="relative h-full w-full">
      <div className="flex items-end gap-0.5 absolute left-2 right-2 bottom-3 h-14">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-rose-500/70 via-amber-400/80 to-amber-200/90"
            style={{ height: `${20 + Math.sin(i * 0.65) * 30 + 38}%` }}
          />
        ))}
      </div>
      <div className="absolute left-2 top-1 right-2 flex items-center gap-1.5">
        <div className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-3/5 bg-gradient-to-r from-amber-300 to-rose-300" />
        </div>
        <span className="text-[9px] font-mono text-amber-100/90">02:14</span>
      </div>
    </div>
  );
}

function MixerWindow() {
  return (
    <div className="grid grid-cols-6 gap-1 h-full w-full items-end">
      {[60, 80, 45, 70, 55, 90].map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="text-[7px] font-mono text-rose-200/70">{['K', 'S', 'H', 'B', 'F', 'V'][i]}</div>
          <div className="w-full h-12 rounded-sm bg-black/40 relative overflow-hidden">
            <div
              className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-rose-500 to-amber-300"
              style={{ height: `${h}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function LibraryWindow() {
  return (
    <div className="space-y-1">
      {['Cosmic Drift', 'Long Nights', 'Tides', 'Cabin in May'].map((t) => (
        <div key={t} className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gradient-to-br from-rose-400/50 to-amber-400/40" />
          <div className="flex-1 h-2 rounded-sm bg-white/15" />
          <span className="text-[8px] font-mono text-amber-200/70">3:24</span>
        </div>
      ))}
    </div>
  );
}

function ZoomGrid() {
  return (
    <div className="grid grid-cols-2 gap-1.5 h-full w-full">
      {[
        'bg-gradient-to-br from-sky-300/40 to-sky-700/20',
        'bg-gradient-to-br from-emerald-300/40 to-emerald-700/20',
        'bg-gradient-to-br from-rose-300/40 to-rose-700/20',
        'bg-gradient-to-br from-amber-300/40 to-amber-700/20',
      ].map((g, i) => (
        <div key={i} className={`relative rounded-md border border-white/10 overflow-hidden ${g}`}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white/60" />
          <div className="absolute bottom-0.5 left-1 right-1 h-0.5 rounded-full bg-white/30" />
        </div>
      ))}
    </div>
  );
}

function CalendarWindow() {
  return (
    <div className="grid grid-cols-7 gap-0.5 h-full w-full text-[7px] text-sky-100/70 font-mono">
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          className={`rounded-sm border border-white/5 flex items-start justify-end px-0.5 ${
            i === 12 ? 'bg-amber-400/40 border-amber-300/40 text-amber-50' : 'bg-white/[0.04]'
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

function MeetingNotes() {
  return (
    <div className="font-mono text-[9px] leading-[1.7] text-sky-100/85 select-none space-y-0.5">
      <div className="text-amber-300">▸ Weekly sync · Mar 12</div>
      <div className="pl-2">— ship onboarding fix</div>
      <div className="pl-2">— hire designer (Q2)</div>
      <div className="pl-2">— launch waitlist Tues</div>
      <div className="pl-2 text-emerald-200">✓ pricing approved</div>
    </div>
  );
}

function PDFWindow() {
  return (
    <div className="space-y-1">
      <div className="h-2 w-2/3 rounded-sm bg-cyan-200/40" />
      <div className="h-1.5 w-full rounded-sm bg-stone-300/40" />
      <div className="h-1.5 w-full rounded-sm bg-stone-300/40" />
      <div className="h-1.5 w-4/5 rounded-sm bg-amber-300/50" />
      <div className="h-1.5 w-full rounded-sm bg-stone-300/40" />
      <div className="h-1.5 w-3/5 rounded-sm bg-stone-300/40" />
    </div>
  );
}

function HighlightsWindow() {
  return (
    <div className="space-y-1.5 text-[9px] font-mono">
      <div className="rounded bg-amber-300/25 border-l-2 border-amber-300 px-1.5 py-0.5 text-amber-100">
        &quot;attention is the new currency&quot;
      </div>
      <div className="rounded bg-rose-300/15 border-l-2 border-rose-300 px-1.5 py-0.5 text-rose-100">
        &quot;contexts cost more than tasks&quot;
      </div>
      <div className="rounded bg-emerald-300/15 border-l-2 border-emerald-300 px-1.5 py-0.5 text-emerald-100">
        &quot;flow is fragile&quot;
      </div>
    </div>
  );
}

function SidebarNotes() {
  return (
    <div className="text-[9px] font-mono text-emerald-100/85 space-y-1">
      <div className="text-emerald-300">Annotations · 12</div>
      <div className="rounded bg-white/5 px-1.5 py-1 border border-white/10">p.4 — research gap</div>
      <div className="rounded bg-white/5 px-1.5 py-1 border border-white/10">p.7 — cite for intro</div>
      <div className="rounded bg-white/5 px-1.5 py-1 border border-white/10">p.12 — counterargument</div>
    </div>
  );
}

function KanbanWindow() {
  return (
    <div className="grid grid-cols-3 gap-1.5 h-full w-full">
      {[
        { title: 'Todo', count: 4, color: 'rose' },
        { title: 'Doing', count: 2, color: 'amber' },
        { title: 'Done', count: 7, color: 'emerald' },
      ].map((col) => (
        <div key={col.title} className="rounded-md bg-white/[0.04] border border-white/10 p-1.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[8px] font-mono text-violet-100/90">{col.title}</span>
            <span className="text-[8px] font-mono text-violet-200/50">{col.count}</span>
          </div>
          <div className="space-y-1">
            {Array.from({ length: col.title === 'Doing' ? 2 : 3 }).map((_, i) => (
              <div
                key={i}
                className={`h-3 rounded-sm bg-${col.color}-400/30 border border-${col.color}-300/30`}
              />
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
      {['Discovery', 'Design', 'Build', 'Ship'].map((phase, i) => (
        <div key={phase} className="flex items-center gap-1.5">
          <div className="text-[8px] font-mono text-violet-100/80 w-12">{phase}</div>
          <div className="flex-1 h-2 rounded-full bg-white/5 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
              style={{
                left: `${i * 22}%`,
                width: i === 1 ? '32%' : '24%',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TasksWindow() {
  return (
    <div className="space-y-1 text-[9px] font-mono text-violet-100/85">
      {[
        { done: true, t: 'Spec the migration' },
        { done: true, t: 'Sketch onboarding' },
        { done: false, t: 'Wire Stripe checkout', active: true },
        { done: false, t: 'Replay user video' },
        { done: false, t: 'Email investor update' },
      ].map((task, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div
            className={`h-2.5 w-2.5 rounded-sm border ${
              task.done
                ? 'bg-emerald-400/60 border-emerald-300/60'
                : task.active
                  ? 'bg-violet-400/40 border-violet-300/60'
                  : 'border-violet-300/30'
            }`}
          />
          <span className={task.done ? 'line-through text-violet-200/50' : ''}>{task.t}</span>
        </div>
      ))}
    </div>
  );
}

/* ------- Categories ------- */

export const CATEGORIES: Category[] = [
  {
    id: 'development',
    label: 'Development',
    windows: [
      {
        app: 'Cursor',
        accent: '#fbbf24',
        toneClass: 'from-[#1a1408] via-[#2d1f0a] to-[#0f0a05]',
        render: CodeWindow,
      },
      {
        app: 'Arc',
        accent: '#fb923c',
        toneClass: 'from-[#1a0f12] via-[#2a1820] to-[#100808]',
        render: BrowserWindow,
      },
      {
        app: 'Terminal',
        accent: '#34d399',
        toneClass: 'from-[#08120e] via-[#0d2519] to-[#040a08]',
        render: TerminalWindow,
      },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    windows: [
      {
        app: 'Figma',
        accent: '#22d3ee',
        toneClass: 'from-[#08151c] via-[#0a2030] to-[#04080d]',
        render: FigmaCanvas,
      },
      {
        app: 'Palette',
        accent: '#fb7185',
        toneClass: 'from-[#1c0a15] via-[#2a0e1f] to-[#0a0408]',
        render: PaletteWindow,
      },
      {
        app: 'Assets',
        accent: '#fcd34d',
        toneClass: 'from-[#1c1408] via-[#2c1f0a] to-[#0e0805]',
        render: AssetsWindow,
      },
    ],
  },
  {
    id: 'writing',
    label: 'Writing',
    windows: [
      {
        app: 'iA Writer',
        accent: '#78716c',
        toneClass: 'from-[#fafaf3] via-[#f1ede0] to-[#e6e1d2]',
        render: MarkdownEditor,
      },
      {
        app: 'Outline',
        accent: '#92400e',
        toneClass: 'from-[#fef3c7] via-[#fde68a] to-[#fcd34d]',
        render: OutlineWindow,
      },
      {
        app: 'Notes',
        accent: '#0f172a',
        toneClass: 'from-[#fef7e7] via-[#fbeac6] to-[#f5dba5]',
        render: NotesWindow,
      },
    ],
  },
  {
    id: 'music',
    label: 'Music',
    windows: [
      {
        app: 'Logic Pro',
        accent: '#f0abfc',
        toneClass: 'from-[#1a0716] via-[#2e0b28] to-[#0a0308]',
        render: WaveformWindow,
      },
      {
        app: 'Ableton',
        accent: '#fb7185',
        toneClass: 'from-[#1c0a10] via-[#33121a] to-[#0a0408]',
        render: MixerWindow,
      },
      {
        app: 'Library',
        accent: '#fcd34d',
        toneClass: 'from-[#1a1108] via-[#2a1c0d] to-[#0c0805]',
        render: LibraryWindow,
      },
    ],
  },
  {
    id: 'meetings',
    label: 'Meetings',
    windows: [
      {
        app: 'Zoom',
        accent: '#60a5fa',
        toneClass: 'from-[#08111f] via-[#0d213a] to-[#040814]',
        render: ZoomGrid,
      },
      {
        app: 'Calendar',
        accent: '#fbbf24',
        toneClass: 'from-[#0a1422] via-[#0e213a] to-[#040814]',
        render: CalendarWindow,
      },
      {
        app: 'Notes',
        accent: '#34d399',
        toneClass: 'from-[#08120e] via-[#0c1f1a] to-[#040806]',
        render: MeetingNotes,
      },
    ],
  },
  {
    id: 'research',
    label: 'Research',
    windows: [
      {
        app: 'Preview',
        accent: '#67e8f9',
        toneClass: 'from-[#f1f5fa] via-[#e5edf5] to-[#d6e1ed]',
        render: PDFWindow,
      },
      {
        app: 'Readwise',
        accent: '#fbbf24',
        toneClass: 'from-[#1a1408] via-[#241a0d] to-[#0c0805]',
        render: HighlightsWindow,
      },
      {
        app: 'Sidebar',
        accent: '#34d399',
        toneClass: 'from-[#0a141c] via-[#0e1f28] to-[#040a0d]',
        render: SidebarNotes,
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    windows: [
      {
        app: 'Linear',
        accent: '#a78bfa',
        toneClass: 'from-[#14081c] via-[#1f0e30] to-[#08040c]',
        render: KanbanWindow,
      },
      {
        app: 'Timeline',
        accent: '#f0abfc',
        toneClass: 'from-[#180a1c] via-[#241030] to-[#08040c]',
        render: TimelineWindow,
      },
      {
        app: 'Tasks',
        accent: '#c4b5fd',
        toneClass: 'from-[#100a1c] via-[#1c1030] to-[#08040c]',
        render: TasksWindow,
      },
    ],
  },
];
