import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  type: {
    type: String,
    enum: [
      'reminder', 
      'achievement', 
      'milestone', 
      'system', 
      'wellness_tip', 
      'goal_deadline',
      'habit_streak',
      'journal_prompt',
      'meditation_reminder',
      'mood_check'
    ],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  actionType: {
    type: String,
    enum: ['none', 'navigate', 'external_link', 'modal'],
    default: 'none'
  },
  actionData: {
    route: String,
    url: String,
    modalType: String
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  scheduledFor: Date,
  expiresAt: Date,
  metadata: {
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
    habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit' },
    assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' },
    relatedData: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
})

const notificationPreferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  emailNotifications: {
    enabled: { type: Boolean, default: true },
    types: {
      reminders: { type: Boolean, default: true },
      achievements: { type: Boolean, default: true },
      wellness_tips: { type: Boolean, default: true },
      system: { type: Boolean, default: true }
    }
  },
  pushNotifications: {
    enabled: { type: Boolean, default: true },
    types: {
      reminders: { type: Boolean, default: true },
      achievements: { type: Boolean, default: true },
      wellness_tips: { type: Boolean, default: true },
      habit_reminders: { type: Boolean, default: true },
      meditation_reminders: { type: Boolean, default: true },
      mood_check: { type: Boolean, default: true }
    }
  },
  schedule: {
    dailyReminders: {
      enabled: { type: Boolean, default: true },
      time: { type: String, default: '09:00' } // HH:mm format
    },
    weeklyDigest: {
      enabled: { type: Boolean, default: true },
      day: { type: String, default: 'sunday' },
      time: { type: String, default: '09:00' }
    }
  },
  quietHours: {
    enabled: { type: Boolean, default: true },
    start: { type: String, default: '22:00' },
    end: { type: String, default: '08:00' }
  }
}, {
  timestamps: true
})

// Indexes for efficient queries
notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 })
notificationSchema.index({ user: 1, type: 1 })
notificationSchema.index({ scheduledFor: 1, isRead: 1 })
notificationSchema.index({ expiresAt: 1 })

export const Notification = mongoose.model('Notification', notificationSchema)
export const NotificationPreference = mongoose.model('NotificationPreference', notificationPreferenceSchema)
