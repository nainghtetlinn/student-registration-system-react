import type { TForm } from '@/types/form'
import type { TEntranceForm } from '@/types/student'

export type TFiles = {
  studentSignatureUrl: string | null
  studentPhotoUrl: string | null
}

export type TGetEntranceFormResponse = {
  formData: TForm
} & TFiles &
  Omit<TEntranceForm, 'formId'>
