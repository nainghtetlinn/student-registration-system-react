import { FormCheckboxField, FormInputField } from '@/components/ui/form-fields'

import type { TEntranceFormSchema } from '../../schema/entrance-form.schema'

import { useFormContext } from 'react-hook-form'

export const ContactsDetails = () => {
  const form = useFormContext<TEntranceFormSchema>()

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>ဆက်သွယ်ရန်</h2>
      <FormInputField
        control={form.control}
        name='contact.address'
        label='ဆက်သွယ်ရန်လိပ်စာ'
      />
      <FormInputField
        control={form.control}
        name='contact.phoneNumber'
        label='ဖုန်းနံပါတ်'
      />
      <FormInputField
        control={form.control}
        name='contact.permanentAddress'
        label='အမြဲတမ်းနေရပ်လိပ်စာ'
      />
      <FormInputField
        control={form.control}
        name='contact.permanentPhoneNumber'
        label='ဖုန်းနံပါတ်'
      />
      <FormCheckboxField
        control={form.control}
        name='acknowledged'
        label='ကတိခံဝန်ချက် - တက္ကသိုလ်မှ သတ်မှတ်ထားသောစည်းကမ်းများကိုလိုက်နာပါမည်။'
      />
    </div>
  )
}
