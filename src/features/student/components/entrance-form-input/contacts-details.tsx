import { FormInputField } from '@/components/ui/form-fields'

import { useFormContext } from 'react-hook-form'

import { type TEntranceFormInput } from '@/features/student/schemas/entrance-form-schema'

export const ContactsDetails = () => {
  const form = useFormContext<TEntranceFormInput>()

  return (
    <div className='flex min-h-[550px] flex-col gap-4'>
      <FormInputField
        control={form.control}
        name='address'
        label='နေရပ်လိပ်စာအပြည့်အစုံ'
      />
      <FormInputField
        control={form.control}
        name='phoneNumber'
        label='ဖုန်းနံပါတ်'
      />
      <FormInputField
        control={form.control}
        name='permanentAddress'
        label='အမြဲတမ်းနေရပ်လိပ်စာအပြည့်အစုံ'
      />
      <FormInputField
        control={form.control}
        name='permanentPhoneNumber'
        label='အမြဲတမ်းဖုန်းနံပါတ်'
      />
    </div>
  )
}
