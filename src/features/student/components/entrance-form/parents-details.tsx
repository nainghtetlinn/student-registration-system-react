import { FormInputField } from '@/components/ui/form-fields'
import { NrcInput } from '@/components/nrc-input'

import { useFormContext } from 'react-hook-form'

import { type TUniversityEntranceFormSchema } from '../../schemas/entrance-form-schema'
import { Separator } from '@/components/ui/separator'

export const ParentsDetails = () => {
  const form = useFormContext<TUniversityEntranceFormSchema>()

  return (
    <div className='flex min-h-[550px] flex-col gap-4'>
      <FormInputField
        control={form.control}
        name='father.nameEn'
        label='အဘအမည် (အင်္ဂလိပ်)'
        placeholder='Eg- U Mg'
      />
      <FormInputField
        control={form.control}
        name='father.nameMm'
        label='အဘအမည် (မြန်မာ)'
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

      <Separator />

      <FormInputField
        control={form.control}
        name='mother.nameEn'
        label='အမိအမည် (အင်္ဂလိပ်)'
        placeholder='Eg- Daw Mg'
      />
      <FormInputField
        control={form.control}
        name='mother.nameMm'
        label='အမိအမည် (မြန်မာ)'
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
