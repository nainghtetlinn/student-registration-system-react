import type { TRegistrationForm } from '@/types/student'
import type { FieldPath } from 'react-hook-form'
import type { TRegistrationFormSchema } from '../schema/registration-form.schema'
import type { TRegistrationFormError } from '../types/error.type'

const fieldMap: Record<
  keyof TRegistrationForm,
  FieldPath<TRegistrationFormSchema>
> = {
  formId: 'formId',
  fatherDeathDate: 'father.yod',
  motherDeathDate: 'mother.yod',
  siblings: 'siblings',
}

export function fromErrorDto(
  data: TRegistrationFormError,
): { field: FieldPath<TRegistrationFormSchema>; message: string }[] {
  return data.map((e) => ({
    field: fieldMap[e.field],
    message: e.message,
  }))
}
