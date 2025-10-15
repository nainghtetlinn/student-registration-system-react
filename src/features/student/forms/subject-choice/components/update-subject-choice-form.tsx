import { SubjectChoiceForm } from './ui'

import type { TForm } from '@/types/form'
import type { TEntranceFormSchema } from '../../entrance/schema/entrance-form.schema'
import type { TSubjectChoiceFormSchema } from '../schema/subject-choice-form.schema'

import { useNavigate } from '@tanstack/react-router'

import { useUpdateSubjectChoiceForm } from '../api/update.api'

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
