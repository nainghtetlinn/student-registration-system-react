import { EntranceForm } from './entrance-form'

import { useNavigate } from '@tanstack/react-router'

import { useCreateEntranceForm } from '@/api/student/create-entrance-form'
import type { TForm } from '@/types/form'

export const CreateEntranceForm = ({ formDetails }: { formDetails: TForm }) => {
  const navigate = useNavigate()

  const { mutate, isPending, error } = useCreateEntranceForm({
    onSuccess: () => {
      navigate({ to: '/student/forms/subject-choice/create' })
    },
    onError: (error) => {
      if (error?.response?.status === 409) {
        navigate({ to: '/student/forms/subject-choice/create' })
      }
    },
  })

  return (
    <EntranceForm
      formDetails={formDetails}
      isPending={isPending}
      errors={error?.response?.data.data || null}
      onSubmit={mutate}
    />
  )
}
