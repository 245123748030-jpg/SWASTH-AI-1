import { NextRequest, NextResponse } from 'next/server';

const meals = {
  veg: {
    breakfast: [
      'Besan chilla with mint chutney and masala chai',
      'Vegetable upma with a bowl of curd',
      'Oats idli with coconut chutney and fresh fruit',
    ],
    lunch: [
      'Mixed dal, brown rice, roasted cauliflower and cucumber salad',
      'Chapati, palak paneer, salad and low-fat raita',
      'Quinoa pulao with rajma and roasted vegetables',
    ],
    dinner: [
      'Palak dal with millet roti and steamed greens',
      'Paneer tikka, mixed vegetable sabzi and chapati',
      'Lauki chana dal with jowar roti and cucumber raita',
    ],
    snacks: [
      'Roasted chana and a small apple',
      'Masala peanuts with mint tea',
      'Sprout salad with tomatoes and onions',
    ],
  },
  eggetarian: {
    breakfast: [
      'Vegetable omelette with multigrain toast',
      'Egg bhurji with brown bread and fruit',
      'Poha with boiled egg and coriander',
    ],
    lunch: [
      'Egg curry with chapati and mixed salad',
      'Lemon rice with boiled egg and cucumber raita',
      'Chickpea salad with boiled egg and dahi',
    ],
    dinner: [
      'Egg curry with spinach and millet roti',
      'Paneer salad with boiled egg and steamed vegetables',
      'Mixed vegetable curry with egg roti',
    ],
    snacks: [
      'Boiled egg with chaat masala',
      'Carrot sticks and hummus',
      'Roasted makhana with spices',
    ],
  },
  'non-veg': {
    breakfast: [
      'Masala omelette with toasted bread',
      'Egg and vegetable upma',
      'Paneer paratha with boiled egg',
    ],
    lunch: [
      'Grilled chicken salad with brown rice',
      'Fish curry with steamed rice and spinach',
      'Chicken dal with chapati and cabbage salad',
    ],
    dinner: [
      'Tandoori chicken with mixed vegetables and roti',
      'Egg curry with stir-fried greens and millet roti',
      'Grilled fish with lentil soup and salad',
    ],
    snacks: [
      'Chana chaat with diced tomatoes',
      'Boiled egg with black pepper',
      'Roasted seeds mix with green tea',
    ],
  },
};

function chooseMeal(options: string[], seed: number) {
  return options[seed % options.length];
}

function getCalorieTarget(weight: number, goal: string) {
  const base = 24 * weight;
  if (goal === 'fat loss') return Math.round(base - 400);
  if (goal === 'muscle gain') return Math.round(base + 300);
  return Math.round(base);
}

function getProteinTarget(weight: number, goal: string) {
  const base = goal === 'muscle gain' ? 1.8 : goal === 'fat loss' ? 1.5 : 1.3;
  return Math.round(base * weight);
}

