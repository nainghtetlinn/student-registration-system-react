import { SubjectChoiceForm } from './ui'

import type { TForm } from '@/types/form'
import type { TSubjectChoiceFormSchema } from '../schema/subject-choice-form.schema'

import { useNavigate } from '@tanstack/react-router'

import { useCreateSubjectChoiceForm } from '../api/create.api'

export const CreateSubjectChoiceForm = ({
  formDetails,
  defaultValues,
  onSuccess,
}: {
  formDetails: TForm
  defaultValues: TSubjectChoiceFormSchema
  onSuccess: () => void
}) => {
  const navigate = useNavigate()

  const { mutate, isPending, error } = useCreateSubjectChoiceForm({
    onSuccess,
    onError: (error) => {
      if (error?.response?.status === 409) {
        navigate({ to: '/student' })
      }
    },
  })

  return (
    <SubjectChoiceForm
      formDetails={formDetails}
      defaultValues={defaultValues}
      isPending={isPending}
      errors={error?.response?.data.data || null}
      onSubmit={mutate}
    />
  )
}
