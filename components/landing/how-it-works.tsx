const STEPS = [
  {
    n: '01',
    title: 'Install in 30 seconds',
    body: 'Drop FocusFu in your Applications folder, grant Accessibility access, and the menu bar app does the rest.',
  },
  {
    n: '02',
    title: 'Name your spaces',
    body: 'Give each macOS Space a name and an icon. Code, Design, Writing — whatever you actually do.',
  },
  {
    n: '03',
    title: 'Switch with intention',
    body: 'Press your hotkey, see live previews, land on the right context in under two seconds.',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32 bg-gradient-to-b from-background via-brand-50/30 to-background dark:via-brand-950/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Three small steps. <span className="text-gradient">One fluid Mac.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="relative rounded-2xl p-7 border border-foreground/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm overflow-hidden group hover:border-brand-500/30 transition-colors"
            >
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br from-brand-500/15 to-accent-500/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-xs font-mono text-brand-600 dark:text-brand-400 mb-4 tabular-nums">{s.n}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 h-px w-6 bg-gradient-to-r from-brand-500/30 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
