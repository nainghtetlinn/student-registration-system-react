import { EntranceForm } from './entrance-form'

import { useUpdateEntranceForm } from '@/api/student/update-entrance-form'
import { type TEntranceFormSchema } from '../schemas/entrance-form-schema'

export const UpdateEntranceForm = ({
  id,
  formData,
}: {
  id: string
  formData: TEntranceFormSchema
}) => {
  const { mutate, isPending, error } = useUpdateEntranceForm()

  return (
    <EntranceForm
      id={id}
      isPending={isPending}
      errors={error?.response?.data.data || null}
      onSubmit={mutate}
      defaultValues={formData}
    />
  )
}
