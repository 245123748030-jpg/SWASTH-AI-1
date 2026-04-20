'use client';

import { useState } from 'react';

const rules = [
  {
    title: "Don't cut nails at night",
    explanation: "Traditional belief says it brings bad luck, but scientifically, poor lighting can cause cuts.",
    advice: "Cut nails during daytime for better visibility.",
  },
  {
    title: "Don't eat late at night",
    explanation: "Ayurveda says it disrupts digestion; science shows it affects sleep and weight.",
    advice: "Finish dinner 2-3 hours before bed.",
  },
  {
    title: "Fasting on Ekadashi",
    explanation: "Spiritual cleansing; intermittent fasting benefits health.",
    advice: "Consult doctor before fasting if you have conditions.",
  },
  {
    title: "Don't touch trees at night",
    explanation: "Trees are sacred and believed to be inhabited by spirits after sunset.",
    advice: "Respect traditions and avoid touching trees in darkness.",
  },
  {
    title: "Temple visits during menstruation",
    explanation: "Some traditions advise avoiding temples during periods due to ritual purity concepts.",
    advice: "Practices vary; focus on hygiene and self-care during menstruation.",
  },
  {
    title: "No haircuts on Tuesday",
    explanation: "Tuesday is dedicated to Hanuman and Mars; haircuts may bring bad luck.",
    advice: "Regional belief; many ignore this and get haircuts when convenient.",
  },
  {
    title: "Sleep with head facing north",
    explanation: "Vastu Shastra says it disturbs energy flow and opposes Earth's magnetic field.",
    advice: "Not critical, but east/south sleeping is traditionally considered better.",
  },
  {
    title: "Applying tilak on forehead",
    explanation: "Activates Ajna chakra (third eye) for spiritual wisdom and intuition.",
    advice: "Stimulates focus through acupressure; mostly symbolic today.",
  },
  {
    title: "Keeping Tulsi at home",
    explanation: "Sacred plant that purifies environment and brings positive energy.",
    advice: "Releases oxygen at night and has medicinal benefits for health.",
  },
];

export default function DailyInsight() {
  const [rule] = useState(() => rules[Math.floor(Math.random() * rules.length)]);

  return (
    <div className="rounded-3xl border border-white/10 bg-card-bg/95 p-6 shadow-2xl shadow-black/20">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-accent/90">Insight</p>
          <h2 className="text-2xl font-bold">Indian rule of the day</h2>
        </div>
        <span className="rounded-full bg-foreground/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-foreground/70">
          Learn daily
        </span>
      </div>
      <div className="rounded-3xl border border-white/10 bg-background/95 p-5">
        <p className="text-lg font-semibold text-accent">{rule.title}</p>
        <p className="mt-4 leading-7 text-foreground/80">{rule.explanation}</p>
        <p className="mt-4 rounded-2xl bg-accent/10 p-4 text-sm text-foreground/90">{rule.advice}</p>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-6 w-full rounded-3xl bg-accent px-5 py-3 text-sm font-semibold text-background shadow-lg shadow-accent/20 hover:bg-accent/90"
      >
        Ask AI about this
      </button>
    </div>
  );
}