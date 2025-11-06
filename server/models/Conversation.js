import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  is_crisis: {
    type: Boolean,
    default: false
  }
})

const conversationSchema = new mongoose.Schema({
  session_id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow anonymous conversations
  },
  mode: {
    type: String,
    enum: ['share_thoughts', 'find_calm', 'just_chat', 'default'],
    default: 'share_thoughts'
  },
  messages: [messageSchema],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

// Index for efficient queries
conversationSchema.index({ user: 1, created_at: -1 })
conversationSchema.index({ session_id: 1, updated_at: -1 })

// Clean up old conversations (older than 30 days)
conversationSchema.index({ updated_at: 1 }, { expireAfterSeconds: 2592000 }) // 30 days

const Conversation = mongoose.model('Conversation', conversationSchema)

export default Conversation
