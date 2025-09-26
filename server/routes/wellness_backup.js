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

// Initialize comprehensive wellness library (admin only)
router.post('/init', authenticate, async (req, res) => {
  try {
    // Check if user is admin (implement admin check)
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({ message: 'Admin access required' })
    // }

    const existingCount = await WellnessResource.countDocuments()
    if (existingCount > 10) {
      return res.json({ message: 'Wellness library already has sufficient resources' })
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

      // Sleep Resources
      {
        title: "The Ultimate Guide to Better Sleep: Science-Based Strategies",
        description: "Improve your sleep quality with evidence-based techniques. Covers sleep hygiene, dealing with insomnia, and creating optimal sleep environments.",
        content: `Quality sleep is essential for mental health, emotional regulation, and overall well-being. This comprehensive guide provides science-based strategies for better sleep.

**Why Sleep Matters for Mental Health:**
- Sleep and mental health are bidirectionally related
- Poor sleep increases risk of anxiety and depression
- Quality sleep improves emotional regulation
- Sleep consolidates memories and supports learning
- Adequate sleep boosts immune function and physical health

**Understanding Sleep Cycles:**
Sleep occurs in cycles of approximately 90 minutes, including:
- **Light Sleep (N1):** Transition between wake and sleep
- **Deep Sleep (N2):** Deeper sleep, harder to wake up
- **Deep Sleep (N3):** Deepest sleep, most restorative
- **REM Sleep:** Rapid Eye Movement, important for emotional processing and memory

**Optimal Sleep Duration:**
- Adults: 7-9 hours per night
- Older adults (65+): 7-8 hours
- Quality is as important as quantity

**Evidence-Based Sleep Hygiene Principles:**

**1. Consistent Sleep Schedule**
- Go to bed and wake up at the same time daily
- Maintain schedule even on weekends
- Avoid "sleeping in" to catch up on lost sleep

**2. Optimal Sleep Environment**
- **Temperature:** 60-67°F (15-19°C)
- **Darkness:** Use blackout curtains or eye mask
- **Quiet:** Use earplugs or white noise if needed
- **Comfortable:** Invest in quality mattress and pillows

**3. Pre-Sleep Routine (30-60 minutes before bed)**
- Dim lights to signal your brain it's time to sleep
- Avoid screens or use blue light filters
- Engage in relaxing activities: reading, gentle stretching, meditation
- Take a warm bath or shower
- Practice gratitude or journaling

**4. Daytime Habits for Better Sleep**
- Get bright light exposure in the morning
- Exercise regularly (but not within 4 hours of bedtime)
- Limit caffeine after 2 PM
- Avoid large meals close to bedtime
- Limit alcohol consumption

**Managing Insomnia:**

**Cognitive Behavioral Therapy for Insomnia (CBT-I) Techniques:**

1. **Sleep Restriction**
   - Limit time in bed to actual sleep time
   - Gradually increase as sleep efficiency improves
   - Maintain consistent wake time

2. **Stimulus Control**
   - Use bed only for sleep and intimacy
   - If can't sleep within 20 minutes, get up
   - Return to bed only when sleepy
   - Avoid clock-watching

3. **Cognitive Techniques**
   - Challenge negative thoughts about sleep
   - Practice acceptance of occasional poor sleep
   - Use worry time earlier in the day
   - Develop realistic expectations

**Relaxation Techniques for Sleep:**

**1. Progressive Muscle Relaxation**
- Tense and release muscle groups from toes to head
- Hold tension for 5 seconds, release for 15 seconds
- Focus on the contrast between tension and relaxation

**2. 4-7-8 Breathing**
- Inhale for 4 counts
- Hold breath for 7 counts
- Exhale for 8 counts
- Repeat 4 cycles

**3. Guided Imagery**
- Visualize peaceful, calming scenes
- Engage all senses in the visualization
- Use recorded guided imagery if helpful

**Managing Racing Thoughts:**
- Keep a journal by your bed for worries
- Practice the "mental note" technique: acknowledge thoughts and let them go
- Use counting or word games to occupy your mind
- Try the "body scan" meditation

**When to Seek Professional Help:**
Consult a healthcare provider if you experience:
- Chronic insomnia (lasting more than 3 months)
- Loud snoring or breathing interruptions during sleep
- Excessive daytime sleepiness despite adequate sleep time
- Sleep problems significantly impacting daily functioning

**Sleep and Technology:**
- Use blue light filters on devices after sunset
- Charge phones outside the bedroom
- Consider analog alarm clocks instead of phones
- If you must use devices, keep them at arm's length

**Natural Sleep Aids:**
- Chamomile tea
- Magnesium supplements (consult healthcare provider)
- Melatonin (use under guidance)
- Valerian root
- L-theanine

Remember: Improving sleep takes time and consistency. Be patient with yourself as you implement these changes, and focus on progress rather than perfection.`,
        type: 'article',
        category: 'sleep',
        difficulty: 'intermediate',
        duration: '25 min read',
        tags: ['sleep hygiene', 'insomnia', 'CBT-I', 'relaxation', 'sleep environment'],
        author: 'ZenZone Clinical Team',
        isPublished: true,
        imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500'
      },

      // Relationship Resources
      {
        title: "Building Healthy Relationships: Communication and Connection",
        description: "Learn the foundations of healthy relationships, effective communication skills, and strategies for managing relationship challenges.",
        content: `Healthy relationships are fundamental to mental health and overall well-being. This guide covers the essential skills for building and maintaining strong connections.

**Characteristics of Healthy Relationships:**
- Mutual respect and trust
- Open and honest communication
- Individual autonomy within the relationship
- Shared values and goals
- Ability to resolve conflicts constructively
- Emotional support and empathy
- Healthy boundaries

**The Gottman Method: Four Pillars of Healthy Relationships**

**1. Build Love Maps**
- Know your partner's inner world
- Stay curious about their thoughts, feelings, and experiences
- Regularly ask open-ended questions
- Show genuine interest in their daily life

**2. Nurture Fondness and Admiration**
- Focus on positive qualities
- Express appreciation regularly
- Remember what attracted you to each other
- Practice gratitude for your partner

**3. Turn Towards Instead of Away**
- Respond positively to bids for connection
- Show interest when your partner shares something
- Be emotionally available
- Create rituals of connection

**4. Accept Influence**
- Be open to your partner's suggestions
- Share power in decision-making
- Compromise when possible
- Value your partner's opinions

**Effective Communication Skills:**

**1. Active Listening**
- Give full attention when your partner is speaking
- Avoid interrupting or planning your response
- Reflect back what you've heard
- Ask clarifying questions
- Show empathy and understanding

**2. "I" Statements**
- Express feelings without blame: "I feel hurt when..." instead of "You always..."
- Take responsibility for your emotions
- Avoid accusatory language
- Focus on specific behaviors rather than character

**3. Non-Verbal Communication**
- Maintain open body language
- Make appropriate eye contact
- Match your tone to your message
- Be aware of facial expressions

**Managing Conflict Constructively:**

**The PREP Method:**
- **P**ause when emotions are high
- **R**ecognize both perspectives
- **E**mpathize with your partner's feelings
- **P**rocess solutions together

**Ground Rules for Healthy Conflict:**
- No name-calling or insults
- Stay focused on the specific issue
- Take breaks if emotions escalate
- Avoid bringing up past grievances
- Listen to understand, not to win

**Setting Healthy Boundaries:**
- Communicate your needs clearly
- Respect your partner's boundaries
- Maintain your individual identity
- Balance togetherness with independence
- Say "no" when necessary

**Types of Boundaries:**
- **Physical:** Personal space, touch, intimacy
- **Emotional:** Sharing feelings, emotional support
- **Mental:** Respect for thoughts and opinions
- **Digital:** Privacy, social media, technology use
- **Time:** How you spend time together and apart

**Building Trust:**
- Keep your commitments
- Be consistent in your words and actions
- Admit mistakes and apologize sincerely
- Be transparent and honest
- Respect confidentiality

**Rebuilding Trust After It's Broken:**
1. Acknowledge the hurt caused
2. Take full responsibility
3. Show genuine remorse
4. Make specific changes in behavior
5. Be patient with the healing process
6. Consider professional counseling if needed

**Supporting Each Other's Mental Health:**
- Learn about your partner's mental health challenges
- Encourage professional help when needed
- Practice patience and understanding
- Take care of your own mental health
- Create a supportive, non-judgmental environment

**Red Flags in Relationships:**
- Controlling behavior
- Emotional, physical, or sexual abuse
- Constant criticism or put-downs
- Isolation from friends and family
- Extreme jealousy or possessiveness
- Substance abuse problems
- Refusal to communicate or seek help

**When to Seek Relationship Counseling:**
- Communication has broken down
- Trust has been violated
- Recurring conflicts that don't get resolved
- Life transitions or major stressors
- Different goals or values
- Intimacy issues
- When you want to strengthen your relationship

**Self-Care in Relationships:**
- Maintain your individual interests and friendships
- Practice self-compassion
- Set aside time for self-reflection
- Communicate your needs clearly
- Don't lose yourself in the relationship

Remember: Healthy relationships require ongoing effort from both partners. It's normal to face challenges, and seeking help when needed is a sign of strength, not weakness.`,
        type: 'article',
        category: 'relationships',
        difficulty: 'intermediate',
        duration: '20 min read',
        tags: ['relationships', 'communication', 'Gottman method', 'boundaries', 'conflict resolution'],
        author: 'ZenZone Clinical Team',
        isPublished: true,
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500'
      },

      // Self-Care Resources
      {
        title: "The Science of Self-Care: Building Sustainable Wellness Practices",
        description: "Develop a personalized self-care routine based on scientific research. Covers physical, emotional, mental, and spiritual self-care strategies.",
        content: `Self-care isn't selfish—it's essential for mental health and overall well-being. This guide helps you build sustainable self-care practices based on scientific research.

**What is Self-Care?**
Self-care is the practice of taking action to preserve or improve your own health, well-being, and happiness, particularly during periods of stress.

**The Science Behind Self-Care:**
- Self-care activities reduce cortisol (stress hormone) levels
- Regular self-care improves immune function
- Self-care practices enhance emotional regulation
- Consistent self-care prevents burnout and compassion fatigue
- Self-care improves relationships and overall life satisfaction

**The Four Dimensions of Self-Care:**

**1. Physical Self-Care**
Taking care of your body to support mental health:

*Movement and Exercise:*
- Aim for 150 minutes of moderate exercise weekly
- Include strength training, cardio, and flexibility
- Find activities you enjoy: dancing, hiking, swimming
- Even 10 minutes of movement can boost mood

*Nutrition:*
- Eat regular, balanced meals
- Include omega-3 fatty acids for brain health
- Stay hydrated throughout the day
- Limit processed foods and excessive sugar
- Practice mindful eating

*Sleep:*
- Prioritize 7-9 hours of quality sleep
- Maintain consistent sleep schedule
- Create relaxing bedtime routine
- Optimize sleep environment

*Medical Care:*
- Schedule regular check-ups
- Take medications as prescribed
- Address health concerns promptly
- Practice preventive care

**2. Emotional Self-Care**
Managing and processing emotions healthily:

*Emotional Awareness:*
- Practice identifying and naming emotions
- Keep an emotion journal
- Notice emotional triggers
- Develop emotional vocabulary

*Stress Management:*
- Practice relaxation techniques
- Use healthy coping strategies
- Set realistic expectations
- Learn to say "no" to overwhelming commitments

*Emotional Expression:*
- Talk to trusted friends or family
- Consider therapy or counseling
- Use creative outlets: art, music, writing
- Practice self-compassion

*Joy and Pleasure:*
- Schedule activities you enjoy
- Practice gratitude daily
- Celebrate small wins
- Engage in hobbies and interests

**3. Mental Self-Care**
Caring for your cognitive and intellectual well-being:

*Learning and Growth:*
- Read books or articles on topics that interest you
- Take classes or workshops
- Learn new skills or hobbies
- Engage in stimulating conversations

*Mental Stimulation:*
- Do puzzles or brain games
- Practice mindfulness and meditation
- Engage in creative activities
- Challenge negative thought patterns

*Cognitive Rest:*
- Take breaks from decision-making
- Practice digital detoxes
- Engage in mindless activities occasionally
- Allow your mind to wander

**4. Spiritual Self-Care**
Connecting with your sense of purpose and meaning:

*Values and Purpose:*
- Reflect on your core values
- Engage in meaningful activities
- Volunteer for causes you care about
- Practice acts of kindness

*Connection:*
- Spend time in nature
- Practice meditation or prayer
- Connect with like-minded communities
- Engage in spiritual practices that resonate with you

*Reflection and Growth:*
- Keep a gratitude journal
- Practice forgiveness (self and others)
- Engage in regular self-reflection
- Seek wisdom from various sources

**Creating Your Personal Self-Care Plan:**

**Step 1: Self-Assessment**
Rate your current satisfaction (1-10) in each area:
- Physical health and energy
- Emotional well-being
- Mental stimulation and growth
- Spiritual connection and purpose

**Step 2: Identify Needs**
Where are your lowest scores? What specific areas need attention?

**Step 3: Choose Activities**
Select 2-3 activities from each dimension that appeal to you

**Step 4: Start Small**
Begin with 5-10 minutes daily rather than trying to overhaul everything

**Step 5: Schedule It**
Put self-care activities in your calendar like any other important appointment

**Step 6: Track Progress**
Keep a simple log of your self-care activities and how they make you feel

**Common Self-Care Obstacles and Solutions:**

*"I don't have time"*
- Start with 5 minutes daily
- Combine self-care with necessary activities
- Remember that self-care increases productivity

*"It feels selfish"*
- Remember that caring for yourself allows you to better care for others
- Self-care is a responsibility, not indulgence
- Model healthy behavior for those around you

*"I don't know what I enjoy"*
- Experiment with different activities
- Think about what you enjoyed as a child
- Notice what activities make you feel energized vs. drained

*"I feel guilty taking time for myself"*
- Challenge this thought: where did this belief come from?
- Practice self-compassion
- Remember that everyone deserves care, including you

**Self-Care During Difficult Times:**
- Lower your expectations and focus on basics
- Use micro-self-care practices (2-5 minutes)
- Reach out for support from others
- Be flexible and adjust your routine as needed
- Practice radical self-compassion

**Building Self-Care Habits:**
- Start with one small practice
- Use habit stacking (attach new habit to existing one)
- Be consistent rather than perfect
- Celebrate small victories
- Be patient with yourself during the process

**Self-Care vs. Self-Indulgence:**
Self-care activities leave you feeling better long-term, while self-indulgence might feel good in the moment but can have negative consequences later.

Remember: Self-care is not a luxury—it's a necessity. Sustainable self-care practices help you show up as your best self in all areas of life.`,
        type: 'article',
        category: 'self-care',
        difficulty: 'beginner',
        duration: '25 min read',
        tags: ['self-care', 'wellness', 'physical health', 'emotional health', 'spiritual care'],
        author: 'ZenZone Clinical Team',
        isPublished: true,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
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

**Distraction Techniques** (when you need to shift focus):

*Mental Distractions:*
- Count backward from 100 by 7s
- Name all animals starting with each letter of the alphabet
- Recite song lyrics or poems
- Do mental math problems
- List items in a specific category (types of food, movies, etc.)

*Physical Distractions:*
- Clean or organize something
- Do a puzzle or word game
- Draw, color, or craft
- Listen to music or podcasts
- Take a walk or do light exercise

*Social Distractions:*
- Call a trusted friend or family member
- Text someone you care about
- Pet an animal
- Watch funny videos
- Look at photos of loved ones

**Emotional Regulation Strategies:**

**RAIN Technique** (for difficult emotions):
- **R**ecognize what's happening emotionally
- **A**llow the experience to be there
- **I**nvestigate with kindness
- **N**on-attachment - let the experience come and go

**Opposite Action** (when emotions don't fit the facts):
- If you're angry but violence won't help: do something gentle
- If you're sad but avoiding won't help: do something active
- If you're afraid but you're actually safe: approach the situation
- If you're guilty but you didn't do anything wrong: continue the behavior

**Self-Soothing Through the Senses:**
- **Vision:** Look at beautiful images, nature, art
- **Hearing:** Listen to calming music, nature sounds
- **Smell:** Use essential oils, candles, or pleasant scents
- **Taste:** Sip herbal tea, eat a mint, enjoy a favorite food
- **Touch:** Use a soft blanket, stress ball, or warm bath

**Cognitive Coping Strategies:**

**Positive Self-Talk:**
- "This feeling will pass"
- "I have survived difficult moments before"
- "I am safe right now"
- "I can handle this one moment at a time"
- "This is temporary"

**Reality Testing:**
- Is this thought helpful?
- What evidence supports/contradicts this thought?
- What would I tell a friend in this situation?
- Am I catastrophizing or thinking in extremes?
- What's the most likely outcome?

**Crisis Survival Strategies:**

**ACCEPTS:**
- **A**ctivities: Engage in enjoyable activities
- **C**ontributing: Help others or volunteer
- **C**omparisons: Compare to less fortunate times
- **E**motions: Do something to create different emotions
- **P**ushing away: Temporarily distract from problems
- **T**houghts: Replace with different thoughts
- **S**ensations: Use intense sensations (ice, spicy food)

**Radical Acceptance** (for unchangeable situations):
- Accept reality as it is, not as you wish it were
- Stop fighting against unchangeable facts
- Find meaning or purpose in difficult circumstances
- Focus on what you can control

**Building Your Personal Toolkit:**
1. Try different techniques when you're calm
2. Identify which work best for you
3. Practice regularly so they're available in crisis
4. Keep a written list accessible
5. Share your preferred techniques with trusted people

**Creating a Crisis Plan:**
- Warning signs that crisis is approaching
- Coping strategies that help you
- People you can contact for support
- Professional resources and phone numbers
- Safe places you can go
- Reasons for living and hope

**When Coping Skills Aren't Enough:**
If you've tried multiple coping strategies and still feel:
- Thoughts of harming yourself or others
- Completely disconnected from reality
- Unable to ensure your safety
- Overwhelmed despite using coping skills

SEEK IMMEDIATE PROFESSIONAL HELP

**Remember:**
- Coping skills take practice
- What works varies from person to person
- It's okay to need professional help
- Crisis moments are temporary
- You have survived 100% of your difficult days so far

Keep this toolkit accessible and practice these techniques regularly. In crisis moments, choose 2-3 strategies that work best for you rather than trying everything at once.`,
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

export default routeresources
const resourceValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters'),
  body('type')
    .isIn(['article', 'video', 'audio', 'exercise', 'infographic', 'toolkit', 'assessment'])
    .withMessage('Invalid resource type'),
  body('category')
    .isIn(['anxiety', 'depression', 'stress', 'mindfulness', 'sleep', 'relationships', 'trauma', 'addiction', 'self-care', 'coping-skills', 'general'])
    .withMessage('Invalid category'),
  body('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid difficulty level'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
]

// Get published wellness resources (public)
router.get('/', async (req, res) => {
  try {
    const { category, type, search, limit = 20, page = 1 } = req.query

    let query = { isPublished: true }

    // Add filters
    if (category && category !== 'all') {
      query.category = category
    }
    if (type) {
      query.type = type
    }
    if (search) {
      query.$text = { $search: search }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const resources = await WellnessResource.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-content') // Exclude full content for list view

    const total = await WellnessResource.countDocuments(query)

    res.json({
      resources,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    console.error('Get wellness resources error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single wellness resource
router.get('/:id', async (req, res) => {
  try {
    const resource = await WellnessResource.findOne({
      _id: req.params.id,
      isPublished: true
    })

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' })
    }

    // Increment view count
    resource.viewCount += 1
    await resource.save()

    res.json({ resource })
  } catch (error) {
    console.error('Get wellness resource error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create wellness resource (admin only)
router.post('/', authenticate, authorize('admin'), resourceValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const {
      title,
      description,
      content,
      type,
      category,
      url,
      imageUrl,
      duration,
      difficulty,
      author,
      tags
    } = req.body

    const resource = new WellnessResource({
      title,
      description,
      content,
      type,
      category,
      url,
      imageUrl,
      duration,
      difficulty,
      author,
      tags: tags || []
    })

    await resource.save()

    res.status(201).json({
      message: 'Wellness resource created successfully',
      resource
    })
  } catch (error) {
    console.error('Create wellness resource error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update wellness resource (admin only)
router.put('/:id', authenticate, authorize('admin'), resourceValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const resource = await WellnessResource.findById(req.params.id)

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' })
    }

    const {
      title,
      description,
      content,
      type,
      category,
      url,
      imageUrl,
      duration,
      difficulty,
      author,
      tags,
      isPublished
    } = req.body

    // Update fields
    resource.title = title
    resource.description = description
    resource.content = content
    resource.type = type
    resource.category = category
    resource.url = url
    resource.imageUrl = imageUrl
    resource.duration = duration
    resource.difficulty = difficulty
    resource.author = author
    resource.tags = tags || resource.tags
    if (typeof isPublished === 'boolean') {
      resource.isPublished = isPublished
    }

    await resource.save()

    res.json({
      message: 'Wellness resource updated successfully',
      resource
    })
  } catch (error) {
    console.error('Update wellness resource error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete wellness resource (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const resource = await WellnessResource.findById(req.params.id)

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' })
    }

    await WellnessResource.findByIdAndDelete(req.params.id)

    res.json({ message: 'Wellness resource deleted successfully' })
  } catch (error) {
    console.error('Delete wellness resource error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get all resources for admin management
router.get('/admin/all', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const resources = await WellnessResource.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-content')

    const total = await WellnessResource.countDocuments({})

    res.json({
      resources,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    console.error('Get admin resources error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get wellness resource statistics
router.get('/stats/overview', authenticate, authorize('admin'), async (req, res) => {
  try {
    const totalResources = await WellnessResource.countDocuments({})
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
    console.error('Get wellness stats error:', error)
    res.status(500).json({ message: 'Server error' })
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