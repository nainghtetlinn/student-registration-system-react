import type { TRegistrationForm } from '@/types/student'

export type TRegistrationFormError = {
  field: keyof TRegistrationForm
  message: string
}[]
