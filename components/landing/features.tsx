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
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 mb-3">Built for flow</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Tiny tool. <span className="text-gradient">Huge gear shift.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            macOS Spaces is the most underused productivity feature on your Mac. FocusFu makes it usable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/5 rounded-3xl overflow-hidden border border-foreground/5">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="relative p-7 bg-background hover:bg-gradient-to-br hover:from-brand-50 hover:to-white dark:hover:from-brand-950/40 dark:hover:to-black transition-colors group"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/15 to-accent-500/15 border border-brand-500/20 text-brand-600 dark:text-brand-300 mb-5 group-hover:scale-110 transition-transform">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
