import mongoose from 'mongoose'
import WellnessResource from './models/WellnessResource.js'

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/zenzone')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

const expandedAnxietyContent = `Anxiety affects 1 in 8 people worldwide. This comprehensive guide covers understanding anxiety disorders, recognizing symptoms, and implementing evidence-based coping strategies.

## **Understanding Anxiety**

**Normal vs. Problematic Anxiety:**
- Normal: Occurs before specific events, proportionate, temporary
- Problematic: Persistent, excessive, interferes with daily life

**Types of Anxiety Disorders:**

**1. Generalized Anxiety Disorder (GAD)**
- Excessive worry about multiple life areas for 6+ months
- Affects 6.8 million US adults (3.1% of population)
- Symptoms: Muscle tension, fatigue, restlessness, difficulty concentrating

**2. Panic Disorder**
- Recurrent panic attacks with intense fear
- Affects 6 million US adults (2.7% of population)
- Symptoms: Heart palpitations, sweating, shortness of breath, chest pain

**3. Social Anxiety Disorder**
- Intense fear of social situations and judgment
- Affects 15 million US adults (6.8% of population)
- Symptoms: Blushing, trembling, nausea in social situations

**4. Specific Phobias**
- Intense fear of specific objects/situations
- Affects 19 million US adults (7.1% of population)
- Types: Animals, heights, blood/injections, flying

## **The Science Behind Anxiety**

**Brain Regions Involved:**
- Amygdala: Fear center triggering fight-or-flight
- Prefrontal Cortex: Rational thinking that can override fear
- Hippocampus: Stores fear-related memories

**Key Neurotransmitters:**
- GABA: Primary calming neurotransmitter (often low in anxiety)
- Serotonin: Mood regulator (imbalances linked to anxiety)
- Norepinephrine: Stress hormone increasing alertness

## **Common Symptoms**

**Physical:**
- Heart palpitations, shortness of breath, sweating
- Trembling, chest pain, nausea, dizziness
- Muscle tension, headaches, fatigue

**Emotional:**
- Excessive worry, feeling on edge, irritability
- Sense of impending doom, difficulty concentrating
- Feeling overwhelmed or detached

**Behavioral:**
- Avoidance of feared situations, procrastination
- Seeking constant reassurance, social withdrawal
- Perfectionism, substance use for coping

## **Evidence-Based Coping Strategies**

### **Immediate Relief Techniques**

**1. 5-4-3-2-1 Grounding**
- 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste

**2. Box Breathing (Navy SEAL technique)**
- Inhale 4, hold 4, exhale 4, hold 4 - repeat 4-8 cycles

**3. Progressive Muscle Relaxation**
- Tense each muscle group 5 seconds, then release
- Start with toes, work up to head

### **Cognitive Strategies**

**Thought Challenging Questions:**
- Is this thought realistic?
- What evidence supports/contradicts it?
- How would I advise a friend?
- Will this matter in 5 years?

**Cognitive Reframing Examples:**
- "I'll fail" → "I'm prepared with valuable information"
- "Everyone judges me" → "Most people focus on themselves"

**STOP Technique:**
- Stop what you're doing
- Take a deep breath
- Observe thoughts and feelings
- Proceed with intention

### **Lifestyle Modifications**

**Exercise for Anxiety:**
- 30 minutes moderate exercise, 5 days/week
- Best types: Aerobic, yoga, strength training, nature walks
- Benefits: Releases endorphins, reduces cortisol, improves sleep

**Sleep Hygiene:**
- Consistent sleep schedule, relaxing bedtime routine
- Cool, dark, quiet bedroom
- Limit caffeine after 2 PM, avoid screens 1 hour before bed

**Nutrition:**
- Foods that help: Omega-3 fish, magnesium-rich foods, probiotics, complex carbs
- Limit: Caffeine, alcohol, processed foods, artificial sweeteners

### **Advanced Techniques**

**Mindfulness Meditation:**
- Sit comfortably, focus on breath
- When mind wanders, gently return to breath
- Start 5 minutes, increase gradually
- Reduces amygdala reactivity, improves emotional regulation

**Exposure Therapy Principles:**
- Start with least anxiety-provoking situation
- Stay until anxiety naturally decreases
- Practice regularly, gradually increase difficulty

**TIPP for Crisis Moments:**
- Temperature: Cold water on face/hands
- Intense Exercise: Jumping jacks, running
- Paced Breathing: Slow, controlled
- Paired Muscle Relaxation: Tense and release

## **Professional Treatment**

**Therapy Approaches:**
- CBT (Cognitive Behavioral Therapy): Gold standard, 60-80% success rate
- Exposure Therapy: Effective for phobias and OCD
- ACT (Acceptance Commitment Therapy): Focus on values despite anxiety
- EMDR: Effective for trauma-related anxiety

**Medication Options (consult healthcare provider):**
- SSRIs: Sertraline, Escitalopram, Fluoxetine
- SNRIs: Venlafaxine, Duloxetine
- Benzodiazepines: Short-term use only

## **Personal Management Plan**

**Step 1: Identify Triggers**
Keep anxiety diary: time, place, situation, physical sensations, thoughts, coping strategies used

**Step 2: Build Toolkit**
Select 3-5 techniques from each category:
- Immediate Relief: Breathing, grounding, cold water
- Cognitive: Thought challenging, reframing
- Physical: Exercise, progressive relaxation
- Lifestyle: Sleep, nutrition, meditation

**Step 3: Emergency Plan**
1. Use TIPP technique
2. Call support person
3. Go to safe space
4. Use grounding techniques
5. Consider professional help if needed

## **Supporting Others**

**Helpful Responses:**
- "I'm here for you"
- "This feeling will pass" 
- "You're safe right now"
- "Let's breathe together"

**Avoid Saying:**
- "Just relax" or "Think positive"
- "Others have it worse"
- "You're being dramatic"

## **When to Seek Help**

**Seek help immediately if:**
- Thoughts of self-harm
- Panic attacks interfering with daily life
- Unable to work/attend school
- Substance use to cope

**Consider therapy if:**
- Anxiety persists 6+ months
- Self-help strategies ineffective
- Multiple life areas affected

## **Resources**

**Apps:** Headspace, Calm, DARE, Mindfulness Coach
**Books:** "The Anxiety and Worry Workbook", "Mind Over Mood"
**Organizations:** ADAA, NIMH, local mental health centers

## **Recovery and Hope**

Anxiety is highly treatable. With proper understanding, effective coping strategies, and professional support when needed, people with anxiety disorders can live full, meaningful lives. Recovery is possible - you don't have to face anxiety alone.

**Key Takeaways:**
- Anxiety is common and treatable
- Multiple effective treatments exist
- Self-care strategies are powerful tools
- Professional help is available and effective
- Recovery is a process, not a destination
- You are stronger than your anxiety

Be compassionate with yourself as you develop new skills. Seeking help is a sign of strength, not weakness.`

