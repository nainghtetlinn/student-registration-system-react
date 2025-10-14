import { DobPicker } from '@/components/dob-picker'
import { NrcInput } from '@/components/nrc-input'
import { FormInputField } from '@/components/ui/form-fields'

import { useFormContext } from 'react-hook-form'

import { type TSubjectChoiceFormSchema } from '../../schemas/subject-choice-form-schema'

export const FatherDetails = () => {
  const form = useFormContext<TSubjectChoiceFormSchema>()

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>အဘ(အရင်း)</h2>
      <FormInputField
        control={form.control}
        name='father.name'
        label='အမည်'
        placeholder='Eg- U Mg'
      />
      <FormInputField
        control={form.control}
        name='father.otherName'
        label='အခြားအမည်(ရှိက)ဖော်ပြပါ'
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
        name='father.ethnicity'
        label='လူမျိုး'
      />
      <FormInputField
        control={form.control}
        name='father.religion'
        label='ကိုးကွယ်သည့်ဘာသာ'
      />
      <FormInputField
        control={form.control}
        name='father.pob'
        label='မွေးဖွားရာဒေသ'
      />
      <DobPicker
        control={form.control}
        name='father.dob'
      />
      <FormInputField
        control={form.control}
        name='father.job'
        label='အလုပ်အကိုင်'
      />
      <FormInputField
        control={form.control}
        name='father.address'
        label='နေရပ်လိပ်စာ'
      />
      <FormInputField
        control={form.control}
        name='father.phoneNumber'
        label='လက်ကိုင်ဖုန်းနံပါတ်'
      />
    </div>
  )
}

export const MotherDetails = () => {
  const form = useFormContext<TSubjectChoiceFormSchema>()

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>အမိ(အရင်း)</h2>
      <FormInputField
        control={form.control}
        name='mother.name'
        label='အမည်'
        placeholder='Eg- Daw Mg'
      />
      <FormInputField
        control={form.control}
        name='mother.otherName'
        label='အခြားအမည်(ရှိက)ဖော်ပြပါ'
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
        name='mother.ethnicity'
        label='လူမျိုး'
      />
      <FormInputField
        control={form.control}
        name='mother.religion'
        label='ကိုးကွယ်သည့်ဘာသာ'
      />
      <FormInputField
        control={form.control}
        name='mother.pob'
        label='မွေးဖွားရာဒေသ'
      />
      <DobPicker
        control={form.control}
        name='mother.dob'
      />
      <FormInputField
        control={form.control}
        name='mother.job'
        label='အလုပ်အကိုင်'
      />
      <FormInputField
        control={form.control}
        name='mother.address'
        label='နေရပ်လိပ်စာ'
      />
      <FormInputField
        control={form.control}
        name='mother.phoneNumber'
        label='လက်ကိုင်ဖုန်းနံပါတ်'
      />
    </div>
  )
}
