import { useCreateSubjectChoiceForm } from '@/api/student/create-subject-choice-form'
import { SubjectChoiceForm } from './subject-choice-form'

import type { TForm } from '@/types/form'
import type { TEntranceFormSchema } from '../schemas/entrance-form-schema'

export const CreateSubjectChoiceForm = ({
  formDetails,
  entranceForm,
}: {
  formDetails: TForm
  entranceForm: TEntranceFormSchema
}) => {
  const { mutate, isPending, error } = useCreateSubjectChoiceForm()

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
