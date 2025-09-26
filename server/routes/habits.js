import express from 'express'
import { body, validationResult } from 'express-validator'
import { Habit, HabitEntry } from '../models/Habit.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Get all habits for user
router.get('/', authenticate, async (req, res) => {
  try {
    const { isActive } = req.query
    
    const query = { user: req.user.id }
    
    // Only filter by isActive if explicitly provided
    if (isActive !== undefined && isActive !== '') {
      query.isActive = isActive === 'true'
    }
    
    const habits = await Habit.find(query).sort({ createdAt: -1 })

    console.log('Habits query:', query)
    console.log('Found habits:', habits.length)
    
    res.json({ habits })
  } catch (error) {
    console.error('Error fetching habits:', error)
    res.status(500).json({ message: 'Failed to fetch habits' })
  }
})

// Create new habit
router.post('/', [
  authenticate,
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters'),
  body('description').optional().isLength({ max: 300 }),
  body('category').isIn(['health', 'fitness', 'mental_wellness', 'productivity', 'social', 'learning', 'creativity', 'other']),
  body('frequency').optional().isIn(['daily', 'weekly', 'monthly']),
  body('targetCount').optional().isInt({ min: 1 }),
  body('unit').optional().isLength({ max: 20 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const habit = new Habit({
      ...req.body,
      user: req.user.id
    })

    await habit.save()
    res.status(201).json({ message: 'Habit created successfully', habit })
  } catch (error) {
    console.error('Error creating habit:', error)
    res.status(500).json({ message: 'Failed to create habit' })
  }
})

// Update habit
router.put('/:id', [
  authenticate,
  body('name').optional().trim().isLength({ min: 1, max: 100 }),
  body('description').optional().isLength({ max: 300 }),
  body('targetCount').optional().isInt({ min: 1 }),
  body('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    )

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' })
    }

    res.json({ message: 'Habit updated successfully', habit })
  } catch (error) {
    console.error('Error updating habit:', error)
    res.status(500).json({ message: 'Failed to update habit' })
  }
})

// Delete habit
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' })
    }

    // Also delete all habit entries
    await HabitEntry.deleteMany({ habit: req.params.id, user: req.user.id })

    res.json({ message: 'Habit deleted successfully' })
  } catch (error) {
    console.error('Error deleting habit:', error)
    res.status(500).json({ message: 'Failed to delete habit' })
  }
})

// Get habit entries for a specific date range
router.get('/entries', authenticate, async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' })
    }

    const entries = await HabitEntry.find({
      user: req.user.id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).populate('habit', 'name color icon targetCount unit')

    res.json({ entries })
  } catch (error) {
    console.error('Error fetching habit entries:', error)
    res.status(500).json({ message: 'Failed to fetch habit entries' })
  }
})

// Record habit completion
router.post('/entries', [
  authenticate,
  body('habitId').isMongoId(),
  body('date').isISO8601(),
  body('completed').isBoolean(),
  body('count').optional().isInt({ min: 0 }),
  body('notes').optional().isLength({ max: 200 }),
  body('mood').optional().isInt({ min: 1, max: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const { habitId, date, completed, count = 1, notes, mood } = req.body

    // Verify habit belongs to user
    const habit = await Habit.findOne({ _id: habitId, user: req.user.id })
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' })
    }

    // Upsert habit entry
    const entry = await HabitEntry.findOneAndUpdate(
      { 
        habit: habitId, 
        user: req.user.id, 
        date: new Date(date) 
      },
      {
        completed,
        count: completed ? count : 0,
        notes,
        mood
      },
      { 
        upsert: true, 
        new: true,
        setDefaultsOnInsert: true
      }
    )

    // Update streak
    await updateHabitStreak(habitId, req.user.id)

    res.json({ message: 'Habit entry recorded successfully', entry })
  } catch (error) {
    console.error('Error recording habit entry:', error)
    res.status(500).json({ message: 'Failed to record habit entry' })
  }
})

