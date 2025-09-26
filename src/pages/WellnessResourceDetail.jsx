import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, User, Tag, BookOpen, Play, Headphones, Activity, Image, Wrench, FileCheck } from 'lucide-react'

const WellnessResourceDetail = () => {
  const { id } = useParams()
  const [resource, setResource] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchResource = async () => {
      setIsLoading(true)
      setError(null)
      try {
        console.log('Fetching resource with ID:', id)
        const response = await fetch(`/api/wellness/${id}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch resource. Status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Received resource data:', data)
        setResource(data)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchResource()
    }
  }, [id])

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Play className="h-5 w-5" />
      case 'audio': return <Headphones className="h-5 w-5" />
      case 'exercise': return <Activity className="h-5 w-5" />
      case 'infographic': return <Image className="h-5 w-5" />
      case 'toolkit': return <Wrench className="h-5 w-5" />
      case 'assessment': return <FileCheck className="h-5 w-5" />
      case 'article':
      default: return <BookOpen className="h-5 w-5" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
      case 'audio': return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
      case 'exercise': return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
      case 'infographic': return 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
      case 'toolkit': return 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
      case 'assessment': return 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
      case 'article':
      default: return 'bg-zen-100 dark:bg-zen-900 text-zen-600 dark:text-zen-400'
    }
  }

  const formatContent = (content) => {
    if (!content) return ''
    
    // Convert markdown-style formatting to HTML
    let formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">$1</h3>') // H3 headers
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">$1</h2>') // H2 headers
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">$1</h1>') // H1 headers
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>') // List items
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>') // Numbered list items
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 dark:text-gray-300">') // Paragraphs

    // Wrap in paragraph tags
    formattedContent = '<p class="mb-4 text-gray-700 dark:text-gray-300">' + formattedContent + '</p>'
    
    // Wrap lists
    formattedContent = formattedContent.replace(/(<li class="ml-4">.*?<\/li>)/gs, '<ul class="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">$1</ul>')
    
    return formattedContent
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/wellness"
          className="inline-flex items-center text-zen-600 hover:text-zen-700 dark:text-zen-400 dark:hover:text-zen-300 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Wellness Library
        </Link>
        
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error Loading Resource</h2>
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      </div>
    )
  }

  if (!resource) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/wellness"
          className="inline-flex items-center text-zen-600 hover:text-zen-700 dark:text-zen-400 dark:hover:text-zen-300 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Wellness Library
        </Link>
        
        <div className="text-center py-12">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Resource not found</h2>
          <p className="text-gray-600 dark:text-gray-300">The requested wellness resource could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/wellness"
        className="inline-flex items-center text-zen-600 hover:text-zen-700 dark:text-zen-400 dark:hover:text-zen-300 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Wellness Library
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(resource.type)}`}>
            {getTypeIcon(resource.type)}
            <span className="ml-2 capitalize">{resource.type}</span>
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <Tag className="h-4 w-4 mr-1" />
            <span className="capitalize">{resource.category}</span>
          </span>
          {resource.difficulty && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
              <span className="capitalize">{resource.difficulty}</span>
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {resource.title}
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {resource.description}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
          {resource.author && (
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{resource.author}</span>
            </div>
          )}
          {resource.duration && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{resource.duration}</span>
            </div>
          )}
          {resource.viewCount !== undefined && (
            <div className="flex items-center">
              <span>{resource.viewCount} views</span>
            </div>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {resource.imageUrl && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={resource.imageUrl} 
            alt={resource.title}
            className="w-full h-64 object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div 
          className="wellness-content"
          dangerouslySetInnerHTML={{ 
            __html: formatContent(resource.content) 
          }}
        />
      </div>

      {/* Tags */}
      {resource.tags && resource.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {resource.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <Link
            to="/wellness"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            More Resources
          </Link>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date(resource.updatedAt || resource.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WellnessResourceDetail
