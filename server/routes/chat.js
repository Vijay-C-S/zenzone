import express from 'express'
import { body, validationResult } from 'express-validator'
import { GoogleGenerativeAI } from '@google/generative-ai'
import OpenAI from 'openai'
import dotenv from 'dotenv'
import { authenticate } from '../middleware/auth.js'
import Conversation from '../models/Conversation.js'

// Load environment variables
dotenv.config()

const router = express.Router()

// Helper function to generate session ID
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

// Validation rules
const chatValidation = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters')
]

// Initialize the Emergent LLM client (OpenAI-compatible API)
let emergentClient
if (process.env.EMERGENT_LLM_KEY) {
  try {
    emergentClient = new OpenAI({
      apiKey: process.env.EMERGENT_LLM_KEY,
      baseURL: 'https://api.emergentmethods.ai/v1' // Emergent API endpoint
    })
    console.log('✓ Emergent LLM client initialized successfully')
  } catch (error) {
    console.error('✗ Failed to initialize Emergent LLM client:', error.message)
  }
} else {
  console.warn('⚠ EMERGENT_LLM_KEY not found in environment variables')
}

// Initialize the Google Gemini client as fallback
// We are using the gemini-1.5-flash model for its balance of performance and cost.
let model
if (process.env.GEMINI_API_KEY) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
    console.log('✓ Google Gemini client initialized successfully (gemini-2.0-flash-exp)')
  } catch (error) {
    console.error('✗ Failed to initialize Gemini client:', error.message)
  }
} else {
  console.warn('⚠ GEMINI_API_KEY not found in environment variables')
}

