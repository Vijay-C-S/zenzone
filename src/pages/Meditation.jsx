import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Clock, Heart, Brain, Moon, Focus, Smile } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

// Enhanced guided sessions data with detailed content and scripts
const guidedSessionsData = [
  {
    title: "Mindful Breathing for Beginners",
    description: "A gentle introduction to mindfulness through simple breathing techniques. Perfect for those new to meditation.",
    category: "beginner",
    duration: 10,
    difficulty: "beginner",
    tags: ["breathing", "mindfulness", "beginner", "relaxation"],
    rating: { average: 4.5, count: 127 },
    script: {
      preparation: "Find a comfortable position, either sitting or lying down. Close your eyes or soften your gaze. Let your body settle into this moment.",
      phases: [
        {
          timeRange: [0, 120], // 0-2 minutes
          instruction: "Begin by taking three deep breaths. Inhale slowly through your nose... hold for a moment... and exhale gently through your mouth. Feel your body beginning to relax with each breath."
        },
        {
          timeRange: [120, 300], // 2-5 minutes
          instruction: "Now let your breathing return to its natural rhythm. Simply observe each breath as it flows in and out. Notice the sensation of air entering your nostrils, filling your lungs, and leaving your body."
        },
        {
          timeRange: [300, 480], // 5-8 minutes
          instruction: "When your mind wanders - and it will - gently guide your attention back to your breath. This is not a failure, it's practice. Each time you notice your mind has wandered and bring it back, you're strengthening your mindfulness."
        },
        {
          timeRange: [480, 600], // 8-10 minutes
          instruction: "As we near the end, take a moment to appreciate this time you've given yourself. Notice any sense of calm or peace you've cultivated. When you're ready, slowly bring your awareness back to your surroundings."
        }
      ]
    }
  },
  {
    title: "Stress Relief Body Scan",
    description: "Release tension and stress by systematically relaxing each part of your body.",
    category: "stress_relief",
    duration: 15,
    difficulty: "beginner",
    tags: ["stress relief", "body scan", "relaxation", "tension release"],
    rating: { average: 4.7, count: 89 },
    script: {
      preparation: "Lie down comfortably or sit with your back supported. Close your eyes and take three deep, cleansing breaths.",
      phases: [
        {
          timeRange: [0, 180], // 0-3 minutes
          instruction: "Start by bringing awareness to the top of your head. Notice any sensations - tension, warmth, tingling, or simply neutral awareness. Now slowly move your attention down to your forehead, releasing any furrows or tightness."
        },
        {
          timeRange: [180, 360], // 3-6 minutes
          instruction: "Continue down to your eyes, cheeks, and jaw. Let your jaw drop slightly, releasing any clenched tension. Move to your neck and shoulders - areas that often hold stress. Imagine breathing into these areas and letting them soften."
        },
        {
          timeRange: [360, 540], // 6-9 minutes
          instruction: "Bring attention to your arms, from shoulders to fingertips. Notice your chest and ribcage expanding and contracting with each breath. Move awareness to your back, releasing any tightness along your spine."
        },
        {
          timeRange: [540, 720], // 9-12 minutes
          instruction: "Focus on your abdomen, hips, and pelvis. Let this area soften and relax. Move down to your thighs, knees, and calves. Finally, bring awareness to your feet and toes, letting your entire body rest in complete relaxation."
        },
        {
          timeRange: [720, 900], // 12-15 minutes
          instruction: "Take a few moments to scan your entire body from head to toe. Notice the sense of relaxation and release you've created. When ready, gently wiggle your fingers and toes, and slowly return to full awareness."
        }
      ]
    }
  },
  {
    title: "Anxiety Relief Meditation",
    description: "Calm your anxious mind with this soothing meditation focused on grounding and peace.",
    category: "anxiety",
    duration: 12,
    difficulty: "beginner",
    tags: ["anxiety", "grounding", "peace", "safety"],
    rating: { average: 4.6, count: 156 },
    script: {
      preparation: "Find a safe, quiet space where you won't be disturbed. Sit comfortably with your feet on the ground, feeling supported and secure.",
      phases: [
        {
          timeRange: [0, 150], // 0-2.5 minutes
          instruction: "You are safe in this moment. Take slow, deep breaths, making your exhale longer than your inhale. Count: inhale for 4... hold for 2... exhale for 6. This activates your body's relaxation response."
        },
        {
          timeRange: [150, 300], // 2.5-5 minutes
          instruction: "Place one hand on your chest, one on your belly. Feel the rise and fall of your breathing. Notice 5 things you can see, 4 things you can hear, 3 things you can touch, 2 things you can smell, and 1 thing you can taste. This grounds you in the present moment."
        },
        {
          timeRange: [300, 480], // 5-8 minutes
          instruction: "Imagine roots growing from your body into the earth, anchoring you with stability and strength. With each breath, send any anxious thoughts down through these roots into the earth, where they're transformed into peaceful energy."
        },
        {
          timeRange: [480, 600], // 8-10 minutes
          instruction: "Repeat silently: 'I am safe. I am calm. I am strong.' Feel these words in your body. Anxiety is temporary - it will pass. You have the strength to handle whatever comes your way."
        },
        {
          timeRange: [600, 720], // 10-12 minutes
          instruction: "As we conclude, place your hands over your heart. Send yourself compassion and kindness. You've taken an important step in caring for your mental health. Carry this sense of calm and grounding with you."
        }
      ]
    }
  },
  {
    title: "Better Sleep Meditation",
    description: "Prepare your mind and body for restful sleep with this calming bedtime meditation.",
    category: "sleep",
    duration: 20,
    difficulty: "beginner",
    tags: ["sleep", "bedtime", "relaxation", "rest"],
    rating: { average: 4.8, count: 203 },
    script: {
      preparation: "Lie down comfortably in your bed. Dim the lights or turn them off completely. Close your eyes and begin to let go of the day.",
      phases: [
        {
          timeRange: [0, 240], // 0-4 minutes
          instruction: "Let your body sink into the mattress with each exhale. Release the events of today - they are complete. Tomorrow's concerns can wait until tomorrow. Right now, this moment is for rest and restoration."
        },
        {
          timeRange: [240, 480], // 4-8 minutes
          instruction: "Imagine a warm, golden light starting at the top of your head, slowly moving down your body. This light brings deep relaxation and peace. Feel it melting away any remaining tension as it travels through each part of your body."
        },
        {
          timeRange: [480, 720], // 8-12 minutes
          instruction: "Picture yourself in a peaceful place - perhaps a quiet beach, a serene forest, or a cozy cabin. Engage all your senses in this safe, tranquil environment. Feel completely at ease and protected."
        },
        {
          timeRange: [720, 960], // 12-16 minutes
          instruction: "With each breath, you're becoming drowsier and more relaxed. Your mind is quiet, your body is heavy and warm. If thoughts arise, simply acknowledge them and let them drift away like clouds in the sky."
        },
        {
          timeRange: [960, 1200], // 16-20 minutes
          instruction: "You are ready for deep, restorative sleep. Your body knows how to heal and restore itself during rest. Trust in this natural process. Allow yourself to drift into peaceful, rejuvenating sleep..."
        }
      ]
    }
  },
  {
    title: "Focus and Concentration",
    description: "Enhance your mental clarity and ability to concentrate with this focused meditation.",
    category: "focus",
    duration: 15,
    difficulty: "intermediate",
    tags: ["focus", "concentration", "mental clarity", "attention"],
    rating: { average: 4.4, count: 78 },
    script: {
      preparation: "Sit upright with your spine straight but not rigid. Rest your hands comfortably and close your eyes. Prepare to train your attention like a mental muscle.",
      phases: [
        {
          timeRange: [0, 180], // 0-3 minutes
          instruction: "Choose a single point of focus - your breath at the nostrils. Commit to keeping your attention here for the entire session. Notice the subtle sensations of air moving in and out."
        },
        {
          timeRange: [180, 360], // 3-6 minutes
          instruction: "When your mind wanders, immediately but gently return to your chosen focus point. Don't judge the wandering - simply redirect. Each redirection strengthens your concentration muscle."
        },
        {
          timeRange: [360, 540], // 6-9 minutes
          instruction: "Now narrow your focus even more. Concentrate only on the moment when your inhale becomes an exhale. This precise attention training will enhance your ability to focus in daily life."
        },
        {
          timeRange: [540, 720], // 9-12 minutes
          instruction: "Visualize your attention as a bright beam of light, steady and unwavering. If the beam wavers, simply steady it again. Feel your mind becoming sharper and more alert with each moment of sustained focus."
        },
        {
          timeRange: [720, 900], // 12-15 minutes
          instruction: "In these final minutes, appreciate the mental clarity you've developed. This focused attention is a skill you can apply to any task. When ready, slowly open your eyes, maintaining this sense of clear awareness."
        }
      ]
    }
  },
  {
    title: "Gratitude and Appreciation",
    description: "Cultivate a sense of gratitude and appreciation for the good things in your life.",
    category: "gratitude",
    duration: 10,
    difficulty: "beginner",
    tags: ["gratitude", "appreciation", "positive thinking", "mindfulness"],
    rating: { average: 4.7, count: 134 },
    script: {
      preparation: "Sit comfortably with a gentle smile on your face. Close your eyes and bring to mind the feeling of gratitude - that warm sense of appreciation.",
      phases: [
        {
          timeRange: [0, 120], // 0-2 minutes
          instruction: "Begin by appreciating your breath - this constant gift that sustains your life. Feel grateful for your body that carries you through each day, for your heart that beats steadily, for your senses that let you experience the world."
        },
        {
          timeRange: [120, 300], // 2-5 minutes
          instruction: "Think of three people who have positively impacted your life. It could be family, friends, teachers, or even strangers who showed you kindness. Feel the warmth of gratitude for their presence in your life."
        },
        {
          timeRange: [300, 480], // 5-8 minutes
          instruction: "Bring to mind simple pleasures you often take for granted - a warm cup of coffee, sunlight through your window, a comfortable bed, access to clean water. Notice how appreciation can transform ordinary moments into gifts."
        },
        {
          timeRange: [480, 600], // 8-10 minutes
          instruction: "Finally, feel grateful for this very moment - for your ability to pause, reflect, and cultivate positivity. Send this gratitude out into the world, and carry this appreciative heart with you throughout your day."
        }
      ]
    }
  }
]

