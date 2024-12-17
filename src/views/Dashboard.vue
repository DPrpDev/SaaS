<template>
  <div class="min-h-screen bg-dark-900">
    <Navbar />
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              :icon="ChartBarIcon"
              title="Total Usage"
              value="85%"
            />
            <StatCard
              :icon="UsersIcon"
              title="Active Users"
              value="1,234"
            />
            <StatCard
              :icon="CurrencyDollarIcon"
              title="Revenue"
              value="$12,345"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ChartBarIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'
import Navbar from '../components/layout/Navbar.vue'
import StatCard from '../components/dashboard/StatCard.vue'
</script>