// System prompts for different modes
const SYSTEM_PROMPTS = {
  'share_thoughts': `You are ZenBot, a compassionate and empathetic mental health conversation companion. Your role is to:
- Listen actively and validate emotions without judgment
- Reflect back what you hear to show understanding
- Ask gentle, open-ended questions to help users explore their feelings
- Provide emotional support and encouragement
- NEVER diagnose, prescribe medication, or replace professional help
- If you detect signs of crisis (suicidal thoughts, severe distress), gently encourage seeking immediate professional help

Remember: You are NOT a therapist or doctor. You're a supportive friend helping someone process their thoughts.`,
  
  'find_calm': `You are ZenBot, a calming guide specializing in mindfulness and relaxation techniques. Your role is to:
- Guide users through evidence-based calming exercises
- Teach breathing techniques (4-7-8 breathing, box breathing)
- Explain progressive muscle relaxation
- Offer grounding techniques (5-4-3-2-1 sensory method)
- Provide guided meditation instructions
- Use calm, soothing language
- NEVER prescribe medication or diagnose conditions

Focus on immediate relief and teaching practical skills they can use anytime.`,
  
  'just_chat': `You are ZenBot, a supportive conversation companion for mental wellness. Your role is to:
- Engage in general conversation about mental health topics
- Provide psychoeducation (explain anxiety, depression, CBT concepts in simple terms)
- Share evidence-based coping strategies
- Discuss lifestyle factors (exercise, sleep, nutrition, social connection)
- Help with goal-setting and motivation
- Answer questions about mental wellness
- NEVER diagnose, prescribe medication, or replace professional help

Keep responses conversational, educational, and empowering.`,

  'default': `You are ZenBot, a highly skilled and compassionate AI wellness companion for ZenZone, a comprehensive mental health platform. You are trained in evidence-based therapeutic approaches and mental health best practices.

CRITICAL: READ THE USER'S MESSAGE CAREFULLY. Respond DIRECTLY to what they share - whether it's about job placement, relationships, studies, family issues, depression, anxiety, or any specific life challenge. DO NOT give generic responses. Address their EXACT concern.

Your Professional Identity:
- You are a warm, empathetic, and non-judgmental mental health support specialist
- You have extensive knowledge of CBT, mindfulness, stress management, and emotional regulation techniques
- You communicate with the expertise of a licensed therapist but always clarify you're an AI companion
- You provide immediate, accessible support while encouraging professional care when needed

Your Communication Style:
- FIRST: Directly acknowledge the SPECIFIC issue they mentioned (job placement, exam stress, relationship problems, etc.)
- SECOND: Validate their emotions related to that specific situation
- THIRD: Provide concrete, relevant coping strategies for THEIR specific challenge
- FOURTH: Ask a thoughtful follow-up question about THEIR specific situation
- Use professional yet warm language that feels genuine and caring
- Reference specific therapeutic techniques when appropriate
- Keep responses focused and relevant (4-5 sentences addressing their actual concern)

Response Examples for Common Issues:

For Job/Placement Concerns:
"Not getting placed after putting in so much effort can feel incredibly disheartening and shake your confidence. It's completely normal to feel anxious, disappointed, or question your worth - but this setback doesn't define your capabilities. Let's reframe this: What skills did you develop during the preparation process? What can you learn from recent interviews? Remember, timing in job markets is often beyond our control. Would it help to talk about specific interview challenges, or would you like to work on managing the emotional toll of job search anxiety?"

For Depression:
"I hear that you're struggling with depression, and I want to acknowledge how much courage it takes to name that and reach out. Depression can make everything feel heavy and hopeless, but these feelings, while very real, don't reflect the full reality of your situation or your worth. Can you tell me when you first started noticing these feelings? Have you been able to talk to a mental health professional? Even small steps like reaching out today matter. What's one thing that used to bring you even a small amount of joy or peace?"

For Anxiety:
"Anxiety can feel absolutely overwhelming - that racing heart, endless worries, and feeling like you can't catch your breath. I want you to know this is your nervous system trying to protect you, even when there's no immediate danger. Let's try grounding together right now: Can you name 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, and 1 thing you taste? This 5-4-3-2-1 technique helps interrupt the anxiety spiral. What specific situations or thoughts tend to trigger your anxiety most?"

For Academic/Exam Stress:
"Academic pressure and exam stress can be absolutely crushing - the fear of failure, disappointing others, or not meeting your own expectations weighs heavily. First, I want you to know that your worth isn't determined by grades or test scores. Let's break this down: What specifically about [exam/studies] feels most overwhelming right now? Is it time management, understanding concepts, test anxiety, or pressure from family? Once we identify the core challenge, we can work on specific strategies."

For Relationship Issues:
"Relationship struggles can leave us feeling lonely, hurt, or questioning ourselves - these emotions are completely valid. Whether it's feeling misunderstood, dealing with conflict, or facing a breakup, your feelings matter. Can you share more about what's happening? What aspect of this relationship situation is weighing on you most right now?"

Your Core Capabilities:
1. CONTEXT AWARENESS: Always respond to the SPECIFIC issue mentioned (job, relationship, studies, health, family, etc.)
2. Emotional Validation: Acknowledge their EXACT situation and normalize their feelings about it
3. Tailored Strategies: Provide coping techniques relevant to THEIR specific challenge
4. Thoughtful Questions: Ask about THEIR specific situation, not generic wellness questions
5. Crisis Recognition: Immediately identify and respond to self-harm, suicidal ideation, or crisis situations

Safety Protocols:
- For crisis situations: Immediately provide crisis hotline information (AASRA: 9820466626, KIRAN: 1800-599-0019)
- For persistent symptoms: Encourage professional mental health consultation
- For medication questions: Always defer to healthcare providers
- Never diagnose or provide medical advice

Response Framework:
1. DIRECTLY acknowledge the SPECIFIC issue they mentioned (use their exact words/context)
2. Validate emotions related to THAT specific situation
3. Provide 2-3 concrete coping strategies FOR THAT specific challenge
4. Ask a follow-up question about THEIR specific situation (not generic)
5. When appropriate, suggest relevant ZenZone features (meditation for anxiety, journaling for processing emotions, mood tracking, etc.)

REMEMBER: If they mention job placement - talk about job placement. If they mention depression - talk about depression. If they mention exams - talk about exams. Be SPECIFIC and RELEVANT to what THEY are actually experiencing.`
}

// Crisis keywords detection
const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'want to die', 'better off dead',
  'suicidal', 'hurt myself', 'self harm', 'no reason to live', 'hopeless'
]