const Meditation = () => {
  const [activeTab, setActiveTab] = useState('timer')
  const [guidedSessions, setGuidedSessions] = useState([])
  const [meditationHistory, setMeditationHistory] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuthStore()

  useEffect(() => {
    try {
      console.log('Loading meditation page...')
      setGuidedSessions(guidedSessionsData)
      fetchMeditationHistory()
      fetchStats()
    } catch (error) {
      console.error('Error initializing meditation page:', error)
      setError(error.message)
      setGuidedSessions([])
    } finally {
      setLoading(false)
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Meditation</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  const fetchMeditationHistory = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/meditation/history', {
        credentials: 'include'
      })
      const data = await response.json()
      setMeditationHistory(data.sessions)
    } catch (error) {
      console.error('Error fetching meditation history:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/meditation/stats', {
        credentials: 'include'
      })
      const data = await response.json()
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Brain className="h-8 w-8 text-green-600 mr-3" />
            Meditation & Mindfulness
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Find peace and clarity through guided meditation and mindfulness practice.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSessions || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Minutes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalMinutes || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.currentStreak || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Smile className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Session</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageSession || 0}m</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('timer')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'timer'
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Timer
              </button>
              <button
                onClick={() => setActiveTab('guided')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'guided'
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Guided Sessions
              </button>
              <button
                onClick={() => setActiveTab('breathing')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'breathing'
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Breathing Exercises
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                History
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'timer' && <MeditationTimer onSessionComplete={fetchStats} />}
        {activeTab === 'guided' && (
          <GuidedSessions 
            sessions={guidedSessions} 
            onSessionComplete={fetchStats}
          />
        )}
        {activeTab === 'breathing' && <BreathingExercises onSessionComplete={fetchStats} />}
        {activeTab === 'history' && <MeditationHistory history={meditationHistory} />}
      </div>
    </div>
  )
}

