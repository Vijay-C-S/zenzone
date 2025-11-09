import express from 'express'
import { body, validationResult } from 'express-validator'
import WellnessResource from '../models/WellnessResource.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

// Enhanced validation rules for creating/updating wellness resources
const resourceValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('type').isIn(['article', 'video', 'audio', 'exercise', 'infographic', 'toolkit', 'assessment']).withMessage('Invalid resource type'),
  body('category').isIn(['anxiety', 'depression', 'stress', 'mindfulness', 'sleep', 'relationships', 'trauma', 'addiction', 'self-care', 'coping-skills', 'general']).withMessage('Invalid category'),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty level'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
]

// Get all wellness resources (public)
router.get('/', async (req, res) => {
  try {
    const { category, type, difficulty, page = 1, limit = 10, search } = req.query
    
    let query = { isPublished: true }
    
    if (category) query.category = category
    if (type) query.type = type
    if (difficulty) query.difficulty = difficulty
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }

    const resources = await WellnessResource.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-content') // Exclude content in list view

    const total = await WellnessResource.countDocuments(query)

    res.json({
      resources,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    })
  } catch (error) {
    console.error('Error fetching wellness resources:', error)
    res.status(500).json({ message: 'Failed to fetch wellness resources' })
  }
})

// Get single wellness resource (public)
router.get('/:id', async (req, res) => {
  try {
    const resource = await WellnessResource.findById(req.params.id)
    
    if (!resource || !resource.isPublished) {
      return res.status(404).json({ message: 'Resource not found' })
    }

    // Increment view count
    resource.viewCount += 1
    await resource.save()

    res.json(resource)
  } catch (error) {
    console.error('Error fetching wellness resource:', error)
    res.status(500).json({ message: 'Failed to fetch wellness resource' })
  }
})

// Get wellness statistics (public)
router.get('/stats/overview', async (req, res) => {
  try {
    const totalResources = await WellnessResource.countDocuments()
    const publishedResources = await WellnessResource.countDocuments({ isPublished: true })
    const draftResources = await WellnessResource.countDocuments({ isPublished: false })
    
    // Get category distribution
    const categoryStats = await WellnessResource.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Get type distribution
    const typeStats = await WellnessResource.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Get most viewed resources
    const popularResources = await WellnessResource.find({ isPublished: true })
      .sort({ viewCount: -1 })
      .limit(5)
      .select('title viewCount category type')

    res.json({
      totalResources,
      publishedResources,
      draftResources,
      categoryStats,
      typeStats,
      popularResources
    })
  } catch (error) {
    console.error('Error fetching wellness stats:', error)
    res.status(500).json({ message: 'Failed to fetch wellness statistics' })
  }
})

