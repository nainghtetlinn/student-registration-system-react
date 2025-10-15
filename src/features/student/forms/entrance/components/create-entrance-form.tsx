import { EntranceForm } from './ui'

import type { TForm } from '@/types/form'

import { useNavigate } from '@tanstack/react-router'

import { useCreateEntranceForm } from '../api/create.api'

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
