export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 8
}

export const getValidationError = (field: string, value: string): string | null => {
  switch (field) {
    case 'email':
      return validateEmail(value) ? null : 'Please enter a valid email address'
    case 'password':
      return validatePassword(value) ? null : 'Password must be at least 8 characters long'
    default:
      return null
  }
}