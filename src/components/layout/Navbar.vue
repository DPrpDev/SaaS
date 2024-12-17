<template>
  <nav class="bg-dark-800 border-b border-dark-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold text-gray-100">Cloud Dashboard</h1>
          </div>
        </div>
        <div class="flex items-center">
          <UserMenu />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import UserMenu from './UserMenu.vue'
</script>