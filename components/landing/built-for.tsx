import { Code, Palette, PenTool, Search, Briefcase, Music } from 'lucide-react';

const PERSONAS = [
  {
    icon: Code,
    role: 'Engineers',
    quote:
      'Code on space 1. Browser on space 2. Slack on space 3. Cmd+Tab destroys context — FocusFu protects it.',
  },
  {
    icon: Palette,
    role: 'Designers',
    quote:
      'Figma gets the whole screen on space 2. Inspiration board on space 4. Inbox lives somewhere I can ignore.',
  },
  {
    icon: PenTool,
    role: 'Writers',
    quote:
      'Writing space mutes notifications, hides Slack, and dims everything that isn’t the cursor.',
  },
  {
    icon: Search,
    role: 'Researchers',
    quote:
      'PDFs on space 1. Notes on space 2. Citations on space 3. One hotkey moves my whole brain at once.',
  },
  {
    icon: Briefcase,
    role: 'PMs',
    quote:
      'Meetings space pre-opens Zoom + Notes. Planning space loads Linear + the roadmap doc. Context lives in the workspace.',
  },
  {
    icon: Music,
    role: 'Musicians',
    quote:
      'Logic on space 1. Reference tracks on space 2. Lyrics on space 3. Switch sets without the studio ever closing.',
  },
];

export function BuiltFor() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-semibold text-brand-700 dark:text-brand-300 mb-3 font-mono tracking-wider uppercase">
            Made for everyone in flow
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Different work.{' '}
            <span className="text-gradient">Same calm Mac.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every craft has its own context. FocusFu gives each one its own desktop.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PERSONAS.map(({ icon: Icon, role, quote }) => (
            <figure
              key={role}
              className="relative rounded-2xl p-6 border border-panel bg-paper/60 backdrop-blur-sm hover:border-brand-500/40 hover:bg-paper/80 transition-colors group"
            >
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/15 to-accent-500/15 border border-brand-500/30 text-brand-700 dark:text-brand-300 mb-4 group-hover:rotate-3 transition-transform">
                <Icon className="h-4 w-4" />
              </div>
              <figcaption className="text-sm font-semibold mb-2">{role}</figcaption>
              <blockquote className="text-sm text-muted-foreground leading-relaxed">
                &ldquo;{quote}&rdquo;
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
