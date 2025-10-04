import { DobPicker } from '@/components/dob-picker'
import { NrcInput } from '@/components/nrc-input'
import { FormInputField } from '@/components/ui/form-fields'

import { useFormContext } from 'react-hook-form'

import { type TEntranceFormInput } from '@/features/student/schemas/entrance-form-schema'

export const StudentDetails = () => {
  const form = useFormContext<TEntranceFormInput>()

  return (
    <div className='flex min-h-[550px] flex-col gap-4'>
      <FormInputField
        control={form.control}
        name='studentNameEng'
        label='အမည် (အင်္ဂလိပ်)'
        placeholder='Eg- Mg Mg'
      />
      <FormInputField
        control={form.control}
        name='studentNameMm'
        label='အမည် (မြန်မာ)'
        placeholder='Eg- မောင်မောင်'
      />
      <NrcInput
        control={form.control}
        stateCodeName='studentNrc.stateCode'
        townshipCodeName='studentNrc.townshipCode'
        nrcTypeName='studentNrc.nrcType'
        nrcNumberName='studentNrc.nrcNumber'
      />
      <FormInputField
        control={form.control}
        name='ethnicity'
        label='လူမျိုး'
      />
      <FormInputField
        control={form.control}
        name='religion'
        label='ကိုးကွယ်သည့်ဘာသာ'
      />
      <DobPicker
        control={form.control}
        name='dob'
      />
    </div>
  )
}
