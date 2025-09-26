import mongoose from 'mongoose'
import WellnessResource from './models/WellnessResource.js'

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/zenzone')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

async function addOptimizedWellnessContent() {
  try {
    const newResources = [
      {
        title: "Emotional Regulation Techniques",
        description: "Master practical techniques to understand and manage your emotions effectively in daily life.",
        content: `Emotional regulation is one of the most crucial life skills for mental health and well-being. This guide provides evidence-based strategies to help you understand, process, and respond to emotions in healthy ways.

**Understanding Emotional Regulation:**
Emotional regulation isn't about suppressing emotions—it's about developing a healthy relationship with your emotional experiences and responding skillfully.

**What Emotional Regulation Involves:**
• Recognizing and naming emotions as they arise
• Understanding the purpose and message of emotions  
• Accepting emotions without immediate judgment
• Choosing conscious responses rather than reactive behaviors
• Using healthy coping strategies
• Building emotional resilience over time

**The Science Behind Emotions:**
**The Emotional Brain:**
• **Amygdala:** Processes threat and triggers fight-flight-freeze
• **Prefrontal Cortex:** Executive center for rational thinking
• **Hippocampus:** Processes memories and context
• **Insula:** Processes bodily sensations and emotional awareness

**Emotion Timeline:**
1. **Trigger:** External event or internal thought
2. **Physiological Response:** Body reacts (90 seconds peak)
3. **Emotional Label:** Brain interprets and names the feeling
4. **Behavioral Response:** Actions taken based on emotion
5. **Consequence:** Results of the behavioral response

**1. The RAIN Technique:**
**R - Recognize:** What am I feeling right now?
**A - Accept:** This emotion is here, and that's okay
**I - Investigate:** Where do I feel this in my body? What triggered it?
**N - Non-attachment:** This feeling will pass; I am not my emotions

**Practice RAIN Daily:**
• Set hourly emotion check-ins
• Use during challenging moments
• Apply to both positive and negative emotions
• Journal your RAIN experiences

**2. Physiological Regulation Techniques:**
**The 5-4-3-2-1 Grounding Technique:**
When overwhelmed, notice:
• 5 things you can see
• 4 things you can touch
• 3 things you can hear
• 2 things you can smell
• 1 thing you can taste

**Breathing Techniques:**
• **Box Breathing:** 4 counts in, hold 4, out 4, hold 4
• **4-7-8 Breathing:** Inhale 4, hold 7, exhale 8
• **Coherent Breathing:** 5-6 breaths per minute, equal in and out

**3. The STOP Technique:**
**S**top what you're doing
**T**ake a breath
**O**bserve your thoughts, feelings, and body sensations
**P**roceed with intention

**4. Healthy Emotional Expression:**
**For Anger:**
• Physical exercise or movement
• Journaling thoughts and feelings
• Talking to a trusted friend
• Creative expression (art, music)

**For Sadness:**
• Allow yourself to cry when needed
• Reach out for support and connection
• Engage in self-care activities
• Honor what you've lost

**For Anxiety:**
• Practice grounding techniques
• Use progressive exposure to fears
• Create problem-solving action plans
• Engage in calming activities

**For Joy:**
• Share positive emotions with others
• Savor and fully experience the moment
• Express gratitude for good experiences
• Celebrate achievements mindfully

**5. Building Emotional Resilience:**
**Daily Emotional Hygiene:**
**Morning Practice:**
• Set emotional intentions for the day
• Practice gratitude for three things
• Visualize handling challenges well
• Connect with your core values

**Evening Review:**
• Reflect on emotional experiences of the day
• Acknowledge what went well
• Learn from challenging moments
• Practice self-compassion for difficulties

**6. Cognitive Strategies:**
**Thought Challenging Questions:**
• Is this thought helpful or harmful?
• What evidence supports or contradicts this thought?
• What would I tell a friend in this situation?
• How will this matter in 5 years?
• What's the most balanced view of this situation?

**Reframing Techniques:**
• **Perspective-Taking:** Consider other viewpoints
• **Benefit-Finding:** Look for opportunities in challenges  
• **Values Connection:** Align responses with what matters most

**7. Crisis Emotional Regulation:**
**When Emotions Feel Overwhelming:**
1. Ensure physical safety first
2. Use temperature regulation (cold water, ice)
3. Engage in intense brief exercise
4. Practice paced breathing
5. Call a support person
6. Ground yourself in the present moment
7. Seek professional help if thoughts of self-harm arise

**8. Building Your Support Network:**
• Trusted friends or family members
• Mental health professionals
• Support groups (online or in-person)
• Crisis hotlines for emergency support
• Online communities focused on emotional wellness

**Creating Your Emotional Regulation Plan:**
**Daily Practices:**
• Morning emotional check-in (5 minutes)
• Midday RAIN practice when needed
• Evening reflection and gratitude (10 minutes)
• Regular breathing exercises throughout the day

**Weekly Practices:**
• Emotional vocabulary expansion exercises
• Review and learn from challenging situations
• Social connection for emotional support
• Creative emotional expression activities

**Remember:** Emotional regulation is a lifelong skill that improves with practice. Be patient and compassionate with yourself as you develop these abilities.

**Emergency Emotional Regulation Toolkit:**
Keep accessible for difficult moments:
• List of grounding techniques
• Breathing exercise reminders  
• Emergency contact numbers
• Self-compassion statements
• Physical comfort items (soft blanket, stress ball)
• Calming music playlist`,
        type: "article",
        category: "general",
        author: "ZenZone Wellness Team",
        duration: "15-20 minutes",
        difficulty: "intermediate",
        tags: ["emotional regulation", "mental health", "coping skills", "self-awareness", "emotional intelligence"],
        isPublished: true
      },
      {
        title: "Building Healthy Boundaries",
        description: "Learn to set and maintain healthy boundaries in relationships, work, and personal life for better mental health.",
        content: `Healthy boundaries are essential for mental health, self-respect, and maintaining fulfilling relationships. This guide will help you understand, establish, and maintain boundaries that protect your well-being.

**Understanding Boundaries:**
Boundaries are not walls—they're gates with the wisdom to know when to open and when to close them. They define where you end and others begin, protecting your physical, emotional, mental, and spiritual well-being.

**Types of Boundaries:**
**Physical Boundaries:**
• Personal space and touch preferences
• Privacy needs and physical safety
• Time and availability limits

**Emotional Boundaries:**
• Protecting your feelings from others' emotions
• Not taking responsibility for others' happiness
• Maintaining your emotional autonomy
• Choosing what emotions to share and when

**Mental Boundaries:**
• Protecting your thoughts and opinions
• Choosing what information to share
• Respecting your intellectual autonomy

**Digital Boundaries:**
• Social media interactions and privacy settings
• Communication availability and response times
• Information sharing limits

**Why Boundaries Are Difficult:**
• Fear of rejection or abandonment
• Guilt about disappointing others
• Cultural or family messages about selflessness
• Lack of boundary models in childhood
• Low self-esteem or self-worth issues
• Anxiety about conflict

**Boundary Myths vs. Truths:**
**Myths:**
• "Setting boundaries is selfish"
• "If I loved them, I wouldn't need boundaries"
• "Boundaries will damage my relationships"

**Truths:**
• Boundaries actually improve relationships
• They prevent resentment and burnout
• They model healthy behavior for others
• They increase respect and trust

**1. Identifying Your Current Boundaries:**
**Boundary Assessment Questions:**
• Do I often feel resentful after helping others?
• Do I say yes when I want to say no?
• Am I exhausted from others' demands on my time?
• Do I feel guilty when taking time for myself?
• Do I feel responsible for others' emotions?

**Signs of Weak Boundaries:**
• Feeling overwhelmed by others' needs
• Difficulty saying no
• Taking on others' emotions as your own
• Chronic fatigue or burnout
• Resentment toward others
• Identity confusion

**2. Setting Boundaries: Step-by-Step Process:**
**Step 1: Identify Your Needs**
• What makes you feel comfortable/uncomfortable?
• What are your non-negotiables?
• Where do you need more space or protection?

**Step 2: Start Small**
Begin with:
• Low-stakes situations
• People who generally respect you
• Clear, simple boundaries

**Step 3: Use Clear Communication**
**The Boundary Formula:**
"I feel _____ when _____, so I need _____."

**Examples:**
• "I feel overwhelmed when work calls come after 8 PM, so I need to keep my phone off after that time."
• "I feel uncomfortable when personal topics are discussed at work, so I'd prefer professional conversations."

**3. Common Boundary Scripts:**
**At Work:**
• "I understand this is important. I'm available until 6 PM today, but I have commitments after that."
• "I prefer to keep my personal life private at work."

**With Family:**
• "I appreciate your concern, but I've got this handled. I'll ask if I need advice."
• "I'm not able to lend money right now, but I'd be happy to help explore other options."

**With Friends:**
• "I can't make it tonight, but I'd love to plan something with more notice."
• "I care about you, but I'm not in a good place to provide support right now."

**4. Boundary Enforcement:**
**Natural Consequences:**
• If someone consistently shows up late, start without them
• If someone interrupts, politely end the conversation
• If someone borrows without returning, stop lending

**Stated Consequences:**
• "If you continue to yell, I'll need to leave this conversation"
• "If work calls continue after hours, I'll need to block the work number evenings and weekends"

**Following Through:**
• Do what you said you would do
• Stay calm and matter-of-fact
• Don't explain or justify repeatedly
• Don't make threats you won't carry out

**5. Self-Care During Boundary Setting:**
**Managing Guilt:**
• Remember: Boundaries benefit everyone long-term
• Practice self-compassion statements
• Connect with supportive friends
• Remember your "why" for setting boundaries

**Dealing with Anxiety:**
• Use grounding techniques before difficult conversations
• Practice boundary conversations with trusted friends
• Start with written communication if verbal feels too scary
• Celebrate small boundary successes

**6. Digital Boundaries:**
**Social Media Boundaries:**
• Limit daily usage time
• Unfollow accounts that negatively impact your mood
• Use privacy settings effectively
• Don't engage with inflammatory content

**Communication Boundaries:**
• Set specific times for checking/responding to messages
• Use "Do Not Disturb" settings
• Choose your preferred communication methods
• Don't feel obligated to respond immediately

**7. Building Your Boundary Practice:**
**Daily Practices:**
• Check in with your comfort level throughout the day
• Practice saying no to small requests
• Notice resentment or exhaustion as boundary signals
• Use self-care to maintain energy for boundary enforcement

**Weekly Practices:**
• Assess how your boundaries are working
• Plan conversations about boundaries that need establishing
• Connect with boundary-supportive people
• Adjust boundaries that aren't serving you

**Monthly Practices:**
• Reflect on boundary growth and challenges
• Celebrate boundary successes
• Consider whether any boundaries need updating
• Plan for upcoming challenging boundary situations

**Remember:** Boundaries are not about controlling others—they're about taking responsibility for your own well-being. Healthy boundaries create space for authentic, respectful, and fulfilling relationships.

**Emergency Boundary Toolkit:**
Keep accessible for challenging moments:
• Phrases for saying no gracefully
• Grounding techniques for guilt and anxiety
• List of supportive people to contact
• Self-compassion reminders
• Boundary success stories for inspiration`,
        type: "article",
        category: "relationships",
        author: "ZenZone Wellness Team",
        duration: "18-22 minutes",
        difficulty: "intermediate",
        tags: ["boundaries", "relationships", "self-care", "communication", "mental health"],
        isPublished: true
      },
      {
        title: "Mindful Eating for Mental Wellness",
        description: "Discover how conscious eating practices can improve your relationship with food and support emotional well-being.",
        content: `Mindful eating is a powerful practice that can transform your relationship with food, reduce stress, improve digestion, and support overall mental health. This guide will help you develop a conscious, nurturing approach to eating.

**What is Mindful Eating?**
Mindful eating is the practice of bringing full attention and awareness to the experience of eating, including:
• Physical sensations of hunger and fullness
• Tastes, textures, and aromas of food
• Emotional responses to eating
• Environmental factors affecting your eating experience

**It's NOT about:**
• Strict dietary rules or restrictions
• Weight loss (though it may be a natural result)
• Perfect eating behavior
• Judgment or criticism of food choices

**The Science Behind Mindful Eating:**
**Mental Health Benefits:**
• Reduces stress and anxiety around food
• Decreases emotional eating patterns
• Improves body image and self-acceptance
• Reduces symptoms of depression
• Increases self-awareness and emotional regulation

**Physical Benefits:**
• Improved digestion and nutrient absorption
• Better hunger and satiety recognition
• Reduced overeating and binge episodes
• Enhanced immune function

**1. The Hunger-Fullness Scale:**
Rate your hunger/fullness on a scale of 1-10:
• **1-2:** Extremely hungry, possibly dizzy or shaky
• **3-4:** Hungry, ready to eat
• **5-6:** Comfortable, neither hungry nor full
• **7-8:** Satisfied and comfortable
• **9-10:** Uncomfortably full, possibly sleepy

**Ideal eating window:** Start eating around 3-4, stop around 7-8.

**2. The STOP Technique Before Eating:**
**S**top and pause before eating
**T**ake a breath and center yourself
**O**bserve your hunger level and emotional state
**P**roceed with intention and awareness

**3. Creating a Mindful Eating Environment:**
• Eat at a designated eating space
• Minimize distractions (no TV, phone, reading)
• Use appealing plates and utensils
• Ensure adequate lighting
• Create a calm, pleasant atmosphere
• Sit down while eating

**4. The Five Senses Practice:**
Before eating, engage each sense:
• **Sight:** Notice colors, shapes, presentation
• **Smell:** Inhale the aromas deeply
• **Touch:** Feel textures with utensils or fingers
• **Sound:** Listen to cooking sounds, crunching
• **Taste:** Notice initial flavors before chewing

**5. The Mindful Eating Process:**
**Before the First Bite:**
• Rate your hunger level (1-10)
• Take three deep breaths
• Express gratitude for the food
• Set an intention for the meal
• Notice your emotional state

**During Eating:**
**The 20-20-20 Rule:**
• Take 20 seconds between each bite
• Chew each bite 20 times
• Put down utensils for 20 seconds periodically

**Mindful Chewing Practice:**
• Place food in mouth
• Put down utensils
• Chew slowly and thoroughly
• Notice texture changes
• Identify different flavors
• Notice the urge to swallow
• Swallow mindfully

**Mid-Meal Check-ins:**
• Pause halfway through eating
• Rate hunger/fullness again
• Notice taste satisfaction
• Check emotional state
• Decide whether to continue eating

**6. Working with Emotional Eating:**
**Identifying Emotional vs. Physical Hunger:**
**Physical Hunger:**
• Gradual onset
• Occurs 3-5 hours after eating
• Satisfied by various foods
• Stops when full
• No guilt afterward

**Emotional Hunger:**
• Sudden onset
• Occurs regardless of last meal time
• Craves specific comfort foods
• May not stop when full
• Often followed by guilt

**The HALT Check:**
Before eating, ask: Am I...
• **H**ungry (physically)?
• **A**ngry or upset?
• **L**onely or bored?
• **T**ired or stressed?

**Alternative Responses to Emotional Triggers:**
**For Stress:** Deep breathing exercises, brief walk, call a friend
**For Boredom:** Engage in a hobby, read, do a puzzle
**For Sadness:** Journal feelings, take a warm bath, practice self-compassion
**For Anxiety:** Practice grounding techniques, gentle yoga, focus on breathing

**7. Building Long-Term Mindful Eating Habits:**
**Week 1-2: Foundation Building**
• Practice eating one meal per day mindfully
• Focus on eating without distractions
• Use the hunger-fullness scale
• Practice gratitude before meals

**Week 3-4: Skill Development**
• Add mindful snacking practices
• Work on eating pace
• Practice mid-meal check-ins
• Notice emotional eating patterns

**Week 5-6: Emotional Awareness**
• Identify emotional eating triggers
• Develop alternative coping strategies
• Practice self-compassion
• Notice judgment patterns

**Week 7-8: Integration**
• Apply mindful eating to all meals
• Handle social eating situations mindfully
• Trust your body's wisdom
• Celebrate progress without perfectionism

**8. Overcoming Common Challenges:**
**Challenge: "I Don't Have Time"**
**Solutions:**
• Start with just the first three bites mindfully
• Practice during one meal per day
• Prepare simple, nourishing meals

**Challenge: "I Forget to Be Mindful"**
**Solutions:**
• Set phone reminders before meals
• Place visual cues near eating areas
• Practice with same meal each day initially

**Challenge: "Social Situations Are Difficult"**
**Solutions:**
• Practice mindful eating basics in social settings
• Focus on connection rather than perfect eating
• Make conscious choices without calling attention

**9. Creating Your Personal Mindful Eating Plan:**
**Daily Practices:**
• One fully mindful meal
• Hunger-fullness check-ins
• Gratitude before eating
• Emotional state awareness
• Body wisdom listening

**Weekly Practices:**
• Mindful grocery shopping
• Cooking meditation
• Eating pattern reflection
• Progress celebration

**Monthly Practices:**
• Comprehensive eating pattern review
• Goal setting and adjustment
• Professional support if needed
• Community connection

**Remember:** Mindful eating is a practice, not perfection. Be patient and compassionate with yourself as you develop this life-changing skill.

**Mindful Eating Emergency Kit:**
• List of hunger/fullness cues
• Alternative activities for emotional eating
• Gratitude practices
• Self-compassion statements
• Quick grounding techniques
• Support contact information`,
        type: "article",
        category: "general",
        author: "ZenZone Wellness Team",
        duration: "15-20 minutes",
        difficulty: "beginner",
        tags: ["mindful eating", "mental health", "self-awareness", "emotional eating", "wellness"],
        isPublished: true
      },
      {
        title: "Stress Management in Daily Life",
        description: "Practical strategies to identify, manage, and reduce stress in your everyday routine for better mental health.",
        content: `Stress is a natural part of life, but chronic stress can significantly impact your mental and physical health. This comprehensive guide provides practical, evidence-based strategies to manage stress effectively in your daily life.

**Understanding Stress:**
Stress is your body's response to perceived threats or challenges. While some stress can be motivating, chronic stress can lead to:
• Anxiety and depression
• Weakened immune system
• Sleep disruption
• Digestive issues
• Relationship problems
• Decreased productivity and focus

**Types of Stress:**
**Acute Stress:** Short-term stress from immediate pressures
**Chronic Stress:** Long-term stress from ongoing pressures
**Episodic Acute Stress:** Frequent acute stress from chaotic lifestyle
**Eustress:** Positive stress that motivates and energizes

**1. Identifying Your Stress Signals:**
**Physical Signs:**
• Muscle tension and headaches
• Fatigue and sleep problems
• Changes in appetite
• Frequent illness
• Rapid heartbeat

**Emotional Signs:**
• Irritability and anger
• Anxiety and worry
• Feeling overwhelmed
• Mood swings
• Depression

**Behavioral Signs:**
• Procrastination and avoidance
• Changes in sleep patterns
• Increased use of substances
• Social withdrawal
• Nervous habits (nail biting, pacing)

**Cognitive Signs:**
• Racing thoughts
• Difficulty concentrating
• Memory problems
• Poor judgment
• Negative thinking patterns

**2. The Stress Response System:**
**Fight-or-Flight Response:**
When you perceive a threat, your body releases stress hormones (cortisol and adrenaline) that prepare you to either fight or flee. While helpful in true emergencies, this response can become problematic when activated frequently by daily stressors.

**The Relaxation Response:**
The opposite of fight-or-flight, this response activates your parasympathetic nervous system, promoting calm and healing. You can learn to trigger this response intentionally.

**3. Quick Stress Relief Techniques:**
**Breathing Exercises:**
**4-7-8 Breathing:**
• Inhale for 4 counts
• Hold for 7 counts  
• Exhale for 8 counts
• Repeat 3-4 times

**Box Breathing:**
• Inhale for 4 counts
• Hold for 4 counts
• Exhale for 4 counts
• Hold empty for 4 counts

**Progressive Muscle Relaxation:**
• Tense and then relax each muscle group
• Start with your toes, work up to your head
• Hold tension for 5 seconds, then release
• Notice the contrast between tension and relaxation

**Grounding Techniques:**
**5-4-3-2-1 Method:**
• 5 things you can see
• 4 things you can touch
• 3 things you can hear
• 2 things you can smell
• 1 thing you can taste

**4. Daily Stress Management Strategies:**
**Time Management:**
**Priority Matrix:**
• **Urgent & Important:** Do first
• **Important but Not Urgent:** Schedule
• **Urgent but Not Important:** Delegate
• **Neither:** Eliminate

**Time Blocking:**
• Assign specific time slots for different activities
• Include buffer time for unexpected issues
• Protect time for breaks and self-care

**Boundary Setting:**
• Learn to say no to non-essential requests
• Set realistic expectations for yourself and others
• Communicate your limits clearly
• Protect your personal time

**5. Lifestyle Modifications for Stress Management:**
**Regular Exercise:**
• Aim for 30 minutes of moderate activity most days
• Choose activities you enjoy
• Include both cardio and strength training
• Consider yoga or tai chi for mind-body benefits

**Healthy Sleep Habits:**
• Maintain consistent sleep schedule
• Create a calming bedtime routine
• Limit screen time before bed
• Keep bedroom cool, dark, and quiet

**Nutrition for Stress:**
**Stress-Fighting Foods:**
• Complex carbohydrates (whole grains, oats)
• Omega-3 rich foods (salmon, walnuts)
• Antioxidant-rich fruits and vegetables
• Magnesium-rich foods (dark chocolate, leafy greens)

**Foods to Limit:**
• Caffeine (can increase anxiety)
• Alcohol (disrupts sleep and mood)
• Processed foods high in sugar
• Excessive amounts of any stimulants

**6. Cognitive Strategies:**
**Thought Challenging:**
• Identify negative or irrational thoughts
• Examine evidence for and against the thought
• Consider alternative, more balanced perspectives
• Ask: "Is this thought helpful or harmful?"

**Reframing Techniques:**
• View challenges as opportunities for growth
• Focus on what you can control rather than what you can't
• Practice gratitude for positive aspects of your life
• Use positive self-talk and affirmations

**Problem-Solving Approach:**
1. **Identify the problem** clearly and specifically
2. **Brainstorm solutions** without judging them
3. **Evaluate options** considering pros and cons
4. **Choose and implement** the best solution
5. **Review results** and adjust if needed

**7. Social Support and Connection:**
**Building Your Support Network:**
• Maintain relationships with family and friends
• Join clubs, groups, or organizations
• Consider professional support when needed
• Practice giving support to others

**Effective Communication:**
• Express your needs and feelings clearly
• Listen actively to others
• Set boundaries in relationships
• Seek help when you need it

**8. Relaxation and Mindfulness Practices:**
**Mindfulness Meditation:**
• Start with 5-10 minutes daily
• Focus on your breath or body sensations
• When thoughts arise, gently return attention to focus
• Use guided meditation apps if helpful

**Mindful Daily Activities:**
• Mindful walking or eating
• Single-tasking instead of multitasking
• Taking conscious breaks throughout the day
• Practicing gratitude

**Hobbies and Creative Outlets:**
• Engage in activities you enjoy
• Try art, music, gardening, or crafts
• Spend time in nature
• Read, write, or learn new skills

**9. Work-Related Stress Management:**
**Workplace Strategies:**
• Take regular breaks throughout the day
• Create an organized, personalized workspace
• Communicate openly with supervisors about workload
• Separate work and personal life
• Use vacation time and sick days when needed

**Career Development:**
• Set realistic career goals
• Seek professional development opportunities
• Build positive relationships with colleagues
• Consider career changes if chronically unhappy

**10. Building Long-Term Resilience:**
**Daily Habits for Resilience:**
• Morning routine that grounds and centers you
• Regular exercise and movement
• Adequate sleep and nutrition
• Mindfulness or meditation practice
• Social connection and support

**Weekly Practices:**
• Longer relaxation sessions
• Time in nature
• Social activities with friends/family
• Review and plan for the upcoming week
• Engage in hobbies or creative pursuits

**Monthly Assessments:**
• Evaluate what stress management techniques are working
• Adjust strategies as needed
• Set new goals for stress reduction
• Consider professional help if stress is overwhelming

**Creating Your Personal Stress Management Plan:**
**Identify Your Top 3 Stressors:**
1. ________________
2. ________________  
3. ________________

**Choose 3 Stress Management Techniques to Try:**
1. ________________
2. ________________
3. ________________

**Daily Stress Management Routine:**
• Morning: ________________
• Midday: ________________
• Evening: ________________

**When to Seek Professional Help:**
• Stress is significantly impacting daily functioning
• Physical symptoms persist despite self-care
• You're using substances to cope
• Thoughts of self-harm or suicide
• Relationships and work are suffering consistently

**Remember:** Stress management is a lifelong skill. Be patient with yourself as you learn what works best for you, and don't hesitate to seek professional support when needed.

**Emergency Stress Relief Kit:**
Keep accessible for high-stress moments:
• Breathing exercise instructions
• Grounding technique reminders
• Emergency contact numbers
• Calming music or sounds
• Stress ball or fidget toy
• Essential oils for aromatherapy
• Positive affirmations or quotes`,
        type: "article",
        category: "stress",
        author: "ZenZone Wellness Team",
        duration: "18-25 minutes",
        difficulty: "beginner",
        tags: ["stress management", "mental health", "coping strategies", "wellness", "self-care"],
        isPublished: true
      },
      {
        title: "Nature Connection for Mental Health",
        description: "Explore the healing power of nature and practical ways to incorporate outdoor wellness into your daily life.",
        content: `Nature has profound healing effects on mental health, offering a powerful and accessible tool for stress reduction, mood improvement, and overall well-being. This guide explores the science behind nature's benefits and practical ways to connect with the outdoors.

**The Science of Nature and Mental Health:**
**Research Findings:**
• 2 hours per week in nature significantly improves well-being
• Hospital patients with nature views heal 30% faster
• Forest bathing reduces anxiety by 37% and depression by 43%
• Nature sounds reduce stress and improve focus
• Green spaces near homes reduce mental health issues by 25%

**Neurological Benefits:**
• Reduces cortisol (stress hormone) by up to 50%
• Increases serotonin and dopamine production
• Enhances neuroplasticity and brain growth
• Improves cognitive function and creativity
• Reduces rumination and negative thinking patterns

**The Biophilia Effect:**
Humans have an innate affinity for nature (biophilia). Separation from natural environments can contribute to:
• Increased anxiety and depression
• Attention disorders
• Reduced immune function
• Higher stress levels
• Decreased creativity and problem-solving abilities

**1. Forest Bathing (Shinrin-yoku):**
**What is Forest Bathing?**
A Japanese practice meaning "taking in the forest atmosphere"—not hiking or exercising, but simply being present with trees and forest environments.

**Basic Forest Bathing Practice (1-2 hours):**
**Preparation (10 minutes):**
• Leave devices behind or on silent
• Set intention for the experience
• Begin with deep breathing
• Release expectations and agendas

**Slow Walking (20-30 minutes):**
• Walk extremely slowly (slower than normal pace)
• Stop frequently to observe
• Follow curiosity rather than paths
• Let the forest guide your attention

**Sitting Practice (20-30 minutes):**
• Find a comfortable spot to sit
• Close eyes and listen to forest sounds
• Notice air quality and breathing changes
• Feel connection to the living environment

**Sensory Engagement (20-30 minutes):**
• Touch tree bark, leaves, moss
• Smell pine, earth, flowers
• Watch light patterns and movements
• Listen to bird songs, wind, water

**Benefits:**
• Reduces blood pressure and heart rate
• Boosts immune system function
• Increases natural killer (NK) cells by 50%
• Improves sleep quality
• Enhances mood and energy

**2. Urban Nature Connection:**
**Finding Nature in Cities:**
**Green Spaces:**
• Parks and gardens
• Tree-lined streets
• Rooftop gardens
• Community gardens
• Waterfront areas

**Micro-Nature Experiences:**
• Office plants
• Window gardens
• Nature photography
• Sky watching
• Indoor water features
• Natural materials (wood, stone)

**Urban Nature Practices:**
**Park Meditation:**
• Find quiet corner of local park
• Practice mindfulness surrounded by trees
• Focus on natural sounds despite city noise
• Notice seasonal changes in urban spaces

**Lunch Hour Nature Breaks:**
• Eat lunch outside when possible
• Take walking meetings in parks
• Practice breathing exercises under trees
• Use nature photos for desktop/screensaver

**3. Water-Based Nature Therapy:**
**Benefits of Water Environments:**
• Natural negative ion exposure
• Sound masking and relaxation
• Rhythmic wave or flow patterns
• Cooler temperatures and fresh air
• Enhanced meditation opportunities

**Water Therapy Practices:**
**Ocean/Lake Therapy:**
• Beach walking meditation
• Wave watching and breathing synchronization
• Sand grounding exercises
• Sunrise/sunset water viewing

**River/Stream Therapy:**
• Listening meditation beside flowing water
• Rock sitting and contemplation
• Following water flow mindfully

**Rain Therapy:**
• Mindful rain listening
• Walking in gentle rain
• Rain smell appreciation (petrichor)
• Indoor rain watching meditation

**4. Seasonal Nature Connection:**
**Spring Practices:**
• New growth observation
• Flower and tree identification
• Bird song recognition
• Garden planning and planting

**Summer Practices:**
• Dawn and dusk nature immersion
• Barefoot walking on grass
• Outdoor meditation and yoga
• Nature photography

**Autumn Practices:**
• Leaf color meditation
• Harvest gratitude practices
• Nature art with fallen leaves
• Migration observation

**Winter Practices:**
• Snow meditation and observation
• Winter tree identification
• Indoor nature connection
• Appreciation for nature's rest cycle

**5. Gardening as Nature Therapy:**
**Mental Health Benefits:**
• Reduces anxiety and depression by 50%
• Improves self-esteem and sense of accomplishment
• Provides purposeful activity and routine
• Connects you to life cycles and growth

**Types of Therapeutic Gardening:**
**Container Gardening:**
• Herbs in kitchen windows
• Balcony vegetable gardens
• Indoor succulents and houseplants

**Community Gardening:**
• Shared garden plots
• Social connection opportunities
• Learning from experienced gardeners

**Sensory Gardens:**
• Plants chosen for texture, smell, sound
• Tactile plants like lamb's ear
• Fragrant herbs and flowers
• Plants that attract birds and butterflies

**6. Nature-Based Mindfulness Practices:**
**Tree Meditation:**
• Sit with back against tree trunk
• Imagine roots extending into earth
• Breathe with tree's rhythm
• Exchange energy and gratitude

**Sky Meditation:**
• Lie on back and watch clouds
• Practice sky-like mind awareness
• Notice vast, open awareness
• Let thoughts pass like clouds

**Earth Grounding:**
• Walk barefoot on natural surfaces
• Lie down on earth for 10-20 minutes
• Visualize connection to earth's energy
• Practice gratitude for earth's support

**Weather Meditation:**
• Sit outside in various weather conditions
• Notice body's response to elements
• Practice acceptance of what is
• Find peace within natural changes

**7. Creating Your Nature Connection Practice:**
**Daily Practices (10-30 minutes):**
• Morning outdoor breathing
• Lunch break nature connection
• Evening sky watching
• Indoor plant care meditation
• Nature sounds listening

**Weekly Practices (1-3 hours):**
• Extended time in local green space
• Nature photography walks
• Gardening sessions
• Outdoor exercise or sports
• Nature journaling

**Monthly Practices (Half or full day):**
• Forest bathing sessions
• Beach or lake visits
• Mountain or hiking excursions
• Seasonal nature celebrations

**8. Overcoming Barriers:**
**"I Don't Have Time":**
• Start with 5-10 minutes daily
• Combine nature time with necessary activities
• Use lunch breaks and commute times
• Bring nature indoors with plants

**"I Don't Live Near Nature":**
• Explore urban green spaces
• Create indoor nature sanctuaries
• Take weekend nature excursions
• Connect with community gardens

**"I'm Not Outdoorsy":**
• Start small and comfortable
• Try gentle activities like park benches
• Focus on observation rather than activity
• Use guided nature programs

**"Weather Prevents Me":**
• Appreciate all weather as nature experience
• Invest in appropriate clothing
• Use covered outdoor spaces
• Bring nature indoors during extreme weather

**9. Building Your Nature Support Network:**
• Join local hiking or nature groups
• Connect with community gardens
• Find nature therapy practitioners
• Participate in citizen science projects
• Create or join nature photography groups

**Creating Your Nature Connection Plan:**
**Daily Goal:** _____________
**Weekly Goal:** _____________
**Monthly Goal:** _____________

**Favorite Local Natural Spaces:**
1. ________________
2. ________________
3. ________________

**Nature Activities to Try:**
1. ________________
2. ________________
3. ________________

**Remember:** Nature doesn't require expertise—just presence and openness. Every connection with the natural world, however brief, offers healing potential.

**Nature Connection Emergency Kit:**
• List of nearby green spaces
• Nature photos for indoor viewing
• Plant or flowers for immediate connection
• Nature sounds recording
• Journal for nature reflections
• Contact info for nature groups`,
        type: "article",
        category: "general",
        author: "ZenZone Wellness Team",
        duration: "20-25 minutes",
        difficulty: "beginner",
        tags: ["nature therapy", "mental health", "mindfulness", "outdoor healing", "wellness"],
        isPublished: true
      },
      {
        title: "Self-Compassion and Inner Kindness",
        description: "Learn to treat yourself with the same kindness you'd show a good friend, building resilience and emotional well-being.",
        content: `Self-compassion is one of the most powerful tools for mental health and emotional resilience. Research shows that people who practice self-compassion experience less anxiety, depression, and stress while developing greater life satisfaction and emotional stability.

**What is Self-Compassion?**
Self-compassion involves treating yourself with the same kindness and understanding you would offer a good friend during difficult times. It's about acknowledging your suffering without judgment and responding with care and wisdom.

**The Three Components of Self-Compassion:**
**1. Self-Kindness vs. Self-Judgment**
• Treating yourself with warmth and understanding when you fail or make mistakes
• Avoiding harsh self-criticism and self-attack
• Speaking to yourself like you would to a beloved friend

**2. Common Humanity vs. Isolation**
• Recognizing that suffering and imperfection are part of the shared human experience
• Understanding that you're not alone in your struggles
• Connecting with others rather than isolating when things go wrong

**3. Mindfulness vs. Over-identification**
• Acknowledging difficult emotions without being overwhelmed by them
• Observing your thoughts and feelings without becoming consumed by them
• Maintaining perspective during challenging times

**The Science of Self-Compassion:**
**Mental Health Benefits:**
• Reduces anxiety and depression by 40-50%
• Decreases rumination and negative thinking patterns
• Increases emotional resilience and stability
• Improves self-esteem and body image
• Enhances motivation and personal growth

**Physical Health Benefits:**
• Lower cortisol (stress hormone) levels
• Reduced inflammation in the body
• Better immune system function
• Improved sleep quality
• Lower blood pressure

**Relationship Benefits:**
• Increased empathy and compassion for others
• Better conflict resolution skills
• More authentic and vulnerable connections
• Reduced people-pleasing behaviors
• Healthier boundaries

**1. Recognizing Self-Critical Patterns:**
**Common Self-Critical Thoughts:**
• "I'm such an idiot"
• "I always mess everything up"
• "I should be better than this"
• "Everyone else has it figured out"
• "I'm not good enough"

**Signs of Self-Criticism:**
• Harsh inner dialogue
• Perfectionist tendencies
• Comparing yourself negatively to others
• Feeling ashamed of mistakes or failures
• Avoiding challenges to prevent failure
• People-pleasing to gain approval

**2. The Self-Compassion Break:**
A simple practice for difficult moments:

**Step 1: Mindfulness**
• Place your hand on your heart
• Acknowledge: "This is a moment of suffering" or "This is painful"
• Allow yourself to feel the difficult emotions

**Step 2: Common Humanity**
• Remind yourself: "Suffering is part of life" or "I'm not alone in this"
• Recognize that everyone experiences pain, failure, and difficulty

**Step 3: Self-Kindness**
• Offer yourself kind words: "May I be kind to myself" or "May I give myself compassion"
• Speak to yourself as you would to a dear friend

**3. Developing Self-Compassionate Language:**
**Instead of:** "I'm so stupid for making that mistake"
**Try:** "Everyone makes mistakes. This is an opportunity to learn and grow"

**Instead of:** "I should be over this by now"
**Try:** "Healing takes time, and I'm doing the best I can"

**Instead of:** "I'm such a failure"
**Try:** "I'm learning and growing. One setback doesn't define me"

**Instead of:** "I'm the only one struggling with this"
**Try:** "Many people face similar challenges. I'm not alone"

**4. Self-Compassion Practices:**
**Loving-Kindness Meditation for Self:**
• Sit comfortably and close your eyes
• Place hands on heart
• Repeat these phrases, directing them toward yourself:
  - "May I be happy"
  - "May I be healthy"  
  - "May I be safe"
  - "May I be at peace"
  - "May I be kind to myself"

**Self-Compassion Journaling:**
**Weekly Practice:**
• Reflect on a difficult situation from the past week
• Write about it from three perspectives:
  1. **Self-kindness:** How can I be gentle with myself?
  2. **Common humanity:** How is this part of human experience?
  3. **Mindfulness:** What am I feeling without judgment?

**Supportive Touch:**
• Place hands on heart during difficult moments
• Give yourself a gentle hug
• Stroke your arm or face gently
• Use soothing gestures that feel comforting

**5. Working with Inner Critic:**
**Understanding Your Inner Critic:**
• Often developed as protection mechanism in childhood
• May sound like critical parent, teacher, or peer
• Usually trying to help but using outdated methods
• Can be transformed into supportive inner voice

**Techniques for Inner Critic:**
**Name Your Inner Critic:**
• Give it a name (e.g., "Judge Judy" or "The Perfectionist")
• Thank it for trying to protect you
• Set boundaries: "Thank you for your concern, but I've got this"

**Reframe Critical Thoughts:**
• "I failed" becomes "I tried something challenging"
• "I'm not good enough" becomes "I'm learning and growing"
• "I should have known better" becomes "I'm doing my best with what I know now"

**6. Self-Compassion in Specific Situations:**
**When You Make Mistakes:**
• Acknowledge the mistake without minimizing or exaggerating
• Recognize that mistakes are part of learning and growth
• Ask: "What can I learn from this?" and "How can I do better next time?"
• Treat yourself as you would a friend who made the same mistake

**When Facing Failure:**
• Remember that failure is a universal human experience
• Focus on effort and courage rather than outcome
• Look for lessons and opportunities for growth
• Practice gratitude for what you learned or tried

**When Dealing with Physical Appearance:**
• Appreciate your body for what it does rather than just how it looks
• Challenge societal beauty standards
• Practice neutral body language: "This is my body" rather than judgments
• Focus on health and self-care rather than perfection

**When Experiencing Difficult Emotions:**
• Allow emotions to be present without trying to fix or change them
• Recognize emotions as temporary visitors, not permanent residents
• Practice self-soothing techniques
• Remind yourself that feeling difficult emotions is part of being human

**7. Building Self-Compassion Habits:**
**Daily Practices:**
• Morning self-compassion intention setting
• Self-compassion break when experiencing difficulty
• Evening reflection on moments of self-kindness
• Gentle self-talk throughout the day

**Weekly Practices:**
• Self-compassion journaling
• Loving-kindness meditation
• Letter writing to yourself as a compassionate friend
• Reflection on personal growth and progress

**Monthly Practices:**
• Review and celebrate progress in self-compassion
• Identify areas where you're still self-critical
• Adjust practices based on what's working
• Set new self-compassion goals

**8. Overcoming Common Obstacles:**
**"Self-compassion is selfish":**
Research shows self-compassionate people are more caring toward others, not less. Self-compassion provides emotional resources to give to others.

**"Self-compassion will make me weak or lazy":**
Self-compassion actually increases motivation and resilience. It provides emotional safety to take risks and learn from mistakes.

**"I don't deserve compassion":**
Every human being deserves compassion, including you. This belief often comes from past experiences and can be gently challenged.

**"It feels fake or forced":**
Like any skill, self-compassion takes practice. Start with small moments and build gradually.

**9. Self-Compassion for Specific Groups:**
**For Perfectionists:**
• Practice "good enough" mindset
• Celebrate progress over perfection
• Set realistic expectations
• Allow for mistakes and learning

**For People-Pleasers:**
• Practice saying no without guilt
• Recognize your own needs and feelings
• Set healthy boundaries
• Value your own opinion

**For High Achievers:**
• Define success more broadly than achievements
• Practice self-worth independent of accomplishments
• Allow for rest and recovery
• Celebrate effort, not just outcomes

**10. Creating Your Self-Compassion Practice:**
**Self-Assessment:**
Rate yourself 1-10 in each area:
• Self-kindness: ___
• Common humanity: ___
• Mindfulness: ___

**Daily Self-Compassion Goal:**
_________________________________

**Weekly Self-Compassion Practice:**
_________________________________

**Self-Compassion Phrases to Practice:**
1. _________________________________
2. _________________________________
3. _________________________________

**Support for Your Journey:**
• Books on self-compassion
• Self-compassion apps and guided meditations
• Therapy focused on self-compassion
• Support groups or communities
• Friends who model self-compassion

**Remember:** Self-compassion is not about self-pity or making excuses. It's about treating yourself with the same kindness you'd show a good friend, which actually empowers you to learn, grow, and heal.

**Self-Compassion Emergency Kit:**
Keep accessible for difficult moments:
• Self-compassion break instructions
• List of self-compassionate phrases
• Supportive touch techniques
• Reminder of common humanity
• Contact information for support people
• Self-compassion letter you've written to yourself`,
        type: "article",
        category: "general",
        author: "ZenZone Wellness Team",
        duration: "20-25 minutes",
        difficulty: "beginner",
        tags: ["self-compassion", "mental health", "emotional wellness", "self-care", "mindfulness"],
        isPublished: true
      }
    ]

    // Insert new resources
    for (const resource of newResources) {
      console.log(`Adding: ${resource.title}...`)
      
      // Check if resource already exists
      const existingResource = await WellnessResource.findOne({ title: resource.title })
      
      if (existingResource) {
        console.log(`⚠️ Resource already exists: ${resource.title}`)
        continue
      }

      try {
        const newResource = await WellnessResource.create(resource)
        console.log(`✅ Successfully added: ${newResource.title} (${newResource.content.length} characters)`)
      } catch (error) {
        console.error(`❌ Error adding ${resource.title}:`, error.message)
      }
    }

    console.log('\n🎉 Optimized wellness resources have been added!')
    
    // Display current count and details
    const allResources = await WellnessResource.find({}, 'title category content').lean()
    console.log(`\n📚 Total wellness resources: ${allResources.length}`)
    console.log('\n📖 Current wellness library:')
    allResources.forEach(resource => {
      console.log(`• ${resource.title} (${resource.category}) - ${resource.content ? resource.content.length : 0} chars`)
    })

  } catch (error) {
    console.error('Error adding wellness resources:', error)
  } finally {
    mongoose.connection.close()
  }
}

addOptimizedWellnessContent()
