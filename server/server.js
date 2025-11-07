import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import OpenAI from 'openai'


// Import routes
import authRoutes from './routes/auth.js'
import chatRoutes from './routes/chat.js'
import moodRoutes from './routes/mood.js'
import journalRoutes from './routes/journal.js'
import assessmentRoutes from './routes/assessment.js'
import wellnessRoutes from './routes/wellness.js'
import goalRoutes from './routes/goals.js'
import meditationRoutes from './routes/meditation.js'
import habitRoutes from './routes/habits.js'
import crisisRoutes from './routes/crisis.js'
import notificationRoutes from './routes/notifications.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs (increased for development)
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil(15 * 60 * 1000 / 1000) // seconds
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)

// CORS configuration - Allow Vercel deployments
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  'https://zenzone.vercel.app',
  'https://zenzone-*.vercel.app' // Allow Vercel preview deployments
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        // Handle wildcard domains like *.vercel.app
        const pattern = allowed.replace('*', '.*')
        return new RegExp(pattern).test(origin)
      }
      return allowed === origin
    })
    
    if (isAllowed || process.env.NODE_ENV === 'development') {
      callback(null, true)
    } else {
      console.log('CORS blocked origin:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie']
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(compression())

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Connect to MongoDB (non-blocking)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zenzone')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err))

// Don't wait for MongoDB - start server immediately
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/mood', moodRoutes)
app.use('/api/journal', journalRoutes)
app.use('/api/assessment', assessmentRoutes)
app.use('/api/wellness', wellnessRoutes)
app.use('/api/goals', goalRoutes)
app.use('/api/meditation', meditationRoutes)
app.use('/api/habits', habitRoutes)
app.use('/api/crisis', crisisRoutes)
app.use('/api/notifications', notificationRoutes)

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'ZenZone Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      chat: '/api/chat',
      mood: '/api/mood',
      journal: '/api/journal',
      wellness: '/api/wellness'
    }
  })
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Start server - bind to 0.0.0.0 for Railway/Docker deployment
const HOST = process.env.HOST || '0.0.0.0'
const server = app.listen(PORT, HOST, () => {
  console.log(`✅ Server successfully started!`)
  console.log(`🌐 Listening on ${HOST}:${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🚀 ZenZone Backend API is ready!`)
})

// Keep the process alive
server.keepAliveTimeout = 61 * 1000
server.headersTimeout = 65 * 1000

// Handle server errors
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${PORT} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`Port ${PORT} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
})

// Keep server running - Railway manages container lifecycle

export default app