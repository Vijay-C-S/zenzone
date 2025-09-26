import express from 'express'
import { body, validationResult } from 'express-validator'
import MoodEntry from '../models/MoodEntry.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Validation rules
const moodValidation = [
  body('mood')
    .isInt({ min: 1, max: 5 })
    .withMessage('Mood must be a number between 1 and 5'),
  body('note')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Note cannot exceed 500 characters'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date')
]

// Create mood entry
router.post('/', authenticate, moodValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { mood, note, date, tags } = req.body

    // Check if mood entry already exists for this date
    const entryDate = date ? new Date(date) : new Date()
    const startOfDay = new Date(entryDate.setHours(0, 0, 0, 0))
    const endOfDay = new Date(entryDate.setHours(23, 59, 59, 999))

    const existingEntry = await MoodEntry.findOne({
      userId: req.user._id,
      date: { $gte: startOfDay, $lte: endOfDay }
    })

    if (existingEntry) {
      // Update existing entry
      existingEntry.mood = mood
      existingEntry.note = note || existingEntry.note
      existingEntry.tags = tags || existingEntry.tags
      await existingEntry.save()

      return res.json({
        message: 'Mood entry updated successfully',
        entry: existingEntry
      })
    }

    // Create new entry
    const moodEntry = new MoodEntry({
      userId: req.user._id,
      mood,
      note,
      date: entryDate,
      tags: tags || []
    })

    await moodEntry.save()

    res.status(201).json({
      message: 'Mood entry created successfully',
      entry: moodEntry
    })
  } catch (error) {
    console.error('Create mood entry error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get mood entries
router.get('/', authenticate, async (req, res) => {
  try {
    const { startDate, endDate, limit = 30 } = req.query

    let query = { userId: req.user._id }

    // Add date range filter if provided
    if (startDate || endDate) {
      query.date = {}
      if (startDate) query.date.$gte = new Date(startDate)
      if (endDate) query.date.$lte = new Date(endDate)
    }

    const entries = await MoodEntry.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit))

    res.json({ entries })
  } catch (error) {
    console.error('Get mood entries error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get mood statistics
router.get('/stats', authenticate, async (req, res) => {
  try {
    const { period = '30' } = req.query
    const days = parseInt(period)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const entries = await MoodEntry.find({
      userId: req.user._id,
      date: { $gte: startDate }
    }).sort({ date: 1 })

    // Calculate statistics
    const totalEntries = entries.length
    const averageMood = totalEntries > 0 
      ? entries.reduce((sum, entry) => sum + entry.mood, 0) / totalEntries 
      : 0

    // Mood distribution
    const moodDistribution = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    }
    entries.forEach(entry => {
      moodDistribution[entry.mood]++
    })

    // Trend calculation (simple linear regression)
    let trend = 'stable'
    if (entries.length >= 7) {
      const recentAvg = entries.slice(-7).reduce((sum, entry) => sum + entry.mood, 0) / 7
      const olderAvg = entries.slice(0, 7).reduce((sum, entry) => sum + entry.mood, 0) / 7
      
      if (recentAvg > olderAvg + 0.3) trend = 'improving'
      else if (recentAvg < olderAvg - 0.3) trend = 'declining'
    }

    res.json({
      totalEntries,
      averageMood: Math.round(averageMood * 100) / 100,
      moodDistribution,
      trend,
      period: days
    })
  } catch (error) {
    console.error('Get mood stats error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete mood entry
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const entry = await MoodEntry.findOne({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!entry) {
      return res.status(404).json({ message: 'Mood entry not found' })
    }

    await MoodEntry.findByIdAndDelete(req.params.id)

    res.json({ message: 'Mood entry deleted successfully' })
  } catch (error) {
    console.error('Delete mood entry error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router