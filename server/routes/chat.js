import express from 'express'
import { body, validationResult } from 'express-validator'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Validation rules
const chatValidation = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters')
]

// Initialize the Google Gemini client
// We are using the gemini-1.5-flash model for its balance of performance and cost.
let model
if (process.env.GEMINI_API_KEY) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
}

// System prompt to define the chatbot's persona and rules.
const systemPrompt = `You are ZenBot, a highly skilled and compassionate AI wellness companion for ZenZone, a comprehensive mental health platform. You are trained in evidence-based therapeutic approaches and mental health best practices.

Your Professional Identity:
- You are a warm, empathetic, and non-judgmental mental health support specialist
- You have extensive knowledge of CBT, mindfulness, stress management, and emotional regulation techniques
- You communicate with the expertise of a licensed therapist but always clarify you're an AI companion
- You provide immediate, accessible support while encouraging professional care when needed

Your Communication Style:
- Use active listening techniques and validate emotions first
- Ask thoughtful follow-up questions to understand context better
- Provide personalized, actionable coping strategies
- Use professional yet warm language that feels genuine and caring
- Reference specific therapeutic techniques when appropriate (breathing exercises, grounding techniques, cognitive reframing, etc.)
- Keep responses comprehensive but digestible (3-4 sentences with clear structure)

Your Core Capabilities:
1. Emotional Validation & Support: Always acknowledge and validate feelings before offering solutions
2. Crisis Recognition: Immediately identify and respond to self-harm, suicidal ideation, or crisis situations
3. Therapeutic Techniques: Offer evidence-based coping strategies including:
   - Mindfulness and grounding exercises
   - Breathing techniques (4-7-8, box breathing, etc.)
   - Cognitive behavioral techniques
   - Progressive muscle relaxation
   - Journaling prompts
4. Psychoeducation: Explain mental health concepts in accessible ways
5. Resource Connection: Guide users to appropriate professional help and platform features

Safety Protocols:
- For crisis situations: Immediately provide crisis hotline information and encourage emergency services
- For persistent symptoms: Encourage professional mental health consultation
- For medication questions: Always defer to healthcare providers
- Never diagnose or provide medical advice

Response Framework:
1. Acknowledge the user's sharing with empathy
2. Validate their experience and normalize their feelings
3. Offer specific, actionable coping strategies
4. Ask a gentle follow-up question to continue the supportive conversation
5. When appropriate, suggest relevant ZenZone platform features (meditation, mood tracking, journaling, etc.)

Remember: You are a bridge between immediate emotional support and professional care, helping users feel heard, understood, and empowered to take steps toward better mental health.`

