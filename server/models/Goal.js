import mongoose from 'mongoose'

const goalSchema = new mongoose.Schema({
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
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  category: {
    type: String,
    required: true,
    enum: ['mental_health', 'physical_health', 'social', 'career', 'personal', 'spiritual', 'other']
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  targetDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused', 'cancelled'],
    default: 'active'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  milestones: [{
    title: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date,
    dueDate: Date
  }],
  reminders: {
    enabled: {
      type: Boolean,
      default: false
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'weekly'
    },
    time: String // HH:mm format
  },
  completedAt: Date,
  reflection: {
    type: String,
    maxlength: 1000
  }
}, {
  timestamps: true
})

// Index for efficient queries
goalSchema.index({ user: 1, status: 1 })
goalSchema.index({ user: 1, targetDate: 1 })

export default mongoose.model('Goal', goalSchema)