// Initialize comprehensive wellness library (temporarily public for seeding)
router.post('/init', async (req, res) => {
  try {
    const existingCount = await WellnessResource.countDocuments()
    if (existingCount > 0) {
      return res.json({ 
        message: 'Wellness library already initialized',
        existingCount,
        note: 'Delete existing resources first if you want to reinitialize'
      })
    }

    const comprehensiveResources = [
      // Anxiety Resources
      {
        title: "Understanding Anxiety: A Comprehensive Guide",
        description: "Learn about anxiety disorders, symptoms, and evidence-based treatment approaches. Includes practical coping strategies and professional guidance.",
        content: `Anxiety is one of the most common mental health conditions, affecting 1 in 8 people worldwide. This comprehensive guide covers:

**What is Anxiety?**
Anxiety is characterized by excessive fear and worry that can interfere with daily activities. It's important to understand that anxiety is a normal human emotion, but becomes problematic when it's persistent and overwhelming.

**Types of Anxiety Disorders:**
- Generalized Anxiety Disorder (GAD)
- Panic Disorder
- Social Anxiety Disorder
- Specific Phobias
- Separation Anxiety

**Evidence-Based Coping Strategies:**

1. **5-4-3-2-1 Grounding Technique**
   - 5 things you can see
   - 4 things you can touch
   - 3 things you can hear
   - 2 things you can smell
   - 1 thing you can taste

2. **Box Breathing**
   - Inhale for 4 counts
   - Hold for 4 counts
   - Exhale for 4 counts
   - Hold for 4 counts

3. **Progressive Muscle Relaxation**
   Start from your toes and work up, tensing and releasing each muscle group.

**When to Seek Professional Help:**
If anxiety interferes with your daily life, relationships, or work for more than two weeks, consider consulting a mental health professional.

**Treatment Options:**
- Cognitive Behavioral Therapy (CBT)
- Exposure Therapy
- Mindfulness-Based Stress Reduction
- Medication (when appropriate)
- Lifestyle modifications`,
        type: 'article',
        category: 'anxiety',
        difficulty: 'beginner',
        duration: '15 min read',
        tags: ['anxiety', 'coping skills', 'CBT', 'breathing', 'grounding'],
        author: 'ZenZone Clinical Team',
        isPublished: true,
        imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500'
      },
      {
        title: "Quick Anxiety Relief Techniques",
        description: "Immediate strategies you can use anywhere to manage anxiety symptoms. Perfect for panic attacks and acute anxiety episodes.",
        content: `When anxiety strikes, you need immediate relief techniques that work quickly and effectively. Here are evidence-based methods:

**STOP Technique:**
- **S**top what you're doing
- **T**ake a breath
- **O**bserve your thoughts and feelings
- **P**roceed with intention

**4-7-8 Breathing:**
1. Exhale completely
2. Inhale through nose for 4 counts
3. Hold breath for 7 counts
4. Exhale through mouth for 8 counts
5. Repeat 3-4 times

**Cold Water Technique:**
Splash cold water on your face or hold ice cubes to activate the mammalian dive reflex, which naturally calms your nervous system.

**Positive Self-Talk:**
- "This feeling will pass"
- "I am safe right now"
- "I have overcome anxiety before"
- "I can handle this situation"

**Emergency Grounding:**
- Name 3 red objects you can see
- Count backward from 100 by 7s
- List all the animals you can think of starting with 'C'

Remember: These techniques take practice. Try them when you're calm so they're available when you need them most.`,
        type: 'exercise',
        category: 'anxiety',
        difficulty: 'beginner',
        duration: '5-10 min',
        tags: ['anxiety', 'quick relief', 'breathing', 'grounding', 'panic'],
        author: 'ZenZone Clinical Team',
        isPublished: true,
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'
      },

      // Depression Resources
      {
        title: "Understanding Depression: Breaking Through the Darkness",
        description: "A comprehensive guide to understanding depression, its symptoms, and evidence-based approaches to recovery and healing.",
        content: `Depression affects 280 million people worldwide. Understanding it is the first step toward healing.

**What is Depression?**
Depression is more than just feeling sad. It's a persistent feeling of sadness, emptiness, or hopelessness that affects your ability to function in daily life.

**Common Symptoms:**
- Persistent sad or empty mood
- Loss of interest in activities
- Fatigue and decreased energy
- Difficulty concentrating
- Changes in appetite or sleep
- Feelings of worthlessness or guilt
- Thoughts of death or suicide

**The Science Behind Depression:**
Depression involves changes in brain chemistry, structure, and function. It's a real medical condition, not a character flaw or something you can "snap out of."

**Evidence-Based Treatment Approaches:**

1. **Cognitive Behavioral Therapy (CBT)**
   - Identifying negative thought patterns
   - Challenging distorted thinking
   - Developing healthier coping strategies

2. **Behavioral Activation**
   - Scheduling pleasant activities
   - Breaking tasks into manageable steps
   - Building routine and structure

3. **Mindfulness and Acceptance**
   - Observing thoughts without judgment
   - Accepting difficult emotions
   - Practicing self-compassion

**Self-Care Strategies:**
- Maintain regular sleep schedule
- Engage in regular physical activity
- Eat nutritious meals
- Stay connected with supportive people
- Practice stress management
- Limit alcohol and avoid drugs

**When to Seek Help:**
If you experience symptoms for more than two weeks, or if you have thoughts of self-harm, please reach out to a mental health professional immediately.

**Remember:** Depression is treatable. With proper support and treatment, people with depression can and do recover.`,
        type: 'article',
        category: 'depression',
        difficulty: 'beginner',
        duration: '20 min read',
        tags: ['depression', 'CBT', 'behavioral activation', 'self-care', 'recovery'],
        author: 'ZenZone Clinical Team',
        isPublished: true,
        imageUrl: 'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?w=500'
      },

      // Stress Management
      {
        title: "Master Your Stress: A Complete Guide to Stress Management",
        description: "Learn to understand, manage, and reduce stress with proven techniques. Includes workplace stress, relationship stress, and daily stressors.",
        content: `Stress is an inevitable part of life, but it doesn't have to control you. This guide provides comprehensive strategies for stress mastery.

**Understanding Stress:**
Stress is your body's response to any demand or threat. While some stress can be beneficial (eustress), chronic stress can harm your physical and mental health.

**Types of Stress:**
- **Acute Stress:** Short-term, immediate response to challenges
- **Chronic Stress:** Long-term stress from ongoing situations
- **Eustress:** Positive stress that motivates and energizes
- **Distress:** Negative stress that overwhelms and depletes

**The Stress Response System:**
Your body's fight-or-flight response involves:
- Increased heart rate and blood pressure
- Release of stress hormones (cortisol, adrenaline)
- Heightened alertness and muscle tension
- Rapid breathing

**Effective Stress Management Techniques:**

1. **Time Management:**
   - Prioritize tasks using the Eisenhower Matrix
   - Break large projects into smaller steps
   - Use time-blocking for focused work
   - Learn to say "no" to non-essential commitments

2. **Relaxation Techniques:**
   - Deep breathing exercises
   - Progressive muscle relaxation
   - Guided imagery
   - Mindfulness meditation

3. **Physical Stress Relief:**
   - Regular exercise (even 10 minutes helps)
   - Yoga or tai chi
   - Walking in nature
   - Dancing or other enjoyable movement

4. **Cognitive Strategies:**
   - Challenge negative self-talk
   - Practice gratitude
   - Reframe stressful situations
   - Focus on what you can control

5. **Lifestyle Modifications:**
   - Maintain regular sleep schedule
   - Eat balanced, nutritious meals
   - Limit caffeine and alcohol
   - Create boundaries between work and personal life

**Building Stress Resilience:**
- Develop strong social connections
- Practice self-compassion
- Maintain perspective during difficult times
- Cultivate hobbies and interests
- Regular self-care practices

**Emergency Stress Relief:**
When stress feels overwhelming:
1. Take 10 deep breaths
2. Step away from the stressor if possible
3. Use the 5-4-3-2-1 grounding technique
4. Call a trusted friend or family member
5. Engage in brief physical activity

Remember: Managing stress is a skill that improves with practice. Be patient with yourself as you develop these techniques.`,
        type: 'article',
        category: 'stress',
        difficulty: 'intermediate',
        duration: '25 min read',
        tags: ['stress management', 'relaxation', 'time management', 'resilience', 'coping'],
        author: 'ZenZone Clinical Team',
        isPublished: true,
        imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=500'
      },

      // Mindfulness Resources
      {
        title: "Mindfulness for Beginners: A Complete Guide",
        description: "Start your mindfulness journey with this comprehensive beginner's guide. Includes meditation techniques, daily practices, and scientific benefits.",
        content: `Mindfulness is the practice of being fully present and engaged in the current moment. This guide will help you develop a sustainable mindfulness practice.

**What is Mindfulness?**
Mindfulness is the basic human ability to be fully present, aware of where we are and what we're doing, and not overly reactive or overwhelmed by what's happening around us.

**Benefits of Mindfulness (Research-Backed):**
- Reduced anxiety and depression
- Improved emotional regulation
- Enhanced focus and concentration
- Better sleep quality
- Reduced chronic pain
- Improved immune function
- Increased self-awareness
- Better relationships

**Core Mindfulness Principles:**

1. **Present Moment Awareness**
   - Focus on the here and now
   - Notice when your mind wanders
   - Gently return attention to the present

2. **Non-Judgmental Observation**
   - Observe thoughts and feelings without criticism
   - Accept experiences as they are
   - Cultivate curiosity rather than judgment

3. **Acceptance**
   - Acknowledge difficult emotions without trying to change them
   - Practice self-compassion
   - Allow experiences to unfold naturally

**Basic Mindfulness Exercises:**

**1. Mindful Breathing (5-10 minutes)**
- Sit comfortably with eyes closed or softly focused
- Notice your natural breath
- When mind wanders, gently return to breath
- No need to change your breathing pattern

**2. Body Scan Meditation (10-20 minutes)**
- Lie down comfortably
- Start at your toes, notice sensations
- Slowly move attention up through your body
- Don't try to change anything, just observe

**3. Mindful Walking**
- Walk slowly and deliberately
- Feel your feet touching the ground
- Notice the rhythm of your steps
- Observe your surroundings without judgment

**4. The RAIN Technique** (for difficult emotions)
- **R**ecognize what's happening
- **A**llow the experience to be there
- **I**nvestigate with kindness
- **N**on-attachment (let the experience come and go)

**Daily Mindfulness Practices:**
- Mindful eating: Pay attention to taste, texture, smell
- Mindful listening: Give full attention to sounds around you
- Mindful daily activities: Washing dishes, brushing teeth, etc.
- Mindful technology use: Take breaks, notice your relationship with devices

**Starting Your Practice:**
1. Begin with 5 minutes daily
2. Choose a consistent time (morning often works well)
3. Find a quiet, comfortable space
4. Use guided meditations when starting
5. Be patient and kind with yourself
6. Track your practice to build momentum

**Common Challenges and Solutions:**
- **"I can't stop thinking"** → Thinking is normal; just notice and return to your anchor
- **"I don't have time"** → Even 3 minutes can be beneficial
- **"I'm not doing it right"** → There's no perfect way; awareness itself is the practice
- **"I feel more anxious"** → This can be normal initially; consider shorter sessions

**Apps and Resources:**
While developing your own practice is valuable, guided meditations can be helpful for beginners. Look for evidence-based apps and programs.

Remember: Mindfulness is a practice, not a performance. The goal isn't to clear your mind but to develop a different relationship with your thoughts and experiences.`,
        type: 'article',
        category: 'mindfulness',
        difficulty: 'beginner',
        duration: '30 min read',
        tags: ['mindfulness', 'meditation', 'present moment', 'awareness', 'RAIN technique'],
        author: 'ZenZone Clinical Team',
        isPublished: true,
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'
      },

      // Coping Skills Toolkit
      {
        title: "Emergency Coping Skills Toolkit: Quick Strategies for Crisis Moments",
        description: "A comprehensive toolkit of evidence-based coping strategies for moments of intense emotional distress, panic, or crisis situations.",
        content: `This toolkit provides immediate, evidence-based strategies for managing intense emotional distress, panic attacks, and crisis moments.

**When to Use This Toolkit:**
- During panic attacks or intense anxiety
- When experiencing overwhelming sadness or anger
- During flashbacks or trauma responses
- When having thoughts of self-harm
- In any moment of acute emotional distress

**IMMEDIATE CRISIS RESOURCES:**
- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- Emergency Services: 911
- If you're in immediate danger, call emergency services

**The TIPP Technique** (for extreme distress):

**T - Temperature**
- Splash cold water on your face
- Hold ice cubes in your hands
- Take a cold shower
- Step outside in cold air
This activates the mammalian dive reflex, quickly calming your nervous system

**I - Intense Exercise**
- Do jumping jacks for 5-10 minutes
- Run up and down stairs
- Do push-ups or burpees
- Dance energetically
This burns off excess adrenaline and stress hormones

**P - Paced Breathing**
- Box breathing: 4-4-4-4 pattern
- 4-7-8 breathing: inhale 4, hold 7, exhale 8
- Long exhale breathing: inhale 4, exhale 8
- Breathe slowly and deeply

**P - Progressive Muscle Relaxation**
- Tense and release muscle groups
- Start with toes, work up to head
- Hold tension for 5 seconds, release for 15
- Focus on the contrast between tension and relaxation

**The 5-4-3-2-1 Grounding Technique:**
When feeling disconnected or dissociated:
- **5** things you can see
- **4** things you can touch
- **3** things you can hear
- **2** things you can smell
- **1** thing you can taste

**STOP Technique:**
- **S**top what you're doing
- **T**ake a breath
- **O**bserve your thoughts, feelings, and body sensations
- **P**roceed with intention

**Emergency Coping Kit:**
Keep these items accessible:
- Ice cubes or cooling gel pack
- Essential oils (lavender, peppermint)
- Stress ball or fidget toy
- Emergency contact numbers
- List of your personal coping strategies
- Comfort items (soft blanket, photos)

Remember: Coping skills take practice. What works varies from person to person. It's okay to need professional help. Crisis moments are temporary. You have survived 100% of your difficult days so far.`,
        type: 'toolkit',
        category: 'coping-skills',
        difficulty: 'beginner',
        duration: '10-30 min',
        tags: ['coping skills', 'crisis', 'TIPP', 'grounding', 'emotional regulation', 'emergency'],
        author: 'ZenZone Clinical Team',
        isPublished: true,
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500'
      }
    ]

    await WellnessResource.insertMany(comprehensiveResources)
    
    res.json({ 
      message: 'Comprehensive wellness library initialized successfully',
      resourcesAdded: comprehensiveResources.length
    })
  } catch (error) {
    console.error('Error initializing wellness library:', error)
    res.status(500).json({ message: 'Failed to initialize wellness library' })
  }
})

