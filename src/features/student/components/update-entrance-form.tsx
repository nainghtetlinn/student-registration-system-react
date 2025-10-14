import { EntranceForm } from './entrance-form'

import { useNavigate } from '@tanstack/react-router'

import { useUpdateEntranceForm } from '@/api/student/update-entrance-form'
import type { TForm } from '@/types/form'
import { type TEntranceFormSchema } from '../schemas/entrance-form-schema'

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
      isPending={isPending}
      errors={error?.response?.data.data || null}
      onSubmit={mutate}
      defaultValues={formData}
    />
  )
}
