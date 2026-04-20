'use client';

import { useState } from 'react';

export default function Profile() {
  const [profile, setProfile] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('swasthProfile');
      return savedProfile ? JSON.parse(savedProfile) : {
        name: '',
        age: '',
        gender: 'male',
        height: '',
        weight: '',
        lifestyle: '',
        dietPreferences: '',
        medicalConditions: '',
        fitnessGoals: '',
        budget: '',
      };
    }
    return {
      name: '',
      age: '',
      gender: 'male',
      height: '',
      weight: '',
      lifestyle: '',
      dietPreferences: '',
      medicalConditions: '',
      fitnessGoals: '',
      budget: '',
    };
  });
  const [saved, setSaved] = useState(false);

  const saveProfile = () => {
    localStorage.setItem('swasthProfile', JSON.stringify(profile));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <section className="rounded-[2rem] border border-white/10 bg-card-bg/95 p-8 shadow-2xl shadow-black/20">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-accent/90">Profile</p>
            <h1 className="mt-3 text-4xl font-black">Your preferences, saved locally.</h1>
          </div>
          <p className="max-w-xl rounded-3xl bg-background/90 px-5 py-4 text-foreground/80">
            Save your age, lifestyle, and diet choices to make plans feel more personalized each time you visit.
          </p>
        </div>

        <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-background/90 p-6 shadow-inner shadow-black/10 md:grid-cols-2">
          <input
            type="text"
            placeholder="Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
          />
          <input
            type="number"
            placeholder="Age"
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
            className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
          />
          <select
            value={profile.gender}
            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
            className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="number"
            placeholder="Height (cm)"
            value={profile.height}
            onChange={(e) => setProfile({ ...profile, height: e.target.value })}
            className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={profile.weight}
            onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
            className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
          />
          <input
            type="number"
            placeholder="Daily Budget (₹)"
            value={profile.budget}
            onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
            className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
          />
          <input
            type="text"
            placeholder="Lifestyle (e.g., active, sedentary)"
            value={profile.lifestyle}
            onChange={(e) => setProfile({ ...profile, lifestyle: e.target.value })}
            className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
          />
          <input
            type="text"
            placeholder="Diet Preferences (veg/non-veg/eggetarian)"
            value={profile.dietPreferences}
            onChange={(e) => setProfile({ ...profile, dietPreferences: e.target.value })}
            className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
          />
          <input
            type="text"
            placeholder="Medical Conditions (if any)"
            value={profile.medicalConditions}
            onChange={(e) => setProfile({ ...profile, medicalConditions: e.target.value })}
            className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
          />
          <input
            type="text"
            placeholder="Fitness Goals (fat loss/muscle gain/maintenance)"
            value={profile.fitnessGoals}
            onChange={(e) => setProfile({ ...profile, fitnessGoals: e.target.value })}
            className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
          />
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={saveProfile}
            className="rounded-3xl bg-accent px-8 py-3 font-semibold text-background shadow-lg shadow-accent/25 hover:bg-accent/90"
          >
            Save Profile
          </button>
          {saved && <span className="rounded-full bg-green-500/15 px-4 py-2 text-sm text-green-200">Saved successfully!</span>}
        </div>
      </section>
    </div>
  );
}