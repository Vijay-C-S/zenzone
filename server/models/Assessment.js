import mongoose from 'mongoose'

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assessmentType: {
    type: String,
    required: true,
    enum: ['anxiety', 'depression', 'stress', 'wellbeing']
  },
  answers: [{
    questionId: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }],
  score: {
    type: Number,
    required: true
  },
  maxScore: {
    type: Number,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  recommendations: [{
    type: String
  }]
}, {
  timestamps: true
})

// Index for efficient queries
assessmentSchema.index({ userId: 1, createdAt: -1 })
assessmentSchema.index({ userId: 1, assessmentType: 1 })

export default mongoose.model('Assessment', assessmentSchema)