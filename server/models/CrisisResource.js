import mongoose from 'mongoose'

const crisisResourceSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['hotline', 'chat', 'text', 'website', 'app', 'location'],
    required: true
  },
  category: {
    type: String,
    enum: [
      'suicide_prevention', 
      'crisis_support', 
      'domestic_violence', 
      'substance_abuse', 
      'eating_disorders',
      'lgbtq_support',
      'veteran_support',
      'youth_support',
      'mental_health',
      'emergency'
    ],
    required: true
  },
  contact: {
    phone: String,
    website: String,
    email: String,
    address: String,
    textNumber: String,
    chatUrl: String
  },
  availability: {
    type: String,
    enum: ['24/7', 'business_hours', 'specific_hours', 'varies'],
    default: '24/7'
  },
  hours: {
    type: String // e.g., "Mon-Fri 9am-5pm"
  },
  languages: [String],
  region: {
    type: String,
    enum: ['global', 'us', 'canada', 'uk', 'australia', 'india', 'other'],
    default: 'india'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 1,
    min: 1,
    max: 10
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const crisisLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CrisisResource'
  },
  actionType: {
    type: String,
    enum: ['viewed', 'called', 'visited_website', 'used_chat', 'sent_text'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    maxlength: 500
  },
  helpful: {
    type: Boolean
  }
}, {
  timestamps: true
})

// Indexes
crisisResourceSchema.index({ category: 1, isActive: 1 })
crisisResourceSchema.index({ type: 1, region: 1 })
crisisResourceSchema.index({ priority: -1, isVerified: -1 })

crisisLogSchema.index({ user: 1, timestamp: -1 })

export const CrisisResource = mongoose.model('CrisisResource', crisisResourceSchema)
export const CrisisLog = mongoose.model('CrisisLog', crisisLogSchema)
