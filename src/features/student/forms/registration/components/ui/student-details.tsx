import { FormInputField } from '@/components/ui/form-fields'
import { NrcInput } from '@/components/nrc-input'
import { DobPicker } from '@/components/dob-picker'

import type { TRegistrationFormSchema } from '../../schema/registration-form.schema'

import { useFormContext } from 'react-hook-form'

export const StudentDetails = () => {
  const form = useFormContext<TRegistrationFormSchema>()

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>
        ကျောင်းသား/သူ
      </h2>
      <FormInputField
        control={form.control}
        name='student.enrollmentNumber'
        label='ဝင်ခွင့်ရအမှတ်စဉ်/ခုံအမှတ်'
        disabled
      />
      <FormInputField
        control={form.control}
        name='student.nameEn'
        label='အမည် (အင်္ဂလိပ်)'
        placeholder='Eg- Mg Mg'
        disabled
      />
      <FormInputField
        control={form.control}
        name='student.nameMm'
        label='အမည် (မြန်မာ)'
        placeholder='Eg- မောင်မောင်'
        disabled
      />
      <FormInputField
        control={form.control}
        name='student.otherName'
        label='အခြားအမည်ရှိပါက'
        disabled
      />
      <NrcInput
        control={form.control}
        stateCodeName='student.nrc.stateCode'
        townshipCodeName='student.nrc.townshipCode'
        nrcTypeName='student.nrc.nrcType'
        nrcNumberName='student.nrc.nrcNumber'
        disabled
      />
      <FormInputField
        control={form.control}
        name='student.ethnicity'
        label='လူမျိုး'
        disabled
      />
      <FormInputField
        control={form.control}
        name='student.religion'
        label='ကိုးကွယ်သည့်ဘာသာ'
        disabled
      />
      <FormInputField
        control={form.control}
        name='student.pob'
        label='မွေးဖွားရာဒေသ'
        disabled
      />
      <DobPicker
        control={form.control}
        name='student.dob'
        description='တက္ကသိုလ်ဝင်စာမေးပွဲဖြေစဉ်ကဖော်ပြသည့်အတိုင်းထည့်ရန်'
        disabled
      />
    </div>
  )
}
