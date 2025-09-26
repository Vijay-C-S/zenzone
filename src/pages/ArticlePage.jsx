import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Loader2, AlertTriangle } from 'lucide-react'

const ArticlePage = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/wellness/${id}`)
        if (!response.ok) {
          throw new Error('Article not found.')
        }
        const data = await response.json()
        setArticle(data.resource)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-zen-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center py-20 text-center card bg-red-50 dark:bg-red-900/20 max-w-2xl mx-auto">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">An Error Occurred</h3>
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/wellness" className="inline-flex items-center space-x-2 text-zen-600 dark:text-zen-400 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Wellness Library</span>
        </Link>
      </div>
      
      {/* This div will render the raw HTML from your database */}
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  )
}

export default ArticlePage