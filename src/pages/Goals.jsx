import React, { useState, useEffect } from 'react'
import { Plus, Target, Calendar, CheckCircle, Clock, Filter, TrendingUp, Play, Pause, RotateCcw, Star, Trophy, Zap } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'
import API_BASE_URL from '../config/api'

const Goals = () => {
  const [goals, setGoals] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeTab, setActiveTab] = useState('active')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({})
  const { user } = useAuthStore()

  useEffect(() => {
    fetchGoals()
    fetchStats()
  }, [activeTab])

  const fetchGoals = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals?status=${activeTab}`, {
        credentials: 'include'
      })
      const data = await response.json()
      setGoals(data.goals)
    } catch (error) {
      console.error('Error fetching goals:', error)
      toast.error('Failed to fetch goals')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals/stats`, {
        credentials: 'include'
      })
      const data = await response.json()
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const updateGoalProgress = async (goalId, progress) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals/${goalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress }),
        credentials: 'include'
      })

      if (response.ok) {
        fetchGoals()
        fetchStats()
        if (progress === 100) {
          toast.success('🎉 Goal completed! Well done!')
        } else {
          toast.success('Progress updated!')
        }
      }
    } catch (error) {
      console.error('Error updating progress:', error)
      toast.error('Failed to update progress')
    }
  }

  const updateGoalStatus = async (goalId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals/${goalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
        credentials: 'include'
      })

      if (response.ok) {
        fetchGoals()
        fetchStats()
        const statusMessages = {
          active: 'Goal activated!',
          paused: 'Goal paused',
          completed: '🎉 Goal marked as completed!'
        }
        toast.success(statusMessages[status] || 'Goal status updated!')
      }
    } catch (error) {
      console.error('Error updating goal status:', error)
      toast.error('Failed to update goal status')
    }
  }

  const toggleMilestone = async (goalId, milestoneId, completed) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals/${goalId}/milestones/${milestoneId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
        credentials: 'include'
      })

      if (response.ok) {
        fetchGoals()
        fetchStats()
        toast.success(completed ? 'Milestone completed!' : 'Milestone unmarked')
      }
    } catch (error) {
      console.error('Error updating milestone:', error)
      toast.error('Failed to update milestone')
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getEmptyStateContent = (tab) => {
    const contents = {
      active: {
        icon: <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />,
        title: "No active goals",
        description: "Start your journey by creating your first goal and work towards achieving it.",
        actionText: "Create Your First Goal"
      },
      completed: {
        icon: <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />,
        title: "Complete your first goal",
        description: "Work on your active goals and celebrate when you reach 100% progress. Your completed goals will appear here.",
        actionText: "View Active Goals",
        actionOnClick: () => setActiveTab('active')
      },
      paused: {
        icon: <Pause className="h-16 w-16 text-gray-400 mx-auto mb-4" />,
        title: "No paused goals",
        description: "Sometimes it's okay to take a break. Goals you pause will appear here, ready to resume when you're ready.",
        actionText: "Create a Goal",
        actionOnClick: () => setShowCreateModal(true)
      }
    }
    return contents[tab] || contents.active
  }

  const tabs = [
    { id: 'active', label: 'Active', icon: <Zap className="h-4 w-4" />, count: stats.active || 0 },
    { id: 'completed', label: 'Completed', icon: <Trophy className="h-4 w-4" />, count: stats.completed || 0 },
    { id: 'paused', label: 'Paused', icon: <Pause className="h-4 w-4" />, count: stats.paused || 0 }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zen-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <Target className="h-8 w-8 text-zen-600 mr-3" />
                Goals & Aspirations
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Set meaningful goals and track your progress toward achieving them.
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-zen-600 hover:bg-zen-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors shadow-md hover:shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Goal
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Goals</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-zen-100 dark:bg-zen-900 rounded-lg">
                <Zap className="h-6 w-6 text-zen-600 dark:text-zen-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageProgress || 0}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-zen-500 text-zen-600 dark:text-zen-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activeTab === tab.id
                        ? 'bg-zen-100 text-zen-800 dark:bg-zen-900 dark:text-zen-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <div key={goal._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      {goal.status === 'completed' && <Trophy className="h-5 w-5 text-yellow-500 mr-2" />}
                      {goal.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {goal.description}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                      {goal.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                      {goal.status}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                    <span className={`text-sm font-semibold ${goal.progress === 100 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        goal.progress === 100 ? 'bg-green-500' : 'bg-zen-600'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  {goal.progress === 100 && goal.status !== 'completed' && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                      🎉 Ready to be completed!
                    </p>
                  )}
                </div>

                {/* Target Date */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  Target: {new Date(goal.targetDate).toLocaleDateString()}
                  {new Date(goal.targetDate) < new Date() && goal.status === 'active' && (
                    <span className="ml-2 text-red-500 font-medium">Overdue</span>
                  )}
                  {goal.status === 'completed' && goal.completedAt && (
                    <span className="ml-2 text-green-500 font-medium">
                      Completed: {new Date(goal.completedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Milestones */}
                {goal.milestones && goal.milestones.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Milestones</h4>
                    <div className="space-y-1">
                      {goal.milestones.map((milestone) => (
                        <div key={milestone._id} className="flex items-center">
                          <button
                            onClick={() => toggleMilestone(goal._id, milestone._id, !milestone.completed)}
                            disabled={goal.status === 'completed'}
                            className={`h-4 w-4 rounded border-2 mr-3 flex-shrink-0 flex items-center justify-center transition-colors ${
                              milestone.completed
                                ? 'bg-zen-600 border-zen-600'
                                : 'border-gray-300 dark:border-gray-600 hover:border-zen-400'
                            } ${goal.status === 'completed' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            {milestone.completed && (
                              <CheckCircle className="h-3 w-3 text-white" />
                            )}
                          </button>
                          <span className={`text-sm ${
                            milestone.completed
                              ? 'text-gray-500 dark:text-gray-400 line-through'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {milestone.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {goal.status === 'active' && (
                    <>
                      <button
                        onClick={() => updateGoalStatus(goal._id, 'paused')}
                        className="flex items-center px-3 py-1.5 text-xs bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                      >
                        <Pause className="h-3 w-3 mr-1" />
                        Pause
                      </button>
                      {goal.progress === 100 && (
                        <button
                          onClick={() => updateGoalStatus(goal._id, 'completed')}
                          className="flex items-center px-3 py-1.5 text-xs bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Trophy className="h-3 w-3 mr-1" />
                          Mark Complete
                        </button>
                      )}
                    </>
                  )}
                  
                  {goal.status === 'paused' && (
                    <button
                      onClick={() => updateGoalStatus(goal._id, 'active')}
                      className="flex items-center px-3 py-1.5 text-xs bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Resume
                    </button>
                  )}

                  {goal.status === 'completed' && (
                    <button
                      onClick={() => updateGoalStatus(goal._id, 'active')}
                      className="flex items-center px-3 py-1.5 text-xs bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Reopen
                    </button>
                  )}
                </div>

                {/* Progress Update for Active Goals */}
                {goal.status === 'active' && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Update Progress:
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={goal.progress}
                        onChange={(e) => updateGoalProgress(goal._id, parseInt(e.target.value))}
                        className="flex-1 accent-zen-600"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {goals.length === 0 && (
          <div className="text-center py-12">
            {getEmptyStateContent(activeTab).icon}
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {getEmptyStateContent(activeTab).title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {getEmptyStateContent(activeTab).description}
            </p>
            <button
              onClick={getEmptyStateContent(activeTab).actionOnClick || (() => setShowCreateModal(true))}
              className="bg-zen-600 hover:bg-zen-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              {getEmptyStateContent(activeTab).actionText}
            </button>
          </div>
        )}
      </div>

      {/* Create Goal Modal would go here */}
      {showCreateModal && (
        <CreateGoalModal 
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchGoals()
            fetchStats()
          }}
        />
      )}
    </div>
  )
}

// Create Goal Modal Component
const CreateGoalModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'personal',
    priority: 'medium',
    targetDate: '',
    milestones: []
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      })

      if (response.ok) {
        toast.success('Goal created successfully!')
        onSuccess()
      } else {
        const data = await response.json()
        toast.error(data.message || 'Failed to create goal')
      }
    } catch (error) {
      console.error('Error creating goal:', error)
      toast.error('Failed to create goal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Goal</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Goal Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="mental_health">Mental Health</option>
                  <option value="physical_health">Physical Health</option>
                  <option value="social">Social</option>
                  <option value="career">Career</option>
                  <option value="personal">Personal</option>
                  <option value="spiritual">Spiritual</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Date
              </label>
              <input
                type="date"
                value={formData.targetDate}
                onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Goal'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Goals
