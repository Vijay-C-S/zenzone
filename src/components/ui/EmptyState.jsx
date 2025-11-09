import React from 'react'
import { Plus } from 'lucide-react'

/**
 * Reusable EmptyState component
 * Displays when there's no data to show with optional CTA
 */
export const EmptyState = ({ 
  icon: Icon,
  title,
  description,
  action,
  actionLabel = 'Get Started',
  showAction = true,
  className = ''
}) => {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      {/* Icon */}
      {Icon && (
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <Icon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        {description}
      </p>

      {/* Action Button */}
      {showAction && action && (
        <button
          onClick={action}
          className="inline-flex items-center px-4 py-2 bg-zen-600 hover:bg-zen-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          {actionLabel}
        </button>
      )}
    </div>
  )
}

/**
 * Preset empty states for common scenarios
 */

// Journal Empty State
export const EmptyJournal = ({ onCreate }) => (
  <EmptyState
    icon={({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )}
    title="No journal entries yet"
    description="Start documenting your thoughts and feelings. Journaling can help you process emotions and track your mental health journey."
    action={onCreate}
    actionLabel="Write Your First Entry"
  />
)

// Goals Empty State
export const EmptyGoals = ({ onCreate }) => (
  <EmptyState
    icon={({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )}
    title="No goals set yet"
    description="Set meaningful goals to work towards improved mental health and wellbeing. Break them down into achievable steps."
    action={onCreate}
    actionLabel="Create Your First Goal"
  />
)

// Habits Empty State
export const EmptyHabits = ({ onCreate }) => (
  <EmptyState
    icon={({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )}
    title="No habits tracked yet"
    description="Build positive daily habits that support your mental wellness. Track your progress and stay motivated."
    action={onCreate}
    actionLabel="Add Your First Habit"
  />
)

// Mood Empty State
export const EmptyMood = ({ onLog }) => (
  <EmptyState
    icon={({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )}
    title="Start tracking your mood"
    description="Understanding your emotional patterns is the first step to better mental health. Log your mood daily."
    action={onLog}
    actionLabel="Log Today's Mood"
  />
)

// Meditation Empty State
export const EmptyMeditation = ({ onStart }) => (
  <EmptyState
    icon={({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )}
    title="Begin your meditation journey"
    description="Regular meditation can reduce stress, improve focus, and enhance emotional wellbeing. Start with just 5 minutes."
    action={onStart}
    actionLabel="Start First Session"
  />
)

// Search Results Empty State
export const EmptySearch = ({ searchTerm, onClear }) => (
  <EmptyState
    icon={({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )}
    title="No results found"
    description={searchTerm ? `No results for "${searchTerm}". Try different keywords or clear your search.` : "Try adjusting your search criteria."}
    action={onClear}
    actionLabel="Clear Search"
    showAction={!!searchTerm}
  />
)

// Error State
export const ErrorState = ({ title = "Something went wrong", description, onRetry }) => (
  <EmptyState
    icon={({ className }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )}
    title={title}
    description={description || "We encountered an error loading this content. Please try again."}
    action={onRetry}
    actionLabel="Try Again"
    showAction={!!onRetry}
  />
)

// Generic Empty with Custom Icon
export default EmptyState