// Get habit statistics
router.get('/stats', authenticate, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id, isActive: true })
    const entries = await HabitEntry.find({ user: req.user.id })

    const now = new Date()
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const weeklyEntries = entries.filter(e => e.date >= thisWeek && e.completed)
    const monthlyEntries = entries.filter(e => e.date >= thisMonth && e.completed)

    const totalStreak = habits.reduce((sum, h) => sum + h.streak.current, 0)
    const longestStreak = Math.max(...habits.map(h => h.streak.longest), 0)

    const categoryStats = habits.reduce((acc, habit) => {
      const habitEntries = entries.filter(e => 
        e.habit.toString() === habit._id.toString() && e.completed
      )
      acc[habit.category] = (acc[habit.category] || 0) + habitEntries.length
      return acc
    }, {})

    const stats = {
      totalHabits: habits.length,
      completedThisWeek: weeklyEntries.length,
      completedThisMonth: monthlyEntries.length,
      totalCompleted: entries.filter(e => e.completed).length,
      totalStreakDays: totalStreak,
      longestStreak,
      completionRate: calculateCompletionRate(habits, entries),
      categoryStats
    }

    res.json({ stats })
  } catch (error) {
    console.error('Error fetching habit stats:', error)
    res.status(500).json({ message: 'Failed to fetch habit statistics' })
  }
})

// Get habit analytics
router.get('/:id/analytics', authenticate, async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id })
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' })
    }

    const entries = await HabitEntry.find({ 
      habit: req.params.id, 
      user: req.user.id 
    }).sort({ date: 1 })

    const completionData = generateCompletionData(entries)
    const streakData = calculateStreakHistory(entries)
    const moodCorrelation = calculateMoodCorrelation(entries)

    res.json({
      analytics: {
        completionData,
        streakData,
        moodCorrelation,
        totalCompletions: entries.filter(e => e.completed).length,
        totalDays: entries.length,
        averageMood: calculateAverageMood(entries)
      }
    })
  } catch (error) {
    console.error('Error fetching habit analytics:', error)
    res.status(500).json({ message: 'Failed to fetch habit analytics' })
  }
})

// Helper functions
async function updateHabitStreak(habitId, userId) {
  const entries = await HabitEntry.find({ 
    habit: habitId, 
    user: userId 
  }).sort({ date: -1 })

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Calculate current streak
  for (let i = 0; i < entries.length; i++) {
    const entryDate = new Date(entries[i].date)
    entryDate.setHours(0, 0, 0, 0)
    
    const expectedDate = new Date(today)
    expectedDate.setDate(today.getDate() - i)

    if (entryDate.getTime() === expectedDate.getTime() && entries[i].completed) {
      currentStreak++
    } else if (entryDate.getTime() === expectedDate.getTime() && !entries[i].completed) {
      break
    }
  }

  // Calculate longest streak
  for (const entry of entries) {
    if (entry.completed) {
      tempStreak++
      longestStreak = Math.max(longestStreak, tempStreak)
    } else {
      tempStreak = 0
    }
  }

  await Habit.findByIdAndUpdate(habitId, {
    'streak.current': currentStreak,
    'streak.longest': Math.max(longestStreak, currentStreak)
  })
}

function calculateCompletionRate(habits, entries) {
  if (habits.length === 0) return 0

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  const recentEntries = entries.filter(e => e.date >= thirtyDaysAgo)
  const completedEntries = recentEntries.filter(e => e.completed)
  
  return recentEntries.length > 0 ? 
    Math.round((completedEntries.length / recentEntries.length) * 100) : 0
}

function generateCompletionData(entries) {
  const data = {}
  entries.forEach(entry => {
    const date = entry.date.toISOString().split('T')[0]
    data[date] = entry.completed
  })
  return data
}

function calculateStreakHistory(entries) {
  const streaks = []
  let currentStreak = 0
  
  entries.forEach(entry => {
    if (entry.completed) {
      currentStreak++
    } else {
      if (currentStreak > 0) {
        streaks.push(currentStreak)
      }
      currentStreak = 0
    }
  })
  
  if (currentStreak > 0) {
    streaks.push(currentStreak)
  }
  
  return streaks
}

function calculateMoodCorrelation(entries) {
  const withMood = entries.filter(e => e.mood && e.completed)
  if (withMood.length === 0) return null
  
  const avgMood = withMood.reduce((sum, e) => sum + e.mood, 0) / withMood.length
  return Math.round(avgMood * 10) / 10
}

function calculateAverageMood(entries) {
  const withMood = entries.filter(e => e.mood)
  if (withMood.length === 0) return null
  
  return Math.round((withMood.reduce((sum, e) => sum + e.mood, 0) / withMood.length) * 10) / 10
}

export default router
