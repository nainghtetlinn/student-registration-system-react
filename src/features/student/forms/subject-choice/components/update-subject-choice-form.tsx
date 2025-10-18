import { SubjectChoiceForm } from './ui'

import type { TForm } from '@/types/form'
import type { TSubjectChoiceFormSchema } from '../schema/subject-choice-form.schema'

import { useUpdateSubjectChoiceForm } from '../api/update.api'

export const UpdateSubjectChoiceForm = ({
  formDetails,
  formData,
  onSuccess,
}: {
  formDetails: TForm
  formData: TSubjectChoiceFormSchema
  onSuccess: () => void
}) => {
  const { mutate, isPending, error } = useUpdateSubjectChoiceForm({
    onSuccess,
  })

  return (
    <SubjectChoiceForm
      formDetails={formDetails}
      defaultValues={formData}
      isPending={isPending}
      errors={error?.response?.data.data || null}
      onSubmit={mutate}
    />
  )
}
