import mongoose from 'mongoose'
import WellnessResource from './models/WellnessResource.js'

// Use Railway production MongoDB URI (update this with your actual production URI)
// You can get this from Railway dashboard > Variables > MONGODB_URI
const PRODUCTION_MONGODB_URI = process.env.PRODUCTION_MONGODB_URI || 'mongodb+srv://vijay:Vijay2004@zenzone.qc2m0.mongodb.net/?retryWrites=true&w=majority'

const comprehensiveWellnessResources = [
  {
    title: "Self-Compassion and Inner Kindness: A Complete Guide",
    description: "Discover the transformative power of self-compassion. Learn research-backed techniques to treat yourself with kindness, overcome self-criticism, and build lasting emotional resilience.",
    content: `
# The Power of Self-Compassion

Self-compassion is the practice of treating yourself with the same kindness, concern, and understanding you would offer to a good friend. Research by Dr. Kristin Neff and others shows that self-compassion is strongly associated with emotional wellbeing, less anxiety and depression, and greater life satisfaction.

## Understanding Self-Compassion

Self-compassion consists of three main components:

### 1. Self-Kindness vs. Self-Judgment
Rather than harshly criticizing yourself when you fail or make mistakes, self-kindness involves being warm and understanding toward yourself. It means recognizing that making mistakes is part of being human.

**Why It Matters:**
- Reduces the negative impact of failure
- Decreases anxiety and depression
- Promotes emotional resilience
- Enhances motivation for personal growth

### 2. Common Humanity vs. Isolation
Self-compassion involves recognizing that suffering and personal inadequacy are part of the shared human experience. Everyone struggles, everyone makes mistakes, and everyone experiences pain.

**The Research:**
Studies show that people who practice self-compassion:
- Experience 43% less anxiety
- Show 23% lower cortisol (stress hormone) levels
- Report 26% higher life satisfaction
- Demonstrate greater emotional resilience

### 3. Mindfulness vs. Over-Identification
Mindfulness involves being aware of painful thoughts and feelings in a balanced way, neither suppressing them nor becoming consumed by them. It's about observing your experience without judgment.

## Practical Self-Compassion Exercises

### Exercise 1: The Self-Compassion Break (5 minutes)

When you're struggling, use this three-step practice:

**Step 1 - Mindfulness:** "This is a moment of suffering" or "This is stressful"
**Step 2 - Common Humanity:** "Suffering is part of life" or "Everyone struggles sometimes"
**Step 3 - Self-Kindness:** "May I be kind to myself. May I give myself the compassion I need."

### Exercise 2: Daily Self-Compassion Practice

**Morning:** Set intention for self-kindness
**Midday:** Check in without judgment
**Evening:** Reflect with compassion on your day

## Building Your Practice

**Week 1:** Practice Self-Compassion Break daily
**Week 2:** Add morning intention setting
**Week 3:** Journal with self-compassion
**Week 4:** Integrate into challenging moments

## Conclusion

Self-compassion is not self-indulgence—it's a profound way of relating to yourself that acknowledges your humanity while motivating positive change. Start small, be patient with yourself, and watch as this practice transforms your relationship with yourself and the world.

**Action Step:** Right now, place your hand over your heart, take a deep breath, and say: "May I be kind to myself in this moment."
`,
    category: "mindfulness",
    type: "article",
    duration: "25 min read",
    difficulty: "beginner",
    tags: ["self-compassion", "mindfulness", "emotional-wellbeing", "meditation", "self-care"],
    author: "Dr. Sarah Johnson, Clinical Psychologist",
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop",
    isPublished: true,
    viewCount: 0
  },
  {
    title: "Nature Connection for Mental Health: The Science of Forest Bathing",
    description: "Explore the profound healing power of nature. Discover evidence-based practices to reduce stress, boost mood, and enhance wellbeing through outdoor activities and nature immersion.",
    content: `
# The Healing Power of Nature

Scientific research shows that spending time in nature has profound effects on mental health. From reducing stress to improving mood and cognitive function, nature offers a powerful therapeutic tool that's freely available to everyone.

## The Science: How Nature Heals

**Stress Reduction:**
- 20 minutes in nature reduces cortisol by 21%
- Heart rate variability improves within 15 minutes
- Blood pressure decreases by 2-5 points
- Muscle tension reduces by up to 60%

**Mental Health Improvements:**
- 90-minute nature walks reduce rumination
- Depression symptoms decrease by 30%
- Anxiety levels drop by 28%
- Overall life satisfaction increases by 23%

## Forest Bathing: A Complete Practice

**The Basic Practice (90 minutes):**

1. **Preparation (10 minutes):** Choose natural setting, turn off devices, set intention
2. **Mindful Walking (40 minutes):** Walk slowly, engage all five senses
3. **Sit Spot Practice (30 minutes):** Find comfortable place, observe without judgment
4. **Integration (10 minutes):** Walk back, reflect, express gratitude

## Daily Nature Connection

**Morning:** 10-minute sun exposure
**Midday:** 15-minute nature walk
**Evening:** 10 minutes grounding practice

## Building Your Practice

**Week 1:** 15 minutes daily outside
**Week 2:** Identify 5 local plants/trees
**Week 3:** One 2-hour nature immersion
**Week 4:** Start nature journal

## Conclusion

Nature connection isn't a luxury—it's a biological necessity. Whether it's 5 minutes of sky-gazing or a full day of forest bathing, every bit of nature contact contributes to your mental health.

**Your Next Step:** Look outside right now. Take 60 seconds to observe nature. This is where healing begins.
`,
    category: "general",
    type: "article",
    duration: "28 min read",
    difficulty: "beginner",
    tags: ["nature", "stress-relief", "outdoor-activities", "mindfulness", "forest-bathing", "ecotherapy"],
    author: "Michael Green, Environmental Psychologist",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
    isPublished: true,
    viewCount: 0
  },
  {
    title: "Stress Management in Daily Life: Evidence-Based Strategies",
    description: "Master practical stress management techniques backed by science. Learn to identify stressors, implement coping strategies, and build resilience for long-term wellbeing.",
    content: `
# Understanding Modern Stress

77% of people regularly experience physical symptoms caused by stress. But stress doesn't have to control your life.

## The Science of Stress

**Immediate Effects:** Adrenaline floods system, heart rate increases, breathing rapid
**Chronic Effects:** Elevated cortisol, increased disease risk, weakened immune system

## Immediate Stress Relief Techniques

### 1. 4-7-8 Breathing
- Exhale completely
- Inhale nose: 4 counts
- Hold: 7 counts
- Exhale mouth: 8 counts
- Repeat 4 times

**Benefits:** Reduces cortisol by 25% in 3 minutes

### 2. Progressive Muscle Relaxation
Tense and release muscle groups from feet to head.

### 3. 5-4-3-2-1 Grounding
Identify: 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste

## Daily Stress Management

**Morning (20 min):** Wake gently, mindful movement, set intentions
**Midday (15 min):** Step away, eat mindfully, take walk
**Evening (30 min):** Technology boundary, relaxation activity, sleep preparation

## Long-Term Resilience Building

1. **Regular Exercise:** 30 min, 5x/week
2. **Social Connection:** Weekly friend time
3. **Nature Time:** 20 min daily
4. **Meditation:** 10-20 min daily

## Creating Your Plan

**Week 1:** Track stressors, practice breathing
**Week 2:** Implement morning routine
**Week 3:** Add daily practices
**Week 4:** Build long-term habits

## Conclusion

Stress management is about building a toolkit of strategies and creating daily practices that build resilience over time.

**Your First Step:** Right now, try 4-7-8 breathing. Just four cycles. This simple tool is always available.
`,
    category: "general",
    type: "article",
    duration: "30 min read",
    difficulty: "beginner",
    tags: ["stress-management", "resilience", "coping-strategies", "work-life-balance", "mental-health"],
    author: "Dr. James Martinez, Stress Management Specialist",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
    isPublished: true,
    viewCount: 0
  },
  {
    title: "Digital Detox: Reclaiming Your Mental Space",
    description: "Break free from digital overload. Learn science-backed strategies to create healthy technology boundaries, reduce screen time, and reconnect with what truly matters.",
    content: `
# The Digital Dilemma

The average person spends 7+ hours daily on screens and checks their phone 96 times per day. It's time to take back control.

## The Statistics

- Average screen time: 7 hours 4 minutes daily
- Phone checks: 96 times/day
- Social media: 2.5 hours daily
- 50% increase in anxiety among heavy users
- 40% higher depression risk with 5+ hours daily

## Signs You Need a Digital Detox

**Physical:** Eye strain, neck pain, poor sleep
**Psychological:** Anxiety without phone, FOMO, difficulty concentrating
**Behavioral:** Checking first thing upon waking, using during meals
**Relationships:** Phubbing, arguments about device use

## Types of Digital Detox

### 1. Full Detox (24 hours - 7 days)
Complete disconnect from all non-essential technology

### 2. Partial Detox (Ongoing)
Selective disconnection (no social media weekdays, phone-free bedroom)

### 3. Micro-Detox (Daily)
Regular short breaks (screen-free meals, phone-free walks)

## Your Digital Detox Action Plan

**Phase 1: Awareness (Week 1)**
- Track screen time
- Identify triggers
- Calculate total daily use

**Phase 2: Boundaries (Weeks 2-3)**
- Bedroom screen-free
- Meal times sacred
- Morning/evening buffers
- Turn off notifications

**Phase 3: Replacement (Weeks 3-4)**
- Fill void with meaningful activities
- Reading, hobbies, exercise, conversations

**Phase 4: Optimization (Ongoing)**
- Phone in grayscale
- Remove social media from home screen
- App time limits
- Schedule checking times

## Techniques for Success

1. **Smartphone Swap:** Use basic phone for 30 days
2. **24-Hour Challenge:** Complete disconnect monthly
3. **Tech-Free Tuesdays:** One day per week offline
4. **5-5-5 Method:** 5 min after waking, breaks every hour, 5 min before bed

## Conclusion

Your smartphone can connect you with loved ones or disconnect you from the present moment. Use technology intentionally, on your terms.

**Your Next Step:** Tonight, charge phone outside bedroom. Use alarm clock. Notice how you feel waking without immediately checking screens.
`,
    category: "general",
    type: "article",
    duration: "32 min read",
    difficulty: "beginner",
    tags: ["digital-detox", "technology", "social-media", "screen-time", "mindfulness", "work-life-balance"],
    author: "Tech Wellness Coach David Park",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    isPublished: true,
    viewCount: 0
  },
  {
    title: "Mindful Eating for Mental Wellness: Transform Your Relationship with Food",
    description: "Discover how mindful eating can revolutionize your mental health. Learn to break free from emotional eating, reduce stress, and develop a peaceful, intuitive relationship with food.",
    content: `
# The Mind-Body Connection Through Food

What we eat affects how we feel, but equally important is *how* we eat. Mindful eating can transform both your mental health and your relationship with food.

## What is Mindful Eating?

**Paying full attention to the eating experience without judgment.**

Research shows mindful eating:
- Reduces binge eating by 70%
- Decreases emotional eating by 50%
- Lowers anxiety around food by 40%
- Improves digestion
- Increases meal satisfaction by 60%

## The Problem: Mindless Eating

- 88% eat while scrolling/watching TV
- 67% eat standing up or on-the-go
- 74% emotionally eat when stressed
- Consequences: overeating, reduced satisfaction, digestive issues

## The Gut-Brain Connection

- 90% of serotonin made in gut
- Gut bacteria affect mood
- Blood sugar impacts energy and emotions

## The Practice of Mindful Eating

### Basic Principles

**1. Use All Five Senses**
Observe sight, smell, texture, sound, taste before eating

**2. Eat Without Distractions**
Turn off TV/phone, sit at table, focus solely on eating

**3. Slow Down**
20-minute rule: Takes 20 minutes for fullness signals to reach brain

**4. Check Hunger/Fullness**
Hunger-Fullness Scale (1-10): Start eating at 3-4, stop at 6-7

**5. Identify Emotional vs Physical Hunger**
- Physical: gradual, satisfied when full
- Emotional: sudden, craves specific foods, guilt afterward

## Practical Exercises

### The Raisin Meditation (10 minutes)
Hold, see, touch, smell, place in mouth, taste, swallow one raisin mindfully

### Four-Bite Practice
Bite 1: Observe
Bite 2: Experience
Bite 3: Identify flavors
Bite 4: Enjoy

## Breaking Free from Emotional Eating

**Track triggers for 2 weeks:** When, what emotion, what ate, how felt after
**Create alternatives:** For each emotion, 3 non-food coping strategies
**HALT Method:** Check if Hungry, Angry, Lonely, Tired before eating

## Building Your Practice

**Week 1:** One mindful meal daily, track hunger/fullness
**Week 2:** Slow down, remove distractions
**Week 3:** Identify emotional eating, try alternatives
**Week 4:** Two mindful meals daily, celebrate progress

## Conclusion

Mindful eating is about reconnecting with your body, honoring hunger and fullness, and finding joy in eating without guilt.

**Your Next Bite:** Take one mindful bite right now. Really taste it. This is the start of transformation.
`,
    category: "nutrition",
    type: "article",
    duration: "28 min read",
    difficulty: "beginner",
    tags: ["mindful-eating", "nutrition", "emotional-eating", "self-care", "mental-health", "intuitive-eating"],
    author: "Nutrition Therapist Lisa Chen, RD",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop",
    isPublished: true,
    viewCount: 0
  },
  {
    title: "Building Healthy Boundaries: Protect Your Peace and Energy",
    description: "Master the art of setting and maintaining boundaries. Learn to say no without guilt, protect your energy, and create relationships that honor your needs and values.",
    content: `
# The Power of Boundaries

Boundaries are invisible lines that protect your time, energy, emotions, and physical space. They're not walls—they're gates that let the right things in and keep harmful things out.

## What Are Boundaries?

**Boundaries are:**
- Limits on how others can treat you
- Guidelines for your time and energy
- Standards for what you will/won't accept
- Protection for wellbeing

**Types of Boundaries:**
1. Physical (personal space, touch)
2. Emotional (feelings, energy)
3. Time (how you spend it)
4. Mental (thoughts, values, opinions)
5. Material (possessions, money)
6. Sexual (consent, comfort)

## Signs You Need Better Boundaries

- Feeling resentful toward others
- Chronic guilt when saying no
- Feeling drained after interactions
- Saying yes when you want to say no
- One-sided relationships
- Tolerating disrespectful treatment

## Why Boundaries Are Difficult

**Common barriers:**
- Fear of rejection
- Guilt ("I should help everyone")
- Fear of conflict
- Past conditioning
- Low self-worth

## Setting Boundaries

### Step 1: Identify Your Limits
What situations drain you? When do you feel resentful?

### Step 2: Communicate Clearly

**Format:** "I [need/want] _____, so I [will/won't] _____."

**Examples:**
- "I don't check work email after 6 PM, so I'll respond tomorrow."
- "When you criticize my choices, I feel disrespected, so I need you to stop."
- "I don't lend money, so I can't help with that."

### Step 3: Maintain Your Boundaries
- Expect pushback
- Stay consistent
- Repeat boundary calmly
- Implement consequences if violated

### Step 4: Manage Your Guilt
Reframe: "I'm taking care of myself so I can show up better for others"

## Boundary Scripts

**Work:** "I don't check messages after [time]. I'll respond tomorrow."
**Family:** "That's private information I'm not sharing."
**Friends:** "I need more notice than that. Let's plan for next week."
**Romantic:** "I need alone time to recharge. I'll text you later."

## Dealing with Pushback

**Guilt-tripping:** "I understand you're disappointed, but my answer is still no."
**Anger:** Stay calm. "I'm sorry you feel that way, but my boundary stands."
**Bargaining:** "No, I'm not negotiating this boundary."

## Building Boundary Confidence

**Week 1:** Say "let me check my calendar," express one preference daily
**Week 2:** Set one boundary with safe person
**Week 3:** Set boundary at work
**Week 4:** Maintain all boundaries consistently

## Conclusion

Setting boundaries is one of the most loving things you can do—for yourself and others.

**Your First Boundary:** Think of one small boundary to set today. Start there.

Remember: "No" is a complete sentence. Protect your peace.
`,
    category: "general",
    type: "article",
    duration: "30 min read",
    difficulty: "intermediate",
    tags: ["boundaries", "self-care", "relationships", "communication", "assertiveness", "mental-health"],
    author: "Relationship Therapist Dr. Rachel Adams, LMFT",
    imageUrl: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800&h=400&fit=crop",
    isPublished: true,
    viewCount: 0
  },
  {
    title: "Work-Life Balance Strategies: Thriving in Both Worlds",
    description: "Achieve sustainable work-life balance without guilt or burnout. Learn practical strategies to set boundaries, manage time effectively, and prioritize what truly matters.",
    content: `
# Redefining Work-Life Balance

Work-life balance isn't about perfect equilibrium—it's about making conscious choices that align with your values and needs.

## The Modern Challenge

**Statistics:**
- 66% feel they don't have enough work-life balance
- 53% work after hours weekly
- 75% check work email outside hours
- 77% experience burnout

**The Cost:**
- 3x higher depression risk
- 40% increased heart disease risk
- Reduced relationship satisfaction
- Lower productivity

## Essential Strategies

### 1. Set Clear Boundaries

**Time Boundaries:**
- Define working hours clearly
- No email after 5:30 PM
- No meetings before 9:30 or after 4:30

**Space Boundaries:**
- Bedroom is screen-free
- Meal times are sacred
- Car is device-free zone

### 2. Master Time Management

**The 80/20 Rule:** 20% of tasks produce 80% of results
**Time Blocking:** Assign specific times to activities
**Priority Systems:** Eisenhower Matrix (urgent/important)

### 3. Learn to Say No

"Thank you for thinking of me, but I don't have capacity right now."

**When to say no:**
- Doesn't align with values/goals
- Would sacrifice higher priorities
- Would push you into burnout

### 4. Optimize Your Energy

- Schedule high-focus work during peak energy
- Work in 90-minute focused blocks
- Take 15-20 minute breaks between

### 5. Protect Non-Negotiables

**Health:** 7 hours sleep, daily movement
**Relationships:** Date night, family dinner
**Personal:** Morning routine, exercise, hobbies

### 6. Embrace Imperfection

- "Done" is better than "perfect"
- B+ work on time beats A+ work late
- Lower unrealistic standards

## Creating Your Balance Plan

**Week 1:** Complete balance audit, track time
**Week 2:** Set 1-2 key boundaries
**Week 3:** Implement time blocking
**Week 4:** Evaluate and adjust

## Conclusion

Work-life balance requires saying no to good things to say yes to great things.

**Your First Step:** Identify one boundary you'll set this week. Start small, stay consistent.

Remember: Your worth isn't measured by productivity. Balance is doing what matters.
`,
    category: "general",
    type: "article",
    duration: "32 min read",
    difficulty: "beginner",
    tags: ["work-life-balance", "boundaries", "time-management", "productivity", "self-care", "burnout-prevention"],
    author: "Career Coach Jennifer Thompson, MBA",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop",
    isPublished: true,
    viewCount: 0
  },
  {
    title: "Managing Depression: Self-Care Strategies That Work",
    description: "Navigate depression with evidence-based self-care strategies. Learn practical tools to manage symptoms, build resilience, and reclaim joy in daily life.",
    content: `
# Understanding Depression

Depression affects 264 million people worldwide. While professional treatment is often necessary, evidence-based self-care strategies can significantly help.

**Important:** This guide complements professional treatment, doesn't replace it. Please consult a mental health professional.

## Recognizing Depression

**Emotional:** Persistent sadness, loss of interest, hopelessness, irritability
**Physical:** Fatigue, sleep changes, appetite changes, aches
**Behavioral:** Withdrawing, neglecting responsibilities, difficulty getting up

**When to Seek Immediate Help:**
- Thoughts of suicide or self-harm
- Severe symptoms preventing self-care
- 988 Suicide & Crisis Lifeline: Call/text 988

## Evidence-Based Self-Care

### 1. Behavioral Activation

**The Problem:** Depression creates inertia
**The Solution:** Do things even when you don't feel like it

**Start Small:**
- 5-minute rule: Commit to just 5 minutes
- Activity hierarchy: Easy to hard activities
- Schedule activities before you feel motivated

### 2. Movement and Exercise

**Research:** Exercise as effective as medication for mild-moderate depression

**Depression-Adapted Exercise:**
- Level 1: Stand and stretch 1 minute, walk to mailbox
- Level 2: 10-minute walk, gentle yoga
- Level 3: 30-minute walk, exercise class

### 3. Sleep Regulation

**Sleep Hygiene:**
- Same bedtime/wake time daily
- Morning sunlight within 30 minutes of waking
- Wind down 60-90 minutes before bed
- No screens, dim lights, cool room

### 4. Nutrition for Mental Health

**Depression-Fighting Foods:**
- Omega-3s: fatty fish, walnuts
- Complex carbs: whole grains, oats
- Lean protein: chicken, eggs, legumes
- Probiotics: yogurt, kefir

### 5. Social Connection

**Start Small:**
- Text one person
- 30-minute coffee with friend
- Join class or group
- Volunteer

### 6. Cognitive Strategies

**Depression Lies:** "You're worthless," "Nothing will get better"

**Cognitive Restructuring:**
1. Notice negative thoughts
2. Identify distortions
3. Challenge the thought
4. Create balanced thought

### 7. Structure and Routine

**Build Basic Routine:**
- Morning: Same wake time, make bed, shower, breakfast
- Midday: Scheduled meals, one productive task
- Evening: Wind-down routine, same bedtime

### 8. Professional Support

**Therapy:** CBT, Behavioral Activation
**Medication:** Antidepressants can be very helpful
**Combined:** Most effective for moderate-severe depression

## Creating Your Plan

**Week 1:** Start one small activity daily
**Week 2:** Add sleep routine
**Week 3:** Introduce movement
**Week 4:** Add social connection

## Conclusion

Depression is treatable. Recovery takes time. Small steps count.

**Your One Next Step:** Choose the easiest thing. Maybe a 5-minute walk. Do it today.

Remember: You're not alone. Recovery is possible. You're worth the effort.

**Crisis Resources:**
- 988 Suicide & Crisis Lifeline
- Crisis Text Line: Text HOME to 741741
`,
    category: "depression",
    type: "article",
    duration: "35 min read",
    difficulty: "beginner",
    tags: ["depression", "mental-health", "self-care", "CBT", "behavioral-activation", "recovery"],
    author: "Clinical Psychologist Dr. Michael Torres, PhD",
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop",
    isPublished: true,
    viewCount: 0
  },
  {
    title: "Breathing Exercises for Anxiety: Your Portable Calm",
    description: "Harness the power of your breath to manage anxiety instantly. Master evidence-based breathing techniques that calm your nervous system and restore peace in any situation.",
    content: `
# The Power of Breath

Your breath is the most powerful tool for managing anxiety—and it's always with you. Research shows breathing techniques can reduce anxiety by 32%.

## The Science

**Your breath controls your nervous system:**
- Slow, deep breathing = calming (parasympathetic)
- Fast, shallow breathing = stress (sympathetic)

**Benefits:**
- Slows heart rate by 10-15 beats/minute
- Reduces cortisol by 25%
- Works as effectively as medication for mild-moderate anxiety

## 8 Essential Techniques

### 1. Diaphragmatic (Belly) Breathing
- Place hand on belly
- Inhale nose (4 counts) - belly rises
- Exhale mouth (6 counts) - belly falls
- Repeat 5-10 minutes

### 2. Box Breathing (4-4-4-4)
Used by Navy SEALs
- Inhale: 4 counts
- Hold: 4 counts
- Exhale: 4 counts
- Hold: 4 counts
- Repeat 5-10 rounds

### 3. 4-7-8 Breathing
Natural tranquilizer (Dr. Andrew Weil)
- Inhale nose: 4 counts
- Hold: 7 counts
- Exhale mouth: 8 counts
- Repeat 4 times

### 4. Alternate Nostril Breathing
- Close right nostril, inhale left (4)
- Close left, exhale right (4)
- Inhale right (4)
- Close right, exhale left (4)
- Repeat 5-10 rounds

### 5. Physiological Sigh
Fastest relief (Stanford research)
- Deep inhale through nose
- Second "sip" of air through nose
- Long exhale through mouth

### 6. Coherent Breathing
Optimal rate: 5.5 breaths/minute
- Inhale: 5.5 seconds
- Exhale: 5.5 seconds
- Continue 10-20 minutes

### 7. Humming Bee Breath
- Inhale through nose
- Exhale while humming
- Feel vibration
- Repeat 5-10 times

### 8. Lion's Breath
Tension release
- Inhale deeply
- Open mouth wide, stick tongue out
- Forcefully exhale "HAAAA"
- Repeat 3-5 times

## Situation-Specific Protocols

**Panic Attack:**
1. Physiological Sigh (3x)
2. Box Breathing (5 min)
3. 4-7-8 (4 rounds)

**Before Sleep:**
1. 4-7-8 (8 rounds)
2. Diaphragmatic (10 min)

**Before Stressful Event:**
1. Lion's Breath (3x)
2. Box Breathing (3 min)
3. Physiological Sigh (2x)

## Building Your Practice

**Week 1:** Learn diaphragmatic, practice 5 min 2x daily
**Week 2:** Add Box and 4-7-8, increase to 10 min
**Week 3:** Try all techniques, find favorites
**Week 4:** Daily habit, use throughout day

## Conclusion

Your breath is always with you—a free anxiety antidote that works instantly.

**Your First Step:** Right now, try one physiological sigh. Notice the difference.

Start with 2 minutes daily. When anxiety comes, you'll know what to do.
`,
    category: "mindfulness",
    type: "article",
    duration: "20 min read",
    difficulty: "beginner",
    tags: ["breathing", "anxiety", "stress-relief", "mindfulness", "panic-attacks", "relaxation"],
    author: "Breathwork Specialist Dr. Maria Santos",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
    isPublished: true,
    viewCount: 0
  },
  {
    title: "Guided Meditation for Stress Relief: Find Your Inner Peace",
    description: "Begin your meditation journey with confidence. Learn practical, accessible meditation techniques that reduce stress, improve focus, and cultivate lasting inner peace.",
    content: `
# The Transformative Power of Meditation

Research shows just 10 minutes daily can reduce stress by 40%, improve focus by 14%, and decrease anxiety by 60%.

## What Meditation Really Is

**Meditation IS:**
- Training attention
- Observing without judgment
- Being present
- Creating space between you and thoughts

**Meditation IS NOT:**
- Stopping all thoughts
- Achieving perfect peace
- Escaping problems

## The Science

**Brain Changes (8 weeks):**
- Increased hippocampus (memory)
- Decreased amygdala (fear)
- Thicker prefrontal cortex (decision-making)

**Benefits:**
- 40% reduction in cortisol
- 60% reduction in anxiety
- 56% improvement in sleep
- Lower blood pressure

## 6 Types of Meditation

### 1. Mindfulness Meditation
Focus on breath, return when mind wanders

### 2. Body Scan
Systematically bring awareness to each body part

### 3. Loving-Kindness
Cultivate compassion: "May I be happy, healthy, safe"

### 4. Guided Visualization
Use mental imagery to create calm

### 5. Breath Awareness
Focused attention on natural breath

### 6. Mantra Meditation
Repeat word/phrase: "peace," "om," "I am calm"

## 10-Minute Guided Meditation

**Minutes 0-2: Settling**
Sit comfortably. Notice body. Three deep breaths.

**Minutes 2-8: Breath Awareness**
Focus on breath. When mind wanders (it will), gently return. This IS the practice.

**Minutes 8-10: Expanding**
Expand awareness to sounds, body, space. Slowly open eyes.

## Building Your Practice

**Week 1:** 5 minutes daily, same time
**Week 2:** 10 minutes, try different types
**Week 3:** 15 minutes, add second session
**Week 4:** 20 minutes, add informal mindfulness

## Common Challenges

**"I can't stop thinking"**
You're not supposed to! Practice is noticing and returning.

**"I don't have time"**
Start with 5 minutes. It's an investment.

**"I feel more anxious"**
You're becoming aware of existing anxiety. Start with body scan.

**"Nothing is happening"**
Benefits are subtle and cumulative. Commit to 8 weeks.

## Meditation for Specific Needs

**Anxiety:** Breath awareness + body scan, 10-15 min, 2x daily
**Depression:** Loving-kindness + mindfulness, 15-20 min daily
**Sleep:** Body scan + breath, 15-30 min before bed
**Focus:** Breath counting + mindfulness, 10-20 min morning

## Informal Mindfulness

**Throughout Day:**
- Mindful first sip of coffee
- Mindful shower
- Mindful eating (one meal)
- One-breath meditation
- STOP practice (Stop, Take breath, Observe, Proceed)

## Resources

**Apps:** Headspace, Calm, Insight Timer, Ten Percent Happier

**Books:**
- "Wherever You Go, There You Are" by Jon Kabat-Zinn
- "Real Happiness" by Sharon Salzberg

## Conclusion

Meditation isn't about transcending life—it's about fully engaging with it. Not about perfection—it's about practice.

**Your First Sit:** Right now, 5 minutes. Close eyes. Follow breath. When mind wanders, return. That's meditation.

Start small, stay consistent. The present moment is waiting.
`,
    category: "mindfulness",
    type: "article",
    duration: "22 min read",
    difficulty: "beginner",
    tags: ["meditation", "mindfulness", "stress-relief", "guided-meditation", "relaxation", "inner-peace"],
    author: "Meditation Teacher James Wilson",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
    isPublished: true,
    viewCount: 0
  }
]

