import { DobPicker } from '@/components/dob-picker'
import { NrcInput } from '@/components/nrc-input'
import { FormInputField } from '@/components/ui/form-fields'

import { useFormContext } from 'react-hook-form'

import { type TEntranceFormSchema } from '../../schemas/entrance-form-schema'

export const StudentDetails = () => {
  const form = useFormContext<TEntranceFormSchema>()

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>
        ကျောင်းသား/သူ
      </h2>
      <FormInputField
        control={form.control}
        name='student.enrollmentNumber'
        label='ဝင်ခွင့်ရအမှတ်စဉ်'
      />
      <FormInputField
        control={form.control}
        name='student.nameEn'
        label='အမည် (အင်္ဂလိပ်)'
        placeholder='Eg- Mg Mg'
      />
      <FormInputField
        control={form.control}
        name='student.nameMm'
        label='အမည် (မြန်မာ)'
        placeholder='Eg- မောင်မောင်'
      />
      <FormInputField
        control={form.control}
        name='student.ethnicity'
        label='လူမျိုး'
      />
      <FormInputField
        control={form.control}
        name='student.religion'
        label='ကိုးကွယ်သည့်ဘာသာ'
      />
      <NrcInput
        control={form.control}
        stateCodeName='student.nrc.stateCode'
        townshipCodeName='student.nrc.townshipCode'
        nrcTypeName='student.nrc.nrcType'
        nrcNumberName='student.nrc.nrcNumber'
      />
      <DobPicker
        control={form.control}
        name='student.dob'
      />
      <FormInputField
        control={form.control}
        name='student.matriculationPassedYear'
        label='တက္ကသိုလ်ဝင်စာမေးပွဲအောင်မြင်သောနှစ်'
        placeholder='Eg- 2020-2021'
      />
      <FormInputField
        control={form.control}
        name='student.matriculationDepartment'
        label='တက္ကသိုလ်ဝင်စာမေးပွဲစာစစ်ဌာန'
      />
    </div>
  )
}
