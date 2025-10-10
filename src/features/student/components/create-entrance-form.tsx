import { EntranceForm } from './entrance-form'

import { useCreateEntranceForm } from '@/api/student/create-entrance-form'
import type { TForm } from '@/types/form'

export const CreateEntranceForm = ({ formDetails }: { formDetails: TForm }) => {
  const { mutate, isPending, error } = useCreateEntranceForm()

  return (
    <EntranceForm
      formDetails={formDetails}
      isPending={isPending}
      errors={error?.response?.data.data || null}
      onSubmit={mutate}
    />
  )
}
