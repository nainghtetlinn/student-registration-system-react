import type { TForm } from '@/types/form'
import type { TEntranceForm } from '@/types/student'

export type TGetEntranceFormResponse = {
  formData: TForm
} & Omit<TEntranceForm, 'formId'>
