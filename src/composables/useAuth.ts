import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ROUTES } from '../utils/constants'

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)
  const loading = computed(() => authStore.loading)

  const logout = async () => {
    await authStore.logout()
    router.push(ROUTES.LOGIN)
  }

  const requireAuth = () => {
    if (!isAuthenticated.value) {
      router.push(ROUTES.LOGIN)
    }
  }

  return {
    isAuthenticated,
    user,
    loading,
    logout,
    requireAuth
  }
}