function diseaseModifier(text: string, disease: string, gender: string) {
  const modifiers: Record<string, (text: string, gender: string) => string> = {
    'none': (text) => text,
    'diabetes': (text) => text.replace(/rice/gi, 'brown rice or quinoa').replace(/sugar/gi, 'stevia or monk fruit').replace(/fruit/gi, 'low-GI fruits like berries, apples, pears').replace(/potato/gi, 'sweet potato in moderation'),
    'hypertension': (text) => text.replace(/salt/gi, 'minimal salt or herbs').replace(/sambar/gi, 'sambar with less salt').replace(/pickle/gi, 'homemade low-sodium pickle').replace(/processed/gi, 'fresh ingredients'),
    'thyroid': (text) => text.replace(/soy/gi, 'moderate soy').replace(/cabbage|broccoli/gi, 'cooked cruciferous vegetables').replace(/iodine/gi, 'iodine-rich foods like seaweed'),
    'coronary artery disease': (text) => text.replace(/fat/gi, 'healthy fats like olive oil, nuts').replace(/red meat/gi, 'lean proteins').replace(/fried/gi, 'baked or grilled'),
    'stroke': (text) => text.replace(/salt/gi, 'very low sodium').replace(/alcohol/gi, 'no alcohol').replace(/smoking/gi, 'smoke-free lifestyle'),
    'asthma': (text) => text.replace(/allergens/gi, 'anti-inflammatory foods').replace(/processed/gi, 'whole foods'),
    'copd': (text) => text.replace(/heavy/gi, 'light, easy-to-digest meals').replace(/carbonated/gi, 'still water'),
    'obesity': (text) => text.replace(/calories/gi, 'calorie-controlled portions').replace(/snacks/gi, 'healthy, low-calorie snacks'),
    'metabolic syndrome': (text) => text.replace(/sugar/gi, 'no added sugars').replace(/carbs/gi, 'complex carbs').replace(/fat/gi, 'healthy fats'),
    'depression': (text) => text.replace(/omega-3/gi, 'fatty fish, walnuts').replace(/vitamin d/gi, 'sun exposure, fortified foods'),
    'anxiety': (text) => text.replace(/caffeine/gi, 'limited caffeine').replace(/magnesium/gi, 'leafy greens, nuts'),
    'cancer': (text) => text.replace(/processed/gi, 'organic, whole foods').replace(/alcohol/gi, 'no alcohol').replace(/red meat/gi, 'plant-based proteins'),
    'tuberculosis': (text) => text.replace(/protein/gi, 'high-quality proteins').replace(/vitamins/gi, 'vitamin-rich foods'),
    'anemia': (text) => text.replace(/iron/gi, 'iron-rich foods like spinach, lentils').replace(/vitamin c/gi, 'citrus fruits with iron-rich foods'),
    'pcos': (text, gender) => gender === 'female' ? text.replace(/sugar/gi, 'low sugar').replace(/carbs/gi, 'complex carbs').replace(/insulin/gi, 'insulin-friendly foods') : text,
    'arthritis': (text) => text.replace(/inflammation/gi, 'anti-inflammatory foods like turmeric, ginger').replace(/nightshades/gi, 'limited nightshades'),
    'chronic kidney disease': (text) => text.replace(/potassium/gi, 'low-potassium alternatives').replace(/phosphorus/gi, 'low-phosphorus foods').replace(/protein/gi, 'moderate protein'),
    'fatty liver': (text) => text.replace(/sugar/gi, 'no sugar').replace(/alcohol/gi, 'no alcohol').replace(/fat/gi, 'healthy fats in moderation'),
    'parkinsons': (text) => text.replace(/antioxidants/gi, 'antioxidant-rich foods').replace(/protein/gi, 'timed protein intake'),
  };

  const modifier = modifiers[disease.toLowerCase()] || modifiers.none;
  return modifier(text, gender);
}

function budgetModifier(text: string, budget: number) {
  if (budget < 150) {
    return text.replace(/grilled|paneer|quinoa|fish|chicken/gi, (match) => {
      const swap: Record<string, string> = {
        grilled: 'simple',
        paneer: 'tofu-like paneer',
        quinoa: 'brown rice',
        fish: 'vegetable',
        chicken: 'soy/egg',
      };
      return swap[match.toLowerCase()] || match;
    });
  }
  if (budget > 300) {
    return text + ' with a nutrient-rich side dish';
  }
  return text;
}

