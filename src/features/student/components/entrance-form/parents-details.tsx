import { NrcInput } from '@/components/nrc-input'
import { FormInputField } from '@/components/ui/form-fields'

import { useFormContext } from 'react-hook-form'

import { type TEntranceFormSchema } from '../../schemas/entrance-form-schema'

export const FatherDetails = () => {
  const form = useFormContext<TEntranceFormSchema>()

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>အဘ(အရင်း)</h2>
      <FormInputField
        control={form.control}
        name='father.nameEn'
        label='အမည် (အင်္ဂလိပ်)'
        placeholder='Eg- U Mg'
      />
      <FormInputField
        control={form.control}
        name='father.nameMm'
        label='အမည် (မြန်မာ)'
        placeholder='Eg- ဦးမောင်'
      />
      <NrcInput
        control={form.control}
        stateCodeName='father.nrc.stateCode'
        townshipCodeName='father.nrc.townshipCode'
        nrcTypeName='father.nrc.nrcType'
        nrcNumberName='father.nrc.nrcNumber'
      />
      <FormInputField
        control={form.control}
        name='father.job'
        label='အလုပ်အကိုင်'
      />
    </div>
  )
}
export const MotherDetails = () => {
  const form = useFormContext<TEntranceFormSchema>()

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>အမိ(အရင်း)</h2>
      <FormInputField
        control={form.control}
        name='mother.nameEn'
        label='အမည် (အင်္ဂလိပ်)'
        placeholder='Eg- Daw Mg'
      />
      <FormInputField
        control={form.control}
        name='mother.nameMm'
        label='အမည် (မြန်မာ)'
        placeholder='Eg- ဒေါ်မောင်'
      />
      <NrcInput
        control={form.control}
        stateCodeName='mother.nrc.stateCode'
        townshipCodeName='mother.nrc.townshipCode'
        nrcTypeName='mother.nrc.nrcType'
        nrcNumberName='mother.nrc.nrcNumber'
      />
      <FormInputField
        control={form.control}
        name='mother.job'
        label='အလုပ်အကိုင်'
      />
    </div>
  )
}
