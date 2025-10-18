import { RegistrationForm } from './ui'

import type { TForm } from '@/types/form'
import type { TRegistrationFormSchema } from '../schema/registration-form.schema'

import { useNavigate } from '@tanstack/react-router'

import { useCreateRegistrationForm } from '../api/create.api'

export const CreateRegistrationForm = ({
  formDetails,
  defaultValues,
  onSuccess,
}: {
  formDetails: TForm
  defaultValues: TRegistrationFormSchema
  onSuccess: () => void
}) => {
  const navigate = useNavigate()

  const { mutate, isPending, error } = useCreateRegistrationForm({
    onSuccess,
    onError: (error) => {
      if (error?.response?.status === 409) {
        navigate({ to: '/student' })
      }
    },
  })

  return (
    <RegistrationForm
      formDetails={formDetails}
      defaultValues={defaultValues}
      isPending={isPending}
      errors={error?.response?.data.data || null}
      onSubmit={mutate}
    />
  )
}
