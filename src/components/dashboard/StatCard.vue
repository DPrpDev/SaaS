<template>
  <div class="card">
    <div class="card-stat">
      <div class="flex-shrink-0">
        <component :is="icon" class="h-6 w-6 text-indigo-400" />
      </div>
      <div class="ml-5 w-0 flex-1">
        <dl>
          <dt class="text-sm font-medium text-gray-400 truncate">
            {{ title }}
          </dt>
          <dd class="flex items-baseline">
            <div class="text-2xl font-semibold text-gray-100">
              {{ value }}
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: any
  title: string
  value: string
}>()
</script>