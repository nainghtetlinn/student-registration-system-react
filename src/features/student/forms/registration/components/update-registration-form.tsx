import { RegistrationForm } from './ui'

import type { TForm } from '@/types/form'
import type { TRegistrationFormSchema } from '../schema/registration-form.schema'

import { useUpdateRegistrationForm } from '../api/update.api'

export const UpdateRegistrationForm = ({
  formDetails,
  formData,
  onSuccess,
}: {
  formDetails: TForm
  formData: TRegistrationFormSchema
  onSuccess: () => void
}) => {
  const { mutate, isPending, error } = useUpdateRegistrationForm({ onSuccess })

  return (
    <RegistrationForm
      formDetails={formDetails}
      defaultValues={formData}
      isPending={isPending}
      errors={error?.response?.data.data || null}
      onSubmit={mutate}
    />
  )
}
