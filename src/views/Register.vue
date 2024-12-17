<template>
  <div class="min-h-screen flex items-center justify-center bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">
          Create your account
        </h2>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md space-y-4">
          <div>
            <label for="name" class="sr-only">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              v-model="name"
              required
              class="input-field"
              placeholder="Full name"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              v-model="email"
              required
              class="input-field"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required
              class="input-field"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="space-y-4">
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full btn-primary"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <UserPlusIcon class="h-5 w-5 text-indigo-400" aria-hidden="true" />
            </span>
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>

          <button
            type="button"
            @click="handleGoogleSignIn"
            class="w-full flex justify-center items-center px-4 py-2 border border-dark-600 rounded-md shadow-sm text-sm font-medium text-gray-100 bg-dark-800 hover:bg-dark-700"
          >
            <img
              class="h-5 w-5 mr-2"
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
            />
            Sign up with Google
          </button>
        </div>
        
        <div v-if="error" class="text-red-500 text-center text-sm">
          {{ error }}
        </div>

        <div class="text-center text-sm">
          <router-link
            to="/login"
            class="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Already have an account? Sign in
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserPlusIcon } from '@heroicons/vue/20/solid'
import { useAuthStore } from '../stores/auth'
import { gapi } from 'gapi-script';


const router = useRouter()
const auth = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')


const handleRegister = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const success = await auth.register({
      name: name.value,
      email: email.value,
      password: password.value
    })
    if (success) {
      router.push('/dashboard')
    } else {
      error.value = 'Registration failed. Please try again.'
    }
  } catch (e) {
    error.value = 'An error occurred during registration'
  } finally {
    loading.value = false
  }
}

const handleGoogleSignIn = async () => {
  const auth2 = await loadGoogleAuth() as gapi.auth2.GoogleAuth;
if (auth2) {
  const googleUser = await auth2.signIn();
  console.log(googleUser);
}
  try {
    const auth2 = gapi.auth2.getAuthInstance();
    const googleUser = await auth2.signIn();
    const token = googleUser.getAuthResponse().id_token
    const success = await auth.loginWithGoogle(token)
    if (success) {
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Google Sign-In Error:', error)
  }
}

declare global {
  interface Window {
    gapi: any;
  }
}

function loadGoogleAuth() {
  return new Promise((resolve) => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID
        })
        .then(resolve)
    })
  })
}
</script>