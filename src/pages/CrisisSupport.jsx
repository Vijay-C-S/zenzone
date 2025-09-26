import React, { useState, useEffect } from 'react'
import { Phone, MessageCircle, Globe, MapPin, Search, AlertTriangle, Heart, Clock } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

const CrisisSupport = () => {
  const [resources, setResources] = useState([])
  const [emergencyResources, setEmergencyResources] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const { token } = useAuthStore()

  useEffect(() => {
    fetchEmergencyResources()
    fetchResources()
  }, [selectedCategory])

  const fetchEmergencyResources = async () => {
    try {
      const response = await fetch('/api/crisis/emergency')
      const data = await response.json()
      setEmergencyResources(data.resources)
    } catch (error) {
      console.error('Error fetching emergency resources:', error)
    }
  }

  const fetchResources = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedCategory !== 'all') params.append('category', selectedCategory)
      
      const response = await fetch(`/api/crisis?${params}`)
      const data = await response.json()
      setResources(data.resources)
    } catch (error) {
      console.error('Error fetching resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchResources = async () => {
    if (!searchTerm.trim()) {
      fetchResources()
      return
    }

    try {
      const response = await fetch(`/api/crisis/search?q=${encodeURIComponent(searchTerm)}`)
      const data = await response.json()
      setResources(data.resources)
    } catch (error) {
      console.error('Error searching resources:', error)
      toast.error('Failed to search resources')
    }
  }

  const logResourceUsage = async (resourceId, actionType) => {
    if (!token) return

    try {
      await fetch('/api/crisis/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          resourceId,
          actionType
        })
      })
    } catch (error) {
      console.error('Error logging usage:', error)
    }
  }

  const handlePhoneCall = (phone, resourceId) => {
    logResourceUsage(resourceId, 'called')
    window.open(`tel:${phone}`, '_self')
  }

  const handleWebsiteVisit = (url, resourceId) => {
    logResourceUsage(resourceId, 'visited_website')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleTextMessage = (number, resourceId) => {
    logResourceUsage(resourceId, 'sent_text')
    window.open(`sms:${number}`, '_self')
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hotline': return <Phone className="h-5 w-5" />
      case 'chat': return <MessageCircle className="h-5 w-5" />
      case 'text': return <MessageCircle className="h-5 w-5" />
      case 'website': return <Globe className="h-5 w-5" />
      case 'location': return <MapPin className="h-5 w-5" />
      default: return <Heart className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      suicide_prevention: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      crisis_support: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      domestic_violence: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      substance_abuse: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      eating_disorders: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      lgbtq_support: 'bg-rainbow-100 text-rainbow-800 dark:bg-rainbow-900 dark:text-rainbow-300',
      veteran_support: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      youth_support: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      mental_health: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      emergency: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    }
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'suicide_prevention', name: 'Suicide Prevention' },
    { id: 'crisis_support', name: 'Crisis Support' },
    { id: 'domestic_violence', name: 'Domestic Violence' },
    { id: 'substance_abuse', name: 'Substance Abuse' },
    { id: 'eating_disorders', name: 'Eating Disorders' },
    { id: 'lgbtq_support', name: 'LGBTQ+ Support' },
    { id: 'veteran_support', name: 'Veteran Support' },
    { id: 'youth_support', name: 'Youth Support' },
    { id: 'mental_health', name: 'Mental Health' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
                  Crisis Support Resources
                </h2>
                <p className="text-red-800 dark:text-red-200">
                  If you're in immediate danger, please call 911 or go to your nearest emergency room.
                  These resources are available 24/7 for crisis support and intervention.
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Heart className="h-8 w-8 text-red-600 mr-3" />
            Crisis Support & Resources
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Immediate help and support resources for crisis situations and mental health emergencies.
          </p>
        </div>

        {/* Emergency Resources */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
            Emergency Resources (24/7)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyResources.map((resource) => (
              <div key={resource._id} className="bg-white dark:bg-gray-800 border-l-4 border-red-500 rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {resource.description}
                    </p>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                        {resource.category.replace('_', ' ')}
                      </span>
                      <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {resource.availability}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {resource.contact.phone && (
                    <button
                      onClick={() => handlePhoneCall(resource.contact.phone, resource._id)}
                      className="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call {resource.contact.phone}
                    </button>
                  )}
                  
                  {resource.contact.textNumber && (
                    <button
                      onClick={() => handleTextMessage(resource.contact.textNumber, resource._id)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Text {resource.contact.textNumber}
                    </button>
                  )}
                  
                  {resource.contact.website && (
                    <button
                      onClick={() => handleWebsiteVisit(resource.contact.website, resource._id)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchResources()}
                    placeholder="Search resources..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <button
                onClick={searchResources}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Search
              </button>
            </div>

            {/* Category Filter */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <div key={resource._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
                      {getTypeIcon(resource.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {resource.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                          {resource.category.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {resource.type}
                        </span>
                        {resource.isVerified && (
                          <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {resource.description}
                </p>

                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  {resource.availability === '24/7' ? '24/7 Available' : resource.hours || resource.availability}
                </div>

                {resource.languages && resource.languages.length > 0 && (
                  <div className="mb-4">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Languages: </span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {resource.languages.join(', ')}
                    </span>
                  </div>
                )}

                <div className="space-y-2">
                  {resource.contact.phone && (
                    <button
                      onClick={() => handlePhoneCall(resource.contact.phone, resource._id)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call {resource.contact.phone}
                    </button>
                  )}
                  
                  {resource.contact.textNumber && (
                    <button
                      onClick={() => handleTextMessage(resource.contact.textNumber, resource._id)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Text {resource.contact.textNumber}
                    </button>
                  )}
                  
                  {resource.contact.chatUrl && (
                    <button
                      onClick={() => handleWebsiteVisit(resource.contact.chatUrl, resource._id)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start Chat
                    </button>
                  )}
                  
                  {resource.contact.website && (
                    <button
                      onClick={() => handleWebsiteVisit(resource.contact.website, resource._id)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website
                    </button>
                  )}
                </div>

                {resource.contact.address && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {resource.contact.address}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {resources.length === 0 && !loading && (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}

        {/* Important Notice */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Important Information
              </h3>
              <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                <li>• These resources are provided for informational purposes only</li>
                <li>• If you're experiencing a medical emergency, call 911 immediately</li>
                <li>• For suicide prevention, call 988 (Suicide & Crisis Lifeline)</li>
                <li>• All resources listed are external services not affiliated with ZenZone</li>
                <li>• Contact information is verified but may change - please confirm before use</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrisisSupport
