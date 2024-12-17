<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">
          Sign in to your account
        </h2>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md space-y-4">
          <Input
            id="email"
            :modelValue="form.values.value.email"
            type="email"
            label="Email"
            required
            :error="form.touched.value.email ? form.errors.value.email : undefined"
            @update:modelValue="(value) => form.handleChange('email', value)"
            @blur="form.touched.value.email = true"
          />
          
          <Input
            id="password"
            :modelValue="form.values.value.password"
            type="password"
            label="Password"
            required
            :error="form.touched.value.password ? form.errors.value.password : undefined"
            @update:modelValue="(value) => form.handleChange('password', value)"
            @blur="form.touched.value.password = true"
          />
        </div>

        <Button
          type="submit"
          :loading="loading"
          :disabled="!form.isValid"
          fullWidth
        >
          <template #icon>
            <LockClosedIcon class="h-5 w-5 text-indigo-400 absolute left-3" />
          </template>
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </Button>
        
        <div v-if="error" class="text-red-500 text-center text-sm">
          {{ error }}
        </div>

        <div class="text-center">
          <router-link
            :to="ROUTES.REGISTER"
            class="text-indigo-400 hover:text-indigo-300 text-sm"
          >
            Don't have an account? Sign up
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import { useAuthStore } from '../stores/auth'
import { useForm } from '../composables/useForm'
import { ROUTES, AUTH_ERRORS } from '../utils/constants'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'

const router = useRouter()
const auth = useAuthStore()
const loading = ref(false)
const error = ref('')

const form = useForm({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  if (!form.isValid.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    const success = await auth.login({
      email: form.values.value.email,
      password: form.values.value.password
    })
    
    if (success) {
      router.push(ROUTES.DASHBOARD)
    } else {
      error.value = AUTH_ERRORS.INVALID_CREDENTIALS
    }
  } catch (e) {
    error.value = AUTH_ERRORS.GENERAL_ERROR
  } finally {
    loading.value = false
  }
}
</script>