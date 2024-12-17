import { defineStore } from 'pinia'
import { ref } from 'vue'
import { computed } from 'vue';
import type { User, LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth'
import { api } from '../utils/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials: LoginCredentials) {
    loading.value = true
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials)
      setAuthData(response.data)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(credentials: RegisterCredentials) {
    loading.value = true
    try {
      const response = await api.post<AuthResponse>('/auth/register', credentials)
      setAuthData(response.data)
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  async function loginWithGoogle(token: string) {
    loading.value = true
    try {
      const response = await api.post<AuthResponse>('/auth/google', { token })
      setAuthData(response.data)
      return true
    } catch (error) {
      console.error('Google login error:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  function setAuthData({ user: userData, token: authToken }: AuthResponse) {
    user.value = userData
    token.value = authToken
    localStorage.setItem('token', authToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }

  // Initialize auth state from localStorage
  const savedToken = localStorage.getItem('token')
  if (savedToken) {
    token.value = savedToken
    api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
    // Fetch user data
    api.get<User>('/auth/me').then(
      response => user.value = response.data
    ).catch(() => logout())
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    loginWithGoogle,
    logout
  }
})