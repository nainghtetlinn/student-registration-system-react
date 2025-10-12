import { DobPicker } from '@/components/dob-picker'
import { NrcInput } from '@/components/nrc-input'
import { FormInputField } from '@/components/ui/form-fields'

import { useFormContext } from 'react-hook-form'

import { type TSubjectChoiceFormSchema } from '../../schemas/subject-choice-form-schema'

export const StudentDetails = () => {
  const form = useFormContext<TSubjectChoiceFormSchema>()

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>
        ကျောင်းသား/သူ
      </h2>
      <FormInputField
        control={form.control}
        name='enrollmentNumber'
        label='ဝင်ခွင့်ရအမှတ်စဉ်'
      />
      <FormInputField
        control={form.control}
        name='student.name'
        label='အမည်'
        placeholder='Eg- Mg Mg'
      />
      <FormInputField
        control={form.control}
        name='student.otherName'
        label='အခြားအမည်(ရှိက)ဖော်ပြပါ'
      />
      <NrcInput
        control={form.control}
        stateCodeName='student.nrc.stateCode'
        townshipCodeName='student.nrc.townshipCode'
        nrcTypeName='student.nrc.nrcType'
        nrcNumberName='student.nrc.nrcNumber'
      />
      <FormInputField
        control={form.control}
        name='student.ethnicity'
        label='လူမျိုး'
      />
      <FormInputField
        control={form.control}
        name='student.religion'
        label='ကိုးကွယ်သည့်ဘာသာ'
      />
      <FormInputField
        control={form.control}
        name='student.pob'
        label='မွေးဖွားရာဒေသ'
      />
      <DobPicker
        control={form.control}
        name='student.dob'
        description='(တက္ကသိုလ်ဝင်စာမေးပွဲအောင်လက်မှတ်ပါအတိုင်း)'
      />
      <FormInputField
        control={form.control}
        name='student.phoneNumber'
        label='လက်ကိုင်ဖုန်းနံပါတ်'
      />
    </div>
  )
}
