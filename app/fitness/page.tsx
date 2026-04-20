'use client';

import { useState } from 'react';

interface Workout {
  exercises: string[];
  benefits: string[];
  risks: string[];
  summary: string;
  recommendations: string[];
}

export default function FitnessPlanner() {
  const [form, setForm] = useState({
    age: '',
    height: '',
    weight: '',
    gender: 'male',
    time: '15',
    goal: 'maintenance',
    disease: 'none',
    preference: 'home',
  });
  const [workout, setWorkout] = useState<Workout | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateWorkout = async () => {
    if (!form.age || !form.height || !form.weight) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/fitness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error('Failed to generate workout plan');
      }
      const data = await response.json();
      setWorkout(data.plan);
    } catch (error) {
      console.error(error);
      setError('Failed to generate workout plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <section className="rounded-[2rem] border border-white/10 bg-card-bg/95 p-8 shadow-2xl shadow-black/20">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-accent/90">Fitness</p>
            <h1 className="mt-3 text-4xl font-black">Workouts built around you.</h1>
          </div>
          <p className="max-w-xl rounded-3xl bg-background/90 px-5 py-4 text-foreground/80">
            Choose your goal, time, and health profile. Get a practical workout that supports fitness and manages risk.
          </p>
        </div>

        <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-background/90 p-6 shadow-inner shadow-black/10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-foreground/80">Age</label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
              placeholder="Age"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground/80">Height (cm)</label>
            <input
              type="number"
              value={form.height}
              onChange={(e) => setForm({ ...form, height: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
              placeholder="Height"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground/80">Weight (kg)</label>
            <input
              type="number"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
              placeholder="Weight"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground/80">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground/80">Available time</label>
            <select
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground/80">Goal</label>
            <select
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
            >
              <option value="fat loss">Fat Loss</option>
              <option value="muscle gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground/80">Medical condition</label>
            <select
              value={form.disease}
              onChange={(e) => setForm({ ...form, disease: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
            >
              <option value="none">No Medical Conditions</option>
              <option value="diabetes">Diabetes Mellitus</option>
              <option value="hypertension">Hypertension</option>
              <option value="thyroid">Thyroid Disorders</option>
              <option value="coronary artery disease">Coronary Artery Disease</option>
              <option value="stroke">Stroke</option>
              <option value="asthma">Asthma</option>
              <option value="copd">Chronic Obstructive Pulmonary Disease</option>
              <option value="obesity">Obesity</option>
              <option value="metabolic syndrome">Metabolic Syndrome</option>
              <option value="depression">Depression</option>
              <option value="anxiety">Anxiety Disorder</option>
              <option value="cancer">Cancer</option>
              <option value="tuberculosis">Tuberculosis</option>
              <option value="anemia">Anemia</option>
              <option value="pcos">Polycystic Ovary Syndrome</option>
              <option value="arthritis">Arthritis</option>
              <option value="chronic kidney disease">Chronic Kidney Disease</option>
              <option value="fatty liver">Fatty Liver Disease</option>
              <option value="parkinsons">Parkinson&apos;s Disease</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground/80">Training preference</label>
            <select
              value={form.preference}
              onChange={(e) => setForm({ ...form, preference: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
            >
              <option value="home">Home</option>
              <option value="gym">Gym</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={generateWorkout}
            className="rounded-3xl bg-accent px-8 py-3 font-semibold text-background shadow-lg shadow-accent/25 hover:bg-accent/90"
            disabled={loading}
          >
            {loading ? 'Creating plan…' : 'Generate Routine'}
          </button>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>

        {workout && (
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-background/95 p-6 shadow-xl shadow-black/10">
            <h2 className="text-3xl font-bold text-accent">Your customized workout</h2>
            <p className="mt-3 text-foreground/70">{workout.summary}</p>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-card-bg/90 p-5">
                <h3 className="text-xl font-semibold">Exercises</h3>
                <ul className="mt-4 space-y-3 text-foreground/90">
                  {workout.exercises.map((exercise, idx) => (
                    <li key={idx} className="rounded-2xl bg-background/80 px-4 py-3">{exercise}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4 rounded-3xl border border-white/10 bg-card-bg/90 p-5">
                <div>
                  <h3 className="text-xl font-semibold">Benefits of following this plan</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/90">
                    {workout.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Personalized Recommendations</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/90">
                    {workout.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
