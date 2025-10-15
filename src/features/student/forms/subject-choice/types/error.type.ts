import type { TSubjectChoiceForm } from '@/types/student'

export type TSubjectChoiceFormError = {
  field: keyof TSubjectChoiceForm
  message: string
}[]