// Chat with AI companion
router.post('/', authenticate, chatValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { message } = req.body

    // Check if Gemini API key is configured
    if (!model) {
      return res.json({
        response: "Hello, I'm ZenBot, your AI wellness companion. While I'm currently in a limited mode, I want you to know that your feelings are completely valid and you're not alone in whatever you're experiencing. Your courage in reaching out shows incredible strength. I encourage you to explore ZenZone's other features like guided meditation, mood tracking, and journaling, which can provide additional support. If you're in crisis or need immediate help, please don't hesitate to contact a mental health professional or crisis hotline. What's one small act of self-care you could do for yourself today?"
      })
    }

    try {
      // Start a chat session with the enhanced system prompt
      const chat = model.startChat({
        history: [{
          role: 'user',
          parts: [{ text: systemPrompt }]
        }, {
          role: 'model',
          parts: [{ text: 'I understand completely. I am ZenBot, your professional AI wellness companion. I will provide empathetic, evidence-based mental health support while following all therapeutic guidelines and safety protocols. I\'m here to listen, validate, and guide users with the expertise and warmth of a skilled mental health professional. How may I support you today?' }]
        }],
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
        },
      })
      
      const result = await chat.sendMessage(message)
      const response = result.response
      const aiResponse = response.text()

      res.json({ response: aiResponse })

    } catch (apiError) {
      console.error('Gemini API error:', apiError)
     
      // Enhanced professional fallback responses
      const lowerMessage = message.toLowerCase()
      let fallbackResponse

      if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('panic')) {
        fallbackResponse = "I hear that you're experiencing anxiety, and I want you to know that what you're feeling is completely valid and manageable. Anxiety is our mind's way of trying to protect us, even when we don't need that protection right now. Let's try a grounding technique together: Can you identify 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste? This 5-4-3-2-1 technique can help bring you back to the present moment. What feels most overwhelming about your anxiety right now?"
      } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down') || lowerMessage.includes('hopeless')) {
        fallbackResponse = "I'm truly sorry you're experiencing these difficult feelings. Depression can feel like carrying an invisible weight, and it takes courage to reach out when you're struggling. Your feelings are completely valid, and you're not alone in this experience. Sometimes when we're feeling low, even small acts of self-compassion can create tiny shifts - perhaps a warm cup of tea, stepping outside for fresh air, or listening to music that speaks to you. You mentioned feeling down - can you tell me what's been weighing on your heart lately?"
      } else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
        fallbackResponse = "Feeling overwhelmed is a signal that you're carrying more than feels manageable right now, and that's completely understandable. When stress builds up, our minds can feel scattered and everything can seem urgent at once. Let's try to create some space for you. Take a moment to breathe - in through your nose for 4 counts, hold for 4, out through your mouth for 6. This activates your parasympathetic nervous system and can help you feel more grounded. What would it look like to prioritize just one or two things today instead of everything at once?"
      } else if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
        fallbackResponse = "Loneliness can feel so heavy, and I want you to know that reaching out here shows incredible strength. Sometimes loneliness isn't about being physically alone - it's about feeling disconnected or misunderstood. Your feelings matter, and you deserve to feel seen and heard. Even small connections can help - perhaps reaching out to one person you trust, or engaging in a community activity that aligns with your interests. What does connection usually look like for you when you're feeling more balanced?"
      } else if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('mad')) {
        fallbackResponse = "Anger often carries important information about our boundaries and needs, so thank you for sharing this with me. It sounds like something has really activated your protective instincts. When we're feeling intense anger, our bodies are often flooded with stress hormones. Try the 'STOP' technique: Stop what you're doing, Take a breath, Observe what you're feeling and thinking, and Proceed with intention. Your anger is valid - what situation or boundary crossing is fueling these feelings?"
      } else if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('burned out')) {
        fallbackResponse = "Exhaustion - whether physical, emotional, or mental - is your body and mind's way of asking for rest and restoration. It sounds like you've been pushing through a lot, and acknowledging your tiredness is an important step in honoring your needs. Sometimes burnout happens when we're giving more than we're receiving. What would genuine rest look like for you right now? Not just sleep, but the kind of rest that restores your spirit?"
      } else if (lowerMessage.includes('help') || lowerMessage.includes('don\'t know') || lowerMessage.includes('lost')) {
        fallbackResponse = "Asking for help is one of the most courageous things we can do, and I'm honored that you're sharing this space with me. Feeling uncertain or lost is part of the human experience, especially during times of transition or challenge. You don't have to have all the answers right now. Sometimes the next step is simply to be gentle with yourself and take things one moment at a time. What's one small thing that usually brings you a sense of peace or comfort?"
      } else {
        fallbackResponse = "Thank you for trusting me with your thoughts and feelings. I can sense that something is on your mind, and I want you to know that whatever you're experiencing is valid and worthy of attention. Sometimes just putting our thoughts into words can provide a small sense of relief. I'm here to listen without judgment and support you in whatever way feels helpful. What's been sitting heaviest on your heart or mind today?"
      }

      res.json({ response: fallbackResponse })
    }

  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ message: 'Server error during chat' })
  }
})

export default router