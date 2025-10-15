import type { TSubjectChoiceForm } from '@/types/student'
import type { TSubjectChoiceFormError } from './error.type'

export type TUpdateSubjectChoiceFormRequest = Partial<
  Omit<TSubjectChoiceForm, 'formId'>
>
export type TUpdateSubjectChoiceFormResponse = string
export type TUpdateSubjectChoiceFormErrorResponse = TSubjectChoiceFormError
