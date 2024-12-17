<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'btn-primary',
      loading ? 'opacity-75 cursor-not-allowed' : '',
      fullWidth ? 'w-full' : '',
      className
    ]"
    @click="$emit('click')"
  >
    <slot name="icon"></slot>
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  text?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  className?: string
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>