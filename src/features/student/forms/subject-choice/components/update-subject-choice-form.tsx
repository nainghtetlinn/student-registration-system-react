import { SubjectChoiceForm } from './ui'

import type { TForm } from '@/types/form'
import type { TEntranceFormSchema } from '../../entrance/schema/entrance-form.schema'
import type { TSubjectChoiceFormSchema } from '../schema/subject-choice-form.schema'

import { useUpdateSubjectChoiceForm } from '../api/update.api'

export const UpdateSubjectChoiceForm = ({
  formDetails,
  formData,
  entranceForm,
  onSuccess,
}: {
  formDetails: TForm
  formData: TSubjectChoiceFormSchema
  entranceForm: TEntranceFormSchema
  onSuccess: () => void
}) => {
  const { mutate, isPending, error } = useUpdateSubjectChoiceForm({
    onSuccess,
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
