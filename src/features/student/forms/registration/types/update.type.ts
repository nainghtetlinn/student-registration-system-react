import type { TRegistrationForm } from '@/types/student'
import type { TRegistrationFormError } from './error.type'

export type TUpdateRegistrationFormRequest = Partial<
  Omit<TRegistrationForm, 'formId'>
>
export type TUpdateRegistrationFormResponse = string
export type TUpdateRegistrationFormErrorResponse = TRegistrationFormError
