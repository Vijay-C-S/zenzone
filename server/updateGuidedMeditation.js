import mongoose from 'mongoose'
import WellnessResource from './models/WellnessResource.js'

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/zenzone')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

const guidedMeditationContent = `This 10-minute guided meditation is designed to help you reduce stress and find inner calm. Perfect for beginners and experienced practitioners alike.

**What You'll Experience:**
- Deep relaxation techniques
- Breathing exercises for stress relief
- Body scan meditation
- Mindfulness practices
- Gentle guidance throughout

**Benefits of This Practice:**
- Reduces cortisol (stress hormone) levels
- Activates the parasympathetic nervous system
- Improves emotional regulation
- Enhances focus and clarity
- Promotes better sleep quality

**How to Practice:**
1. Find a quiet, comfortable space
2. Sit or lie down in a relaxed position
3. Close your eyes or soften your gaze
4. Follow the guided instructions
5. Allow yourself to fully relax

**The Meditation Script:**

**Introduction (1 minute):**
Welcome to this guided meditation for stress relief. Take a moment to settle into your position. Allow your body to be supported by whatever you're sitting or lying on. There's nowhere else you need to be right now, nothing else you need to do.

**Breathing Foundation (2 minutes):**
Begin by noticing your natural breath. Don't try to change it, just observe. Feel the air entering your nostrils... and flowing out. With each exhale, let go of the tension from your day. Breathe in calm... breathe out stress.

Now, let's deepen the breath. Inhale slowly for a count of 4... hold for 2... exhale for 6. Inhale calm and peace... hold gently... exhale all tension and worry.

**Body Scan (4 minutes):**
Starting with the top of your head, notice any tension or tightness. Breathe into this area and let it soften. Move your attention to your forehead, your eyes, your jaw. Often we hold stress here without realizing it.

Continue down to your neck and shoulders. These areas carry so much of our daily stress. Breathe into your shoulders and let them drop away from your ears. Feel the release.

Move your attention to your arms, your hands. Let them rest completely. Notice your chest, your heart. Breathe into your heart space, offering yourself compassion.

Continue to your stomach, your back. Release any tension you're holding here. Move down to your hips, your legs, all the way to your toes. Let your entire body sink into relaxation.

**Stress Release Visualization (2 minutes):**
Imagine yourself in a peaceful place - perhaps a serene beach, a quiet forest, or a comfortable room filled with soft light. You are completely safe here, completely at peace.

With each breath, imagine stress leaving your body like dark clouds dissolving into light. See yourself surrounded by healing, golden light. This light represents peace, calm, and restoration. Let it fill every cell of your body.

**Closing and Integration (1 minute):**
Take a few more deep breaths, knowing that you can return to this feeling of calm whenever you need it. You have everything within you to handle whatever comes your way.

When you're ready, wiggle your fingers and toes. Take a deep breath and slowly open your eyes. Carry this sense of peace with you into the rest of your day.

**Tips for Regular Practice:**
- Practice at the same time each day
- Start with shorter sessions if 10 minutes feels too long
- Use this meditation whenever you feel overwhelmed
- Remember that it's normal for your mind to wander
- Be patient and kind with yourself

**Scientific Background:**
Research shows that regular meditation practice can:
- Reduce symptoms of anxiety and depression by 58%
- Lower blood pressure and heart rate
- Improve immune system function
- Increase gray matter in areas associated with learning and memory
- Reduce activity in the amygdala (fear center of the brain)

This practice is based on mindfulness-based stress reduction (MBSR) techniques developed at the University of Massachusetts Medical Center.

**Remember:** Healing is a journey, not a destination. Each moment of peace you create contributes to your overall well-being.`

async function updateGuidedMeditation() {
  try {
    // Find the guided meditation resource by its ObjectId
    const resource = await WellnessResource.findById('688340dd9eec736f29f30e5b')
    
    if (!resource) {
      console.log('Resource not found. Creating new guided meditation resource...')
      
      const newResource = new WellnessResource({
        title: "Guided Meditation for Stress Relief",
        description: "A 10-minute guided meditation to help reduce stress and anxiety.",
        content: guidedMeditationContent,
        type: "video",
        category: "mindfulness",
        url: "https://youtu.be/Ix73CLI0MoQ?si=QlINA16tLS3o-zlV",
        imageUrl: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        duration: "10 min",
        difficulty: "beginner",
        isPublished: true,
        author: "ZenZone",
        tags: ['guided meditation', 'stress relief', 'mindfulness', 'breathing', 'relaxation'],
        viewCount: 0
      })
      
      await newResource.save()
      console.log('New guided meditation resource created successfully!')
    } else {
      // Update the existing resource with content
      resource.content = guidedMeditationContent
      if (!resource.tags || resource.tags.length === 0) {
        resource.tags = ['guided meditation', 'stress relief', 'mindfulness', 'breathing', 'relaxation']
      }
      await resource.save()
      console.log('Guided meditation resource updated with content successfully!')
    }
  } catch (error) {
    console.error('Error updating guided meditation:', error)
  } finally {
    mongoose.connection.close()
  }
}

updateGuidedMeditation()
