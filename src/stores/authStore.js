import { create } from 'zustand'
import Cookies from 'js-cookie'

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        throw new Error(`Server returned non-JSON response: ${text}`)
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Login failed')
      }

      set({ user: data.user, isLoading: false })
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      })

      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        throw new Error(`Server returned non-JSON response: ${text}`)
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Registration failed')
      }

      set({ user: data.user, isLoading: false })
      return { success: true }
    } catch (error) {
      console.error('Registration error:', error)
      set({ error: error.message, isLoading: false })
      return { success: false, error: error.message }
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      set({ user: null })
    }
  },

  checkAuth: async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        set({ user: data.user })
      }
    } catch (error) {
      console.error('Auth check error:', error)
    }
  },

  clearError: () => set({ error: null }),
}))