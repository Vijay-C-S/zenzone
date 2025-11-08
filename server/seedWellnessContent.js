import mongoose from 'mongoose'
import dotenv from 'dotenv'
import WellnessResource from './models/WellnessResource.js'

dotenv.config()

const wellnessResources = [
  {
    title: "Self-Compassion and Inner Kindness",
    description: "Learn to treat yourself with the same kindness you'd offer a good friend. Building resilience and emotional wellbeing through self-compassion practices.",
    content: "# Self-Compassion and Inner Kindness\n\nSelf-compassion is the practice of treating yourself with the same kindness, concern, and understanding you would offer to a good friend. Research shows that self-compassion is strongly associated with emotional wellbeing, less anxiety and depression, and greater life satisfaction.\n\n## The Three Elements of Self-Compassion\n\n### 1. Self-Kindness vs. Self-Judgment\nBeing warm and understanding toward ourselves when we suffer, fail, or feel inadequate, rather than ignoring our pain or flagellating ourselves with self-criticism.\n\n### 2. Common Humanity vs. Isolation  \nRecognizing that suffering and personal inadequacy are part of the shared human experience – something we all go through rather than something that happens to 'me' alone.\n\n### 3. Mindfulness vs. Over-Identification\nTaking a balanced approach to negative emotions so that feelings are neither suppressed nor exaggerated.",
    category: "mindfulness",
    type: "article",
    duration: "15 min read",
    difficulty: "beginner",
    tags: ["self-compassion", "mindfulness", "emotional-wellbeing", "meditation"],
    author: "Dr. Sarah Johnson",
    imageUrl: "/images/self-compassion.jpg",
    isPublished: true
  },
  {
    title: "Nature Connection for Mental Health",
    description: "Discover how spending time in nature can significantly improve your mental health. Simple ways to incorporate outdoor activities into your daily routine.",
    content: "# Nature Connection for Mental Health\n\nScientific research increasingly shows that spending time in nature has profound effects on our mental health and overall wellbeing. From reducing stress and anxiety to improving mood and cognitive function, nature offers a powerful therapeutic tool.\n\n## The Science Behind Nature Therapy\n\nStudies show that just 20 minutes in nature can lower stress hormone levels. Forest bathing (Shinrin-yoku) has been shown to reduce cortisol levels by 12.4%, lower blood pressure, improve immune function, and reduce symptoms of depression and anxiety.\n\n## Simple Ways to Connect with Nature\n\n- Morning walks in local parks\n- Lunch breaks outdoors\n- Indoor plants and window gardens\n- Hiking local trails\n- Beach or lake visits\n- Gardening or community gardens",
    category: "general",
    type: "article",
    duration: "12 min read",
    difficulty: "beginner",
    tags: ["nature", "stress-relief", "outdoor-activities", "mindfulness"],
    author: "Michael Green",
    imageUrl: "/images/nature-therapy.jpg",
    isPublished: true
  },
  {
    title: "Stress Management in Daily Life",
    description: "Effective techniques to manage stress in your everyday routine. Learn practical strategies to reduce anxiety and stay calm under pressure.",
    content: "# Stress Management in Daily Life\n\nChronic stress affects every aspect of our lives – from sleep quality to immune function. Learning to manage stress effectively is crucial for long-term health and happiness.\n\n## Understanding Your Stress Response\n\nThe body's stress response (fight-or-flight) was designed for short-term threats, not modern chronic stressors. Recognizing your stress triggers and early warning signs is the first step to managing them effectively.\n\n## Daily Stress Management Techniques\n\n### Morning Routine (10 minutes)\n- 5 minutes of gentle stretching or yoga\n- 3 minutes of deep breathing\n- 2 minutes setting daily intentions\n\n### Throughout the Day\n- Micro-breaks: 2-minute breathing exercises every 2 hours\n- Mindful transitions: 30 seconds of awareness between tasks\n- Progressive muscle relaxation\n- Gratitude practice",
    category: "stress",
    type: "article",
    duration: "18 min read",
    difficulty: "beginner",
    tags: ["stress-management", "anxiety-relief", "daily-routine", "wellness"],
    author: "Dr. Lisa Martinez",
    imageUrl: "/images/stress-management.jpg",
    isPublished: true
  },
  {
    title: "Mindful Eating for Mental Wellness",
    description: "Discover how your relationship with food affects your mental health. Practical tips for developing a healthier, more mindful approach to eating.",
    content: "# Mindful Eating for Mental Wellness\n\nThe connection between what we eat and how we feel is profound. Mindful eating isn't just about nutrition – it's about developing a healthier relationship with food and using meals as opportunities for self-care and stress reduction.\n\n## What is Mindful Eating?\n\nMindful eating means paying full attention to the experience of eating and drinking, both inside and outside the body. It involves noticing colors, smells, textures, flavors, being aware of hunger and fullness cues, eating without distraction, and recognizing emotional vs. physical hunger.\n\n## The Gut-Brain Connection\n\nYour gut and brain are in constant communication. The gut produces 95% of your body's serotonin, and gut bacteria influence mood, anxiety, and cognitive function.\n\n### Foods That Support Mental Health\n- Omega-3 fatty acids: Salmon, walnuts, flaxseeds\n- Probiotics: Yogurt, kefir, kimchi\n- Complex carbs: Whole grains, legumes\n- B vitamins: Leafy greens, eggs",
    category: "general",
    type: "article",
    duration: "20 min read",
    difficulty: "intermediate",
    tags: ["mindful-eating", "nutrition", "mental-health", "wellness"],
    author: "Nutritionist Emma Williams",
    imageUrl: "/images/mindful-eating.jpg",
    isPublished: true
  },
  {
    title: "Building Healthy Boundaries",
    description: "Learn how to set and maintain healthy boundaries in relationships, work, and personal life for better mental health and wellbeing.",
    content: "# Building Healthy Boundaries\n\nHealthy boundaries are essential for mental wellness, healthy relationships, and self-respect. They define where you end and others begin, protecting your time, energy, and emotional wellbeing.\n\n## Types of Boundaries\n\n### Physical Boundaries\n- Personal space and touch\n- Privacy needs\n- Time for rest and self-care\n\n### Emotional Boundaries\n- Protecting your feelings\n- Not taking on others' emotions\n- Expressing your needs\n\n### Time Boundaries\n- Work-life balance\n- Personal time protection\n- Saying no to commitments\n\n## How to Set Healthy Boundaries\n\n1. Identify Your Limits - Ask yourself what makes you uncomfortable\n2. Communicate Clearly - Use 'I' statements\n3. Be Consistent - Follow through with consequences\n4. Start Small - Practice with safe people",
    category: "relationships",
    type: "article",
    duration: "22 min read",
    difficulty: "intermediate",
    tags: ["boundaries", "relationships", "self-care", "communication"],
    author: "Dr. James Chen",
    imageUrl: "/images/boundaries.jpg",
    isPublished: true
  },
  {
    title: "Breathing Exercises for Anxiety",
    description: "Simple breathing techniques to manage anxiety in the moment. Evidence-based practices you can use anywhere, anytime.",
    content: "# Breathing Exercises for Anxiety\n\nYour breath is the most accessible tool for managing anxiety. These evidence-based breathing techniques can quickly activate your parasympathetic nervous system, triggering the relaxation response.\n\n## The Science of Breath\n\nWhen anxious, breathing becomes shallow and rapid. This triggers more anxiety in a vicious cycle. Controlled breathing lowers heart rate and blood pressure, reduces cortisol, increases oxygen to the brain, and activates the vagus nerve.\n\n## Beginner Techniques\n\n### 1. Box Breathing (4-4-4-4)\nUsed by Navy SEALs for stress management:\n1. Inhale for 4 counts\n2. Hold for 4 counts\n3. Exhale for 4 counts\n4. Hold for 4 counts\n5. Repeat 4-5 times\n\n### 2. 4-7-8 Breathing\n1. Exhale completely through mouth\n2. Inhale through nose for 4 counts\n3. Hold breath for 7 counts\n4. Exhale through mouth for 8 counts\n\n### 3. Belly Breathing\n1. Place hand on belly\n2. Inhale deeply through nose, belly rises\n3. Exhale through mouth, belly falls",
    category: "anxiety",
    type: "exercise",
    duration: "15 min practice",
    difficulty: "beginner",
    tags: ["breathing", "anxiety", "panic-attacks", "stress-relief", "mindfulness"],
    author: "Yoga Therapist Rachel Adams",
    imageUrl: "/images/breathing.jpg",
    isPublished: true
  },
  {
    title: "Digital Detox: Reclaiming Your Mental Space",
    description: "Learn how to create healthy boundaries with technology and social media for improved mental health, focus, and wellbeing.",
    content: "# Digital Detox: Reclaiming Your Mental Space\n\nOur always-on digital culture is taking a toll on mental health. Research links excessive screen time to increased anxiety, depression, poor sleep, and decreased attention span. A digital detox isn't about abandoning technology – it's about using it intentionally.\n\n## Signs You Need a Digital Detox\n\n- Checking phone first thing upon waking\n- Phantom vibration syndrome\n- Anxiety when phone isn't nearby\n- Scrolling during meals or conversations\n- Difficulty focusing on one task\n- Sleep problems\n- Neck and shoulder pain\n\n## Creating Your Digital Wellness Plan\n\n### Time Boundaries\n- No screens first hour after waking\n- No screens last hour before bed\n- Tech-free meals\n- Phone-free Sundays\n\n### Space Boundaries\n- Bedroom is phone-free zone\n- Designated phone parking spot\n- Tech-free dining area\n\n### Replace Digital Habits\n- Read a physical book\n- Call a friend\n- Take a walk\n- Practice a hobby",
    category: "general",
    type: "article",
    duration: "25 min read",
    difficulty: "intermediate",
    tags: ["digital-detox", "technology", "social-media", "mindfulness", "productivity"],
    author: "Tech Wellness Coach David Park",
    imageUrl: "/images/digital-detox.jpg",
    isPublished: true
  },
  {
    title: "Guided Meditation for Stress Relief",
    description: "A 10-minute guided meditation session to release tension and find calm. Perfect for beginners and experienced meditators alike.",
    content: "# Guided Meditation for Stress Relief\n\nThis 10-minute guided meditation will help you release tension, quiet your mind, and find a sense of peace and calm. Find a comfortable seated or lying position, and let's begin.\n\n## Preparation (1 minute)\n\nFind a quiet space where you won't be disturbed. You can sit in a chair with feet flat on the floor, cross-legged on a cushion, or lie down on your back. Close your eyes or soften your gaze.\n\n## Body Scan (3 minutes)\n\nTake a deep breath in through your nose... and exhale slowly through your mouth. Let your body settle into your seat or the floor beneath you. Feel the support beneath you.\n\nBring awareness to your face. Notice any tension in your forehead, jaw, or around your eyes. As you exhale, let that tension melt away.\n\n## Breath Awareness (3 minutes)\n\nBring your full attention to your natural breath. Don't try to change it – just observe. Notice the cool air as you breathe in... the warm air as you breathe out.\n\nBegin to count your breaths. Inhale for a count of 4... hold for 1... exhale for a count of 6.\n\n## Visualization (2 minutes)\n\nImagine yourself in a place where you feel completely safe and peaceful. See the details of this place, notice the colors, textures, sounds.\n\n## Closing (1 minute)\n\nWhen you're ready, begin to deepen your breath. Wiggle your fingers and toes. Carry this sense of calm with you.",
    category: "mindfulness",
    type: "audio",
    duration: "10 minutes",
    difficulty: "beginner",
    tags: ["guided-meditation", "stress-relief", "mindfulness", "relaxation", "breathing"],
    author: "Meditation Teacher Maya Singh",
    imageUrl: "/images/guided-meditation.jpg",
    url: "https://example.com/meditation-audio",
    isPublished: true
  },
  {
    title: "Work-Life Balance Strategies",
    description: "Practical techniques for creating better work-life balance and preventing burnout in demanding careers and busy lifestyles.",
    content: "# Work-Life Balance Strategies\n\nIn our always-on culture, work-life balance has become increasingly challenging yet more important than ever. Chronic overwork leads to burnout, health problems, and decreased life satisfaction.\n\n## Understanding Work-Life Balance\n\nWork-life balance isn't about perfect 50-50 split. It's about feeling fulfilled in both areas, having energy for what matters, maintaining boundaries, and preventing burnout.\n\n## Creating Boundaries\n\n### Time Boundaries\n- Set specific work hours\n- Communicate them clearly\n- Stick to them consistently\n- Create transition rituals\n\n### Email Management\n- No email before 8 AM or after 6 PM\n- Turn off notifications outside work hours\n- Use auto-responders\n- Batch check emails 3x daily\n\n## Daily Balance Strategies\n\n### Morning (Before Work)\n- Wake up 30 minutes earlier\n- No work email before breakfast\n- Exercise or movement\n- Mindfulness practice\n\n### During Work\n- Take real lunch break\n- 5-minute breaks every hour\n- Walk meetings when possible\n\n### After Work\n- Hard stop time\n- Transition ritual\n- Quality time with loved ones\n- Hobbies or creative pursuits",
    category: "stress",
    type: "article",
    duration: "28 min read",
    difficulty: "intermediate",
    tags: ["work-life-balance", "burnout-prevention", "boundaries", "career", "wellbeing"],
    author: "Career Coach Jennifer Liu",
    imageUrl: "/images/work-life-balance.jpg",
    isPublished: true
  },
  {
    title: "Managing Depression: Self-Care Strategies",
    description: "Evidence-based self-care techniques to support your journey through depression. Practical daily actions that can help improve mood and wellbeing.",
    content: "# Managing Depression: Self-Care Strategies\n\nIf you're experiencing depression, know that you're not alone and help is available. While these self-care strategies can support your journey, they're meant to complement professional treatment, not replace it.\n\n## Important Note\n\nIf you're having thoughts of self-harm or suicide, please reach out immediately:\n- National Suicide Prevention Lifeline: 988\n- Crisis Text Line: Text HOME to 741741\n- Emergency Services: 911\n\n## Understanding Depression\n\nDepression is a medical condition, not a character flaw or weakness. It affects brain chemistry, thinking patterns, energy levels, and physical health.\n\n## Daily Self-Care Basics\n\n### Morning Routine (Even Small Steps Count)\n\n1. Get out of bed (even if just to couch)\n2. Open curtains for natural light\n3. Drink glass of water\n4. Take medications if prescribed\n5. Shower or wash face\n6. Get dressed (even in comfortable clothes)\n\n### Physical Self-Care\n\n- 10-minute walks\n- Gentle stretching\n- Regular meals\n- Stay hydrated\n- Consistent sleep schedule\n\n### Emotional Self-Care\n\n- Journal daily\n- Talk to trusted person\n- Join support group\n- Practice self-compassion\n\n## Building Support System\n\n- Therapist or counselor\n- Psychiatrist if needed\n- Support groups\n- Trusted friends/family",
    category: "depression",
    type: "article",
    duration: "30 min read",
    difficulty: "intermediate",
    tags: ["depression", "mental-health", "self-care", "coping-strategies", "wellbeing"],
    author: "Clinical Psychologist Dr. Amanda Foster",
    imageUrl: "/images/depression-care.jpg",
    isPublished: true
  }
]

async function seedWellness() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing wellness resources
    const deleteResult = await WellnessResource.deleteMany({})
    console.log(`🗑️ Deleted ${deleteResult.deletedCount} existing resources`)

    // Insert new resources
    const insertedResources = await WellnessResource.insertMany(wellnessResources)
    console.log(`✨ Inserted ${insertedResources.length} new wellness resources`)

    // Display summary
    console.log('\n📊 Wellness Library Summary:')
    const categories = await WellnessResource.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ])
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} resources`)
    })

    console.log('\n✅ Wellness content seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding wellness content:', error)
    process.exit(1)
  }
}

seedWellness()
