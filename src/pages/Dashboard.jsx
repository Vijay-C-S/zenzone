import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, BookOpen, MessageCircle, ClipboardList, TrendingUp, Calendar } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, subDays } from 'date-fns'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [quote, setQuote] = React.useState('')
  const [moodData, setMoodData] = React.useState([])
  const [recentActivities, setRecentActivities] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Set daily quote
    const quotes = [
      "Every day is a new beginning. Take a deep breath and start again.",
      "You are stronger than you think and more capable than you imagine.",
      "Progress, not perfection, is the goal.",
      "Your mental health is just as important as your physical health.",
      "It's okay to not be okay. What matters is that you're trying."
    ]
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])

    // Fetch user-specific data
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      await Promise.all([
        fetchMoodData(),
        fetchRecentActivities()
      ])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Error loading dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMoodData = async () => {
    try {
      // Fetch last 7 days of mood data
      const startDate = subDays(new Date(), 6)
      const response = await fetch(`/api/mood?startDate=${startDate.toISOString()}&limit=30`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        
        // Create array for last 7 days
        const chartData = []
        for (let i = 6; i >= 0; i--) {
          const date = subDays(new Date(), i)
          const dateKey = format(date, 'yyyy-MM-dd')
          
          // Find mood entry for this date
          const moodEntry = data.entries.find(entry => 
            format(new Date(entry.date), 'yyyy-MM-dd') === dateKey
          )
          
          chartData.push({
            date: format(date, 'MMM dd'),
            mood: moodEntry ? moodEntry.mood : null,
            fullDate: dateKey
          })
        }
        
        setMoodData(chartData)
      } else {
        console.error('Failed to fetch mood data')
      }
    } catch (error) {
      console.error('Error fetching mood data:', error)
    }
  }

  const fetchRecentActivities = async () => {
    try {
      const activities = []
      
      // Fetch recent mood entries
      const moodResponse = await fetch('/api/mood?limit=3', {
        credentials: 'include'
      })
      if (moodResponse.ok) {
        const moodData = await moodResponse.json()
        moodData.entries.forEach(entry => {
          activities.push({
            type: 'mood',
            icon: Heart,
            title: 'Mood logged',
            subtitle: `Mood: ${getMoodEmoji(entry.mood)}`,
            time: entry.date,
            color: 'text-zen-600 dark:text-zen-400'
          })
        })
      }

      // Fetch recent journal entries
      const journalResponse = await fetch('/api/journal?limit=3', {
        credentials: 'include'
      })
      if (journalResponse.ok) {
        const journalData = await journalResponse.json()
        journalData.entries.forEach(entry => {
          activities.push({
            type: 'journal',
            icon: BookOpen,
            title: 'Journal entry created',
            subtitle: entry.title,
            time: entry.createdAt,
            color: 'text-calm-600 dark:text-calm-400'
          })
        })
      }

      // Sort activities by time (most recent first)
      activities.sort((a, b) => new Date(b.time) - new Date(a.time))
      
      setRecentActivities(activities.slice(0, 5)) // Show top 5 recent activities
    } catch (error) {
      console.error('Error fetching recent activities:', error)
    }
  }

  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      1: '😢',
      2: '😞', 
      3: '😐',
      4: '😊',
      5: '😄'
    }
    return moodEmojis[mood] || '❓'
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
    return format(date, 'MMM dd')
  }

  const quickActions = [
    {
      title: 'Track Mood',
      description: 'Log how you\'re feeling today',
      icon: Heart,
      link: '/mood',
      color: 'bg-zen-100 dark:bg-zen-900 text-zen-600 dark:text-zen-400'
    },
    {
      title: 'Journal',
      description: 'Write down your thoughts',
      icon: BookOpen,
      link: '/journal',
      color: 'bg-calm-100 dark:bg-calm-900 text-calm-600 dark:text-calm-400'
    },
    {
      title: 'Chat Support',
      description: 'Talk to our AI companion',
      icon: MessageCircle,
      link: '/chat',
      color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Assessment',
      description: 'Take a wellness quiz',
      icon: ClipboardList,
      link: '/assessment',
      color: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back to your wellness space
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          How are you feeling today? Let's check in with yourself.
        </p>
      </div>

      {/* Daily Quote */}
      <div className="card mb-8 bg-gradient-to-r from-zen-50 to-calm-50 dark:from-zen-900/20 dark:to-calm-900/20 border-zen-200 dark:border-zen-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-zen-200 dark:bg-zen-800 rounded-full">
            <TrendingUp className="h-6 w-6 text-zen-600 dark:text-zen-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Daily Inspiration</h3>
            <p className="text-gray-700 dark:text-gray-300 italic">"{quote}"</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.link}
                className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-zen-600 dark:group-hover:text-zen-400 transition-colors duration-200">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mood Chart */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="h-5 w-5 text-zen-600 dark:text-zen-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Weekly Mood Trend</h3>
          </div>
          
          {isLoading ? (
            <div className="h-48 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zen-600"></div>
            </div>
          ) : (
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    domain={[1, 5]}
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value) => [value ? `Mood: ${value}` : 'No data', '']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          
          <div className="mt-4 text-center">
            <Link 
              to="/mood" 
              className="text-sm text-zen-600 dark:text-zen-400 hover:text-zen-700 dark:hover:text-zen-300 font-medium"
            >
              View detailed mood history →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="card">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zen-600 mx-auto mb-2"></div>
              <span className="text-sm text-gray-500">Loading recent activity...</span>
            </div>
          ) : recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    {activity.subtitle && (
                      <p className="text-xs text-gray-700 dark:text-gray-200 mt-1">
                        {activity.subtitle}
                      </p>
                    )}
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      {formatTimeAgo(activity.time)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No recent activity
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start your wellness journey by tracking your mood or writing in your journal.
              </p>
              <div className="flex justify-center space-x-3">
                <Link to="/mood" className="btn-primary text-sm">
                  Track Mood
                </Link>
                <Link to="/journal" className="btn-secondary text-sm">
                  Write Journal
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard