import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, BookOpen, Play, ExternalLink, Loader2, AlertTriangle } from 'lucide-react'
import API_BASE_URL from '../config/api'

const WellnessLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [resources, setResources] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'depression', label: 'Depression' },
    { value: 'stress', label: 'Stress Management' },
    { value: 'mindfulness', label: 'Mindfulness' },
    { value: 'sleep', label: 'Sleep' },
    { value: 'relationships', label: 'Relationships' }
  ]

  const fetchResources = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append('page', currentPage)
      params.append('limit', 12)
      if (searchTerm) params.append('search', searchTerm)
      if (selectedCategory !== 'all') params.append('category', selectedCategory)

      console.log('Fetching wellness resources from:', `/api/wellness?${params.toString()}`)
      const response = await fetch(`${API_BASE_URL}/api/wellness?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch wellness resources. Status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Received data:', data)
      setResources(data.resources || [])
      setTotalPages(data.totalPages || 1)
      setTotal(data.total || 0)
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err.message)
      // Add fallback resources for debugging
      setResources([
        {
          _id: 'fallback-1',
          title: 'Debug: Backend Connection Issue',
          description: 'This is a fallback resource showing while we debug the backend connection. The backend server should be running on port 3001.',
          category: 'general',
          type: 'article',
          author: 'Debug Mode',
          duration: '1 min read'
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResources()
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm, selectedCategory, currentPage])

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const getTypeIcon = (type) => {
    if (type === 'video') return <Play className="h-5 w-5" />
    return <BookOpen className="h-5 w-5" />
  }

  const getTypeColor = (type) => {
    if (type === 'video') return 'bg-calm-100 dark:bg-calm-900 text-calm-600 dark:text-calm-400'
    return 'bg-zen-100 dark:bg-zen-900 text-zen-600 dark:text-zen-400'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Wellness Library</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover expert-curated resources for mental health and wellness
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-zen-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-zen-500 focus:border-transparent appearance-none min-w-48"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-zen-600" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">Loading resources...</span>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
            <p className="text-red-800 dark:text-red-200">
              Error: {error}
            </p>
          </div>
        </div>
      )}

      {/* Resources Grid */}
      {!isLoading && resources.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {resources.map((resource) => (
            <div key={resource._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {resource.imageUrl && (
                <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img 
                    src={resource.imageUrl} 
                    alt={resource.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                    {getTypeIcon(resource.type)}
                    <span className="ml-1 capitalize">{resource.type}</span>
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {resource.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {resource.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span>{resource.author}</span>
                  <span>{resource.duration}</span>
                </div>
                
                <Link
                  to={`/wellness/${resource._id}`}
                  className="w-full bg-zen-600 hover:bg-zen-700 text-white py-2 px-4 rounded-lg
                           transition-colors duration-200 flex items-center justify-center text-sm font-medium"
                >
                  Read More
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && resources.length === 0 && !error && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No resources found</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Make sure you have added resources to your database.'
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && resources.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg
                     hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
                     dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Previous
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg
                     hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
                     dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default WellnessLibrary
