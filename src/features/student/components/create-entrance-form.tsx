import { EntranceForm } from './entrance-form'

import { useCreateEntranceForm } from '@/api/student/create-entrance-form'

export const CreateEntranceForm = ({ id }: { id: string }) => {
  const { mutate, isPending, error } = useCreateEntranceForm()

  return (
    <EntranceForm
      id={id}
      isPending={isPending}
      errors={error?.response?.data.data || null}
      onSubmit={mutate}
    />
  )
}