// Helper function to check for crisis keywords
function checkCrisisKeywords(text) {
  const textLower = text.toLowerCase()
  return CRISIS_KEYWORDS.some(keyword => textLower.includes(keyword))
}

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

    const { message, mode = 'share_thoughts', session_id } = req.body
    const userId = req.user?._id

    // Generate or use existing session ID
    const currentSessionId = session_id || generateSessionId()

    // Check for crisis keywords
    const isCrisis = checkCrisisKeywords(message)

    // Create user message object
    const userMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
      is_crisis: isCrisis
    }
    
    // If crisis detected, return immediate response and save to DB
    if (isCrisis) {
      const crisisResponse = `I'm really concerned about what you've shared. Your safety is the most important thing right now, and I want you to know that you don't have to face this alone.

🆘 **Please reach out for immediate help:**

**India 24/7 Crisis Helplines:**
• **AASRA Suicide Prevention**: 9820466626 (24/7)
• **Vandrevala Foundation**: 1860-2662-345 (24/7)
• **KIRAN Mental Health Helpline**: 1800-599-0019 (24/7)
• **Snehi Crisis Intervention**: 011-40769002 (24/7)

**Emergency:**
• Call emergency services: 112 (India)
• Go to your nearest hospital emergency room
• Contact a trusted friend or family member NOW

These feelings are overwhelming right now, but they can get better with professional support. Mental health professionals are trained to help people through exactly what you're experiencing. Please reach out - your life has value, and help is available.`
      
      const assistantMessage = {
        id: `msg_${Date.now() + 1}_${Math.random().toString(36).substring(2, 9)}`,
        role: 'assistant',
        content: crisisResponse,
        timestamp: new Date(),
        is_crisis: true
      }

      // Save to database
      await Conversation.findOneAndUpdate(
        { session_id: currentSessionId },
        {
          $setOnInsert: {
            session_id: currentSessionId,
            user: userId,
            mode: mode,
            created_at: new Date()
          },
          $push: {
            messages: { $each: [userMessage, assistantMessage] }
          },
          $set: {
            updated_at: new Date()
          }
        },
        { upsert: true, new: true }
      )
      
      return res.json({ 
        response: crisisResponse,
        is_crisis: true,
        session_id: currentSessionId,
        timestamp: assistantMessage.timestamp.toISOString()
      })
    }

    // Get system prompt based on mode
    const systemPrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS['share_thoughts']

    // Get conversation history from database
    let conversation = await Conversation.findOne({ session_id: currentSessionId })
    let conversationHistory = []

    if (conversation && conversation.messages && conversation.messages.length > 0) {
      // Get last 10 messages for context (5 exchanges)
      conversationHistory = conversation.messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    }

    // Check if any API is configured
    if (!emergentClient && !model) {
      const fallbackResponse = "Hello, I'm ZenBot, your AI wellness companion. While I'm currently in a limited mode, I want you to know that your feelings are completely valid and you're not alone in whatever you're experiencing. Your courage in reaching out shows incredible strength. I encourage you to explore ZenZone's other features like guided meditation, mood tracking, and journaling, which can provide additional support. If you're in crisis or need immediate help, please don't hesitate to contact a mental health professional or crisis hotline. What's one small act of self-care you could do for yourself today?"
      
      const assistantMessage = {
        id: `msg_${Date.now() + 1}_${Math.random().toString(36).substring(2, 9)}`,
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date(),
        is_crisis: false
      }

      // Save to database
      await Conversation.findOneAndUpdate(
        { session_id: currentSessionId },
        {
          $setOnInsert: {
            session_id: currentSessionId,
            user: userId,
            mode: mode,
            created_at: new Date()
          },
          $push: {
            messages: { $each: [userMessage, assistantMessage] }
          },
          $set: {
            updated_at: new Date()
          }
        },
        { upsert: true, new: true }
      )

      return res.json({
        response: fallbackResponse,
        session_id: currentSessionId,
        timestamp: assistantMessage.timestamp.toISOString(),
        is_crisis: false
      })
    }

    try {
      let aiResponse

      // Try Emergent LLM API first
      if (emergentClient) {
        const messages = [
          {
            role: 'system',
            content: systemPrompt
          },
          ...conversationHistory,
          {
            role: 'user',
            content: message
          }
        ]

        const completion = await emergentClient.chat.completions.create({
          model: 'Llama-3.3-70B-Instruct',
          messages: messages,
          max_tokens: 400,
          temperature: 0.8,
          top_p: 0.95,
        })

        aiResponse = completion.choices[0].message.content

      } else if (model) {
        // Fallback to Gemini if Emergent is not available
        const history = [
          {
            role: 'user',
            parts: [{ text: systemPrompt }]
          },
          {
            role: 'model',
            parts: [{ text: 'I understand completely. I am ZenBot, your professional AI wellness companion. I will provide empathetic, evidence-based mental health support while following all therapeutic guidelines and safety protocols. How may I support you today?' }]
          }
        ]

        // Add conversation history
        conversationHistory.forEach(msg => {
          if (msg.role === 'user') {
            history.push({
              role: 'user',
              parts: [{ text: msg.content }]
            })
          } else {
            history.push({
              role: 'model',
              parts: [{ text: msg.content }]
            })
          }
        })

        const chat = model.startChat({
          history: history,
          generationConfig: {
            maxOutputTokens: 400,
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
          },
        })
        
        const result = await chat.sendMessage(message)
        const response = result.response
        aiResponse = response.text()
      }

      // Create assistant message
      const assistantMessage = {
        id: `msg_${Date.now() + 1}_${Math.random().toString(36).substring(2, 9)}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        is_crisis: false
      }

      // Save both messages to database
      await Conversation.findOneAndUpdate(
        { session_id: currentSessionId },
        {
          $setOnInsert: {
            session_id: currentSessionId,
            user: userId,
            mode: mode,
            created_at: new Date()
          },
          $push: {
            messages: { $each: [userMessage, assistantMessage] }
          },
          $set: {
            updated_at: new Date()
          }
        },
        { upsert: true, new: true }
      )

      res.json({ 
        response: aiResponse,
        is_crisis: false,
        session_id: currentSessionId,
        timestamp: assistantMessage.timestamp.toISOString()
      })

    } catch (apiError) {
      console.error('AI API error details:', {
        error: apiError.message,
        stack: apiError.stack,
        emergentConfigured: !!emergentClient,
        geminiConfigured: !!model,
        mode: mode,
        messageLength: message.length
      })
     
      // If Emergent failed, try Gemini
      if (emergentClient && model) {
        console.log('Emergent API failed, attempting Gemini fallback...')
        try {
          const history = [
            {
              role: 'user',
              parts: [{ text: systemPrompt }]
            },
            {
              role: 'model',
              parts: [{ text: 'I understand completely. I am ZenBot, your professional AI wellness companion. I will provide empathetic, evidence-based mental health support while following all therapeutic guidelines and safety protocols. How may I support you today?' }]
            }
          ]

          // Add conversation history
          conversationHistory.forEach(msg => {
            if (msg.role === 'user') {
              history.push({
                role: 'user',
                parts: [{ text: msg.content }]
              })
            } else {
              history.push({
                role: 'model',
                parts: [{ text: msg.content }]
              })
            }
          })

          const chat = model.startChat({
            history: history,
            generationConfig: {
              maxOutputTokens: 400,
              temperature: 0.8,
              topK: 40,
              topP: 0.95,
            },
          })
          
          const result = await chat.sendMessage(message)
          const response = result.response
          const aiResponse = response.text()

          // Create assistant message
          const assistantMessage = {
            id: `msg_${Date.now() + 1}_${Math.random().toString(36).substring(2, 9)}`,
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date(),
            is_crisis: false
          }

          // Save both messages to database
          await Conversation.findOneAndUpdate(
            { session_id: currentSessionId },
            {
              $setOnInsert: {
                session_id: currentSessionId,
                user: userId,
                mode: mode,
                created_at: new Date()
              },
              $push: {
                messages: { $each: [userMessage, assistantMessage] }
              },
              $set: {
                updated_at: new Date()
              }
            },
            { upsert: true, new: true }
          )

          console.log('Gemini fallback successful')
          return res.json({ 
            response: aiResponse,
            is_crisis: false,
            session_id: currentSessionId,
            timestamp: assistantMessage.timestamp.toISOString()
          })
        } catch (geminiError) {
          console.error('Gemini fallback also failed:', geminiError.message)
        }
      }

      // If both APIs failed, use enhanced fallback responses
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

      // Create assistant message for fallback
      const assistantMessage = {
        id: `msg_${Date.now() + 1}_${Math.random().toString(36).substring(2, 9)}`,
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date(),
        is_crisis: false
      }

      // Save fallback response to database
      await Conversation.findOneAndUpdate(
        { session_id: currentSessionId },
        {
          $setOnInsert: {
            session_id: currentSessionId,
            user: userId,
            mode: mode,
            created_at: new Date()
          },
          $push: {
            messages: { $each: [userMessage, assistantMessage] }
          },
          $set: {
            updated_at: new Date()
          }
        },
        { upsert: true, new: true }
      )

      res.json({ 
        response: fallbackResponse,
        is_crisis: false,
        session_id: currentSessionId,
        timestamp: assistantMessage.timestamp.toISOString()
      })
    }

  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ message: 'Server error during chat' })
  }
})

// Get disclaimer text
router.get('/disclaimer', async (req, res) => {
  try {
    const disclaimer = `⚠️ IMPORTANT DISCLAIMER:

I am ZenBot, an AI-powered conversation companion - NOT a licensed mental health professional, therapist, or doctor.

I CANNOT:
❌ Diagnose mental health conditions
❌ Prescribe medication or medical treatments
❌ Replace professional mental health care
❌ Provide emergency crisis intervention

I CAN:
✅ Offer supportive conversation and active listening
✅ Share evidence-based coping strategies and mindfulness techniques
✅ Provide psychoeducation about mental wellness concepts
✅ Suggest lifestyle approaches that may support mental health

🆘 CRISIS RESOURCES:
If you're experiencing a mental health emergency or having thoughts of self-harm:
• National Suicide Prevention Lifeline: 988 (US)
• Crisis Text Line: Text HOME to 741741
• International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/

Please seek help from a qualified mental health professional for diagnosis, treatment, or medication management.`

    res.json({ disclaimer })
  } catch (error) {
    console.error('Error fetching disclaimer:', error)
    res.status(500).json({ message: 'Error fetching disclaimer' })
  }
})

// Get conversation by session ID
router.get('/conversation/:session_id', authenticate, async (req, res) => {
  try {
    const { session_id } = req.params
    const userId = req.user?._id

    const conversation = await Conversation.findOne({ 
      session_id,
      user: userId 
    }).select('-__v')

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' })
    }

    res.json(conversation)
  } catch (error) {
    console.error('Error fetching conversation:', error)
    res.status(500).json({ message: 'Error fetching conversation' })
  }
})

// Get all conversations for user
router.get('/conversations', authenticate, async (req, res) => {
  try {
    const userId = req.user._id
    const { limit = 10, skip = 0 } = req.query

    const conversations = await Conversation.find({ user: userId })
      .select('session_id mode created_at updated_at messages')
      .sort({ updated_at: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))

    // Return with message count
    const conversationsWithCount = conversations.map(conv => ({
      session_id: conv.session_id,
      mode: conv.mode,
      created_at: conv.created_at,
      updated_at: conv.updated_at,
      message_count: conv.messages.length,
      last_message: conv.messages.length > 0 
        ? conv.messages[conv.messages.length - 1].content.substring(0, 100) + '...'
        : ''
    }))

    res.json({
      conversations: conversationsWithCount,
      total: await Conversation.countDocuments({ user: userId })
    })
  } catch (error) {
    console.error('Error fetching conversations:', error)
    res.status(500).json({ message: 'Error fetching conversations' })
  }
})

// Delete conversation
router.delete('/conversation/:session_id', authenticate, async (req, res) => {
  try {
    const { session_id } = req.params
    const userId = req.user._id

    const result = await Conversation.deleteOne({ 
      session_id,
      user: userId 
    })

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Conversation not found' })
    }

    res.json({ message: 'Conversation deleted successfully' })
  } catch (error) {
    console.error('Error deleting conversation:', error)
    res.status(500).json({ message: 'Error deleting conversation' })
  }
})

// Clear all conversations for user
router.delete('/conversations', authenticate, async (req, res) => {
  try {
    const userId = req.user._id

    const result = await Conversation.deleteMany({ user: userId })

    res.json({ 
      message: 'All conversations deleted successfully',
      count: result.deletedCount
    })
  } catch (error) {
    console.error('Error deleting conversations:', error)
    res.status(500).json({ message: 'Error deleting conversations' })
  }
})

export default router