// Admin routes for managing wellness resources

// Create new wellness resource (admin only)
router.post('/', authenticate, resourceValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const resource = new WellnessResource({
      ...req.body,
      author: req.user.name || 'ZenZone Team'
    })

    await resource.save()
    res.status(201).json(resource)
  } catch (error) {
    console.error('Error creating wellness resource:', error)
    res.status(500).json({ message: 'Failed to create wellness resource' })
  }
})

// Update wellness resource (admin only)
router.put('/:id', authenticate, resourceValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const resource = await WellnessResource.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' })
    }

    res.json(resource)
  } catch (error) {
    console.error('Error updating wellness resource:', error)
    res.status(500).json({ message: 'Failed to update wellness resource' })
  }
})

// Delete wellness resource (admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const resource = await WellnessResource.findByIdAndDelete(req.params.id)
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' })
    }

    res.json({ message: 'Resource deleted successfully' })
  } catch (error) {
    console.error('Error deleting wellness resource:', error)
    res.status(500).json({ message: 'Failed to delete wellness resource' })
  }
})

export default router

// Quick seed endpoint (remove after seeding production)
router.post('/seed', async (req, res) => {
  try {
    const count = await WellnessResource.countDocuments()
    if (count > 0) {
      return res.json({ 
        message: 'Database already has resources', 
        count,
        note: 'Use DELETE /api/wellness/seed to clear first'
      })
    }

    const resources = [
      {
        title: "Self-Compassion and Inner Kindness",
        description: "Learn to treat yourself with the same kindness you'd offer a good friend. Building resilience and emotional wellbeing through self-compassion practices.",
        content: "Self-compassion is the practice of treating yourself with the same kindness, concern, and understanding you would offer to a good friend. Research shows that self-compassion is strongly associated with emotional wellbeing, less anxiety and depression, and greater life satisfaction.",
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
        content: "Scientific research increasingly shows that spending time in nature has profound effects on our mental health and overall wellbeing. From reducing stress and anxiety to improving mood and cognitive function, nature offers a powerful therapeutic tool.",
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
        content: "Chronic stress affects every aspect of our lives – from sleep quality to immune function. Learning to manage stress effectively is crucial for long-term health and happiness.",
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
        content: "The connection between what we eat and how we feel is profound. Mindful eating isn't just about nutrition – it's about developing a healthier relationship with food and using meals as opportunities for self-care and stress reduction.",
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
        content: "Healthy boundaries are essential for mental wellness, healthy relationships, and self-respect. They define where you end and others begin, protecting your time, energy, and emotional wellbeing.",
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
        content: "Your breath is the most accessible tool for managing anxiety. These evidence-based breathing techniques can quickly activate your parasympathetic nervous system, triggering the relaxation response.",
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
        content: "Our always-on digital culture is taking a toll on mental health. Research links excessive screen time to increased anxiety, depression, poor sleep, and decreased attention span. A digital detox isn't about abandoning technology – it's about using it intentionally.",
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
        content: "This 10-minute guided meditation will help you release tension, quiet your mind, and find a sense of peace and calm. Find a comfortable seated or lying position, and let's begin.",
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
        content: "In our always-on culture, work-life balance has become increasingly challenging yet more important than ever. Chronic overwork leads to burnout, health problems, and decreased life satisfaction.",
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
        content: "If you're experiencing depression, know that you're not alone and help is available. While these self-care strategies can support your journey, they're meant to complement professional treatment, not replace it.",
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

    await WellnessResource.insertMany(resources)
    const newCount = await WellnessResource.countDocuments()

    res.json({ 
      success: true,
      message: 'Wellness resources seeded successfully!',
      resourcesAdded: resources.length,
      totalResources: newCount
    })
  } catch (error) {
    console.error('Seed error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Clear all resources (use with caution!)
router.delete('/seed', async (req, res) => {
  try {
    const result = await WellnessResource.deleteMany({})
    res.json({ 
      message: 'All wellness resources deleted',
      deletedCount: result.deletedCount
    })
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({ error: error.message })
  }
})
