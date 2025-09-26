import express from 'express'
import { body, validationResult } from 'express-validator'
import Assessment from '../models/Assessment.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Validation rules
const assessmentValidation = [
  body('assessmentType')
    .isIn(['anxiety', 'depression', 'stress', 'wellbeing'])
    .withMessage('Invalid assessment type'),
  body('answers')
    .isArray({ min: 1 })
    .withMessage('Answers must be a non-empty array'),
  body('answers.*.questionId')
    .notEmpty()
    .withMessage('Question ID is required'),
  body('answers.*.value')
    .isNumeric()
    .withMessage('Answer value must be numeric')
]

// Submit assessment
router.post('/', authenticate, assessmentValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { assessmentType, answers } = req.body

    // Calculate score
    const score = answers.reduce((total, answer) => total + answer.value, 0)
    const maxScore = answers.length * 4 // Assuming max value per question is 4

    // Determine level and recommendations based on assessment type and score
    let level, recommendations

    if (assessmentType === 'anxiety') {
      if (score <= 4) {
        level = 'Low'
        recommendations = [
          'Continue your current self-care practices',
          'Practice mindfulness regularly',
          'Maintain a healthy sleep schedule'
        ]
      } else if (score <= 8) {
        level = 'Moderate'
        recommendations = [
          'Try relaxation techniques like deep breathing',
          'Consider talking to someone you trust',
          'Limit caffeine intake',
          'Practice regular exercise'
        ]
      } else {
        level = 'High'
        recommendations = [
          'Consider speaking with a mental health professional',
          'Practice grounding techniques',
          'Establish a daily routine',
          'Reach out to your support network'
        ]
      }
    } else if (assessmentType === 'stress') {
      if (score <= 4) {
        level = 'Low'
        recommendations = [
          'Keep up your current coping strategies',
          'Maintain work-life balance',
          'Continue regular self-care activities'
        ]
      } else if (score <= 8) {
        level = 'Moderate'
        recommendations = [
          'Practice time management techniques',
          'Try stress-reduction activities',
          'Take regular breaks throughout the day',
          'Consider meditation or yoga'
        ]
      } else {
        level = 'High'
        recommendations = [
          'Consider stress management counseling',
          'Prioritize self-care activities',
          'Evaluate and adjust your workload',
          'Seek support from friends and family'
        ]
      }
    } else if (assessmentType === 'depression') {
      if (score <= 4) {
        level = 'Low'
        recommendations = [
          'Maintain social connections',
          'Continue engaging in enjoyable activities',
          'Keep a regular sleep schedule'
        ]
      } else if (score <= 8) {
        level = 'Moderate'
        recommendations = [
          'Engage in regular physical activity',
          'Connect with supportive people',
          'Consider counseling or therapy',
          'Practice self-compassion'
        ]
      } else {
        level = 'High'
        recommendations = [
          'Seek professional mental health support',
          'Reach out to trusted friends or family',
          'Consider joining a support group',
          'Focus on basic self-care needs'
        ]
      }
    } else { // wellbeing
      const percentage = (score / maxScore) * 100
      if (percentage >= 75) {
        level = 'Good'
        recommendations = [
          'Continue your positive habits',
          'Share your strategies with others',
          'Maintain your support network'
        ]
      } else if (percentage >= 50) {
        level = 'Moderate'
        recommendations = [
          'Focus on activities that bring you joy',
          'Connect with supportive people',
          'Establish healthy daily routines',
          'Practice gratitude regularly'
        ]
      } else {
        level = 'Needs Attention'
        recommendations = [
          'Consider professional support',
          'Prioritize self-care activities',
          'Reach out to trusted friends or family',
          'Focus on small, achievable goals'
        ]
      }
    }

    const assessment = new Assessment({
      userId: req.user._id,
      assessmentType,
      answers,
      score,
      maxScore,
      level,
      recommendations
    })

    await assessment.save()

    res.status(201).json({
      message: 'Assessment completed successfully',
      assessment: {
        id: assessment._id,
        assessmentType: assessment.assessmentType,
        score: assessment.score,
        maxScore: assessment.maxScore,
        level: assessment.level,
        recommendations: assessment.recommendations,
        createdAt: assessment.createdAt
      }
    })
  } catch (error) {
    console.error('Submit assessment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get user assessments
router.get('/', authenticate, async (req, res) => {
  try {
    const { type, limit = 10 } = req.query

    let query = { userId: req.user._id }
    if (type) {
      query.assessmentType = type
    }

    const assessments = await Assessment.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('-answers') // Exclude detailed answers for list view

    res.json({ assessments })
  } catch (error) {
    console.error('Get assessments error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single assessment
router.get('/:id', authenticate, async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' })
    }

    res.json({ assessment })
  } catch (error) {
    console.error('Get assessment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get assessment statistics
router.get('/stats/overview', authenticate, async (req, res) => {
  try {
    const totalAssessments = await Assessment.countDocuments({ userId: req.user._id })
    
    // Get latest assessment of each type
    const latestAssessments = await Assessment.aggregate([
      { $match: { userId: req.user._id } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$assessmentType',
          latest: { $first: '$$ROOT' }
        }
      }
    ])

    // Get assessment history for trends
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const recentAssessments = await Assessment.find({
      userId: req.user._id,
      createdAt: { $gte: thirtyDaysAgo }
    }).sort({ createdAt: 1 })

    res.json({
      totalAssessments,
      latestAssessments: latestAssessments.map(item => item.latest),
      recentAssessments,
      assessmentTypes: ['anxiety', 'depression', 'stress', 'wellbeing']
    })
  } catch (error) {
    console.error('Get assessment stats error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router