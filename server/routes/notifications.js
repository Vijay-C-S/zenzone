import express from 'express'
import { body, validationResult } from 'express-validator'
import { Notification, NotificationPreference } from '../models/Notification.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Get user notifications
router.get('/', authenticate, async (req, res) => {
  try {
    const { 
      isRead, 
      type, 
      priority, 
      limit = 50, 
      page = 1 
    } = req.query

    const filter = { user: req.user.id }
    if (isRead !== undefined) filter.isRead = isRead === 'true'
    if (type) filter.type = type
    if (priority) filter.priority = priority

    // Don't show expired notifications
    filter.$or = [
      { expiresAt: { $exists: false } },
      { expiresAt: { $gt: new Date() } }
    ]

    const skip = (page - 1) * limit

    const notifications = await Notification.find(filter)
      .sort({ priority: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    const total = await Notification.countDocuments(filter)
    const unreadCount = await Notification.countDocuments({ 
      user: req.user.id, 
      isRead: false,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gt: new Date() } }
      ]
    })

    res.json({ 
      notifications,
      unreadCount,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: skip + notifications.length < total
      }
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    res.status(500).json({ message: 'Failed to fetch notifications' })
  }
})

// Mark notification as read
router.patch('/:id/read', authenticate, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { 
        isRead: true,
        readAt: new Date()
      },
      { new: true }
    )

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }

    res.json({ message: 'Notification marked as read', notification })
  } catch (error) {
    console.error('Error marking notification as read:', error)
    res.status(500).json({ message: 'Failed to mark notification as read' })
  }
})

// Mark all notifications as read
router.patch('/read-all', authenticate, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { 
        isRead: true,
        readAt: new Date()
      }
    )

    res.json({ message: 'All notifications marked as read' })
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
    res.status(500).json({ message: 'Failed to mark all notifications as read' })
  }
})

// Delete notification
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    })

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }

    res.json({ message: 'Notification deleted successfully' })
  } catch (error) {
    console.error('Error deleting notification:', error)
    res.status(500).json({ message: 'Failed to delete notification' })
  }
})

// Get notification preferences
router.get('/preferences', authenticate, async (req, res) => {
  try {
    let preferences = await NotificationPreference.findOne({ user: req.user.id })
    
    if (!preferences) {
      // Create default preferences
      preferences = new NotificationPreference({ user: req.user.id })
      await preferences.save()
    }

    res.json({ preferences })
  } catch (error) {
    console.error('Error fetching notification preferences:', error)
    res.status(500).json({ message: 'Failed to fetch notification preferences' })
  }
})

// Update notification preferences
router.put('/preferences', [
  authenticate,
  body('emailNotifications').optional().isObject(),
  body('pushNotifications').optional().isObject(),
  body('schedule').optional().isObject(),
  body('quietHours').optional().isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const preferences = await NotificationPreference.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { 
        new: true, 
        upsert: true,
        setDefaultsOnInsert: true
      }
    )

    res.json({ message: 'Preferences updated successfully', preferences })
  } catch (error) {
    console.error('Error updating notification preferences:', error)
    res.status(500).json({ message: 'Failed to update notification preferences' })
  }
})

// Create notification (internal use)
router.post('/', [
  authenticate,
  body('title').trim().isLength({ min: 1, max: 100 }),
  body('message').trim().isLength({ min: 1, max: 500 }),
  body('type').isIn([
    'reminder', 'achievement', 'milestone', 'system', 
    'wellness_tip', 'goal_deadline', 'habit_streak', 
    'journal_prompt', 'meditation_reminder', 'mood_check'
  ]),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('scheduledFor').optional().isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const notification = new Notification({
      ...req.body,
      user: req.user.id
    })

    await notification.save()
    res.status(201).json({ message: 'Notification created successfully', notification })
  } catch (error) {
    console.error('Error creating notification:', error)
    res.status(500).json({ message: 'Failed to create notification' })
  }
})

// Get notification statistics
router.get('/stats', authenticate, async (req, res) => {
  try {
    const total = await Notification.countDocuments({ user: req.user.id })
    const unread = await Notification.countDocuments({ 
      user: req.user.id, 
      isRead: false 
    })
    const thisWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const weeklyCount = await Notification.countDocuments({ 
      user: req.user.id,
      createdAt: { $gte: thisWeek }
    })

    const typeStats = await Notification.aggregate([
      { $match: { user: req.user.id } },
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    const stats = {
      total,
      unread,
      read: total - unread,
      thisWeek: weeklyCount,
      typeBreakdown: typeStats.reduce((acc, item) => {
        acc[item._id] = item.count
        return acc
      }, {})
    }

    res.json({ stats })
  } catch (error) {
    console.error('Error fetching notification stats:', error)
    res.status(500).json({ message: 'Failed to fetch notification statistics' })
  }
})

export default router
