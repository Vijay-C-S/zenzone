import mongoose from 'mongoose'

const wellnessResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  content: {
    type: String,
    maxlength: 100000
  },
  type: {
    type: String,
    required: true,
    enum: ['article', 'video', 'audio', 'exercise']
  },
  category: {
    type: String,
    required: true,
    enum: ['anxiety', 'depression', 'stress', 'mindfulness', 'sleep', 'relationships', 'general', 'nutrition']
  },
  url: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  author: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Index for efficient queries
wellnessResourceSchema.index({ category: 1, isPublished: 1 })
wellnessResourceSchema.index({ title: 'text', description: 'text', tags: 'text' })

export default mongoose.model('WellnessResource', wellnessResourceSchema)