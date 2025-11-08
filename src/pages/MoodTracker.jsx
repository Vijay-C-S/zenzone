import React from 'react'
import { Calendar, TrendingUp, Smile, Meh, Frown } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isFuture, startOfDay } from 'date-fns'
import toast from 'react-hot-toast'
import API_BASE_URL from '../config/api'

const MoodTracker = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [moodEntries, setMoodEntries] = React.useState({})
  const [currentMood, setCurrentMood] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const moods = [
    { value: 1, label: 'Very Sad', emoji: '😢', color: 'bg-red-500' },
    { value: 2, label: 'Sad', emoji: '😞', color: 'bg-orange-500' },
    { value: 3, label: 'Neutral', emoji: '😐', color: 'bg-yellow-500' },
    { value: 4, label: 'Happy', emoji: '😊', color: 'bg-green-500' },
    { value: 5, label: 'Very Happy', emoji: '😄', color: 'bg-zen-500' }
  ]

  React.useEffect(() => {
    fetchMoodEntries()
  }, [])

  const fetchMoodEntries = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/mood`, {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        // Convert entries array to date-keyed object
        const entriesMap = {}
        data.entries.forEach(entry => {
          const dateKey = format(new Date(entry.date), 'yyyy-MM-dd')
          entriesMap[dateKey] = {
            mood: entry.mood,
            note: entry.note || '',
            timestamp: entry.date
          }
        })
        setMoodEntries(entriesMap)
      } else {
        console.error('Failed to fetch mood entries')
        toast.error('Failed to load mood entries')
      }
    } catch (error) {
      console.error('Error fetching mood entries:', error)
      toast.error('Error loading mood entries')
    } finally {
      setIsLoading(false)
    }
  }

  const saveMoodEntry = async (moodValue, note = '') => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/mood`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          mood: moodValue,
          note,
          date: selectedDate.toISOString()
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Update local state
        const dateKey = format(selectedDate, 'yyyy-MM-dd')
        const newEntries = {
          ...moodEntries,
          [dateKey]: {
            mood: moodValue,
            note,
            timestamp: new Date().toISOString()
          }
        }
        setMoodEntries(newEntries)
        setCurrentMood(moodValue)
        toast.success('Mood logged successfully!')
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Failed to save mood entry')
      }
    } catch (error) {
      console.error('Error saving mood entry:', error)
      toast.error('Error saving mood entry')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMoodSelect = (moodValue) => {
    // Check if selected date is in the future
    if (isFuture(startOfDay(selectedDate))) {
      toast.error('Cannot log mood for future dates')
      return
    }
    saveMoodEntry(moodValue)
  }

  const getMoodForDate = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd')
    return moodEntries[dateKey]
  }

  const getMoodColor = (moodValue) => {
    const mood = moods.find(m => m.value === moodValue)
    return mood ? mood.color : 'bg-gray-200'
  }

  const getMoodEmoji = (moodValue) => {
    const mood = moods.find(m => m.value === moodValue)
    return mood ? mood.emoji : '❓'
  }

  const monthStart = startOfMonth(selectedDate)
  const monthEnd = endOfMonth(selectedDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const selectedDateMood = getMoodForDate(selectedDate)

  React.useEffect(() => {
    setCurrentMood(selectedDateMood?.mood || null)
  }, [selectedDate, selectedDateMood])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Mood Tracker
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your daily emotions and discover patterns in your mental wellness journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-zen-600 dark:text-zen-400" />
                <span>{format(selectedDate, 'MMMM yyyy')}</span>
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                  className="btn-secondary text-sm"
                >
                  Previous
                </button>
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                  className="btn-secondary text-sm"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-300 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {/* Calculate offset for first day of month */}
              {(() => {
                const firstDayOfWeek = monthDays[0].getDay();
                const blanks = [];
                for (let i = 0; i < firstDayOfWeek; i++) {
                  blanks.push(<div key={`blank-${i}`}></div>);
                }
                return [
                  ...blanks,
                  ...monthDays.map(day => {
                    const dayMood = getMoodForDate(day);
                    const isSelected = isSameDay(day, selectedDate);
                    const isTodayDate = isToday(day);
                    const isFutureDate = isFuture(startOfDay(day));
                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => !isFutureDate && setSelectedDate(day)}
                        disabled={isFutureDate}
                        className={
                          `relative h-12 w-full rounded-lg border-2 transition-all duration-200 ` +
                          (isFutureDate
                            ? 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 cursor-not-allowed opacity-50'
                            : 'hover:scale-105') +
                          (isSelected && !isFutureDate
                            ? ' border-zen-500 bg-zen-50 dark:bg-zen-900/20'
                            : !isFutureDate
                            ? ' border-gray-200 dark:border-gray-700 hover:border-zen-300 dark:hover:border-zen-600'
                            : '') +
                          (isTodayDate && !isFutureDate ? ' ring-2 ring-zen-400 ring-opacity-50' : '')
                        }
                      >
                        <span className={`text-sm ${
                          isFutureDate
                            ? 'text-gray-400 dark:text-gray-600'
                            : isSelected
                            ? 'font-semibold text-zen-700 dark:text-zen-300'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {format(day, 'd')}
                        </span>
                        {dayMood && !isFutureDate && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className={`w-2 h-2 rounded-full ${getMoodColor(dayMood.mood)}`}></div>
                          </div>
                        )}
                      </button>
                    );
                  })
                ];
              })()}
            </div>
          </div>
        </div>

        {/* Mood Selection */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              How are you feeling on {format(selectedDate, 'MMM d, yyyy')}?
            </h3>
            
            {isFuture(startOfDay(selectedDate)) ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔮</div>
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  Cannot log mood for future dates
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Please select today or a past date to track your mood
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {moods.map(mood => (
                  <button
                    key={mood.value}
                    onClick={() => handleMoodSelect(mood.value)}
                    className={`
                      w-full p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 text-left
                      ${currentMood === mood.value
                        ? 'border-zen-500 bg-zen-50 dark:bg-zen-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-zen-300 dark:hover:border-zen-600'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{mood.emoji}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{mood.label}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {selectedDateMood && !isFuture(startOfDay(selectedDate)) && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Logged: {format(new Date(selectedDateMood.timestamp), 'h:mm a')}
                </p>
              </div>
            )}
          </div>

          {/* Mood Legend */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-zen-600 dark:text-zen-400" />
              <span>Mood Legend</span>
            </h3>
            <div className="space-y-2">
              {moods.map(mood => (
                <div key={mood.value} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${mood.color}`}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{mood.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoodTracker