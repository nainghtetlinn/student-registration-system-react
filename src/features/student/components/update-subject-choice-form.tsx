import { SubjectChoiceForm } from './subject-choice-form'

import { useNavigate } from '@tanstack/react-router'

import type { TForm } from '@/types/form'
import type { TEntranceFormSchema } from '../schemas/entrance-form-schema'
import type { TSubjectChoiceFormSchema } from '../schemas/subject-choice-form-schema'

import { useUpdateSubjectChoiceForm } from '@/api/student/update-subject-choice-form'

export const UpdateSubjectChoiceForm = ({
  formDetails,
  formData,
  entranceForm,
}: {
  formDetails: TForm
  formData: TSubjectChoiceFormSchema
  entranceForm: TEntranceFormSchema
}) => {
  const navigate = useNavigate()

  const { mutate, isPending, error } = useUpdateSubjectChoiceForm({
    onSuccess: () => {
      navigate({ to: '/student' })
    },
  })

  return (
    <SubjectChoiceForm
      formDetails={formDetails}
      entranceForm={entranceForm}
      defaultValues={formData}
      isPending={isPending}
      errors={error?.response?.data.data || null}
      onSubmit={mutate}
    />
  )
}
