import Chat from '../components/Chat';
import DailyInsight from '../components/DailyInsight';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <section className="mb-10 rounded-3xl border border-white/10 bg-card-bg/90 p-8 shadow-2xl shadow-black/20 backdrop-blur-lg">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-6">
            <p className="inline-flex rounded-full bg-accent/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Indian lifestyle intelligence
            </p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              SwasthAI helps you understand tradition, science, and healthy daily habits.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-foreground/80">
              Ask questions about Indian rules, get a personalized desi diet plan, and build a simple fitness routine with clean, premium design.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {['Tradition', 'Science', 'Wellness'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-background/80 p-4 text-center">
                  <p className="font-semibold text-accent">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-background/80 p-6 shadow-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-foreground/60">Daily Insight</p>
            <h2 className="mt-3 text-2xl font-bold">Better choices with balanced context</h2>
            <p className="mt-4 text-foreground/80">
              Start with a rule of the day, then ask AI for traditional explanation, scientific reasoning, and practical advice in one place.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Chat />
        <DailyInsight />
      </div>
    </div>
  );
}
