import mongoose from 'mongoose'
import WellnessResource from './models/WellnessResource.js'

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/zenzone')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

async function updateWellnessResources() {
  try {
    // 1. Building Healthy Sleep Habits
    const sleepHabitsContent = `Quality sleep is fundamental to mental health, physical well-being, and overall life satisfaction. This comprehensive guide will help you develop sustainable sleep habits for better rest and recovery.

**The Science of Sleep:**
Sleep isn't just rest - it's an active process where your brain consolidates memories, processes emotions, and repairs itself. During sleep, your brain clears metabolic waste, including toxins linked to Alzheimer's disease.

**Sleep Stages:**
- **Stage 1**: Light sleep, easy to wake
- **Stage 2**: Deeper sleep, body temperature drops
- **Stage 3**: Deep sleep, physical restoration
- **REM Sleep**: Dream sleep, emotional processing and memory consolidation

**The Sleep-Mental Health Connection:**
- 90% of people with depression experience sleep problems
- Insomnia increases risk of anxiety by 20x
- Poor sleep affects emotional regulation and stress response
- Quality sleep improves mood, focus, and decision-making

**Building Your Sleep Foundation:**

**1. Sleep Hygiene Basics:**
- Keep a consistent sleep schedule (even on weekends)
- Create a 30-60 minute wind-down routine
- Keep your bedroom cool (65-68°F), dark, and quiet
- Invest in comfortable bedding and pillows
- Remove electronic devices 1 hour before bed

**2. The Perfect Evening Routine:**

**2 Hours Before Bed:**
- Finish eating large meals
- Complete work tasks and screen time
- Begin dimming lights throughout your home

**1 Hour Before Bed:**
- Take a warm bath or shower
- Practice gentle stretching or yoga
- Read a physical book or journal
- Try relaxation techniques

**30 Minutes Before Bed:**
- Progressive muscle relaxation
- Deep breathing exercises
- Gratitude practice
- Meditation or prayer

**3. Nutrition for Better Sleep:**

**Sleep-Promoting Foods:**
- Tart cherries (natural melatonin)
- Almonds and walnuts (magnesium)
- Chamomile tea (natural sedative)
- Turkey and chicken (tryptophan)
- Oatmeal (complex carbohydrates)

**Avoid Before Bed:**
- Caffeine (6+ hours before sleep)
- Large meals (3 hours before)
- Alcohol (disrupts sleep cycles)
- Spicy or acidic foods
- Excessive fluids (2 hours before)

**4. Managing Sleep Anxiety:**

**The 4-7-8 Breathing Technique:**
- Inhale for 4 counts
- Hold for 7 counts
- Exhale for 8 counts
- Repeat 4-8 cycles

**Body Scan for Sleep:**
Starting from your toes, consciously relax each part of your body. Say to yourself: "My toes are relaxed, my feet are relaxed..." working up to your head.

**5. Creating the Ideal Sleep Environment:**

**Bedroom Optimization:**
- Blackout curtains or eye mask
- White noise machine or earplugs
- Comfortable mattress and pillows
- Plants that improve air quality (snake plant, aloe vera)
- Essential oil diffuser with lavender

**6. Dealing with Sleep Disruptions:**

**If You Can't Fall Asleep (20-Minute Rule):**
- Get out of bed after 20 minutes
- Do a quiet, non-stimulating activity
- Return to bed when sleepy
- Avoid checking the time

**For Middle-of-Night Waking:**
- Keep lights dim
- Practice breathing exercises
- Try progressive muscle relaxation
- Don't check your phone

**7. Natural Sleep Aids:**

**Herbal Teas:**
- Chamomile: reduces anxiety
- Passionflower: promotes calm
- Valerian root: natural sedative
- Lemon balm: stress relief

**Supplements (consult healthcare provider):**
- Melatonin: 0.5-3mg, 30 minutes before desired sleep
- Magnesium: promotes muscle relaxation
- L-theanine: reduces stress without drowsiness

**8. Exercise and Sleep:**

**Best Times to Exercise:**
- Morning: sets circadian rhythm
- Afternoon: moderate intensity
- Avoid vigorous exercise 3-4 hours before bed

**Sleep-Promoting Exercises:**
- Gentle yoga
- Stretching
- Walking
- Tai chi

**9. Managing Shift Work and Jet Lag:**

**For Shift Workers:**
- Use bright light during work hours
- Wear sunglasses on the way home
- Create a dark sleep environment
- Maintain consistent meal times

**For Jet Lag:**
- Adjust sleep schedule gradually before travel
- Use light therapy
- Stay hydrated
- Consider melatonin supplementation

**10. When to Seek Professional Help:**

**See a doctor if you experience:**
- Chronic insomnia (3+ nights per week for 3+ months)
- Loud snoring or breathing interruptions
- Excessive daytime sleepiness
- Restless leg syndrome
- Sleep talking or walking

**Sleep Tracking and Improvement:**

**Keep a Sleep Diary:**
- Bedtime and wake time
- Sleep quality (1-10 scale)
- Energy levels
- Mood upon waking
- Evening activities and foods

**Technology Tools:**
- Sleep tracking apps
- Smart alarm clocks
- Blue light blocking glasses
- Sleep meditation apps

**Quick Sleep Improvement Checklist:**
□ Consistent bedtime and wake time
□ Dark, cool, quiet bedroom
□ No screens 1 hour before bed
□ Comfortable bedding
□ Evening routine established
□ Regular exercise (not before bed)
□ Limited caffeine and alcohol
□ Stress management practices

Remember: Building healthy sleep habits takes time. Be patient with yourself and focus on gradual improvements. Quality sleep is an investment in your mental health, physical well-being, and overall life satisfaction.`

    // 2. Breathing Exercises for Anxiety
    const breathingExercisesContent = `Breathing is the bridge between your conscious and unconscious mind. When anxiety strikes, your breath becomes shallow and rapid. These evidence-based breathing techniques can quickly calm your nervous system and reduce anxiety symptoms.

**The Science Behind Breathing and Anxiety:**

When anxious, your body activates the sympathetic nervous system (fight-or-flight response). Controlled breathing activates the parasympathetic nervous system (rest-and-digest), which:
- Lowers heart rate and blood pressure
- Reduces cortisol (stress hormone) levels
- Increases GABA (calming neurotransmitter)
- Improves oxygen delivery to the brain

**Research shows that diaphragmatic breathing can reduce anxiety by up to 60% in just 5 minutes.**

**1. Box Breathing (4-4-4-4 Technique):**

**How to Practice:**
- Sit comfortably with your back straight
- Exhale completely through your mouth
- Inhale through your nose for 4 counts
- Hold your breath for 4 counts
- Exhale through your mouth for 4 counts
- Hold empty for 4 counts
- Repeat 4-8 cycles

**Best for:** Panic attacks, test anxiety, before stressful situations
**Navy SEALs use this technique to stay calm under extreme pressure.**

**2. 4-7-8 Breathing (The Instant Tranquilizer):**

**Steps:**
- Place tongue tip behind upper front teeth
- Exhale completely through mouth (whoosh sound)
- Close mouth, inhale through nose for 4
- Hold breath for 7
- Exhale through mouth for 8 (whoosh sound)
- Repeat 3-4 cycles

**Best for:** Insomnia, acute anxiety, racing thoughts
**Developed by Dr. Andrew Weil, based on ancient pranayama techniques.**

**3. Diaphragmatic Breathing (Belly Breathing):**

**Technique:**
- Lie down or sit comfortably
- Place one hand on chest, one on belly
- Breathe so only the bottom hand moves
- Inhale slowly through nose (3-4 seconds)
- Exhale slowly through mouth (6-8 seconds)
- Practice 5-10 minutes daily

**Benefits:**
- Strengthens diaphragm
- Increases lung capacity
- Reduces muscle tension
- Improves focus and concentration

**4. Extended Exhale Breathing:**

**Method:**
- Inhale naturally through nose
- Exhale for twice as long as inhale
- Example: Inhale for 4, exhale for 8
- Keep breathing smooth and controlled
- Continue for 2-5 minutes

**Science:** Longer exhales stimulate the vagus nerve, triggering the relaxation response.

**5. Alternate Nostril Breathing (Nadi Shodhana):**

**Steps:**
- Use right thumb to close right nostril
- Inhale through left nostril for 4 counts
- Use ring finger to close left nostril
- Release thumb, exhale through right nostril for 4
- Inhale through right nostril for 4
- Close right nostril, release left
- Exhale through left nostril for 4
- This completes one cycle - repeat 5-10 times

**Benefits:**
- Balances nervous system
- Improves focus and clarity
- Reduces stress and anxiety
- Enhances meditation practice

**6. Coherent Breathing (Resonance Breathing):**

**Technique:**
- Breathe at a rate of 5 breaths per minute
- Inhale for 6 seconds
- Exhale for 6 seconds
- No pause between breaths
- Practice for 10-20 minutes
- Use a breathing app or metronome

**Benefits:**
- Optimizes heart rate variability
- Enhances emotional regulation
- Improves cardiovascular health
- Increases resilience to stress

**7. Three-Part Breathing (Dirga Pranayama):**

**How to Practice:**
- **Part 1:** Breathe into your belly (hand on stomach rises)
- **Part 2:** Continue breathing into your ribs (chest expands)
- **Part 3:** Fill the upper chest (shoulders slightly rise)
- Exhale in reverse order: chest, ribs, belly
- Make each part equal in duration

**Best for:** Deep relaxation, before meditation, general stress relief

**8. Breath Counting:**

**Simple Method:**
- Count each exhale: 1, 2, 3, 4, 5
- Return to 1 after reaching 5
- If you lose count, simply start over
- Practice for 5-10 minutes

**Advanced Method:**
- Count both inhales and exhales
- Inhale 1, exhale 1, inhale 2, exhale 2...
- Count up to 10, then back down to 1

**9. Emergency Anxiety Breathing (STOP Technique):**

When anxiety hits suddenly:
- **S**top what you're doing
- **T**ake a deep breath (4-7-8 technique)
- **O**bserve your body and thoughts
- **P**roceed with intentional breathing

**10. Breathing for Specific Situations:**

**Before a Presentation:**
- Box breathing for 2 minutes
- Focus on extending exhales
- Visualize success while breathing

**During a Panic Attack:**
- 4-7-8 breathing
- Breathe into a paper bag if hyperventilating
- Count your breaths to stay grounded

**Before Sleep:**
- Extended exhale breathing
- Progressive muscle relaxation with breath
- 4-7-8 technique (no more than 4 cycles)

**For General Anxiety:**
- Daily diaphragmatic breathing practice
- Coherent breathing for 10 minutes
- Breath awareness throughout the day

**Building Your Breathing Practice:**

**Week 1-2:** Focus on diaphragmatic breathing, 5 minutes daily
**Week 3-4:** Add box breathing for anxiety moments
**Week 5-6:** Incorporate 4-7-8 technique for sleep
**Week 7-8:** Try alternate nostril breathing for balance

**Tips for Success:**

**Create Breathing Anchors:**
- Set phone reminders for breathing breaks
- Practice before meals
- Use traffic lights as breathing cues
- Breathe mindfully while walking

**Track Your Progress:**
- Note anxiety levels before/after (1-10 scale)
- Keep a breathing journal
- Notice physical sensations
- Record which techniques work best

**Common Mistakes to Avoid:**
- Forcing the breath (keep it natural)
- Breathing too fast initially
- Getting frustrated if mind wanders
- Practicing only during crisis

**Apps and Tools:**
- Breathe (iOS)
- Calm (breathing exercises)
- Insight Timer (guided breathing)
- Box Breathing apps
- Metronome for coherent breathing

**Remember:** Your breath is always available as an anchor to the present moment. With regular practice, these techniques become second nature, giving you powerful tools to manage anxiety wherever you are.

**Emergency Kit:**
Keep this quick reference handy:
- Panic: 4-7-8 breathing (4 cycles max)
- Stress: Box breathing (5-10 cycles)
- Insomnia: Extended exhale breathing
- Focus: Breath counting
- Balance: Alternate nostril breathing`

    // 3. Managing Depression: Self-Care Strategies
    const depressionSelfCareContent = `Depression affects over 280 million people worldwide, but with the right self-care strategies, you can actively participate in your healing journey. While professional support is crucial, these evidence-based self-care practices can significantly improve your symptoms and quality of life.

**Understanding Depression and Self-Care:**

Depression isn't just sadness - it's a complex condition affecting thoughts, emotions, physical health, and behavior. Self-care isn't selfish; it's essential medicine that works alongside professional treatment.

**Research shows that structured self-care can:**
- Reduce depression symptoms by 20-30%
- Improve treatment outcomes when combined with therapy
- Prevent relapse and build resilience
- Enhance overall quality of life

**1. Physical Self-Care Foundation:**

**Exercise as Medicine:**
Physical activity is as effective as antidepressants for mild to moderate depression.

**Start Small:**
- 5-minute walks daily
- Gentle stretching upon waking
- Dancing to one favorite song
- Taking stairs instead of elevator

**Build Gradually:**
- Aim for 30 minutes moderate exercise, 5 days/week
- Include both cardio and strength training
- Try yoga, swimming, cycling, or hiking
- Exercise outdoors when possible (vitamin D + nature benefits)

**Exercise Tips for Depression:**
- Choose activities you enjoy
- Exercise with others for accountability
- Set realistic goals
- Celebrate small victories
- Use exercise as moving meditation

**2. Nutrition for Mental Health:**

**Brain-Supporting Foods:**

**Omega-3 Rich Foods:**
- Fatty fish (salmon, mackerel, sardines)
- Walnuts and flaxseeds
- Chia seeds and hemp hearts

**Complex Carbohydrates:**
- Oatmeal and whole grains
- Sweet potatoes
- Quinoa and brown rice

**Protein for Neurotransmitters:**
- Lean meats and poultry
- Eggs and dairy
- Legumes and beans
- Greek yogurt

**Antioxidant-Rich Foods:**
- Berries (blueberries, strawberries)
- Dark leafy greens
- Colorful vegetables
- Green tea

**Foods to Limit:**
- Processed and packaged foods
- Excessive sugar and refined carbs
- Alcohol (depressant effect)
- Caffeine (can worsen anxiety)

**3. Sleep and Depression Management:**

**Sleep-Depression Connection:**
- 90% of people with depression have sleep problems
- Poor sleep worsens depression symptoms
- Quality sleep improves mood regulation

**Sleep Strategies for Depression:**
- Maintain consistent sleep schedule
- Create a calming bedtime routine
- Keep bedroom cool, dark, and quiet
- Limit naps to 20-30 minutes before 3 PM
- Use light therapy in the morning

**4. Mindfulness and Emotional Regulation:**

**Mindfulness-Based Cognitive Therapy (MBCT):**
Proven to reduce depression relapse by 43%.

**Daily Mindfulness Practices:**

**5-Minute Breathing Space:**
- 1 minute: Notice what's happening now
- 1 minute: Focus on breathing
- 3 minutes: Expand awareness to whole body

**Body Scan Meditation:**
- Lie comfortably
- Scan from toes to head
- Notice sensations without judgment
- Practice for 10-20 minutes

**Mindful Daily Activities:**
- Mindful eating (taste, texture, temperature)
- Mindful walking (feel feet touching ground)
- Mindful listening (sounds without labels)

**5. Social Connection and Support:**

**Building Your Support Network:**

**Identify Your Circle:**
- **Inner circle:** 2-3 closest people
- **Middle circle:** 5-8 regular contacts
- **Outer circle:** Broader community connections

**Strategies for Connection:**
- Schedule regular check-ins with friends
- Join support groups (online or in-person)
- Volunteer for causes you care about
- Take classes or join clubs
- Practice reaching out when struggling

**Communication Tips:**
- Be honest about your needs
- Ask for specific help
- Express gratitude for support
- Set healthy boundaries

**6. Cognitive Self-Care:**

**Challenging Negative Thoughts:**

**The ABCDE Model:**
- **A**dversity: Identify the triggering event
- **B**eliefs: Notice automatic thoughts
- **C**onsequences: Observe emotional/behavioral results
- **D**isputation: Challenge negative thoughts
- **E**nergization: Feel the positive change

**Common Cognitive Distortions:**
- All-or-nothing thinking
- Mental filtering (focusing on negatives)
- Mind reading
- Catastrophizing
- Personalization

**Thought Challenging Questions:**
- Is this thought helpful or harmful?
- What evidence supports/contradicts this thought?
- What would I tell a friend in this situation?
- How will this matter in 5 years?

**7. Behavioral Activation:**

**Activity Scheduling:**
Depression often leads to withdrawal. Behavioral activation helps break this cycle.

**Steps:**
1. **Monitor:** Track daily activities and mood
2. **Schedule:** Plan pleasant and meaningful activities
3. **Activate:** Engage in activities regardless of mood
4. **Evaluate:** Notice changes in mood and energy

**Types of Activities:**

**Pleasure Activities:**
- Listen to music
- Take a warm bath
- Watch comedy shows
- Spend time in nature
- Creative pursuits

**Mastery Activities:**
- Complete small tasks
- Learn new skills
- Organize living space
- Cook healthy meals
- Exercise

**8. Creative Expression:**

**Art Therapy Benefits:**
- Processes emotions non-verbally
- Provides sense of accomplishment
- Offers healthy distraction
- Builds self-esteem

**Creative Activities:**
- Journaling and poetry
- Drawing, painting, sculpting
- Music and dance
- Photography
- Crafting and DIY projects

**9. Spiritual and Meaning-Making Practices:**

**Finding Purpose:**
- Identify your values
- Set meaningful goals
- Help others through volunteering
- Practice gratitude daily
- Connect with nature

**Spiritual Practices:**
- Meditation and prayer
- Reading inspirational texts
- Attending religious services
- Practicing forgiveness
- Spending time in nature

**10. Creating Your Daily Self-Care Routine:**

**Morning Routine (20-30 minutes):**
- Gentle stretching or yoga
- Gratitude practice (3 things)
- Healthy breakfast
- Set 1-3 intentions for the day

**Midday Check-in (5-10 minutes):**
- Mindful breathing
- Assess energy and mood
- Adjust plans if needed
- Practice self-compassion

**Evening Routine (30-45 minutes):**
- Reflect on the day
- Journal thoughts and feelings
- Relaxation techniques
- Prepare for quality sleep

**Weekly Self-Care:**
- Schedule one enjoyable activity
- Connect with a friend or family member
- Spend time in nature
- Review and adjust self-care plan

**11. Building Resilience:**

**Resilience Factors:**
- Strong social connections
- Sense of purpose and meaning
- Adaptive coping strategies
- Self-compassion
- Optimism and hope

**Resilience-Building Activities:**
- Practice gratitude daily
- Develop problem-solving skills
- Build emotional intelligence
- Cultivate optimism
- Learn from setbacks

**12. When to Seek Professional Help:**

**Red Flags:**
- Thoughts of self-harm or suicide
- Inability to function in daily life
- Substance abuse
- Severe sleep or appetite changes
- Hopelessness lasting weeks

**Professional Resources:**
- Primary care physician
- Mental health counselor
- Psychiatrist
- Support groups
- Crisis hotlines

**Self-Care Emergency Kit:**

Keep these ready for difficult days:
- List of emergency contacts
- Comfort items (soft blanket, photos)
- Calming music playlist
- Essential oils (lavender, peppermint)
- Healthy snacks
- Journal and pen
- Inspiring quotes or affirmations

**Remember:** Recovery isn't linear. Some days will be harder than others. Self-care is about progress, not perfection. Be patient and compassionate with yourself as you heal.

**Daily Affirmations:**
- "I am worthy of love and care"
- "This feeling is temporary"
- "I am taking positive steps toward healing"
- "I have survived difficult times before"
- "I deserve happiness and peace"`

    // 4. Mindful Walking Meditation
    const mindfulWalkingContent = `Mindful walking meditation combines the benefits of meditation with gentle physical movement, making it perfect for those who find sitting meditation challenging. This practice cultivates present-moment awareness while connecting you with your body and environment.

**What is Mindful Walking Meditation?**

Mindful walking is the practice of walking slowly and deliberately while maintaining full awareness of the physical sensations of walking and your surrounding environment. Unlike regular walking where the destination matters, mindful walking focuses entirely on the journey itself.

**Scientific Benefits:**

**Mental Health Benefits:**
- Reduces anxiety and depression symptoms
- Improves emotional regulation
- Enhances focus and concentration
- Decreases rumination and worry
- Increases self-awareness and mindfulness

**Physical Benefits:**
- Improves balance and coordination
- Strengthens leg muscles
- Enhances cardiovascular health
- Boosts immune system function
- Reduces chronic pain

**Cognitive Benefits:**
- Enhances creativity and problem-solving
- Improves memory and learning
- Increases mental clarity
- Reduces mental fatigue
- Enhances decision-making abilities

**Research Findings:**
- 8 weeks of mindful walking reduced depression scores by 71%
- Participants showed 35% improvement in sleep quality
- Stress hormone cortisol decreased by 23%
- Attention span increased by 45%

**1. Basic Mindful Walking Technique:**

**Preparation:**
- Choose a quiet path 10-20 steps long
- Remove distractions (phone, headphones)
- Wear comfortable shoes
- Start with 10-15 minutes

**The Practice:**

**Step 1: Standing Meditation (2 minutes)**
- Stand at one end of your path
- Feel your feet on the ground
- Notice your posture and balance
- Take 3 deep breaths
- Set intention for your practice

**Step 2: Beginning to Walk**
- Lift your right foot slowly
- Notice the movement and balance shift
- Place your foot down mindfully
- Feel the contact with the ground
- Repeat with left foot

**Step 3: Finding Your Rhythm**
- Walk slower than normal pace
- Coordinate breath with steps
- Notice the lifting, moving, placing of each foot
- When you reach the end, pause and turn mindfully

**Step 4: Continuous Practice**
- Walk back and forth on your chosen path
- Maintain awareness of each step
- When mind wanders, gently return to walking
- End with 1 minute of standing meditation

**2. Advanced Techniques:**

**Breath-Coordinated Walking:**
- **Slow pace:** Inhale for 2 steps, exhale for 2 steps
- **Medium pace:** Inhale for 3 steps, exhale for 3 steps
- **Natural pace:** Match breath to comfortable rhythm

**Sensation-Focused Walking:**
- Focus on different body parts:
  - Feet touching ground
  - Leg muscles engaging
  - Arms swinging naturally
  - Core maintaining balance
  - Breath supporting movement

**Environmental Awareness Walking:**
- **Sounds:** Birds, wind, traffic, footsteps
- **Sights:** Colors, shapes, light, shadows
- **Smells:** Fresh air, flowers, earth
- **Temperature:** Sun, breeze, humidity
- **Textures:** Ground surface, air on skin

**3. Walking Meditation Variations:**

**Circular Walking:**
- Find a circular path or create one
- Walk in a circle, maintaining awareness
- No need to turn around
- Symbolizes the continuous nature of practice

**Labyrinth Walking:**
- Use actual labyrinth or create simple one
- Focus on the winding path
- Let go of goal-orientation
- Trust the path to guide you

**Nature Walking:**
- Practice in parks, forests, or beaches
- Connect with natural rhythms
- Notice seasonal changes
- Feel part of larger ecosystem

**Urban Walking:**
- Practice mindful walking in city settings
- Notice architecture, people, sounds
- Use urban environment as meditation object
- Find peace within activity

**4. Indoor Walking Meditation:**

**Small Space Practice:**
- Use hallway or large room
- 5-10 steps can be sufficient
- Focus more intensely on each sensation
- Turn mindfully at each end

**Walking Meditation Positions:**

**Slow Motion Walking:**
- Extremely slow, deliberate steps
- Focus on micro-movements
- Notice balance shifts
- Feel muscles engaging and releasing

**Heel-to-Toe Walking:**
- Place heel of front foot against toes of back foot
- Enhances balance and concentration
- Increases body awareness
- Slows down the practice naturally

**5. Integrating with Daily Life:**

**Everyday Mindful Walking:**

**Walking to Work:**
- Dedicate first 5 minutes to mindful walking
- Notice transition from home to work mindset
- Use walking as preparation for the day

**Walking Meetings:**
- Suggest walking meetings when appropriate
- Practice mindful listening while walking
- Notice how movement affects thinking

**Grocery Store Walking:**
- Walk mindfully between aisles
- Notice impulses and reactions
- Practice patience in lines

**Dog Walking:**
- Alternate between attention on dog and your walking
- Use your pet as reminder to stay present
- Enjoy shared movement experience

**6. Combining with Other Practices:**

**Walking and Loving-Kindness:**
- Send good wishes to people you pass
- "May you be happy, may you be peaceful"
- Include yourself in loving-kindness
- Extend wishes to all beings

**Walking and Gratitude:**
- Notice things you're grateful for while walking
- Appreciate your body's ability to move
- Thank the earth for supporting you
- Acknowledge beauty around you

**Walking and Forgiveness:**
- Use walking rhythm to release resentment
- Practice forgiveness with each step
- Let go of past hurts
- Walk toward emotional freedom

**7. Seasonal Walking Practices:**

**Spring Walking:**
- Notice new growth and renewal
- Feel energy of new beginnings
- Appreciate fresh scents and colors
- Connect with themes of rebirth

**Summer Walking:**
- Feel warmth and abundance
- Notice full foliage and activity
- Practice early morning or evening
- Stay hydrated and protected

**Autumn Walking:**
- Observe change and letting go
- Walk among falling leaves
- Reflect on impermanence
- Appreciate harvest energy

**Winter Walking:**
- Bundle warmly and walk mindfully
- Notice stark beauty and stillness
- Feel connection to earth's rest period
- Practice inner warmth cultivation

**8. Common Challenges and Solutions:**

**Challenge: Mind Keeps Wandering**
- **Solution:** Use counting steps or breath coordination
- Start with shorter sessions
- Be patient and compassionate with yourself

**Challenge: Feeling Self-Conscious**
- **Solution:** Practice in private spaces initially
- Remember most people aren't paying attention
- Focus on internal experience, not external judgment

**Challenge: Physical Discomfort**
- **Solution:** Adjust pace and duration
- Choose appropriate footwear and clothing
- Listen to your body's needs

**Challenge: Boredom or Restlessness**
- **Solution:** Experiment with different techniques
- Try walking in new locations
- Remember that boredom is just another experience to observe

**9. Creating Your Walking Meditation Practice:**

**Week 1-2: Foundation**
- 10 minutes daily, same time and place
- Focus on basic technique
- Don't worry about "doing it right"

**Week 3-4: Expansion**
- Increase to 15-20 minutes
- Try different locations
- Experiment with pace variations

**Week 5-6: Integration**
- Add everyday mindful walking
- Combine with other meditation practices
- Notice changes in daily awareness

**Week 7-8: Refinement**
- Develop personal style
- Address any challenges
- Establish long-term routine

**10. Equipment and Setup:**

**Essential:**
- Comfortable walking shoes
- Weather-appropriate clothing
- Safe walking area

**Optional:**
- Timer or meditation app
- Walking stick for balance
- Journal for reflections
- Water bottle for longer sessions

**Safety Considerations:**
- Choose safe, well-lit paths
- Avoid busy roads or hazardous areas
- Walk with partner if needed
- Inform others of your route

**Walking Meditation Mantras:**

- "Step by step, breath by breath"
- "Here, now, present, aware"
- "Lifting, moving, placing, shifting"
- "Peace with each step"
- "Walking toward wisdom"

**Closing Reflection:**

Mindful walking meditation teaches us that every step can be a prayer, every breath a blessing, every moment an opportunity for presence. As you develop this practice, you'll discover that the path itself becomes the destination, and the journey becomes the teaching.

**Remember:** There's no perfect way to practice mindful walking. The goal isn't to achieve a particular state but to cultivate awareness and presence with whatever arises. Trust your experience, be patient with the process, and let each step be a teacher.

**Walking Meditation Journal Prompts:**
- How did my body feel during the practice?
- What thoughts or emotions arose?
- What did I notice about my environment?
- How can I bring this awareness into daily walking?
- What am I grateful for about my ability to move?

**Quote to Carry:** "Peace is every step. The shining red sun is my heart. Each flower smiles with me. How green, how fresh all grows. How cool the wind blows. Peace is every step. It turns the endless path to joy." - Thich Nhat Hanh`

    // Update resources in database
    const updates = [
      {
        title: "Building Healthy Sleep Habits",
        content: sleepHabitsContent
      },
      {
        title: "Breathing Exercises for Anxiety",
        content: breathingExercisesContent
      },
      {
        title: "Managing Depression: Self-Care Strategies",
        content: depressionSelfCareContent
      },
      {
        title: "Mindful Walking Meditation",
        content: mindfulWalkingContent
      }
    ]

    for (const update of updates) {
      console.log(`Updating: ${update.title}...`)
      
      const result = await WellnessResource.findOneAndUpdate(
        { title: update.title },
        { 
          content: update.content,
          $setOnInsert: {
            author: "ZenZone Wellness Team",
            isPublished: true,
            viewCount: 0
          }
        },
        { 
          new: true,
          upsert: false // Don't create if not found, just update existing
        }
      )
      
      if (result) {
        console.log(`✅ Successfully updated: ${update.title}`)
      } else {
        console.log(`❌ Resource not found: ${update.title}`)
      }
    }

    console.log('\n🎉 All wellness resources have been updated with comprehensive content!')
    
  } catch (error) {
    console.error('Error updating wellness resources:', error)
  } finally {
    mongoose.connection.close()
  }
}

updateWellnessResources()
