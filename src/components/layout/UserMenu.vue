<template>
  <Menu as="div" class="ml-3 relative">
    <MenuButton class="flex items-center">
      <img
        class="h-8 w-8 rounded-full ring-2 ring-dark-600"
        :src="auth.user?.avatar"
        alt=""
      />
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark-800 ring-1 ring-dark-600 focus:outline-none">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <a
              href="#"
              @click.prevent="handleLogout"
              :class="[
                active ? 'bg-dark-700' : '',
                'block px-4 py-2 text-sm text-gray-100'
              ]"
            >
              Sign out
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>