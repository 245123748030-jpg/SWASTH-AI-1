import { NextRequest, NextResponse } from 'next/server';

interface WorkoutPlan {
  exercises: string[];
  benefits: string[];
  risks: string[];
  summary: string;
  recommendations: string[];
}

const baseWorkouts: Record<string, Record<string, string[]>> = {
  '15': {
    beginner: ['Warm-up brisk walk x 5 min', 'Bodyweight squats x 12-15', 'Knee pushups x 8-10', 'Plank x 20-30s', 'Stretch hamstrings and shoulders x 5 min'],
    intermediate: ['Warm-up dynamic stretches x 3 min', 'Jump squats x 10', 'Pushups x 10-12', 'Plank x 45s', 'Burpees x 5', 'Cool down stretches x 5 min'],
    advanced: ['Warm-up high knees x 2 min', 'Pistol squats x 6/side', 'Diamond pushups x 10', 'Plank with shoulder taps x 30s', 'Mountain climbers x 20', 'Cool down yoga x 5 min'],
  },
  '30': {
    beginner: ['Warm-up walk x 5 min', 'Bodyweight squats x 15', 'Wall pushups x 12', 'Plank x 30s', 'Calf raises x 20', 'Light walk x 10 min'],
    intermediate: ['Warm-up arm circles x 3 min', 'Lunges x 10/leg', 'Pushups x 12', 'Plank x 45s', 'Glute bridges x 15', 'Brisk walk x 15 min'],
    advanced: ['Warm-up burpees x 5', 'Bulgarian split squats x 8/leg', 'Decline pushups x 12', 'Russian twists x 20', 'Box jumps x 10', 'Sprint intervals x 10 min'],
  },
  '60': {
    beginner: ['Warm-up march in place x 5 min', 'Circuit: squats, pushups, plank x 3 rounds', 'Light cardio walk x 20 min', 'Core work: crunches x 15', 'Stretching x 10 min'],
    intermediate: ['Dynamic warm-up x 8 min', 'Strength circuit x 3 rounds', 'Cardio intervals x 20 min', 'Core circuit x 10 min', 'Flexibility work x 10 min'],
    advanced: ['High-intensity warm-up x 5 min', 'Heavy compound lifts x 4 sets', 'HIIT cardio x 25 min', 'Advanced core work x 15 min', 'Recovery stretches x 10 min'],
  },
};

function getFitnessLevel(age: number, goal: string, disease: string): string {
  if (age > 60 || ['stroke', 'copd', 'parkinsons', 'chronic kidney disease'].includes(disease.toLowerCase())) {
    return 'beginner';
  }
  if (goal === 'muscle gain' || age < 30) {
    return 'advanced';
  }
  return 'intermediate';
}

