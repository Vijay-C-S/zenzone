import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './stores/authStore'
import { useDarkMode } from './hooks/useDarkMode'

// Components
import Navbar from './components/layout/Navbar'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicRoute from './components/auth/PublicRoute' // 1. Import the new component

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import MoodTracker from './pages/MoodTracker'
import Journal from './pages/Journal'
import Chatbot from './pages/Chatbot'
import WellnessLibrary from './pages/WellnessLibrary'
import WellnessResourceDetail from './pages/WellnessResourceDetail'
import SelfAssessment from './pages/SelfAssessment'
import AdminDashboard from './pages/AdminDashboard'
import ArticlePage from './pages/ArticlePage'
import Goals from './pages/Goals'
import Habits from './pages/Habits'
import Meditation from './pages/Meditation'
import CrisisSupport from './pages/CrisisSupport'

function App() {
  const { user, checkAuth } = useAuthStore()
  const { darkMode } = useDarkMode()

  React.useEffect(() => {
    checkAuth()
  }, [checkAuth])

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main>
          <Routes>
            {/* 2. Wrap public routes with PublicRoute */}
            <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

            {/* Protected routes remain the same */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/mood" element={<ProtectedRoute><MoodTracker /></ProtectedRoute>} />
            <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
            <Route path="/wellness" element={<ProtectedRoute><WellnessLibrary /></ProtectedRoute>} />
            <Route path="/wellness/:id" element={<ProtectedRoute><WellnessResourceDetail /></ProtectedRoute>} />
            <Route path="/assessment" element={<ProtectedRoute><SelfAssessment /></ProtectedRoute>} />
            <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
            <Route path="/habits" element={<ProtectedRoute><Habits /></ProtectedRoute>} />
            <Route path="/meditation" element={<ProtectedRoute><Meditation /></ProtectedRoute>} />
            <Route path="/crisis" element={<CrisisSupport />} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
            <Route path="/wellness/article/:id" element={<ArticlePage />} />
          </Routes>
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: darkMode ? '#374151' : '#ffffff',
              color: darkMode ? '#f9fafb' : '#111827',
              border: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb',
            },
          }}
        />
      </div>
    </Router>
  )
}

export default App