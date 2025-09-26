import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, BookOpen, Play, ExternalLink, Loader2, AlertTriangle } from 'lucide-react'

const WellnessLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [resources, setResources] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, pages: 1 })

    const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'depression', label: 'Depression' },
    { value: 'stress', label: 'Stress Management' },
    { value: 'mindfulness', label: 'Mindfulness' },
    { value: 'sleep', label: 'Sleep' },
    { value: 'relationships', label: 'Relationships' }
  ]

  useEffect(() => {
  const fetchResources = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append('page', pagination.page)
      if (searchTerm) params.append('search', searchTerm)
      if (selectedCategory !== 'all') params.append('category', selectedCategory)

      console.log('Fetching wellness resources from:', `/api/wellness?${params.toString()}`)
      const response = await fetch(`/api/wellness?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch wellness resources. Status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Received data:', data)
      setResources(data.resources || [])
      setPagination(data.pagination || { currentPage: 1, totalPages: 1, total: 0 })
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err.message)
      // Add fallback resources for debugging
      setResources([
        {
          _id: 'fallback-1',
          title: 'Debug: Backend Connection Failed',
          description: 'This is a fallback resource to test the interface while debugging the backend connection.',
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
  }, [searchTerm, selectedCategory, pagination.page])

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.pages) {
      setPagination(prev => ({ ...prev, page: newPage }))
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Wellness Library
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore curated resources to support your mental health journey.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="input-field pl-10 pr-8 appearance-none bg-white dark:bg-gray-700"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-zen-600" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center py-20 text-center card bg-red-50 dark:bg-red-900/20">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">An Error Occurred</h3>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      ) : resources.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map(resource => (
              <div key={resource._id} className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={resource.imageUrl || 'https://via.placeholder.com/400x200'}
                    alt={resource.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                   <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTypeColor(resource.type)}`}>
                    {getTypeIcon(resource.type)}
                    <span className="capitalize">{resource.type}</span>
                  </div>
                </div>
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-zen-600 dark:group-hover:text-zen-400 transition-colors duration-200">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {resource.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{resource.duration}</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full capitalize">{resource.category}</span>
                  </div>
                </div>
                {resource.type === 'article' ? (
                  <Link
                    to={`/wellness/article/${resource._id}`}
                    className="mt-4 w-full btn-primary text-sm flex items-center justify-center space-x-2"
                  >
                    <span>Read More</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                ) : (
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-4 w-full btn-primary text-sm flex items-center justify-center space-x-2"
                  >
                    <span>Watch Now</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-12 flex justify-center items-center space-x-4">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="btn-secondary disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 dark:text-gray-300">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages}
              className="btn-secondary disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-20 card">
          <BookOpen className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No resources found</h3>
          <p className="text-gray-600 dark:text-gray-300">Make sure you have added resources to your database.</p>
        </div>
      )}
    </div>
  )
}

export default WellnessLibrary