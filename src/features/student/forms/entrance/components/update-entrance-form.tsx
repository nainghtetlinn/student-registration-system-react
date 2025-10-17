import { EntranceForm } from './ui'

import type { TForm } from '@/types/form'
import type { TEntranceFormSchema } from '../schema/entrance-form.schema'

import { useUpdateEntranceForm } from '../api/update.api'

export const UpdateEntranceForm = ({
  formDetails,
  formData,
  onSuccess,
}: {
  formDetails: TForm
  formData: TEntranceFormSchema
  onSuccess: () => void
}) => {
  const { mutate, isPending, error } = useUpdateEntranceForm({
    onSuccess,
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
