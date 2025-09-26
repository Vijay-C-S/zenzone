import express from 'express'
import { body, validationResult } from 'express-validator'
import Goal from '../models/Goal.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Get all goals for user
router.get('/', authenticate, async (req, res) => {
  try {
    const { status, category, sortBy = 'createdAt' } = req.query
    
    const filter = { user: req.user.id }
    if (status) filter.status = status
    if (category) filter.category = category

    const goals = await Goal.find(filter)
      .sort({ [sortBy]: -1 })
      .limit(100)

    res.json({ goals })
  } catch (error) {
    console.error('Error fetching goals:', error)
    res.status(500).json({ message: 'Failed to fetch goals' })
  }
})

// Create new goal
router.post('/', [
  authenticate,
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title must be 1-100 characters'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description must be max 500 characters'),
  body('category').isIn(['mental_health', 'physical_health', 'social', 'career', 'personal', 'spiritual', 'other']),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('targetDate').isISO8601().withMessage('Valid target date required'),
  body('milestones').optional().isArray().withMessage('Milestones must be an array'),
  body('milestones.*.title').optional().trim().isLength({ min: 1 }).withMessage('Milestone title required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const goalData = {
      ...req.body,
      user: req.user.id
    }

    const goal = new Goal(goalData)
    await goal.save()

    res.status(201).json({ message: 'Goal created successfully', goal })
  } catch (error) {
    console.error('Error creating goal:', error)
    res.status(500).json({ message: 'Failed to create goal' })
  }
})

// Update goal
router.put('/:id', [
  authenticate,
  body('title').optional().trim().isLength({ min: 1, max: 100 }),
  body('description').optional().isLength({ max: 500 }),
  body('progress').optional().isInt({ min: 0, max: 100 }),
  body('status').optional().isIn(['active', 'completed', 'paused', 'cancelled'])
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const updateData = { ...req.body }

    // Auto-complete goal when progress reaches 100%
    if (req.body.progress === 100 && !req.body.status) {
      updateData.status = 'completed'
      updateData.completedAt = new Date()
    }

    // Set completedAt when manually marking as completed
    if (req.body.status === 'completed' && !updateData.completedAt) {
      updateData.completedAt = new Date()
    }

    // Clear completedAt if status is changed from completed
    if (req.body.status && req.body.status !== 'completed') {
      updateData.completedAt = null
    }

    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updateData,
      { new: true }
    )

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' })
    }

    res.json({ message: 'Goal updated successfully', goal })
  } catch (error) {
    console.error('Error updating goal:', error)
    res.status(500).json({ message: 'Failed to update goal' })
  }
})

// Update milestone completion
router.patch('/:id/milestones/:milestoneId', authenticate, async (req, res) => {
  try {
    const { completed } = req.body
    
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user.id })
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' })
    }

    const milestone = goal.milestones.id(req.params.milestoneId)
    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' })
    }

    milestone.completed = completed
    if (completed) {
      milestone.completedAt = new Date()
    } else {
      milestone.completedAt = undefined
    }

    // Update overall progress based on completed milestones
    const completedCount = goal.milestones.filter(m => m.completed).length
    goal.progress = Math.round((completedCount / goal.milestones.length) * 100)

    await goal.save()
    res.json({ message: 'Milestone updated successfully', goal })
  } catch (error) {
    console.error('Error updating milestone:', error)
    res.status(500).json({ message: 'Failed to update milestone' })
  }
})

// Delete goal
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' })
    }

    res.json({ message: 'Goal deleted successfully' })
  } catch (error) {
    console.error('Error deleting goal:', error)
    res.status(500).json({ message: 'Failed to delete goal' })
  }
})

// Get goal statistics
router.get('/stats', authenticate, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id })
    
    const stats = {
      total: goals.length,
      completed: goals.filter(g => g.status === 'completed').length,
      active: goals.filter(g => g.status === 'active').length,
      paused: goals.filter(g => g.status === 'paused').length,
      overdue: goals.filter(g => 
        g.status === 'active' && 
        new Date(g.targetDate) < new Date()
      ).length,
      averageProgress: goals.length > 0 
        ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
        : 0,
      categoryCounts: goals.reduce((acc, goal) => {
        acc[goal.category] = (acc[goal.category] || 0) + 1
        return acc
      }, {}),
      progressDistribution: {
        notStarted: goals.filter(g => g.progress === 0).length,
        inProgress: goals.filter(g => g.progress > 0 && g.progress < 100).length,
        completed: goals.filter(g => g.progress === 100).length
      }
    }

    res.json({ stats })
  } catch (error) {
    console.error('Error fetching goal stats:', error)
    res.status(500).json({ message: 'Failed to fetch goal statistics' })
  }
})

export default router
