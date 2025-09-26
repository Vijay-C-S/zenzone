import React from 'react'
import { Users, MessageSquare, BookOpen, TrendingUp, BarChart3, Settings } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const AdminDashboard = () => {
  const [stats, setStats] = React.useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalSessions: 3456,
    avgSessionTime: '12m 34s'
  })

  const [engagementData, setEngagementData] = React.useState([])
  const [featureUsage, setFeatureUsage] = React.useState([])

  React.useEffect(() => {
    // Generate sample engagement data
    const generateEngagementData = () => {
      const data = []
      for (let i = 6; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          users: Math.floor(Math.random() * 200) + 600,
          sessions: Math.floor(Math.random() * 500) + 800
        })
      }
      return data
    }

    // Generate sample feature usage data
    const generateFeatureUsage = () => [
      { feature: 'Mood Tracker', usage: 85 },
      { feature: 'Journal', usage: 72 },
      { feature: 'Chatbot', usage: 68 },
      { feature: 'Assessments', usage: 45 },
      { feature: 'Wellness Library', usage: 38 }
    ]

    setEngagementData(generateEngagementData())
    setFeatureUsage(generateFeatureUsage())
  }, [])

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-zen-100 dark:bg-zen-900 text-zen-600 dark:text-zen-400',
      change: '+12%'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      icon: TrendingUp,
      color: 'bg-calm-100 dark:bg-calm-900 text-calm-600 dark:text-calm-400',
      change: '+8%'
    },
    {
      title: 'Total Sessions',
      value: stats.totalSessions.toLocaleString(),
      icon: BarChart3,
      color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
      change: '+15%'
    },
    {
      title: 'Avg Session Time',
      value: stats.avgSessionTime,
      icon: MessageSquare,
      color: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
      change: '+3%'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Monitor user engagement and manage platform content.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={stat.title} className="card hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-zen-600 dark:text-zen-400 mt-1">
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Engagement Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            User Engagement (Last 7 Days)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis 
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
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Active Users"
                />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  name="Sessions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Usage */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Feature Usage
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureUsage} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  type="number"
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis 
                  type="category"
                  dataKey="feature"
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  width={100}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="usage" 
                  fill="#22c55e"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Content Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wellness Resources */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-zen-600 dark:text-zen-400" />
              <span>Wellness Resources</span>
            </h3>
            <button className="btn-primary text-sm">
              Add Resource
            </button>
          </div>
          
          <div className="space-y-3">
            {[
              { title: 'Understanding Anxiety', type: 'Article', status: 'Published' },
              { title: 'Meditation Guide', type: 'Video', status: 'Draft' },
              { title: 'Sleep Hygiene Tips', type: 'Article', status: 'Published' },
              { title: 'Breathing Exercises', type: 'Video', status: 'Review' }
            ].map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {resource.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {resource.type}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  resource.status === 'Published' 
                    ? 'bg-zen-100 text-zen-700 dark:bg-zen-900 dark:text-zen-300'
                    : resource.status === 'Draft'
                    ? 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                    : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                }`}>
                  {resource.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Settings */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Settings className="h-5 w-5 text-zen-600 dark:text-zen-400" />
            <span>System Settings</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  User Registration
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Allow new users to register
                </p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-zen-600 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Maintenance Mode
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Enable maintenance mode
                </p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Analytics Tracking
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Collect usage analytics
                </p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-zen-600 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard