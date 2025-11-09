import toast from 'react-hot-toast'

/**
 * Centralized toast notification utility
 * Provides consistent styling and behavior across the app
 */

// Success toast with green theme
export const showSuccess = (message, options = {}) => {
  return toast.success(message, {
    icon: '✅',
    duration: 3000,
    style: {
      borderRadius: '8px',
      background: '#10b981',
      color: '#fff',
      padding: '12px 16px',
    },
    ...options
  })
}

// Error toast with red theme
export const showError = (message, options = {}) => {
  return toast.error(message, {
    icon: '❌',
    duration: 4000,
    style: {
      borderRadius: '8px',
      background: '#ef4444',
      color: '#fff',
      padding: '12px 16px',
    },
    ...options
  })
}

// Loading toast - returns toast ID for dismissal
export const showLoading = (message = 'Loading...', options = {}) => {
  return toast.loading(message, {
    style: {
      borderRadius: '8px',
      padding: '12px 16px',
    },
    ...options
  })
}

// Info toast with blue theme
export const showInfo = (message, options = {}) => {
  return toast(message, {
    icon: 'ℹ️',
    duration: 3500,
    style: {
      borderRadius: '8px',
      background: '#3b82f6',
      color: '#fff',
      padding: '12px 16px',
    },
    ...options
  })
}

// Warning toast with amber theme
export const showWarning = (message, options = {}) => {
  return toast(message, {
    icon: '⚠️',
    duration: 3500,
    style: {
      borderRadius: '8px',
      background: '#f59e0b',
      color: '#fff',
      padding: '12px 16px',
    },
    ...options
  })
}

// Promise toast - shows loading, success, and error states automatically
export const showPromise = (promise, messages = {}) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || 'Loading...',
      success: messages.success || 'Success!',
      error: messages.error || 'Something went wrong',
    },
    {
      style: {
        borderRadius: '8px',
        padding: '12px 16px',
      },
      success: {
        duration: 3000,
        icon: '✅',
      },
      error: {
        duration: 4000,
        icon: '❌',
      },
    }
  )
}

// Custom toast with full control
export const showCustom = (message, options = {}) => {
  return toast.custom(message, options)
}

// Dismiss a specific toast
export const dismissToast = (toastId) => {
  toast.dismiss(toastId)
}

// Dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss()
}

/**
 * Common use cases with specific messages
 */

// Data operations
export const toastDataSaved = (itemName = 'Data') => {
  showSuccess(`${itemName} saved successfully!`)
}

export const toastDataDeleted = (itemName = 'Item') => {
  showSuccess(`${itemName} deleted successfully!`)
}

export const toastDataUpdated = (itemName = 'Data') => {
  showSuccess(`${itemName} updated successfully!`)
}

// Form operations
export const toastFormSuccess = () => {
  showSuccess('Form submitted successfully!')
}

export const toastFormError = (message = 'Please check your input and try again') => {
  showError(message)
}

export const toastValidationError = () => {
  showError('Please fill in all required fields')
}

// Authentication
export const toastLoginSuccess = () => {
  showSuccess('Welcome back!')
}

export const toastLogoutSuccess = () => {
  showInfo('You have been logged out')
}

export const toastRegisterSuccess = () => {
  showSuccess('Account created successfully!')
}

export const toastAuthError = (message = 'Authentication failed') => {
  showError(message)
}

// Network errors
export const toastNetworkError = () => {
  showError('Network error. Please check your connection.')
}

export const toastServerError = () => {
  showError('Server error. Please try again later.')
}

// Copy to clipboard
export const toastCopied = (item = 'Text') => {
  showSuccess(`${item} copied to clipboard!`)
}

// File operations
export const toastFileUploaded = () => {
  showSuccess('File uploaded successfully!')
}

export const toastFileError = () => {
  showError('Failed to upload file')
}

// Generic operations with loading state
export const executeWithToast = async (operation, messages = {}) => {
  const toastId = showLoading(messages.loading || 'Processing...')
  
  try {
    const result = await operation()
    dismissToast(toastId)
    showSuccess(messages.success || 'Success!')
    return { success: true, result }
  } catch (error) {
    dismissToast(toastId)
    showError(messages.error || error.message || 'Operation failed')
    return { success: false, error }
  }
}

/**
 * Example Usage:
 * 
 * import { showSuccess, showError, showPromise, executeWithToast } from '../utils/toast'
 * 
 * // Simple success
 * showSuccess('Mood logged successfully!')
 * 
 * // Error with custom duration
 * showError('Failed to save entry', { duration: 5000 })
 * 
 * // Promise toast
 * showPromise(
 *   fetch('/api/mood').then(r => r.json()),
 *   {
 *     loading: 'Loading mood data...',
 *     success: 'Mood data loaded!',
 *     error: 'Failed to load mood data'
 *   }
 * )
 * 
 * // Execute with automatic toast handling
 * const { success } = await executeWithToast(
 *   async () => {
 *     const response = await fetch('/api/goals', { method: 'POST', body: data })
 *     return response.json()
 *   },
 *   {
 *     loading: 'Creating goal...',
 *     success: 'Goal created!',
 *     error: 'Failed to create goal'
 *   }
 * )
 */

export default {
  success: showSuccess,
  error: showError,
  loading: showLoading,
  info: showInfo,
  warning: showWarning,
  promise: showPromise,
  custom: showCustom,
  dismiss: dismissToast,
  dismissAll: dismissAllToasts
}
