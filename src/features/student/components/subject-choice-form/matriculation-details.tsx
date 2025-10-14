import { FormInputField } from '@/components/ui/form-fields'

import { useFormContext } from 'react-hook-form'

import { type TSubjectChoiceFormSchema } from '../../schemas/subject-choice-form-schema'

export const MatriculationDetails = () => {
  const form = useFormContext<TSubjectChoiceFormSchema>()

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>
        တက္ကသိုလ်ဝင်စာမေးပွဲအောင်မြင်ခဲ့သည့်
      </h2>
      <FormInputField
        control={form.control}
        name='matriculation.rollNo'
        label='ခုံအမှတ်'
      />
      <FormInputField
        control={form.control}
        name='matriculation.year'
        label='ခုနှစ်'
      />
      <FormInputField
        control={form.control}
        name='matriculation.department'
        label='စာစစ်ဌာန'
      />
      <h2 className='mt-8 mb-4 text-center leading-8 font-semibold'>
        ဘာသာရပ်ရမှတ်များ
      </h2>
      <FormInputField
        control={form.control}
        name='matriculation.myanmar'
        label='မြန်မာစာ'
      />
      <FormInputField
        control={form.control}
        name='matriculation.english'
        label='အင်္ဂလိပ်စာ'
      />
      <FormInputField
        control={form.control}
        name='matriculation.mathematic'
        label='သင်္ချာ'
      />
      <FormInputField
        control={form.control}
        name='matriculation.chemistry'
        label='ဓါတု'
      />
      <FormInputField
        control={form.control}
        name='matriculation.physics'
        label='ရူပ'
      />
      <FormInputField
        control={form.control}
        name='matriculation.other'
        label='ဇီဝ/ဘောဂ/သမိုင်း/ပထဝီ/စိတ်ကြိုက်မြန်မာ'
      />
    </div>
  )
}
