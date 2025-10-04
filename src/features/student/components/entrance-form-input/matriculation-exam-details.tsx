import { FormInputField } from '@/components/ui/form-fields'

import { useFormContext } from 'react-hook-form'

import { type TEntranceFormInput } from '@/features/student/schemas/entrance-form-schema'

export const MatriculationExamDetails = () => {
  const form = useFormContext<TEntranceFormInput>()

  return (
    <div className='flex min-h-[550px] flex-col gap-4'>
      <FormInputField
        control={form.control}
        name='matriculationPassedYear'
        label='ခုနှစ်'
        placeholder='Eg- 2020-2021'
      />
      <FormInputField
        control={form.control}
        name='rollNumber'
        label='ခုံနံပါတ်'
      />
      <FormInputField
        control={form.control}
        name='department'
        label='စာစစ်ဌာန'
      />
    </div>
  )
}
