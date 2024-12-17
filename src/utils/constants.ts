export const AUTH_TOKEN_KEY = 'auth_token'
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard'
} as const

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  NETWORK_ERROR: 'Network error occurred',
  GENERAL_ERROR: 'An error occurred. Please try again.'
} as const