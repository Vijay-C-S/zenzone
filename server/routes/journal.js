import express from 'express'
import { body, validationResult } from 'express-validator'
import JournalEntry from '../models/JournalEntry.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Validation rules
const journalValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Content must be between 1 and 10000 characters'),
  body('isPrivate')
    .optional()
    .isBoolean()
    .withMessage('isPrivate must be a boolean'),
  body('mood')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Mood must be a number between 1 and 5')
]

// Create journal entry
router.post('/', authenticate, journalValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { title, content, isPrivate = true, tags, mood } = req.body

    const journalEntry = new JournalEntry({
      userId: req.user._id,
      title,
      content,
      isPrivate,
      tags: tags || [],
      mood
    })

    await journalEntry.save()

    res.status(201).json({
      message: 'Journal entry created successfully',
      entry: journalEntry
    })
  } catch (error) {
    console.error('Create journal entry error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get journal entries
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, limit = 20, page = 1 } = req.query

    let query = { userId: req.user._id }

    // Add search functionality
    if (search) {
      query.$text = { $search: search }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const entries = await JournalEntry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await JournalEntry.countDocuments(query)

    res.json({
      entries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    console.error('Get journal entries error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single journal entry
router.get('/:id', authenticate, async (req, res) => {
  try {
    const entry = await JournalEntry.findOne({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' })
    }

    res.json({ entry })
  } catch (error) {
    console.error('Get journal entry error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update journal entry
router.put('/:id', authenticate, journalValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { title, content, isPrivate, tags, mood } = req.body

    const entry = await JournalEntry.findOne({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' })
    }

    // Update fields
    entry.title = title
    entry.content = content
    entry.isPrivate = isPrivate !== undefined ? isPrivate : entry.isPrivate
    entry.tags = tags || entry.tags
    entry.mood = mood || entry.mood

    await entry.save()

    res.json({
      message: 'Journal entry updated successfully',
      entry
    })
  } catch (error) {
    console.error('Update journal entry error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete journal entry
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const entry = await JournalEntry.findOne({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' })
    }

    await JournalEntry.findByIdAndDelete(req.params.id)

    res.json({ message: 'Journal entry deleted successfully' })
  } catch (error) {
    console.error('Delete journal entry error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get journal statistics
router.get('/stats/overview', authenticate, async (req, res) => {
  try {
    const totalEntries = await JournalEntry.countDocuments({ userId: req.user._id })
    
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const recentEntries = await JournalEntry.countDocuments({
      userId: req.user._id,
      createdAt: { $gte: thirtyDaysAgo }
    })

    // Get mood distribution from journal entries
    const entriesWithMood = await JournalEntry.find({
      userId: req.user._id,
      mood: { $exists: true, $ne: null }
    }).select('mood')

    const moodDistribution = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    }
    entriesWithMood.forEach(entry => {
      if (entry.mood) {
        moodDistribution[entry.mood]++
      }
    })

    res.json({
      totalEntries,
      recentEntries,
      moodDistribution,
      averageWordsPerEntry: totalEntries > 0 ? Math.round(Math.random() * 200 + 150) : 0 // Placeholder
    })
  } catch (error) {
    console.error('Get journal stats error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router