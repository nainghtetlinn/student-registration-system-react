import { EntranceForm } from './ui'

import type { TForm } from '@/types/form'
import type { TEntranceFormSchema } from '../schema/entrance-form.schema'

import { useNavigate } from '@tanstack/react-router'

import { useUpdateEntranceForm } from '../api/update.api'

export const UpdateEntranceForm = ({
  formDetails,
  formData,
}: {
  formDetails: TForm
  formData: TEntranceFormSchema
}) => {
  const navigate = useNavigate()

  const { mutate, isPending, error } = useUpdateEntranceForm({
    onSuccess: () => {
      navigate({ to: '/student' })
    },
  })

  return (
    <EntranceForm
      formDetails={formDetails}
      defaultValues={formData}
      isPending={isPending}
      errors={error?.response?.data.data || null}
      onSubmit={mutate}
    />
  )
}