function buildDietPlan(age: number, height: number, weight: number, goal: string, disease: string, budget: number, dietType: string, gender: string) {
  const seed = Math.floor((age + height + weight + budget) / 10);
  const menu = meals[dietType as keyof typeof meals] || meals.veg;
  const breakfast = diseaseModifier(budgetModifier(chooseMeal(menu.breakfast, seed), budget), disease, gender);
  const lunch = diseaseModifier(budgetModifier(chooseMeal(menu.lunch, seed + 1), budget), disease, gender);
  const dinner = diseaseModifier(budgetModifier(chooseMeal(menu.dinner, seed + 2), budget), disease, gender);
  const snacks = diseaseModifier(budgetModifier(chooseMeal(menu.snacks, seed + 3), budget), disease, gender);

  // Adjust calories and protein based on gender
  let calorieAdjustment = 0;
  let proteinAdjustment = 0;
  if (gender === 'male') {
    calorieAdjustment = goal === 'muscle gain' ? 200 : 0;
    proteinAdjustment = 0.2;
  } else if (gender === 'female') {
    calorieAdjustment = goal === 'fat loss' ? -100 : 0;
    proteinAdjustment = -0.1;
  }

  const baseCalories = getCalorieTarget(weight, goal);
  const baseProtein = getProteinTarget(weight, goal);

  return {
    breakfast,
    lunch,
    dinner,
    snacks,
    calories: Math.round(baseCalories + calorieAdjustment),
    protein: Math.round(baseProtein * (1 + proteinAdjustment)),
    recommendations: getPersonalizedRecommendations(age, height, weight, goal, disease, gender, dietType),
  };
}

