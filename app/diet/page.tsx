'use client';

import { useState } from 'react';

interface DietPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  calories: number;
  protein: number;
  recommendations: string[];
}

export default function DietPlanner() {
  const [form, setForm] = useState({
    age: '',
    height: '',
    weight: '',
    gender: 'male',
    goal: 'maintenance',
    disease: 'none',
    budget: '',
    dietType: 'veg',
  });
  const [plan, setPlan] = useState<DietPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBenefits = () => {
    const benefits = [
      `Following this plan helps you reach ${form.goal === 'fat loss' ? 'a leaner composition' : form.goal === 'muscle gain' ? 'stronger muscles' : 'steady energy balance'}.`,
    ];

    const diseaseBenefits: Record<string, string[]> = {
      'none': ['Supports overall health and wellness.'],
      'diabetes': ['Disease-aware food choices support steady blood sugar and reduce spikes.', 'Helps manage insulin sensitivity and glucose metabolism.'],
      'hypertension': ['Lower-sodium, whole-food meals help manage blood pressure.', 'Supports cardiovascular health and reduces hypertension risk.'],
      'thyroid': ['Balanced nutrition supports thyroid health and hormone balance.', 'Provides essential nutrients for thyroid function.'],
      'coronary artery disease': ['Heart-healthy choices reduce cardiovascular risk.', 'Supports cholesterol management and artery health.'],
      'stroke': ['Nutrient-dense foods support brain health and circulation.', 'Reduces risk factors associated with stroke.'],
      'asthma': ['Anti-inflammatory foods help manage respiratory health.', 'Supports lung function and reduces inflammation.'],
      'copd': ['Nutrient-rich foods support respiratory muscle strength.', 'Helps maintain energy levels for breathing.'],
      'obesity': ['Calorie-controlled, nutrient-dense meals support weight management.', 'Promotes sustainable fat loss and metabolic health.'],
      'metabolic syndrome': ['Balanced nutrition addresses multiple metabolic factors.', 'Supports insulin sensitivity and cardiovascular health.'],
      'depression': ['Nutrient-rich foods support brain health and mood.', 'Provides essential nutrients for neurotransmitter function.'],
      'anxiety': ['Calming nutrients help stabilize mood and reduce stress.', 'Supports nervous system health and relaxation.'],
      'cancer': ['Antioxidant-rich foods support immune function and cellular health.', 'Provides nutrients for overall wellness during treatment.'],
      'tuberculosis': ['High-quality nutrition supports immune function and healing.', 'Provides essential nutrients for recovery.'],
      'anemia': ['Iron and nutrient-rich foods support red blood cell production.', 'Helps restore energy and vitality.'],
      'pcos': ['Hormone-balancing foods support reproductive health.', 'Helps manage insulin resistance and weight.'],
      'arthritis': ['Anti-inflammatory foods reduce joint pain and stiffness.', 'Supports joint health and mobility.'],
      'chronic kidney disease': ['Kidney-friendly nutrition supports renal function.', 'Helps manage electrolytes and waste products.'],
      'fatty liver': ['Liver-supportive foods promote detoxification.', 'Helps reduce fat accumulation in the liver.'],
      'parkinsons': ['Nutrient-dense foods support neurological health.', 'Provides antioxidants for brain protection.'],
    };

    if (diseaseBenefits[form.disease]) {
      benefits.push(...diseaseBenefits[form.disease]);
    }

    return benefits;
  };

  const generatePlan = async () => {
    if (!form.age || !form.height || !form.weight || !form.budget) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/diet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error('Failed to generate diet plan');
      }
      const data = await response.json();
      setPlan(data.plan);
    } catch (error) {
      console.error(error);
      setError('Failed to generate diet plan. Please check your API key or retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <section className="rounded-[2rem] border border-white/10 bg-card-bg/95 p-8 shadow-2xl shadow-black/20">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-accent/90">Diet Planner</p>
            <h1 className="mt-3 text-4xl font-black">Build your desi plan with balanced nutrition.</h1>
          </div>
          <div className="rounded-3xl bg-background/90 p-4 text-sm text-foreground/80">
            <p className="font-semibold text-accent">Personalized to your goal</p>
            <p className="mt-2">Get meal ideas, calories, protein and disease-aware guidance using only Indian ingredients.</p>
          </div>
        </div>

        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-background/90 p-6 shadow-inner shadow-black/10">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <input
              type="number"
              placeholder="Age"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
            />
            <input
              type="number"
              placeholder="Height (cm)"
              value={form.height}
              onChange={(e) => setForm({ ...form, height: e.target.value })}
              className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
            />
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Budget per day (₹)"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
            />
            <select
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
            >
              <option value="fat loss">Fat Loss</option>
              <option value="muscle gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <select
              value={form.disease}
              onChange={(e) => setForm({ ...form, disease: e.target.value })}
              className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
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
            <select
              value={form.dietType}
              onChange={(e) => setForm({ ...form, dietType: e.target.value })}
              className="rounded-3xl border border-white/10 bg-card-bg/90 px-4 py-3 text-foreground outline-none"
            >
              <option value="veg">Vegetarian</option>
              <option value="eggetarian">Eggetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={generatePlan}
              className="rounded-3xl bg-accent px-8 py-3 font-semibold text-background shadow-lg shadow-accent/25 hover:bg-accent/90"
              disabled={loading}
            >
              {loading ? 'Creating plan…' : 'Generate Diet Plan'}
            </button>
            {error && <p className="text-sm text-red-400">{error}</p>}
          </div>
        </div>
      </section>

      {plan && (
        <section className="mt-8 rounded-[2rem] border border-white/10 bg-card-bg/95 p-8 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-accent/90">Daily plan</p>
              <h2 className="mt-2 text-3xl font-bold">Your Indian meal structure</h2>
            </div>
            <div className="rounded-3xl bg-background/90 px-4 py-3 text-sm text-foreground/80">
              <p><strong>Calories:</strong> {plan.calories}</p>
              <p><strong>Protein:</strong> {plan.protein}g</p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              { title: '🍳 Breakfast', content: plan.breakfast },
              { title: '🍛 Lunch', content: plan.lunch },
              { title: '🥗 Dinner', content: plan.dinner },
              { title: '🥜 Snacks', content: plan.snacks },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-background/95 p-5">
                <h3 className="text-xl font-semibold text-accent">{item.title}</h3>
                <p className="mt-3 leading-7 text-foreground/85">{item.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-card-bg/90 p-5">
              <h3 className="text-xl font-semibold text-accent">Benefits of following this diet</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/90">
                {getBenefits().map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-card-bg/90 p-5">
              <h3 className="text-xl font-semibold text-accent">Personalized Recommendations</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/90">
                {plan.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
