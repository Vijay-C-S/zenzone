import React from 'react'

/**
 * Reusable Skeleton component for loading states
 * Provides visual feedback while content is loading
 */
export const Skeleton = ({ 
  className = '', 
  variant = 'default',
  width,
  height,
  count = 1
}) => {
  const baseClass = 'animate-pulse bg-gray-200 dark:bg-gray-700'
  
  const variants = {
    default: 'h-4 w-full rounded',
    text: 'h-4 w-3/4 rounded',
    title: 'h-8 w-1/2 rounded',
    card: 'h-64 w-full rounded-lg',
    circle: 'rounded-full w-12 h-12',
    avatar: 'rounded-full w-10 h-10',
    button: 'h-10 w-32 rounded-lg',
    input: 'h-10 w-full rounded-lg',
    badge: 'h-6 w-20 rounded-full',
    rectangle: 'w-full h-full rounded'
  }

  const variantClass = variants[variant] || variants.default
  
  const style = {}
  if (width) style.width = width
  if (height) style.height = height

  // Return multiple skeletons if count > 1
  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <div 
            key={index}
            className={`${baseClass} ${variantClass} ${className}`}
            style={style}
          />
        ))}
      </div>
    )
  }

  return (
    <div 
      className={`${baseClass} ${variantClass} ${className}`}
      style={style}
    />
  )
}

/**
 * Skeleton Card - Common card loading pattern
 */
export const SkeletonCard = ({ hasImage = false, lines = 3 }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
    {hasImage && <Skeleton variant="card" className="mb-4 h-48" />}
    <Skeleton variant="title" className="mb-4" />
    <Skeleton variant="text" count={lines} />
    <div className="flex items-center justify-between mt-4">
      <Skeleton variant="badge" />
      <Skeleton variant="button" className="w-24" />
    </div>
  </div>
)

/**
 * Skeleton Table Row - For list/table loading
 */
export const SkeletonTableRow = () => (
  <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center space-x-3 flex-1">
      <Skeleton variant="avatar" />
      <div className="flex-1">
        <Skeleton variant="text" className="w-1/3 mb-2" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
    </div>
    <Skeleton variant="button" className="w-20" />
  </div>
)

/**
 * Skeleton Stats Card - For dashboard statistics
 */
export const SkeletonStats = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <Skeleton variant="circle" className="w-12 h-12" />
      <Skeleton variant="badge" />
    </div>
    <Skeleton variant="title" className="mb-2" />
    <Skeleton variant="text" className="w-1/2" />
  </div>
)

/**
 * Skeleton Chart - For data visualization loading
 */
export const SkeletonChart = ({ height = 'h-64' }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <Skeleton variant="title" className="mb-6" />
    <div className={`relative ${height} w-full`}>
      {/* Vertical bars simulation */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 h-full">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton 
            key={i}
            className="w-12" 
            height={`${30 + Math.random() * 70}%`}
          />
        ))}
      </div>
    </div>
    <div className="flex justify-between mt-4">
      <Skeleton variant="text" className="w-16" />
      <Skeleton variant="text" className="w-16" />
      <Skeleton variant="text" className="w-16" />
      <Skeleton variant="text" className="w-16" />
    </div>
  </div>
)

/**
 * Skeleton List - For journal entries, goals, habits
 */
export const SkeletonList = ({ items = 5 }) => (
  <div className="space-y-4">
    {Array.from({ length: items }).map((_, index) => (
      <div 
        key={index}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <Skeleton variant="text" className="w-1/4" />
          <Skeleton variant="badge" />
        </div>
        <Skeleton variant="text" count={2} />
      </div>
    ))}
  </div>
)

/**
 * Skeleton Profile - For user profile loading
 */
export const SkeletonProfile = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <div className="flex items-center space-x-4 mb-6">
      <Skeleton variant="circle" className="w-20 h-20" />
      <div className="flex-1">
        <Skeleton variant="title" className="mb-2" />
        <Skeleton variant="text" className="w-2/3" />
      </div>
    </div>
    <div className="space-y-3">
      <Skeleton variant="input" />
      <Skeleton variant="input" />
      <Skeleton variant="input" />
    </div>
  </div>
)

export default Skeleton
