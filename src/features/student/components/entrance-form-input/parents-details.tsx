import { FormInputField } from '@/components/ui/form-fields'
import { NrcInput } from '@/components/nrc-input'

import { useFormContext } from 'react-hook-form'

import { type TEntranceFormInput } from '@/features/student/schemas/entrance-form-schema'

export const FatherDetails = () => {
  const form = useFormContext<TEntranceFormInput>()

  return (
    <div className='flex min-h-[550px] flex-col gap-4'>
      <FormInputField
        control={form.control}
        name='fatherNameEng'
        label='အဘအမည် (အင်္ဂလိပ်)'
        placeholder='Eg- U Mg'
      />
      <FormInputField
        control={form.control}
        name='fatherNameMm'
        label='အဘအမည် (မြန်မာ)'
        placeholder='Eg- ဦးမောင်'
      />
      <NrcInput
        control={form.control}
        stateCodeName='fatherNrc.stateCode'
        townshipCodeName='fatherNrc.townshipCode'
        nrcTypeName='fatherNrc.nrcType'
        nrcNumberName='fatherNrc.nrcNumber'
      />
      <FormInputField
        control={form.control}
        name='fatherJob'
        label='အလုပ်အကိုင်'
      />
    </div>
  )
}
export const MotherDetails = () => {
  const form = useFormContext<TEntranceFormInput>()

  return (
    <div className='flex min-h-[550px] flex-col gap-4'>
      <FormInputField
        control={form.control}
        name='motherNameEng'
        label='အမိအမည် (အင်္ဂလိပ်)'
        placeholder='Eg- Daw Mg'
      />
      <FormInputField
        control={form.control}
        name='motherNameMm'
        label='အမိအမည် (မြန်မာ)'
        placeholder='Eg- ဒေါ်မောင်'
      />
      <NrcInput
        control={form.control}
        stateCodeName='motherNrc.stateCode'
        townshipCodeName='motherNrc.townshipCode'
        nrcTypeName='motherNrc.nrcType'
        nrcNumberName='motherNrc.nrcNumber'
      />
      <FormInputField
        control={form.control}
        name='motherJob'
        label='အလုပ်အကိုင်'
      />
    </div>
  )
}
