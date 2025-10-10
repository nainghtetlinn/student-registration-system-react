import { DobPicker } from '@/components/dob-picker'
import { NrcInput } from '@/components/nrc-input'
import { FormInputField } from '@/components/ui/form-fields'

import { useFormContext } from 'react-hook-form'

import { type TEntranceFormSchema } from '../../schemas/entrance-form-schema'

export const StudentDetails = () => {
  const form = useFormContext<TEntranceFormSchema>()

  return (
    <div className='flex min-h-[550px] flex-col gap-4'>
      <FormInputField
        control={form.control}
        name='student.nameEn'
        label='ကျောင်းသား/သူအမည် (အင်္ဂလိပ်)'
        placeholder='Eg- Mg Mg'
      />
      <FormInputField
        control={form.control}
        name='student.nameMm'
        label='ကျောင်းသား/သူအမည် (မြန်မာ)'
        placeholder='Eg- မောင်မောင်'
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
        label='ကိုးကွယ်သည့်ဘာသာ'
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
        name='student.enrollmentNumber'
        label='တက္ကသိုလ်ဝင်စာမေးပွဲခုံနံပါတ်'
      />
      <FormInputField
        control={form.control}
        name='student.matriculationDepartment'
        label='တက္ကသိုလ်ဝင်စာမေးပွဲစာစစ်ဌာန'
      />
    </div>
  )
}
