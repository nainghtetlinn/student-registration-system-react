import { SubjectChoiceForm } from './subject-choice-form'

import { useNavigate } from '@tanstack/react-router'

import { useCreateSubjectChoiceForm } from '@/api/student/create-subject-choice-form'
import type { TForm } from '@/types/form'
import type { TEntranceFormSchema } from '../schemas/entrance-form-schema'

export const CreateSubjectChoiceForm = ({
  formDetails,
  entranceForm,
}: {
  formDetails: TForm
  entranceForm: TEntranceFormSchema
}) => {
  const navigate = useNavigate()

  const { mutate, isPending, error } = useCreateSubjectChoiceForm({
    onSuccess: () => {
      navigate({ to: '/student' })
    },
    onError: (error) => {
      if (error?.response?.status === 500) {
        navigate({ to: '/student' })
      }
    },
  })

  return (
    <SubjectChoiceForm
      formDetails={formDetails}
      entranceForm={entranceForm}
      isPending={isPending}
      errors={error?.response?.data.data || null}
      onSubmit={mutate}
    />
  )
}
