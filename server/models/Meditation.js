import mongoose from 'mongoose'

const meditationSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['guided', 'timer', 'breathing'],
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: 1,
    max: 120
  },
  guidedSessionId: {
    type: String, // Reference to guided session
    required: function() { return this.type === 'guided' }
  },
  completedDuration: {
    type: Number, // actual time spent in minutes
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  },
  mood: {
    before: {
      type: Number,
      min: 1,
      max: 10
    },
    after: {
      type: Number,
      min: 1,
      max: 10
    }
  },
  notes: {
    type: String,
    maxlength: 500
  },
  sessionDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

const guidedSessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['stress_relief', 'sleep', 'anxiety', 'focus', 'gratitude', 'body_scan', 'loving_kindness', 'beginner'],
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: 1,
    max: 60
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  audioUrl: String, // URL to audio file
  script: {
    type: String,
    required: true
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
})

// Index for efficient queries
meditationSessionSchema.index({ user: 1, sessionDate: -1 })
meditationSessionSchema.index({ user: 1, type: 1 })

guidedSessionSchema.index({ category: 1, isActive: 1 })
guidedSessionSchema.index({ difficulty: 1, isActive: 1 })

export const MeditationSession = mongoose.model('MeditationSession', meditationSessionSchema)
export const GuidedSession = mongoose.model('GuidedSession', guidedSessionSchema)