function getDiseaseModifiers(disease: string, _gender: string): { append: string[]; benefits: string[]; risks: string[]; restrictions: string[] } {
  const modifiers: Record<string, { append: string[]; benefits: string[]; risks: string[]; restrictions: string[] }> = {
    'none': {
      append: ['Stay hydrated and maintain proper form.', 'Include rest days for recovery.'],
      benefits: ['Boosts energy, strength, and mood.', 'Supports metabolism and healthy weight.'],
      risks: ['Skipping routine may slow progress and reduce endurance.'],
      restrictions: [],
    },
    'diabetes': {
      append: ['Monitor blood sugar before/after exercise.', 'Include post-workout protein snack.', 'Walk 10 minutes after meals.'],
      benefits: ['Helps manage blood sugar and insulin sensitivity.', 'Lowers diabetes-related cardiovascular risk.'],
      risks: ['Hypoglycemia risk - always carry glucose.', 'Overexertion may spike blood sugar.'],
      restrictions: ['Avoid extreme intensity without medical clearance.'],
    },
    'hypertension': {
      append: ['Avoid heavy lifting; focus on moderate cardio.', 'Include breathing exercises.', 'Monitor blood pressure regularly.'],
      benefits: ['Improves circulation and lowers blood pressure.', 'Reduces stress and supports heart health.'],
      risks: ['High-intensity strain can dangerously elevate blood pressure.', 'Dehydration worsens hypertension.'],
      restrictions: ['No isometric holds over 10 seconds.', 'Limit weight training intensity.'],
    },
    'thyroid': {
      append: ['Include strength training for metabolism boost.', 'Moderate intensity to avoid fatigue.', 'Warm-up thoroughly.'],
      benefits: ['Boosts metabolic function and reduces fatigue.', 'Supports healthy hormone balance.'],
      risks: ['Overtraining increases fatigue and stress.', 'Cold weather affects thyroid function.'],
      restrictions: ['Avoid extreme temperatures during exercise.'],
    },
    'coronary artery disease': {
      append: ['Focus on cardiac rehabilitation protocols.', 'Include supervised exercise when possible.', 'Monitor heart rate zones.'],
      benefits: ['Improves heart function and circulation.', 'Reduces cardiac risk factors.'],
      risks: ['Overexertion can trigger cardiac events.', 'Poor form may strain heart.'],
      restrictions: ['Always consult cardiologist before starting.', 'Avoid high-intensity intervals.'],
    },
    'stroke': {
      append: ['Focus on balance and coordination exercises.', 'Include gentle strength training.', 'Practice fall prevention.'],
      benefits: ['Improves mobility and reduces fall risk.', 'Supports neurological recovery.'],
      risks: ['Balance issues increase injury risk.', 'Overexertion may cause fatigue.'],
      restrictions: ['Always exercise with supervision.', 'Avoid exercises requiring perfect balance.'],
    },
    'asthma': {
      append: ['Exercise in warm, humid environments.', 'Use rescue inhaler if needed.', 'Include breathing techniques.'],
      benefits: ['Improves lung capacity and respiratory strength.', 'Reduces asthma attacks frequency.'],
      risks: ['Cold air can trigger bronchospasm.', 'Poor air quality worsens symptoms.'],
      restrictions: ['Avoid exercising in cold/dry air.', 'Stop if breathing becomes difficult.'],
    },
    'copd': {
      append: ['Use pursed-lip breathing during exercise.', 'Take frequent breaks.', 'Exercise in cool environments.'],
      benefits: ['Improves breathing efficiency and endurance.', 'Strengthens respiratory muscles.'],
      risks: ['Overexertion causes severe shortness of breath.', 'Heat worsens breathing difficulty.'],
      restrictions: ['Stop immediately if dizzy or short of breath.', 'Avoid hot/humid environments.'],
    },
    'obesity': {
      append: ['Start with low-impact activities.', 'Focus on consistency over intensity.', 'Include enjoyable activities.'],
      benefits: ['Supports sustainable weight loss.', 'Improves joint health and mobility.'],
      risks: ['Joint stress from high-impact activities.', 'Overexertion leads to injury.'],
      restrictions: ['Avoid high-impact exercises initially.', 'Limit duration if experiencing pain.'],
    },
    'metabolic syndrome': {
      append: ['Combine cardio and strength training.', 'Focus on insulin sensitivity.', 'Include flexibility work.'],
      benefits: ['Improves metabolic markers and insulin sensitivity.', 'Supports weight management.'],
      risks: ['Blood sugar fluctuations during exercise.', 'Cardiovascular strain.'],
      restrictions: ['Monitor blood sugar during sessions.', 'Avoid extreme intensity.'],
    },
    'depression': {
      append: ['Include mood-boosting outdoor activities.', 'Exercise with others when possible.', 'Practice mindfulness during workouts.'],
      benefits: ['Releases endorphins and improves mood.', 'Reduces anxiety and stress.'],
      risks: ['Low motivation may lead to inconsistent routine.', 'Overtraining can worsen fatigue.'],
      restrictions: ['Start with gentle activities.', 'Stop if exercise increases negative feelings.'],
    },
    'anxiety': {
      append: ['Include calming activities like yoga.', 'Practice deep breathing.', 'Exercise in familiar environments.'],
      benefits: ['Reduces anxiety symptoms and stress.', 'Improves sleep quality.'],
      risks: ['High-intensity exercise may increase anxiety.', 'Group settings can be overwhelming.'],
      restrictions: ['Avoid competitive environments.', 'Start with low-intensity activities.'],
    },
    'cancer': {
      append: ['Focus on gentle, restorative exercises.', 'Include immune-boosting activities.', 'Listen to body signals.'],
      benefits: ['Supports immune function and recovery.', 'Reduces treatment side effects.'],
      risks: ['Fatigue and low immunity increase infection risk.', 'Overexertion delays healing.'],
      restrictions: ['Consult oncologist before starting.', 'Avoid if experiencing severe fatigue.'],
    },
    'tuberculosis': {
      append: ['Focus on gentle respiratory exercises.', 'Include immune-supporting activities.', 'Rest when needed.'],
      benefits: ['Supports lung recovery and immune function.', 'Maintains muscle mass during treatment.'],
      risks: ['Overexertion weakens immune system.', 'Poor recovery affects healing.'],
      restrictions: ['Exercise only under medical supervision.', 'Stop if experiencing fever.'],
    },
    'anemia': {
      append: ['Include iron-rich post-workout nutrition.', 'Start slowly to avoid fatigue.', 'Monitor energy levels.'],
      benefits: ['Improves circulation and oxygen delivery.', 'Supports red blood cell production.'],
      risks: ['Fatigue may worsen with intense exercise.', 'Low energy affects performance.'],
      restrictions: ['Avoid high-intensity activities.', 'Stop if feeling excessively tired.'],
    },
    'pcos': {
      append: ['Include strength training for hormone balance.', 'Focus on stress reduction.', 'Maintain consistent routine.'],
      benefits: ['Supports hormone balance and weight management.', 'Improves insulin sensitivity.'],
      risks: ['Irregular periods may affect energy levels.', 'Stress can worsen symptoms.'],
      restrictions: ['Avoid extreme calorie restriction.', 'Monitor for unusual symptoms.'],
    },
    'arthritis': {
      append: ['Include joint-friendly low-impact exercises.', 'Warm-up thoroughly.', 'Use proper form to avoid strain.'],
      benefits: ['Reduces joint pain and improves mobility.', 'Strengthens muscles around joints.'],
      risks: ['Joint stress can increase pain and inflammation.', 'Overuse leads to flare-ups.'],
      restrictions: ['Avoid high-impact activities.', 'Stop if joints become painful.'],
    },
    'chronic kidney disease': {
      append: ['Monitor fluid intake carefully.', 'Include gentle cardio.', 'Focus on overall wellness.'],
      benefits: ['Supports cardiovascular health.', 'Maintains muscle mass and strength.'],
      risks: ['Dehydration affects kidney function.', 'Overexertion strains kidneys.'],
      restrictions: ['Avoid extreme temperatures.', 'Monitor blood pressure during exercise.'],
    },
    'fatty liver': {
      append: ['Include moderate cardio for fat reduction.', 'Combine with healthy nutrition.', 'Monitor liver function.'],
      benefits: ['Supports fat loss from liver.', 'Improves metabolic health.'],
      risks: ['Overexertion may stress liver.', 'Poor nutrition negates benefits.'],
      restrictions: ['Avoid alcohol during exercise period.', 'Consult hepatologist.'],
    },
    'parkinsons': {
      append: ['Include balance and coordination exercises.', 'Practice gait training.', 'Exercise with music for rhythm.'],
      benefits: ['Improves mobility and balance.', 'Slows symptom progression.'],
      risks: ['Balance issues increase fall risk.', 'Freezing episodes during exercise.'],
      restrictions: ['Always exercise with supervision.', 'Avoid exercises requiring quick movements.'],
    },
  };

  return modifiers[disease.toLowerCase()] || modifiers.none;
}

