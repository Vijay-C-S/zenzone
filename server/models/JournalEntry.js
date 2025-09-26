import mongoose from 'mongoose'

const journalEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000
  },
  isPrivate: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  mood: {
    type: Number,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
})

// Index for efficient queries
journalEntrySchema.index({ userId: 1, createdAt: -1 })
journalEntrySchema.index({ userId: 1, title: 'text', content: 'text' })

export default mongoose.model('JournalEntry', journalEntrySchema)