async function updateAnxietyGuide() {
  try {
    console.log('Looking for Understanding Anxiety resource...')
    
    // Search for the anxiety resource by title variations
    const resource = await WellnessResource.findOne({
      $or: [
        { title: "Understanding Anxiety: A Comprehensive Guide" },
        { title: "Understanding Anxiety: A Beginner's Guide" },
        { title: { $regex: /Understanding Anxiety/i } }
      ]
    })
    
    if (!resource) {
      console.log('Anxiety resource not found. Available resources:')
      const allResources = await WellnessResource.find({}, 'title')
      allResources.forEach(r => console.log(`- ${r.title}`))
      return
    }

    console.log(`Found resource: "${resource.title}"`)
    console.log('Updating with comprehensive anxiety content...')
    
    // Update the resource with expanded content
    resource.content = expandedAnxietyContent
    resource.description = "Complete guide to understanding anxiety disorders, symptoms, and evidence-based coping strategies. Includes cognitive techniques, lifestyle modifications, and professional treatment options."
    
    // Add more comprehensive tags
    if (!resource.tags || resource.tags.length === 0) {
      resource.tags = [
        'anxiety', 'anxiety disorders', 'GAD', 'panic disorder', 'social anxiety', 
        'phobias', 'coping strategies', 'CBT', 'mindfulness', 'breathing exercises',
        'grounding techniques', 'cognitive reframing', 'exposure therapy', 'self-help',
        'treatment', 'therapy', 'medication', 'stress management', 'mental health'
      ]
    }
    
    await resource.save()
    
    console.log('✅ Successfully updated Understanding Anxiety guide with comprehensive content!')
    console.log(`📊 Content length: ${expandedAnxietyContent.length} characters`)
    console.log(`🏷️  Tags: ${resource.tags.length} tags added`)
    
  } catch (error) {
    console.error('Error updating anxiety guide:', error)
  } finally {
    mongoose.connection.close()
  }
}

updateAnxietyGuide()
