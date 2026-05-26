import {
  Keyboard,
  Eye,
  Sparkles,
  Lock,
  Layers,
  Zap,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: '1–2 second switches',
    body: 'Hop between desktops at the speed of thought. No animation tax, no waiting on the Mission Control overlay.',
  },
  {
    icon: Eye,
    title: 'Live visual previews',
    body: 'Hold the hotkey to see thumbnails of every space. Always know where you’re going before you get there.',
  },
  {
    icon: Keyboard,
    title: 'Keyboard-first',
    body: 'Bind every space to a chord. ⌥1 jumps to Code, ⌥2 to Design, ⌥3 to Music. Muscle memory in a week.',
  },
  {
    icon: Layers,
    title: 'Per-space focus rules',
    body: 'Auto-hide Slack on the Writing space. Mute notifications on Music. Each desktop has its own personality.',
  },
  {
    icon: Sparkles,
    title: 'Smart suggestions',
    body: 'FocusFu learns your patterns and quietly suggests the right space when you open an app you usually pair with one.',
  },
  {
    icon: Lock,
    title: 'Privacy-first',
    body: 'Everything runs locally on your Mac. No accounts required for the desktop app. No telemetry, ever.',
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Soft inner decoration — keeps the section visually connected to the
          surrounding bg rather than walled off by a card border. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-500/[0.06] via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-brand-500/[0.04] via-transparent to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-brand-700 dark:text-brand-300 mb-3 font-mono tracking-wider uppercase">
            Built for flow
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Tiny tool.{' '}
            <span className="text-gradient">Huge gear shift.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            macOS Spaces is the most underused productivity feature on your Mac. FocusFu makes it usable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {FEATURES.map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="relative group">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 border border-brand-500/30 text-brand-700 dark:text-brand-300 mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2 tracking-tight">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
