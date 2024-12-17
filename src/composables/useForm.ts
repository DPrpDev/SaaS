import { ref, computed } from 'vue'
import { getValidationError } from '../utils/validation'

export function useForm<T extends Record<string, string>>(initialState: T) {
  const values = ref<T>({ ...initialState })
  const errors = ref<Partial<Record<keyof T, string>>>({})
  const touched = ref<Partial<Record<keyof T, boolean>>>({})

  const isValid = computed(() => Object.keys(errors.value).length === 0)

  const handleChange = (field: keyof T, value: string) => {
    values.value[field] = value as T[keyof T]
    touched.value[field] = true
    const error = getValidationError(field as string, value)
    if (error) {
      errors.value[field] = error
    } else {
      delete errors.value[field]
    }
  }

  const reset = () => {
    values.value = { ...initialState }
    errors.value = {}
    touched.value = {}
  }

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    reset,
  } as const // Use `as const` to prevent unintended mutations
}