function getPersonalizedRecommendations(age: number, height: number, weight: number, goal: string, disease: string, gender: string, time: string, preference: string): string[] {
  const recommendations = [];

  // Age-based recommendations
  if (age < 30) {
    recommendations.push("Focus on building strength and flexibility for long-term health.");
  } else if (age < 50) {
    recommendations.push("Maintain muscle mass and cardiovascular fitness.");
  } else {
    recommendations.push("Prioritize balance, flexibility, and joint health.");
  }

  // Gender-based recommendations
  if (gender === 'female') {
    recommendations.push("Include strength training to support bone density, especially post-menopause.");
    if (age > 45) {
      recommendations.push("Focus on weight-bearing exercises for osteoporosis prevention.");
    }
  } else if (gender === 'male') {
    recommendations.push("Include compound movements for testosterone optimization.");
  }

  // Goal-based recommendations
  if (goal === 'fat loss') {
    recommendations.push("Combine cardio and strength training for optimal fat loss.");
    recommendations.push("Include HIIT sessions 2-3 times per week.");
  } else if (goal === 'muscle gain') {
    recommendations.push("Focus on progressive overload and adequate protein intake.");
    recommendations.push("Include compound lifts and proper recovery.");
  } else {
    recommendations.push("Maintain moderate activity levels for overall health.");
  }

  // Time-based recommendations
  if (time === '15') {
    recommendations.push("Make every minute count with high-intensity exercises.");
  } else if (time === '30') {
    recommendations.push("Balance strength and cardio in your session.");
  } else {
    recommendations.push("Include full warm-up, workout, and cool-down phases.");
  }

  // Preference-based recommendations
  if (preference === 'home') {
    recommendations.push("Use bodyweight exercises and minimal equipment.");
    recommendations.push("Create a dedicated workout space for consistency.");
  } else {
    recommendations.push("Utilize gym equipment for progressive training.");
    recommendations.push("Consider working with a trainer for proper form.");
  }

  // Disease-specific recommendations
  const diseaseRecs: Record<string, string[]> = {
    'diabetes': [
      "Exercise regularly to improve insulin sensitivity.",
      "Monitor blood sugar and adjust intensity accordingly.",
      "Include both aerobic and resistance training."
    ],
    'hypertension': [
      "Focus on moderate-intensity aerobic exercise.",
      "Include dynamic resistance training.",
      "Practice stress-reduction techniques."
    ],
    'thyroid': [
      "Exercise consistently to support metabolism.",
      "Include both cardio and strength components.",
      "Monitor energy levels and adjust intensity."
    ],
    'coronary artery disease': [
      "Follow cardiac rehabilitation guidelines.",
      "Include supervised exercise programs.",
      "Monitor heart rate and symptoms closely."
    ],
    'stroke': [
      "Focus on balance and coordination improvement.",
      "Include task-specific training for daily activities.",
      "Work with physical therapist for guidance."
    ],
    'asthma': [
      "Choose activities that can be stopped quickly if needed.",
      "Exercise in controlled environments.",
      "Use proper breathing techniques."
    ],
    'copd': [
      "Focus on breathing efficiency and endurance.",
      "Include upper body exercises for respiratory muscles.",
      "Exercise at times when symptoms are minimal."
    ],
    'obesity': [
      "Start with low-impact activities and gradually increase.",
      "Focus on consistency rather than intensity.",
      "Combine exercise with sustainable nutrition changes."
    ],
    'metabolic syndrome': [
      "Include both aerobic and resistance exercises.",
      "Focus on improving insulin sensitivity.",
      "Monitor multiple health markers regularly."
    ],
    'depression': [
      "Choose enjoyable activities to maintain motivation.",
      "Exercise outdoors when possible for vitamin D.",
      "Consider group activities for social support."
    ],
    'anxiety': [
      "Include mind-body exercises like yoga or tai chi.",
      "Exercise in familiar, comfortable environments.",
      "Focus on breathing and relaxation techniques."
    ],
    'cancer': [
      "Listen to your body and adjust intensity as needed.",
      "Include gentle exercises during treatment.",
      "Focus on maintaining function and quality of life."
    ],
    'tuberculosis': [
      "Include gentle exercises to maintain strength.",
      "Focus on respiratory health and immune support.",
      "Exercise only when feeling well."
    ],
    'anemia': [
      "Start with low-intensity activities.",
      "Include iron-rich nutrition with workouts.",
      "Monitor for signs of fatigue or dizziness."
    ],
    'pcos': [
      "Include exercises that support hormone balance.",
      "Focus on stress reduction and weight management.",
      "Maintain consistent exercise routine."
    ],
    'arthritis': [
      "Choose low-impact activities that don't stress joints.",
      "Include range-of-motion and flexibility exercises.",
      "Use proper warm-up and cool-down routines."
    ],
    'chronic kidney disease': [
      "Exercise under medical supervision.",
      "Focus on cardiovascular health and muscle maintenance.",
      "Monitor fluid and electrolyte balance."
    ],
    'fatty liver': [
      "Include moderate aerobic exercise.",
      "Combine with healthy lifestyle changes.",
      "Monitor liver function tests regularly."
    ],
    'parkinsons': [
      "Include exercises that improve balance and gait.",
      "Practice activities of daily living.",
      "Consider working with movement disorder specialist."
    ],
  };

  if (disease !== 'none' && diseaseRecs[disease.toLowerCase()]) {
    recommendations.push(...diseaseRecs[disease.toLowerCase()]);
  }

  return recommendations.slice(0, 6); // Limit to 6 key recommendations
}

