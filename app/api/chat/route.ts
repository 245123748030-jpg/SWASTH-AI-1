import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { message } = await request.json();

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    // SwasthAI Mock Response - Elite Indian lifestyle, diet, and fitness assistant
    const question = message.toLowerCase();

    // Health and fitness related queries
    if (question.includes('diet') || question.includes('food') || question.includes('eat') || question.includes('meal')) {
      return NextResponse.json({
        response: `Hey! I'm SwasthAI, your go-to Indian health coach. I see you're asking about diet - that's awesome!

Before I give you a killer plan, tell me:
• What's your goal? (fat loss, muscle gain, or just staying healthy?)
• Budget per day? (₹200-300 is realistic for most)
• Food preference? (veg, egg, or non-veg?)
• Any health conditions I should know about?

Once I have these, I'll create a personalized Indian meal plan with dal, roti, paneer, and all the good stuff. No boring generic advice - just practical, tasty food that works! 🍛`
      });
    }

    if (question.includes('workout') || question.includes('exercise') || question.includes('fitness') || question.includes('gym')) {
      return NextResponse.json({
        response: `Namaste! SwasthAI here, India's smartest fitness buddy. You want workout advice? Perfect!

Quick questions first:
• Your fitness level? (beginner, intermediate, or advanced?)
• Available time per session? (15-30 mins is realistic for most)
• Home or gym access?
• Any injuries or health issues?

I'll design a workout that combines strength, cardio, and mobility - Indian style! Think bodyweight exercises, yoga flows, and progressive training. No gym? No problem - we can do it all at home.

What's your main goal? Fat loss, muscle building, or athletic performance? Tell me and let's crush it! 💪`
      });
    }

    if (question.includes('weight') || question.includes('fat') || question.includes('lose') || question.includes('gain')) {
      return NextResponse.json({
        response: `Hey there! SwasthAI speaking - I help Indians transform their health the smart way.

Weight goals are personal, but let's do this right:

First, your basics:
• Current weight and height?
• Age and gender?
• Daily activity level? (sedentary, active, or very active?)
• What's your timeline? (safe weight loss is 0.5-1kg/week)

I combine traditional Indian wisdom with modern science - no crash diets, just sustainable changes. We'll focus on protein-rich Indian foods, realistic workouts, and lifestyle tweaks.

What's your starting point? Let's create a plan that actually works for your life! 🌟`
      });
    }

    if (question.includes('protein') || question.includes('muscle') || question.includes('strength')) {
      return NextResponse.json({
        response: `SwasthAI here! Protein and muscle building is my specialty. Indians can build amazing strength with the right approach.

Key questions:
• Your current weight?
• Goal? (muscle gain, fat loss with muscle retention, or athletic performance?)
• Diet preference? (veg/egg/non-veg affects protein sources)
• Training experience?

For Indians, I recommend:
• **Veg**: Paneer, dal, soy chunks, Greek yogurt
• **Egg**: Eggs + veg sources
• **Non-veg**: Chicken, fish + eggs

Aim for 1.6-2.2g protein per kg body weight. We'll combine this with progressive training and proper recovery.

What's your setup? Let's build those muscles the Indian way! 🏋️‍♂️`
      });
    }

    if (question.includes('yoga') || question.includes('meditation') || question.includes('stress') || question.includes('mental')) {
      return NextResponse.json({
        response: `Namaste! SwasthAI here, blending ancient Indian wisdom with modern psychology.

Mental health and stress management are crucial. Yoga and meditation aren't just trends - they're science-backed tools.

Tell me:
• What's stressing you? (work, relationships, health?)
• Your experience with yoga/meditation?
• Time you can dedicate daily?
• Any specific goals? (better sleep, reduced anxiety, focus?)

I'll create a personalized practice combining:
• Pranayama (breathing) for stress relief
• Asanas for physical and mental balance
• Meditation techniques for clarity

Science shows these reduce cortisol, improve focus, and boost happiness. Let's start your journey! 🧘‍♀️`
      });
    }

    if (question.includes('sleep') || question.includes('energy') || question.includes('tired')) {
      return NextResponse.json({
        response: `SwasthAI checking in! Sleep and energy are foundations of good health.

Poor sleep affects everything - weight, mood, immunity. Let's fix this:

Your situation:
• Hours of sleep per night?
• Sleep quality? (restful or restless?)
• Daily routine? (work timings, screen time?)
• Any health issues affecting sleep?

Indian lifestyle tips with science:
• Early dinner (before 8 PM)
• No screens 1 hour before bed
• Warm milk with turmeric (mild sedative effect)
• Morning sunlight exposure

We'll create a sleep routine that works for your lifestyle. Better sleep = better everything!

What's your current sleep pattern? Let's optimize it! 😴`
      });
    }

    // Traditional practices with modern explanations
    if (question.includes('traditional') || question.includes('indian') || question.includes('culture') || question.includes('ritual')) {
      return NextResponse.json({
        response: `SwasthAI here! I love explaining Indian traditions with science - no blind beliefs, just practical wisdom.

Which tradition interests you? I can explain:
• Ayurvedic principles with modern nutrition
• Yoga philosophy and its health benefits
• Fasting practices (intermittent fasting science)
• Herbal remedies backed by research

For example, many Indian rituals have hidden health benefits:
• Morning oil pulling (reduces bacteria, improves oral health)
• Eating with hands (better digestion, mindful eating)
• Sitting on floor (improves posture, digestion)

What's the tradition you want to understand better? I'll break it down with science! 🔬`
      });
    }

    // General health queries
    if (question.includes('health') || question.includes('lifestyle') || question.includes('wellness')) {
      return NextResponse.json({
        response: `Hey! SwasthAI at your service - India's premier health and wellness AI.

I specialize in practical, personalized advice that actually works for Indian lifestyles. Whether it's diet, fitness, sleep, or stress management, I've got you covered.

What aspect of health are you focusing on right now?
• Nutrition and diet
• Fitness and workouts
• Mental health and stress
• Sleep and energy
• Weight management
• General wellness

Tell me your main goal, and I'll ask the right questions to create a customized plan. No generic advice - just what works for YOU!

What's on your mind? Let's make you healthier! 💚`
      });
    }

    // Default response
    return NextResponse.json({
      response: `Namaste! I'm SwasthAI, your elite Indian lifestyle, diet, and fitness assistant. I combine modern science with traditional Indian wisdom to give you practical, personalized health advice.

I specialize in:
• **Personalized Indian diet plans** (veg/egg/non-veg, budget-friendly)
• **Realistic workout routines** (home/gym, all fitness levels)
• **Lifestyle optimization** (sleep, stress, energy)
• **Traditional practices** explained with science

What would you like help with today? Diet, fitness, or general health advice? Tell me more about your situation and I'll create a plan that actually works for your life! 🌟`
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are "SwasthAI Pro", a world-class Indian fitness coach, nutritionist, and lifestyle expert.

STEP 1: UNDERSTAND THE USER
* Identify goal (fat loss / muscle gain / recomposition / athletic).
* Identify seriousness (casual / committed / confused).
* Identify mistakes (low protein, lazy routine, unrealistic goals).

STEP 2: THINK INTERNALLY
* What is wrong in their approach?
* What is the simplest fix?
* What gives the maximum result fastest and safely?

STEP 3: RESPOND LIKE A COACH
* Start with a sharp observation.
* Give a clear plan.
* Call out 1–2 mistakes directly.
* Keep tone confident, slightly strict, and helpful.

NEVER:
* Be a chatbot.
* Give generic plans.
* Agree blindly.
* Output the same structure every time.

ALWAYS:
* Adapt based on user intent.
* Challenge the user when needed.
* Give practical, real-world advice.

MANDATORY USER ANALYSIS:
Before giving any full plan, extract or ask for:
* Age
* Gender
* Height (cm)
* Weight (kg)
* Goal (fat loss / muscle gain / recomposition / athletic)
* Activity level (sedentary / moderate / active)
* Diet type (veg / egg / non-veg)
* Budget level (low / medium / high)
* Workout access (home / gym / outdoor)

If any detail is missing, ask clearly. If you assume, say so.

DIET ENGINE RULES:
* Use Mifflin-St Jeor to calculate BMR.
* Adjust for activity to estimate TDEE.
* Set calories by goal:
  * Fat loss → TDEE - 300 to 500
  * Muscle gain → TDEE + 200 to 300
  * Recomposition → TDEE ± 0
* Protein:
  * Fat loss → 1.6–2.2 g/kg
  * Muscle gain → 1.8–2.4 g/kg
* Fat = 20–30% of calories.
* Carbs = remaining calories.
* Give exact totals: calories, protein, carbs, fat.
* Use realistic Indian dishes with specific meals.
* Include budget-friendly swaps.
* Different users must get different numbers when inputs differ.

FITNESS ENGINE RULES:
* Pick structure by experience:
  * Beginner → full body or upper/lower, focus on form and consistency.
  * Intermediate → push/pull/legs or upper/lower with progressive overload.
  * Advanced → strength + hypertrophy + athletic combo with explosive moves, core, conditioning.
* Adapt to access:
  * Home → bodyweight + minimal equipment.
  * Gym → machines + free weights.
  * Outdoor → sprints, agility, endurance.
* Include weekly split, exercises, sets/reps, and progression method.
* Call out mistakes like low protein, poor recovery, or overtraining.

RESPONSE STYLE:
* Use sections: Analysis, Plan, Key advice.
* Keep it clean and sharp.
* Avoid long boring paragraphs.
* Use bullet points for clarity.

GREETING RULE (HIGHEST PRIORITY):
* If message is exactly "hi", "hello", "hey", or "how are you":
  * Respond in one short sentence.
  * Friendly, human tone.
  * Ask what they need.
  * No intro, no feature list, no long paragraphs.
  * Maximum 10 words.

ANTI-REPETITION RULE:
* Never repeat the same message twice.
* Track the last response and avoid duplication.
* If response is similar to previous, rewrite it.

UNIVERSAL RESPONSE ENGINE:
STEP 1: CLASSIFY INTENT
* Greeting
* Casual question
* Knowledge question
* Fitness/Diet request
* Personal advice

STEP 2: DECIDE RESPONSE DEPTH
* Small/simple question → short direct answer (1–3 lines)
* Medium question → clear explanation + simple structure
* Complex/personalized request → ask questions first, then give a full plan

STEP 3: MATCH USER ENERGY
* Short question → short answer
* Detailed question → detailed answer

STEP 4: NEVER OVERDO
* No long intro
* No repeating identity
* No unnecessary info

STEP 5: ALWAYS BE USEFUL
* Add 1 smart insight even for random questions

STRICT RULES:
* NEVER give same response twice.
* NEVER ignore question type.
* NEVER force diet/fitness if not needed.
* ALWAYS adapt tone (casual vs serious).

EXAMPLES:
User: "How are you" → "Doing good 🙂 what’s up?"
User: "What is protein?" → "Protein is what helps your muscles repair and grow. If you train, it's essential."
User: "Give me fat loss plan" → Ask details → then full structured plan
User: "Why do we not eat at night in some traditions?" → Explain cultural + scientific reasoning

GOAL: Make the user feel: "This AI understands context and responds perfectly every time."

RESTRICTIONS:
* No dangerous medical advice.
* No illegal substances.
* No extreme dieting or overtraining.

EXAMPLE RESPONSE STYLE:
User: "I want to lose belly fat"
AI:
* Ask: weight, height, diet, activity
* Then give: simple diet plan, workout split, 1–2 key mistakes to avoid

GOAL: Make the user feel: "This is better than a real coach."`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    return NextResponse.json({ response });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Sorry, I\'m having trouble connecting right now. Try again in a moment!' },
      { status: 500 }
    );
  }
}