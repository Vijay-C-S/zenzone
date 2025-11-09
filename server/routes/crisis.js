import express from 'express'
import { body, validationResult } from 'express-validator'
import { CrisisResource, CrisisLog } from '../models/CrisisResource.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Get crisis resources
router.get('/', async (req, res) => {
  try {
    const { category, type, region = 'us', emergency } = req.query
    
    const filter = { isActive: true }
    if (category) filter.category = category
    if (type) filter.type = type
    if (region) filter.region = { $in: [region, 'global'] }

    console.log('🔍 Crisis route filter:', JSON.stringify(filter))
    
    const resources = await CrisisResource.find(filter)
      .sort({ 
        priority: -1, 
        isVerified: -1, 
        createdAt: -1 
      })
      .limit(emergency === 'true' ? 5 : 50)

    console.log(`✅ Found ${resources.length} crisis resources`)
    res.json({ resources })
  } catch (error) {
    console.error('Error fetching crisis resources:', error)
    res.status(500).json({ message: 'Failed to fetch crisis resources' })
  }
})

// Get emergency resources (high priority, immediate help)
router.get('/emergency', async (req, res) => {
  try {
    const { region = 'us' } = req.query

    const emergencyResources = await CrisisResource.find({
      isActive: true,
      region: { $in: [region, 'global'] },
      category: { $in: ['suicide_prevention', 'crisis_support', 'emergency'] },
      priority: { $gte: 8 }
    }).sort({ priority: -1, isVerified: -1 })
    .limit(10)

    res.json({ resources: emergencyResources })
  } catch (error) {
    console.error('Error fetching emergency resources:', error)
    res.status(500).json({ message: 'Failed to fetch emergency resources' })
  }
})

// Log resource usage (optional, anonymous)
router.post('/log', [
  authenticate,
  body('resourceId').optional().isMongoId(),
  body('actionType').isIn(['viewed', 'called', 'visited_website', 'used_chat', 'sent_text']),
  body('notes').optional().isLength({ max: 500 }),
  body('helpful').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const log = new CrisisLog({
      ...req.body,
      user: req.user.id
    })

    await log.save()
    res.status(201).json({ message: 'Usage logged successfully' })
  } catch (error) {
    console.error('Error logging resource usage:', error)
    res.status(500).json({ message: 'Failed to log usage' })
  }
})

// Search resources
router.get('/search', async (req, res) => {
  try {
    const { q, region = 'us' } = req.query
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' })
    }

    const searchRegex = new RegExp(q.trim(), 'i')
    
    const resources = await CrisisResource.find({
      isActive: true,
      region: { $in: [region, 'global'] },
      $or: [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { tags: { $in: [searchRegex] } }
      ]
    }).sort({ priority: -1, isVerified: -1 })
    .limit(20)

    res.json({ resources })
  } catch (error) {
    console.error('Error searching crisis resources:', error)
    res.status(500).json({ message: 'Failed to search resources' })
  }
})

// Get resource categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await CrisisResource.distinct('category', { isActive: true })
    
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await CrisisResource.countDocuments({ 
          category, 
          isActive: true 
        })
        return { category, count }
      })
    )

    res.json({ categories: categoriesWithCounts })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ message: 'Failed to fetch categories' })
  }
})

// Admin routes (if user is admin)
router.post('/admin', [
  authenticate,
  body('title').trim().isLength({ min: 1, max: 200 }),
  body('description').trim().isLength({ min: 1, max: 1000 }),
  body('type').isIn(['hotline', 'chat', 'text', 'website', 'app', 'location']),
  body('category').isIn([
    'suicide_prevention', 'crisis_support', 'domestic_violence', 
    'substance_abuse', 'eating_disorders', 'lgbtq_support',
    'veteran_support', 'youth_support', 'mental_health', 'emergency'
  ]),
  body('contact').isObject(),
  body('priority').optional().isInt({ min: 1, max: 10 })
], async (req, res) => {
  try {
    // Check if user is admin (you'll need to implement admin check)
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' })
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() })
    }

    const resource = new CrisisResource(req.body)
    await resource.save()

    res.status(201).json({ message: 'Crisis resource created successfully', resource })
  } catch (error) {
    console.error('Error creating crisis resource:', error)
    res.status(500).json({ message: 'Failed to create crisis resource' })
  }
})

// Initialize default crisis resources
router.post('/admin/init', authenticate, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' })
    }

    const defaultResources = [
      {
        title: "National Suicide Prevention Lifeline",
        description: "24/7 free and confidential support for people in distress, prevention and crisis resources.",
        type: "hotline",
        category: "suicide_prevention",
        contact: {
          phone: "988",
          website: "https://suicidepreventionlifeline.org"
        },
        availability: "24/7",
        languages: ["English", "Spanish"],
        region: "us",
        isVerified: true,
        priority: 10,
        tags: ["suicide", "crisis", "emergency", "24/7"]
      },
      {
        title: "Crisis Text Line",
        description: "Free 24/7 crisis support via text message.",
        type: "text",
        category: "crisis_support",
        contact: {
          textNumber: "741741",
          website: "https://www.crisistextline.org"
        },
        availability: "24/7",
        languages: ["English", "Spanish"],
        region: "us",
        isVerified: true,
        priority: 9,
        tags: ["text", "crisis", "24/7", "youth"]
      },
      {
        title: "SAMHSA National Helpline",
        description: "Treatment referral and information service for individuals and families facing mental health and/or substance use disorders.",
        type: "hotline",
        category: "mental_health",
        contact: {
          phone: "1-800-662-4357",
          website: "https://www.samhsa.gov/find-help/national-helpline"
        },
        availability: "24/7",
        languages: ["English", "Spanish"],
        region: "us",
        isVerified: true,
        priority: 8,
        tags: ["mental health", "substance abuse", "treatment"]
      },
      {
        title: "National Domestic Violence Hotline",
        description: "24/7 confidential support for domestic violence survivors and anyone seeking resources and information.",
        type: "hotline",
        category: "domestic_violence",
        contact: {
          phone: "1-800-799-7233",
          website: "https://www.thehotline.org",
          textNumber: "22522"
        },
        availability: "24/7",
        languages: ["English", "Spanish", "200+ languages via interpretation"],
        region: "us",
        isVerified: true,
        priority: 9,
        tags: ["domestic violence", "abuse", "safety"]
      },
      {
        title: "Trevor Lifeline",
        description: "Crisis intervention and suicide prevention for LGBTQ young people under 25.",
        type: "hotline",
        category: "lgbtq_support",
        contact: {
          phone: "1-866-488-7386",
          website: "https://www.thetrevorproject.org",
          chatUrl: "https://www.thetrevorproject.org/get-help/",
          textNumber: "678678"
        },
        availability: "24/7",
        languages: ["English"],
        region: "us",
        isVerified: true,
        priority: 9,
        tags: ["lgbtq", "youth", "suicide prevention"]
      }
    ]

    // Only insert if no resources exist
    const existingCount = await CrisisResource.countDocuments()
    if (existingCount === 0) {
      await CrisisResource.insertMany(defaultResources)
      res.json({ message: 'Default crisis resources initialized successfully' })
    } else {
      res.json({ message: 'Crisis resources already exist' })
    }
  } catch (error) {
    console.error('Error initializing crisis resources:', error)
    res.status(500).json({ message: 'Failed to initialize crisis resources' })
  }
})

export default router
