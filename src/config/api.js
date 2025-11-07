// API configuration for different environments
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

console.log('API Base URL:', API_BASE_URL)

export default API_BASE_URL