const seedProductionWellness = async () => {
  try {
    console.log('🔌 Connecting to PRODUCTION MongoDB Atlas...')
    await mongoose.connect(PRODUCTION_MONGODB_URI)
    console.log('✅ Connected to PRODUCTION MongoDB')

    console.log('🗑️  Deleting existing wellness resources...')
    const deleteResult = await WellnessResource.deleteMany({})
    console.log(`✅ Deleted ${deleteResult.deletedCount} existing resources`)

    console.log('🌱 Seeding comprehensive wellness resources to PRODUCTION...')
    const insertedResources = await WellnessResource.insertMany(comprehensiveWellnessResources)
    
    console.log(`✅ Successfully seeded ${insertedResources.length} detailed wellness resources to PRODUCTION!`)
    console.log('\n📊 Resources added to PRODUCTION:')
    insertedResources.forEach((resource, index) => {
      console.log(`   ${index + 1}. ${resource.title}`)
      console.log(`      - Category: ${resource.category}`)
      console.log(`      - Reading time: ${resource.duration}`)
      console.log(`      - Tags: ${resource.tags.slice(0, 3).join(', ')}`)
    })

    console.log('\n✅ PRODUCTION DATABASE UPDATED!')
    console.log('🚀 Your deployed website will now show the new content!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding PRODUCTION wellness resources:', error)
    process.exit(1)
  }
}

seedProductionWellness()
