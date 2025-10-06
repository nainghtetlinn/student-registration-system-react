import { FormCheckboxField, FormInputField } from '@/components/ui/form-fields'

import { useFormContext } from 'react-hook-form'

import { type TUniversityEntranceFormSchema } from '../../schemas/university-entrance-form-schema'

export const ContactsDetails = () => {
  const form = useFormContext<TUniversityEntranceFormSchema>()

  return (
    <div className='flex min-h-[550px] flex-col gap-4'>
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