function getPersonalizedRecommendations(age: number, height: number, weight: number, goal: string, disease: string, gender: string, dietType: string) {
  const recommendations = [];

  // Age-based recommendations
  if (age < 30) {
    recommendations.push("Focus on nutrient-dense foods to support growth and metabolism.");
  } else if (age < 50) {
    recommendations.push("Maintain balanced macronutrients for energy and productivity.");
  } else {
    recommendations.push("Prioritize calcium, vitamin D, and fiber for bone health and digestion.");
  }

  // Gender-based recommendations
  if (gender === 'female') {
    recommendations.push("Ensure adequate iron intake, especially if menstruating. Include leafy greens and lean proteins.");
    if (age > 45) {
      recommendations.push("Consider calcium-rich foods for bone health during menopause.");
    }
  } else if (gender === 'male') {
    recommendations.push("Focus on zinc-rich foods for prostate health and testosterone support.");
  }

  // Goal-based recommendations
  if (goal === 'fat loss') {
    recommendations.push("Create a moderate calorie deficit while maintaining protein intake.");
    recommendations.push("Include fiber-rich foods to promote satiety and gut health.");
  } else if (goal === 'muscle gain') {
    recommendations.push("Consume adequate protein and calories for muscle synthesis.");
    recommendations.push("Include complex carbohydrates for sustained energy during workouts.");
  } else {
    recommendations.push("Maintain balanced nutrition to support overall health and energy levels.");
  }

  // Disease-specific recommendations
  const diseaseRecommendations: Record<string, string[]> = {
    'diabetes': [
      "Monitor carbohydrate intake and focus on low-GI foods.",
      "Include cinnamon and fenugreek for natural blood sugar support.",
      "Stay hydrated and eat regular, balanced meals."
    ],
    'hypertension': [
      "Reduce sodium intake and increase potassium-rich foods like bananas and spinach.",
      "Include garlic, beetroot, and hibiscus tea for blood pressure support.",
      "Limit caffeine and maintain a healthy weight."
    ],
    'thyroid': [
      "Include iodine-rich foods like iodized salt, seaweed, and fish.",
      "Avoid goitrogenic foods in excess; cook cruciferous vegetables.",
      "Ensure selenium intake from Brazil nuts and whole grains."
    ],
    'coronary artery disease': [
      "Focus on heart-healthy fats from avocados, nuts, and olive oil.",
      "Include omega-3 rich foods like fatty fish, flaxseeds, and walnuts.",
      "Limit saturated fats and trans fats."
    ],
    'stroke': [
      "Maintain healthy blood pressure through DASH diet principles.",
      "Include antioxidants from colorful fruits and vegetables.",
      "Stay well-hydrated and limit alcohol consumption."
    ],
    'asthma': [
      "Include anti-inflammatory foods like turmeric, ginger, and fatty fish.",
      "Ensure adequate vitamin D from sunlight and fortified foods.",
      "Avoid food triggers and maintain a healthy weight."
    ],
    'copd': [
      "Focus on nutrient-dense, easy-to-chew foods.",
      "Include antioxidants and maintain adequate calorie intake.",
      "Stay hydrated and consider smaller, frequent meals."
    ],
    'obesity': [
      "Create sustainable calorie deficit with whole foods.",
      "Include fiber-rich foods for satiety.",
      "Focus on long-term lifestyle changes over quick fixes."
    ],
    'metabolic syndrome': [
      "Follow Mediterranean-style eating with whole grains and healthy fats.",
      "Reduce refined sugars and processed foods.",
      "Include regular physical activity alongside nutrition."
    ],
    'depression': [
      "Include omega-3 rich foods and B-vitamin sources.",
      "Ensure adequate protein and complex carbohydrates.",
      "Consider probiotic-rich foods for gut-brain health."
    ],
    'anxiety': [
      "Include magnesium-rich foods like leafy greens and nuts.",
      "Limit caffeine and include calming herbs like chamomile.",
      "Focus on balanced blood sugar to stabilize mood."
    ],
    'cancer': [
      "Emphasize plant-based foods rich in antioxidants.",
      "Include cruciferous vegetables and berries.",
      "Maintain healthy weight and limit alcohol."
    ],
    'tuberculosis': [
      "Ensure high-quality protein for immune support and healing.",
      "Include vitamin C and zinc-rich foods.",
      "Focus on nutrient-dense foods during recovery."
    ],
    'anemia': [
      "Pair iron-rich foods with vitamin C sources.",
      "Include heme iron from lean meats if non-vegetarian.",
      "Consider vitamin B12 sources, especially if vegetarian."
    ],
    'pcos': [
      "Focus on low-GI foods and balanced blood sugar.",
      "Include anti-inflammatory foods and healthy fats.",
      "Maintain healthy weight and regular meal timing."
    ],
    'arthritis': [
      "Include anti-inflammatory foods like turmeric and ginger.",
      "Consider omega-3 rich foods and maintain healthy weight.",
      "Limit nightshades if they trigger symptoms."
    ],
    'chronic kidney disease': [
      "Monitor phosphorus and potassium intake.",
      "Focus on high-quality, moderate protein.",
      "Stay well-hydrated and limit sodium."
    ],
    'fatty liver': [
      "Eliminate added sugars and limit alcohol.",
      "Include healthy fats and fiber-rich foods.",
      "Maintain healthy weight through balanced nutrition."
    ],
    'parkinsons': [
      "Include antioxidant-rich foods and healthy fats.",
      "Ensure adequate protein with proper timing around medications.",
      "Focus on gut health with fiber and probiotics."
    ],
  };

  if (disease !== 'none' && diseaseRecommendations[disease.toLowerCase()]) {
    recommendations.push(...diseaseRecommendations[disease.toLowerCase()]);
  }

  // Diet type specific recommendations
  if (dietType === 'veg') {
    recommendations.push("Ensure complete protein combinations (dal + rice, beans + grains).");
    recommendations.push("Include dairy or plant-based alternatives for calcium.");
  } else if (dietType === 'eggetarian') {
    recommendations.push("Use eggs as a complete protein source.");
    recommendations.push("Balance with plant-based proteins for variety.");
  } else {
    recommendations.push("Include lean proteins and limit processed meats.");
    recommendations.push("Balance animal and plant-based foods for optimal nutrition.");
  }

  return recommendations.slice(0, 8); // Limit to 8 key recommendations
}

export async function POST(request: NextRequest) {
  const { age, height, weight, goal, disease, budget, dietType, gender } = await request.json();
  const parsedAge = Number(age);
  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);
  const parsedBudget = Number(budget);

  if (Number.isNaN(parsedAge) || Number.isNaN(parsedHeight) || Number.isNaN(parsedWeight) || Number.isNaN(parsedBudget)) {
    return NextResponse.json({ error: 'Invalid numeric fields provided' }, { status: 400 });
  }

  if (!gender || !['male', 'female', 'other'].includes(gender.toLowerCase())) {
    return NextResponse.json({ error: 'Valid gender (male/female/other) is required' }, { status: 400 });
  }

  const plan = buildDietPlan(parsedAge, parsedHeight, parsedWeight, goal, disease, parsedBudget, dietType, gender.toLowerCase());
  return NextResponse.json({ plan });
}