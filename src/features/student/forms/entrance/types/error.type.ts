import type { TEntranceForm } from '@/types/student'

export type TEntranceFormError = {
  field: keyof TEntranceForm
  message: string
}[]
