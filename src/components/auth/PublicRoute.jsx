import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

const PublicRoute = ({ children }) => {
  const { user } = useAuthStore()

  if (user) {
    // If user is logged in, redirect them away from public pages
    return <Navigate to="/dashboard" replace />
  }

  // If user is not logged in, show the public page
  return children
}

export default PublicRoute