// Meditation Timer Component
const MeditationTimer = ({ onSessionComplete }) => {
  const [duration, setDuration] = useState(10)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const intervalRef = useRef(null)
  const { user } = useAuthStore()

  useEffect(() => {
    setTimeLeft(duration * 60)
  }, [duration])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            setIsCompleted(true)
            handleSessionComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft])

  const startTimer = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/meditation/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          type: 'timer',
          duration: duration
        })
      })

      if (response.ok) {
        const data = await response.json()
        setSessionId(data.session._id)
        setIsRunning(true)
        setIsCompleted(false)
      }
    } catch (error) {
      console.error('Error starting session:', error)
      toast.error('Failed to start meditation session')
    }
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(duration * 60)
    setIsCompleted(false)
    setSessionId(null)
  }

  const handleSessionComplete = async () => {
    if (!sessionId) return

    try {
      const completedDuration = Math.round((duration * 60 - timeLeft) / 60)
      await fetch(`http://localhost:3001/api/meditation/session/${sessionId}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          completedDuration,
          completed: true
        })
      })

      toast.success('Meditation session completed!')
      onSessionComplete?.()
    } catch (error) {
      console.error('Error completing session:', error)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Meditation Timer</h3>
        
        {/* Duration Selector */}
        {!isRunning && !isCompleted && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Choose Duration (minutes)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20, 30, 45, 60, 90].map((min) => (
                <button
                  key={min}
                  onClick={() => setDuration(min)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    duration === min
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {min}m
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Timer Display */}
        <div className="mb-8">
          <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                className="text-green-600 transition-all duration-1000 ease-linear"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {isCompleted ? 'Complete!' : isRunning ? 'Meditating...' : 'Ready'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          {!isRunning && !isCompleted && (
            <button
              onClick={startTimer}
              className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Play className="h-5 w-5 mr-2" />
              Start
            </button>
          )}

          {isRunning && (
            <button
              onClick={pauseTimer}
              className="flex items-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
            >
              <Pause className="h-5 w-5 mr-2" />
              Pause
            </button>
          )}

          <button
            onClick={resetTimer}
            className="flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset
          </button>
        </div>

        {isCompleted && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
            <p className="text-green-800 dark:text-green-300 font-medium">
              🎉 Congratulations! You completed a {duration}-minute meditation session.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Guided Sessions Component
const GuidedSessions = ({ sessions, onSessionComplete }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredSessions, setFilteredSessions] = useState(sessions)
  const [activeSession, setActiveSession] = useState(null)

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredSessions(sessions)
    } else {
      setFilteredSessions(sessions.filter(session => session.category === selectedCategory))
    }
  }, [selectedCategory, sessions])

  const getCategoryIcon = (category) => {
    try {
      const icons = {
        stress_relief: <Heart className="h-5 w-5" />,
        sleep: <Moon className="h-5 w-5" />,
        anxiety: <Brain className="h-5 w-5" />,
        focus: <Focus className="h-5 w-5" />,
        gratitude: <Smile className="h-5 w-5" />,
        body_scan: <Heart className="h-5 w-5" />,
        loving_kindness: <Heart className="h-5 w-5" />,
        beginner: <Clock className="h-5 w-5" />
      }
      return icons[category] || <Brain className="h-5 w-5" />
    } catch (error) {
      console.error('Error in getCategoryIcon:', error)
      return <Brain className="h-5 w-5" />
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const startGuidedSession = (session) => {
    setActiveSession(session)
  }

  const categories = [
    { id: 'all', name: 'All', icon: <Brain className="h-4 w-4" /> },
    { id: 'beginner', name: 'Beginner', icon: <Clock className="h-4 w-4" /> },
    { id: 'stress_relief', name: 'Stress Relief', icon: <Heart className="h-4 w-4" /> },
    { id: 'anxiety', name: 'Anxiety', icon: <Brain className="h-4 w-4" /> },
    { id: 'sleep', name: 'Sleep', icon: <Moon className="h-4 w-4" /> },
    { id: 'focus', name: 'Focus', icon: <Focus className="h-4 w-4" /> },
    { id: 'gratitude', name: 'Gratitude', icon: <Smile className="h-4 w-4" /> }
  ]

  return (
    <div>
      {activeSession ? (
        <GuidedSessionPlayer 
          session={activeSession}
          onComplete={() => {
            setActiveSession(null)
            onSessionComplete?.()
          }}
          onBack={() => setActiveSession(null)}
        />
      ) : (
        <>
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sessions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session, index) => (
              <div key={session.title + index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-3">
                        {getCategoryIcon(session.category)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {session.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {session.duration} min
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(session.difficulty)}`}>
                            {session.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {session.description}
                  </p>

                  {session.rating && session.rating.count > 0 && (
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.round(session.rating.average) ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        ({session.rating.count} reviews)
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => startGuidedSession(session)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Session
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredSessions.length === 0 && (
            <div className="text-center py-12">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No sessions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting a different category or check back later for new content.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Guided Session Player Component
const GuidedSessionPlayer = ({ session, onComplete, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(session.duration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [currentPhase, setCurrentPhase] = useState('preparation')
  const [sessionId, setSessionId] = useState(null)
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0)
  const intervalRef = useRef(null)

  // Create audio context for subtle notification sounds
  const playTransitionSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } catch (error) {
      // Silent fail for browsers that don't support Web Audio API
    }
  }

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            setIsCompleted(true)
            handleSessionComplete()
            return 0
          }
          
          // Check for phase transitions and play notification sound
          const newTimeLeft = prev - 1
          const totalSeconds = session.duration * 60
          const elapsed = totalSeconds - newTimeLeft
          
          if (session.script && session.script.phases) {
            const newPhaseIndex = session.script.phases.findIndex(phase => 
              elapsed >= phase.timeRange[0] && elapsed < phase.timeRange[1]
            )
            
            if (newPhaseIndex !== currentInstructionIndex && newPhaseIndex !== -1) {
              setCurrentInstructionIndex(newPhaseIndex)
              playTransitionSound()
            }
          }
          
          return newTimeLeft
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft, currentInstructionIndex, session])

  const startSession = async () => {
    setIsRunning(true)
    setCurrentPhase('active')
    setIsCompleted(false)
    
    // Try to create session in backend, but continue even if it fails
    try {
      const response = await fetch('http://localhost:3001/api/meditation/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          type: 'guided',
          guidedSessionId: session.title, // Use title as identifier for now
          duration: session.duration,
          mood: {
            before: 5 // Default mood value, could be customized
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        setSessionId(data.session._id)
        console.log('Session started with backend tracking')
      } else {
        console.log('Backend session creation failed, continuing offline')
      }
    } catch (error) {
      console.log('Backend unavailable, running in offline mode')
    }
    
    toast.success(`Starting "${session.title}" meditation`)
  }

  const pauseSession = () => {
    setIsRunning(false)
  }

  const handleSessionComplete = async () => {
    setCurrentPhase('completed')
    
    // Try to save completion to backend if sessionId exists
    if (sessionId) {
      try {
        const completedDuration = Math.round((session.duration * 60 - timeLeft) / 60)
        const response = await fetch(`http://localhost:3001/api/meditation/session/${sessionId}/complete`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            completedDuration,
            completed: true,
            mood: {
              after: 7 // Default improved mood, could be customized
            }
          })
        })

        if (response.ok) {
          console.log('Session completion saved to backend')
        } else {
          console.log('Failed to save session completion to backend')
        }
      } catch (error) {
        console.log('Backend unavailable for session completion')
      }
    }
    
    // Always show success message regardless of backend status
    toast.success(`Completed "${session.title}" meditation! 🧘‍♀️`)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((session.duration * 60 - timeLeft) / (session.duration * 60)) * 100

  const getGuidanceText = () => {
    const totalSeconds = session.duration * 60
    const elapsed = totalSeconds - timeLeft
    
    // Use specific script if available
    if (session.script && session.script.phases) {
      // Find the appropriate phase based on elapsed time
      for (const phase of session.script.phases) {
        if (elapsed >= phase.timeRange[0] && elapsed < phase.timeRange[1]) {
          return phase.instruction
        }
      }
      // If we're past all phases, return the last phase instruction
      return session.script.phases[session.script.phases.length - 1].instruction
    }
    
    // Fallback to generic guidance if no script is available
    const progressPercent = (elapsed / totalSeconds) * 100
    if (currentPhase === 'preparation') {
      return session.script?.preparation || "Find a comfortable position. Close your eyes or soften your gaze. Take a deep breath and prepare to begin your meditation journey."
    } else if (progressPercent < 20) {
      return "Begin by taking slow, deep breaths. Feel your body settling into this moment. Notice any tension and allow it to release with each exhale."
    } else if (progressPercent < 40) {
      return "Continue breathing naturally. If your mind wanders, gently guide your attention back to your breath. This is normal and part of the practice."
    } else if (progressPercent < 60) {
      return "You're doing wonderfully. Deepen your awareness of the present moment. Feel the peace that comes from simply being here, now."
    } else if (progressPercent < 80) {
      return "As we continue, notice the sense of calm growing within you. Each breath brings you deeper into tranquility and mindfulness."
    } else if (progressPercent < 95) {
      return "We're approaching the end of our session. Take this time to appreciate the peace you've cultivated within yourself."
    } else {
      return "Slowly begin to bring your awareness back to your surroundings. When you're ready, gently open your eyes. Well done."
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full mr-4">
              <Brain className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {session.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {session.duration} minute guided meditation
              </p>
              {!sessionId && currentPhase === 'active' && (
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  ✨ Running in offline mode
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                className="text-green-600 transition-all duration-1000 ease-linear"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {isCompleted ? 'Complete' : isRunning ? 'Remaining' : 'Duration'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Phase Indicator */}
        {session.script && session.script.phases && currentPhase === 'active' && (
          <div className="text-center mb-6">
            <div className="flex justify-center items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Phase:</span>
              <div className="flex space-x-1">
                {session.script.phases.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentInstructionIndex
                        ? 'bg-green-600'
                        : index < currentInstructionIndex
                        ? 'bg-green-300'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentInstructionIndex + 1} of {session.script.phases.length}
              </span>
            </div>
          </div>
        )}

        {/* Guidance Text */}
        <div className="text-center mb-8">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
              {currentPhase === 'preparation' && session.script?.preparation 
                ? session.script.preparation 
                : getGuidanceText()
              }
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          {currentPhase === 'preparation' && (
            <button
              onClick={startSession}
              className="flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-lg"
            >
              <Play className="h-5 w-5 mr-2" />
              Begin Meditation
            </button>
          )}

          {isRunning && (
            <button
              onClick={pauseSession}
              className="flex items-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
            >
              <Pause className="h-5 w-5 mr-2" />
              Pause
            </button>
          )}

          {!isRunning && currentPhase === 'active' && !isCompleted && (
            <button
              onClick={() => setIsRunning(true)}
              className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Play className="h-5 w-5 mr-2" />
              Resume
            </button>
          )}

          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Back to Sessions
          </button>
        </div>

        {isCompleted && (
          <div className="text-center">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                🎉 Meditation Complete!
              </h3>
              <p className="text-green-700 dark:text-green-400">
                You've successfully completed "{session.title}". Take a moment to notice how you feel.
              </p>
              <button
                onClick={onComplete}
                className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Breathing Exercises Component
const BreathingExercises = ({ onSessionComplete }) => {
  const [activeExercise, setActiveExercise] = useState(null)
  
  const exercises = [
    {
      id: 'box',
      name: '4-7-8 Breathing',
      description: 'A calming technique that helps reduce anxiety and promote sleep.',
      pattern: { inhale: 4, hold: 7, exhale: 8 },
      cycles: 8
    },
    {
      id: 'box_breathing',
      name: 'Box Breathing',
      description: 'Equal timing for all phases, great for focus and stress relief.',
      pattern: { inhale: 4, hold: 4, exhale: 4, rest: 4 },
      cycles: 10
    },
    {
      id: 'coherent',
      name: 'Coherent Breathing',
      description: 'Simple and effective for balancing the nervous system.',
      pattern: { inhale: 5, exhale: 5 },
      cycles: 12
    }
  ]

  return (
    <div>
      {!activeExercise ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {exercise.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {exercise.description}
              </p>
              <button
                onClick={() => setActiveExercise(exercise)}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Exercise
              </button>
            </div>
          ))}
        </div>
      ) : (
        <BreathingExercisePlayer 
          exercise={activeExercise}
          onComplete={() => {
            setActiveExercise(null)
            onSessionComplete?.()
          }}
          onBack={() => setActiveExercise(null)}
        />
      )}
    </div>
  )
}

// Breathing Exercise Player Component
const BreathingExercisePlayer = ({ exercise, onComplete, onBack }) => {
  const [phase, setPhase] = useState('inhale')
  const [timeLeft, setTimeLeft] = useState(exercise.pattern.inhale)
  const [cycle, setCycle] = useState(1)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            moveToNextPhase()
            return getNextPhaseDuration()
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, phase, cycle])

  const moveToNextPhase = () => {
    const phases = Object.keys(exercise.pattern)
    const currentIndex = phases.indexOf(phase)
    const nextIndex = (currentIndex + 1) % phases.length
    
    if (nextIndex === 0) {
      // Completed a full cycle
      if (cycle >= exercise.cycles) {
        setIsRunning(false)
        onComplete()
        return
      }
      setCycle(cycle + 1)
    }
    
    setPhase(phases[nextIndex])
  }

  const getNextPhaseDuration = () => {
    const phases = Object.keys(exercise.pattern)
    const currentIndex = phases.indexOf(phase)
    const nextIndex = (currentIndex + 1) % phases.length
    return exercise.pattern[phases[nextIndex]]
  }

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In'
      case 'hold': return 'Hold'
      case 'exhale': return 'Breathe Out'
      case 'rest': return 'Rest'
      default: return ''
    }
  }

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'text-blue-600'
      case 'hold': return 'text-yellow-600'
      case 'exhale': return 'text-green-600'
      case 'rest': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {exercise.name}
        </h3>
        
        <div className="mb-8">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Cycle {cycle} of {exercise.cycles}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(cycle / exercise.cycles) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <div className={`text-6xl font-bold mb-4 ${getPhaseColor()}`}>
            {timeLeft}
          </div>
          <div className={`text-2xl font-semibold ${getPhaseColor()}`}>
            {getPhaseInstruction()}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {!isRunning ? (
            <button
              onClick={() => setIsRunning(true)}
              className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Play className="h-5 w-5 mr-2" />
              Start
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="flex items-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
            >
              <Pause className="h-5 w-5 mr-2" />
              Pause
            </button>
          )}
          
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

// Meditation History Component
const MeditationHistory = ({ history }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'guided': return <Brain className="h-4 w-4" />
      case 'timer': return <Clock className="h-4 w-4" />
      case 'breathing': return <Heart className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div>
      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((session) => (
            <div key={session._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    {getTypeIcon(session.type)}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {session.type.charAt(0).toUpperCase() + session.type.slice(1)} Session
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(session.sessionDate)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {session.completedDuration} min
                  </div>
                  {session.completed && (
                    <div className="text-sm text-green-600 dark:text-green-400">
                      Completed
                    </div>
                  )}
                </div>
              </div>
              
              {session.mood && (session.mood.before || session.mood.after) && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-6 text-sm">
                    {session.mood.before && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Mood before: </span>
                        <span className="font-medium">{session.mood.before}/10</span>
                      </div>
                    )}
                    {session.mood.after && (
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Mood after: </span>
                        <span className="font-medium">{session.mood.after}/10</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No meditation history yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start your first meditation session to see your progress here.
          </p>
        </div>
      )}
    </div>
  )
}

export default Meditation
