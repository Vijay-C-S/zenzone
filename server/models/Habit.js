import mongoose from 'mongoose'

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 300
  },
  category: {
    type: String,
    enum: ['health', 'fitness', 'mental_wellness', 'productivity', 'social', 'learning', 'creativity', 'other'],
    required: true
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily'
  },
  targetCount: {
    type: Number,
    default: 1,
    min: 1
  },
  unit: {
    type: String,
    default: 'times',
    maxlength: 20
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  icon: {
    type: String,
    default: '⭐'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  streak: {
    current: {
      type: Number,
      default: 0
    },
    longest: {
      type: Number,
      default: 0
    }
  },
  reminders: {
    enabled: {
      type: Boolean,
      default: false
    },
    times: [String] // Array of HH:mm format times
  }
}, {
  timestamps: true
})

const habitEntrySchema = new mongoose.Schema({
  habit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  count: {
    type: Number,
    default: 0,
    min: 0
  },
  notes: {
    type: String,
    maxlength: 200
  },
  mood: {
    type: Number,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
})

// Indexes for efficient queries
habitSchema.index({ user: 1, isActive: 1 })
habitEntrySchema.index({ user: 1, date: -1 })
habitEntrySchema.index({ habit: 1, date: -1 })
habitEntrySchema.index({ user: 1, habit: 1, date: 1 }, { unique: true })

export const Habit = mongoose.model('Habit', habitSchema)
export const HabitEntry = mongoose.model('HabitEntry', habitEntrySchema)
