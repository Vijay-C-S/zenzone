import express from 'express'
import { body, validationResult } from 'express-validator'
import { MeditationSession, GuidedSession } from '../models/Meditation.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Get all guided sessions
router.get('/guided', async (req, res) => {
  try {
    const { category, difficulty, limit = 50 } = req.query
    
    const filter = { isActive: true }
    if (category) filter.category = category
    if (difficulty) filter.difficulty = difficulty

    const sessions = await GuidedSession.find(filter)
      .sort({ 'rating.average': -1, createdAt: -1 })
      .limit(parseInt(limit))

    res.json({ sessions })
  } catch (error) {
    console.error('Error fetching guided sessions:', error)
    res.status(500).json({ message: 'Failed to fetch guided sessions' })
  }
})

// Get user's meditation history
router.get('/history', authenticate, async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query
    const skip = (page - 1) * limit

    const sessions = await MeditationSession.find({ user: req.user.id })
      .sort({ sessionDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await MeditationSession.countDocuments({ user: req.user.id })

    res.json({ 
      sessions, 
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: skip + sessions.length < total
      }
    })
  } catch (error) {
    console.error('Error fetching meditation history:', error)
    res.status(500).json({ message: 'Failed to fetch meditation history' })
  }
})

// Start meditation session
router.post('/session', [
  authenticate,
  body('type').isIn(['guided', 'timer', 'breathing']),
  body('duration').isInt({ min: 1, max: 120 }),
  body('guidedSessionId').optional().isString(),
  body('mood.before').optional().isInt({ min: 1, max: 10 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const sessionData = {
      ...req.body,
      user: req.user.id
    }

    const session = new MeditationSession(sessionData)
    await session.save()

    res.status(201).json({ message: 'Meditation session started', session })
  } catch (error) {
    console.error('Error starting meditation session:', error)
    res.status(500).json({ message: 'Failed to start meditation session' })
  }
})

// Complete meditation session
router.patch('/session/:id/complete', [
  authenticate,
  body('completedDuration').isInt({ min: 0 }),
  body('mood.after').optional().isInt({ min: 1, max: 10 }),
  body('notes').optional().isLength({ max: 500 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const session = await MeditationSession.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        ...req.body,
        completed: true
      },
      { new: true }
    )

    if (!session) {
      return res.status(404).json({ message: 'Meditation session not found' })
    }

    res.json({ message: 'Meditation session completed', session })
  } catch (error) {
    console.error('Error completing meditation session:', error)
    res.status(500).json({ message: 'Failed to complete meditation session' })
  }
})

// Get meditation statistics
router.get('/stats', authenticate, async (req, res) => {
  try {
    const sessions = await MeditationSession.find({ user: req.user.id, completed: true })
    
    const now = new Date()
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const totalMinutes = sessions.reduce((sum, s) => sum + s.completedDuration, 0)
    const weeklyMinutes = sessions
      .filter(s => s.sessionDate >= thisWeek)
      .reduce((sum, s) => sum + s.completedDuration, 0)
    
    const monthlyMinutes = sessions
      .filter(s => s.sessionDate >= thisMonth)
      .reduce((sum, s) => sum + s.completedDuration, 0)

    const streak = calculateMeditationStreak(sessions)
    
    const stats = {
      totalSessions: sessions.length,
      totalMinutes,
      weeklyMinutes,
      monthlyMinutes,
      averageSession: sessions.length > 0 ? Math.round(totalMinutes / sessions.length) : 0,
      currentStreak: streak,
      favoriteType: getMostFrequentType(sessions),
      moodImprovement: calculateMoodImprovement(sessions)
    }

    res.json({ stats })
  } catch (error) {
    console.error('Error fetching meditation stats:', error)
    res.status(500).json({ message: 'Failed to fetch meditation statistics' })
  }
})

// Rate guided session
router.post('/guided/:id/rate', [
  authenticate,
  body('rating').isInt({ min: 1, max: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const session = await GuidedSession.findById(req.params.id)
    if (!session) {
      return res.status(404).json({ message: 'Guided session not found' })
    }

    // Update rating
    const newCount = session.rating.count + 1
    const newAverage = ((session.rating.average * session.rating.count) + req.body.rating) / newCount
    
    session.rating.average = Math.round(newAverage * 10) / 10
    session.rating.count = newCount
    
    await session.save()

    res.json({ message: 'Rating submitted successfully', session })
  } catch (error) {
    console.error('Error rating guided session:', error)
    res.status(500).json({ message: 'Failed to submit rating' })
  }
})

// Initialize default guided sessions (admin only)
router.post('/guided/init', authenticate, async (req, res) => {
  try {
    // Check if user is admin (you'll need to implement admin check)
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' })
    }

    const existingCount = await GuidedSession.countDocuments()
    if (existingCount > 0) {
      return res.json({ message: 'Guided sessions already exist' })
    }

    const defaultSessions = [
      {
        title: "Mindful Breathing for Beginners",
        description: "A gentle introduction to mindfulness through simple breathing techniques. Perfect for those new to meditation.",
        category: "beginner",
        duration: 10,
        difficulty: "beginner",
        script: "Welcome to your mindful breathing meditation. Find a comfortable position...",
        tags: ["breathing", "mindfulness", "beginner", "relaxation"],
        isActive: true,
        rating: { average: 4.5, count: 127 }
      },
      {
        title: "Stress Relief Body Scan",
        description: "Release tension and stress by systematically relaxing each part of your body.",
        category: "stress_relief",
        duration: 15,
        difficulty: "beginner",
        script: "Welcome to this stress relief body scan meditation...",
        tags: ["stress relief", "body scan", "relaxation", "tension release"],
        isActive: true,
        rating: { average: 4.7, count: 89 }
      }
      // Add more default sessions as needed
    ]

    await GuidedSession.insertMany(defaultSessions)
    res.json({ message: 'Default guided sessions initialized successfully' })
  } catch (error) {
    console.error('Error initializing guided sessions:', error)
    res.status(500).json({ message: 'Failed to initialize guided sessions' })
  }
})

// Helper functions
function calculateMeditationStreak(sessions) {
  if (sessions.length === 0) return 0

  const sortedSessions = sessions
    .sort((a, b) => b.sessionDate - a.sessionDate)
    .map(s => s.sessionDate.toDateString())

  const uniqueDates = [...new Set(sortedSessions)]
  
  let streak = 0
  const today = new Date().toDateString()
  
  for (let i = 0; i < uniqueDates.length; i++) {
    const date = new Date(uniqueDates[i])
    const expectedDate = new Date()
    expectedDate.setDate(expectedDate.getDate() - i)
    
    if (date.toDateString() === expectedDate.toDateString()) {
      streak++
    } else {
      break
    }
  }
  
  return streak
}

function getMostFrequentType(sessions) {
  const typeCounts = sessions.reduce((acc, session) => {
    acc[session.type] = (acc[session.type] || 0) + 1
    return acc
  }, {})
  
  return Object.keys(typeCounts).reduce((a, b) => 
    typeCounts[a] > typeCounts[b] ? a : b, 'timer'
  )
}

function calculateMoodImprovement(sessions) {
  const sessionsWithMood = sessions.filter(s => 
    s.mood && s.mood.before && s.mood.after
  )
  
  if (sessionsWithMood.length === 0) return 0
  
  const improvements = sessionsWithMood.map(s => 
    s.mood.after - s.mood.before
  )
  
  return Math.round(
    (improvements.reduce((sum, imp) => sum + imp, 0) / improvements.length) * 10
  ) / 10
}

export default router
