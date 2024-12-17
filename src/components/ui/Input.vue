<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-300 mb-1">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :class="[
        'input-field',
        error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur')"
    />
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  label?: string
  modelValue: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()
</script>