function buildWorkoutPlan(age: number, height: number, weight: number, goal: string, disease: string, time: string, preference: string, gender: string): WorkoutPlan {
  const fitnessLevel = getFitnessLevel(age, goal, disease);
  const baseWorkout = baseWorkouts[time]?.[fitnessLevel] || baseWorkouts['30'].intermediate;

  const diseaseInfo = getDiseaseModifiers(disease, gender);

  // Adjust exercises based on preference
  let adjustedExercises = [...baseWorkout];
  if (preference === 'home') {
    adjustedExercises = adjustedExercises.map(ex => ex.replace(/gym|machine|weights/gi, 'bodyweight'));
  } else {
    adjustedExercises = adjustedExercises.map(ex => ex.replace(/bodyweight/gi, 'with weights'));
  }

  // Add disease-specific modifications
  adjustedExercises = [...adjustedExercises, ...diseaseInfo.append];

  const benefits = [
    `Supports ${goal === 'fat loss' ? 'fat loss through increased metabolism' : goal === 'muscle gain' ? 'muscle development and strength' : 'overall fitness and health'}.`,
    ...diseaseInfo.benefits,
  ];

  const summary = `A ${time}-minute ${goal} routine for ${fitnessLevel} level, adapted for ${disease === 'none' ? 'general wellness' : disease} and ${preference} training.`;

  const recommendations = getPersonalizedRecommendations(age, height, weight, goal, disease, gender, time, preference);

  return {
    exercises: adjustedExercises,
    benefits,
    risks: diseaseInfo.risks,
    summary,
    recommendations,
  };
}

export async function POST(request: NextRequest) {
  const { age, height, weight, goal, disease, time, preference, gender } = await request.json();

  const parsedAge = Number(age);
  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);

  if (Number.isNaN(parsedAge) || Number.isNaN(parsedHeight) || Number.isNaN(parsedWeight)) {
    return NextResponse.json({ error: 'Invalid numeric fields provided' }, { status: 400 });
  }

  if (!gender || !['male', 'female', 'other'].includes(gender.toLowerCase())) {
    return NextResponse.json({ error: 'Valid gender (male/female/other) is required' }, { status: 400 });
  }

  const plan = buildWorkoutPlan(parsedAge, parsedHeight, parsedWeight, goal, disease, time, preference, gender.toLowerCase());
  return NextResponse.json({ plan });
}