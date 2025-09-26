import mongoose from 'mongoose'

const moodEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  note: {
    type: String,
    maxlength: 500
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
})

// Index for efficient queries
moodEntrySchema.index({ userId: 1, date: -1 })

export default mongoose.model('MoodEntry', moodEntrySchema)