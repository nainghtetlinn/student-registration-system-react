import type { TEntranceForm } from '@/types/student'
import type { TEntranceFormError } from './error.type'

export type TUpdateEntranceFormRequest = Partial<Omit<TEntranceForm, 'formId'>>
export type TUpdateEntranceFormResponse = string
export type TUpdateEntranceFormErrorResponse = TEntranceFormError
