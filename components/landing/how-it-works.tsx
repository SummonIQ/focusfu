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
    <section id="how" className="relative py-24 sm:py-32">
      {/* Connect to neighboring sections via a centered gradient halo */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[900px] rounded-full bg-gradient-radial from-brand-500/[0.07] via-transparent to-transparent blur-3xl"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at center, rgba(245,158,11,0.08), transparent 65%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-brand-700 dark:text-brand-300 mb-3 font-mono tracking-wider uppercase">
            How it works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Three small steps.{' '}
            <span className="text-gradient">One fluid Mac.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="relative rounded-2xl p-7 border border-panel bg-paper/60 backdrop-blur-sm overflow-hidden group hover:border-brand-500/40 transition-colors"
            >
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br from-brand-500/15 to-accent-500/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-xs font-mono text-brand-600 dark:text-brand-400 mb-4 tabular-nums">
                {s.n}
              </div>
              <h3 className="text-xl font-semibold mb-2 tracking-tight">{s.title}</h3>
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
