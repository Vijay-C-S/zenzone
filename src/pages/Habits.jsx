import React, { useState, useEffect } from 'react'
import { Plus, Calendar, TrendingUp, CheckCircle, Clock, Flame, Edit, Trash2, Eye, Activity } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'
import API_BASE_URL from '../config/api'

const Habits = () => {
  const [habits, setHabits] = useState([])
  const [entries, setEntries] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedHabit, setSelectedHabit] = useState(null)
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('today')
  const { user } = useAuthStore()

  useEffect(() => {
    fetchHabits()
    fetchStats()
  }, [])

  useEffect(() => {
    if (habits.length > 0) {
      fetchEntries()
    }
  }, [selectedDate, habits])

  const fetchHabits = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/habits`, {
        credentials: 'include'
      })
      const data = await response.json()
      console.log('Fetched habits:', data.habits) // Debug log
      console.log('Full response:', data) // Debug log
      setHabits(data.habits || [])
    } catch (error) {
      console.error('Error fetching habits:', error)
      toast.error('Failed to fetch habits')
    } finally {
      setLoading(false)
    }
  }

  const fetchEntries = async () => {
    try {
      const startDate = selectedDate
      const endDate = selectedDate
      const response = await fetch(`${API_BASE_URL}/api/habits/entries?startDate=${startDate}&endDate=${endDate}`, {
        credentials: 'include'
      })
      const data = await response.json()
      setEntries(data.entries)
    } catch (error) {
      console.error('Error fetching entries:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/habits/stats`, {
        credentials: 'include'
      })
      const data = await response.json()
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const toggleHabitCompletion = async (habitId, completed, count = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/habits/entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          habitId,
          date: selectedDate,
          completed,
          count
        })
      })

      if (response.ok) {
        fetchEntries()
        fetchStats()
        fetchHabits() // To update streaks
        toast.success(completed ? 'Habit completed!' : 'Habit unchecked')
      }
    } catch (error) {
      console.error('Error updating habit:', error)
      toast.error('Failed to update habit')
    }
  }

  const deleteHabit = async (habitId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/habits/${habitId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (response.ok) {
        setHabits(habits.filter(habit => habit._id !== habitId))
        fetchStats() // Refresh stats
        toast.success('Habit deleted successfully')
      } else {
        throw new Error('Failed to delete habit')
      }
    } catch (error) {
      console.error('Error deleting habit:', error)
      toast.error('Failed to delete habit')
    } finally {
      setShowDeleteModal(false)
      setSelectedHabit(null)
    }
  }

  const toggleHabitStatus = async (habitId, isActive) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/habits/${habitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ isActive })
      })

      if (response.ok) {
        setHabits(habits.map(habit => 
          habit._id === habitId ? { ...habit, isActive } : habit
        ))
        fetchStats()
        toast.success(isActive ? 'Habit activated' : 'Habit paused')
      } else {
        throw new Error('Failed to update habit status')
      }
    } catch (error) {
      console.error('Error updating habit status:', error)
      toast.error('Failed to update habit status')
    }
  }

  const getEntryForHabit = (habitId) => {
    return entries.find(entry => entry.habit._id === habitId)
  }

  const getCategoryIcon = (category) => {
    const icons = {
      health: '🏥',
      fitness: '💪',
      mental_wellness: '🧘',
      productivity: '📈',
      social: '👥',
      learning: '📚',
      creativity: '🎨',
      other: '⭐'
    }
    return icons[category] || '⭐'
  }

  const generateCalendarDays = () => {
    const today = new Date()
    const days = []
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      days.push(date)
    }
    
    return days
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
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <CheckCircle className="h-8 w-8 text-zen-600 mr-3" />
                Habit Tracker
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Build positive habits and track your consistency over time.
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-zen-600 hover:bg-zen-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors shadow-md hover:shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Habit
            </button>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Habits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHabits || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedThisWeek || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Best Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.longestStreak || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completionRate || 0}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'today', label: 'Today', icon: <Calendar className="h-4 w-4" /> },
                { id: 'overview', label: 'All Habits', icon: <Eye className="h-4 w-4" /> }
              ].map((tab) => (
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
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'today' && (
          <>
            {/* Date Selector */}
            <div className="mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Date Selection</h3>
                <div className="flex space-x-2 overflow-x-auto">
                  {generateCalendarDays().map((date) => {
                    const dateStr = date.toISOString().split('T')[0]
                    const isSelected = dateStr === selectedDate
                    const isToday = dateStr === new Date().toISOString().split('T')[0]
                    
                    return (
                      <button
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`flex-shrink-0 p-3 rounded-lg text-center min-w-[80px] transition-colors ${
                          isSelected
                            ? 'bg-zen-600 text-white'
                            : isToday
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <div className="text-xs font-medium">
                          {date.toLocaleDateString('en', { weekday: 'short' })}
                        </div>
                        <div className="text-lg font-bold">
                          {date.getDate()}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Habits List for Selected Date */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Habits for {new Date(selectedDate).toLocaleDateString('en', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>

              {habits.map((habit) => {
                const entry = getEntryForHabit(habit._id)
                const isCompleted = entry?.completed || false
                const count = entry?.count || 0

                return (
                  <div key={habit._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <button
                            onClick={() => toggleHabitCompletion(habit._id, !isCompleted, habit.targetCount)}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                              isCompleted
                                ? 'bg-zen-600 border-zen-600 text-white'
                                : 'border-gray-300 dark:border-gray-600 hover:border-zen-500'
                            }`}
                          >
                            {isCompleted && <CheckCircle className="h-5 w-5" />}
                          </button>

                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{habit.icon || getCategoryIcon(habit.category)}</span>
                              <div>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                  {habit.name}
                                </h4>
                                {habit.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {habit.description}
                                  </p>
                                )}
                                <div className="flex items-center space-x-4 mt-1">
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Target: {habit.targetCount} {habit.unit}
                                  </span>
                                  {habit.streak && habit.streak.current > 0 && (
                                    <div className="flex items-center space-x-1">
                                      <Flame className="h-4 w-4 text-orange-500" />
                                      <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                                        {habit.streak.current} day streak
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          {/* Progress for the day */}
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {count} / {habit.targetCount}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {habit.unit}
                            </div>
                          </div>

                          {/* Completion badge */}
                          {isCompleted && (
                            <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-xs font-medium">Done</span>
                            </div>
                          )}
                          
                          {/* Action buttons */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleHabitStatus(habit._id, !habit.isActive)}
                              className={`p-2 rounded-full transition-colors ${
                                habit.isActive 
                                  ? 'text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900' 
                                  : 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900'
                              }`}
                              title={habit.isActive ? 'Pause habit' : 'Activate habit'}
                            >
                              {habit.isActive ? <Clock className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                            </button>
                            
                            <button
                              onClick={() => {
                                setSelectedHabit(habit)
                                setShowEditModal(true)
                              }}
                              className="p-2 rounded-full text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                              title="Edit habit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            
                            <button
                              onClick={() => {
                                setSelectedHabit(habit)
                                setShowDeleteModal(true)
                              }}
                              className="p-2 rounded-full text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                              title="Delete habit"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Progress bar for targetCount > 1 */}
                      {habit.targetCount > 1 && (
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-zen-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((count / habit.targetCount) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">All Your Habits</h3>
            
            {/* Debug info */}
            {process.env.NODE_ENV === 'development' && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Debug: Found {habits.length} habits
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {habits.map((habit) => (
                <div key={habit._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{habit.icon || getCategoryIcon(habit.category)}</span>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          {habit.name}
                        </h4>
                        {habit.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {habit.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      habit.category === 'health' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      habit.category === 'fitness' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                      habit.category === 'mental_wellness' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    }`}>
                      {(habit.category || 'other').replace('_', ' ')}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Frequency:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{habit.frequency || 'daily'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Target:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{habit.targetCount || 1} {habit.unit || 'times'}</span>
                    </div>
                    {habit.streak ? (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Current Streak:</span>
                          <span className="font-medium text-orange-600 dark:text-orange-400">
                            {habit.streak.current || 0} days
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Best Streak:</span>
                          <span className="font-medium text-orange-600 dark:text-orange-400">
                            {habit.streak.longest || 0} days
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Streak:</span>
                        <span className="font-medium text-gray-500 dark:text-gray-400">
                          Not started
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center text-sm mb-3">
                      <span className="text-gray-600 dark:text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        (habit.isActive !== false)
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                      }`}>
                        {(habit.isActive !== false) ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => toggleHabitStatus(habit._id, !habit.isActive)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          habit.isActive 
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-800' 
                            : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800'
                        }`}
                      >
                        {habit.isActive ? 'Pause' : 'Activate'}
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedHabit(habit)
                          setShowEditModal(true)
                        }}
                        className="p-2 rounded-md text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                        title="Edit habit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedHabit(habit)
                          setShowDeleteModal(true)
                        }}
                        className="p-2 rounded-md text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                        title="Delete habit"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Empty State */}
        {habits.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Start building healthy habits</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Create your first habit and begin your journey toward a more consistent and fulfilling routine.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-zen-600 hover:bg-zen-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Create Your First Habit
            </button>
          </div>
        )}
      </div>

      {/* Create Habit Modal */}
      {showCreateModal && (
        <CreateHabitModal 
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchHabits()
            fetchStats()
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedHabit && (
        <DeleteHabitModal
          habit={selectedHabit}
          onClose={() => {
            setShowDeleteModal(false)
            setSelectedHabit(null)
          }}
          onConfirm={() => deleteHabit(selectedHabit._id)}
        />
      )}

      {/* Edit Habit Modal */}
      {showEditModal && selectedHabit && (
        <EditHabitModal
          habit={selectedHabit}
          onClose={() => {
            setShowEditModal(false)
            setSelectedHabit(null)
          }}
          onSuccess={() => {
            setShowEditModal(false)
            setSelectedHabit(null)
            fetchHabits()
            fetchStats()
          }}
        />
      )}
    </div>
  )
}

// Create Habit Modal Component
const CreateHabitModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'health',
    frequency: 'daily',
    targetCount: 1,
    unit: 'times',
    icon: '⭐'
  })
  const [loading, setLoading] = useState(false)

  const habitIcons = ['⭐', '💪', '🧘', '📚', '💧', '🏃', '🍎', '😴', '📝', '🎯', '🌱', '❤️']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Habit created successfully!')
        onSuccess()
      } else {
        const data = await response.json()
        toast.error(data.message || 'Failed to create habit')
      }
    } catch (error) {
      console.error('Error creating habit:', error)
      toast.error('Failed to create habit')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Habit</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Habit Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Drink 8 glasses of water"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-zen-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="2"
                placeholder="Brief description of your habit"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-zen-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-zen-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="health">Health</option>
                  <option value="fitness">Fitness</option>
                  <option value="mental_wellness">Mental Wellness</option>
                  <option value="productivity">Productivity</option>
                  <option value="social">Social</option>
                  <option value="learning">Learning</option>
                  <option value="creativity">Creativity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frequency
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-zen-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Count
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.targetCount}
                  onChange={(e) => setFormData({ ...formData, targetCount: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-zen-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Unit
                </label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="e.g., times, minutes, pages"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-zen-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose an Icon
              </label>
              <div className="grid grid-cols-6 gap-2">
                {habitIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`p-3 text-2xl border rounded-lg transition-colors ${
                      formData.icon === icon
                        ? 'border-zen-500 bg-zen-50 dark:bg-zen-900'
                        : 'border-gray-300 dark:border-gray-600 hover:border-zen-400'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
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
                className="px-6 py-2 bg-zen-600 hover:bg-zen-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Habit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Delete Habit Modal Component
const DeleteHabitModal = ({ habit, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Delete Habit
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Are you sure you want to delete <strong>"{habit.name}"</strong>? 
            This will permanently remove the habit and all associated progress data.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
          >
            Delete Habit
          </button>
        </div>
      </div>
    </div>
  )
}

// Edit Habit Modal Component
const EditHabitModal = ({ habit, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: habit.name || '',
    description: habit.description || '',
    category: habit.category || 'health',
    frequency: habit.frequency || 'daily',
    targetCount: habit.targetCount || 1,
    unit: habit.unit || 'times',
    icon: habit.icon || '⭐',
    isActive: habit.isActive !== false
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/habits/${habit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success('Habit updated successfully!')
        onSuccess()
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Failed to update habit')
      }
    } catch (error) {
      console.error('Error updating habit:', error)
      toast.error('Failed to update habit')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Habit</h2>
          </div>

          <div className="px-6 py-4 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Habit Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zen-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Drink 8 glasses of water"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zen-500 dark:bg-gray-700 dark:text-white"
                rows="3"
                placeholder="Optional description..."
              />
            </div>

            {/* Category and Frequency */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zen-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="health">🏥 Health</option>
                  <option value="fitness">💪 Fitness</option>
                  <option value="mental_wellness">🧘 Mental Wellness</option>
                  <option value="productivity">📈 Productivity</option>
                  <option value="social">👥 Social</option>
                  <option value="learning">📚 Learning</option>
                  <option value="creativity">🎨 Creativity</option>
                  <option value="other">⭐ Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Frequency
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zen-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            {/* Target and Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target Count
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.targetCount}
                  onChange={(e) => setFormData({ ...formData, targetCount: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zen-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zen-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., times, glasses, minutes"
                />
              </div>
            </div>

            {/* Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Icon (Emoji)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zen-500 dark:bg-gray-700 dark:text-white"
                placeholder="Choose an emoji"
              />
            </div>

            {/* Status */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-zen-600 focus:ring-zen-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Keep habit active
              </label>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-zen-600 hover:bg-zen-700 disabled:opacity-50 rounded-md transition-colors"
            >
              {loading ? 'Updating...' : 'Update Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Habits
