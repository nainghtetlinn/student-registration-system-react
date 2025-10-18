import { FormInputField } from '@/components/ui/form-fields'
import { NrcInput } from '@/components/nrc-input'
import { DobPicker } from '@/components/dob-picker'

import { useFormContext } from 'react-hook-form'

import { type TRegisterFormSchema } from '../../schemas/register-form-schema'

export const StudentDetails = () => {
  const form = useFormContext<TRegisterFormSchema>()

  return (
    <div className='min-h-[550px] space-y-4'>
      <h2 className='mb-4 text-center leading-8 font-semibold'>
        ကျောင်းသား/သူ
      </h2>
      <FormInputField
        control={form.control}
        name='universityRegisterNumber'
        label='တက္ကသိုလ်ဝင်မှတ်ပုံတင်အမှတ်'
      />
      <FormInputField
        control={form.control}
        name='enrollmentNumber'
        label='ဝင်ခွင့်ရအမှတ်စဉ်/ခုံအမှတ်'
      />
      <FormInputField
        control={form.control}
        name='student.nameEn'
        label='အမည် (အင်္ဂလိပ်)'
        placeholder='Eg- Mg Mg'
      />
      <FormInputField
        control={form.control}
        name='enrollmentNumber'
        label='အမည် (မြန်မာ)'
        placeholder='Eg- မောင်မောင်'
      />
      <FormInputField
        control={form.control}
        name='student.otherName'
        label='အခြားအမည်ရှိပါက'
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
      <FormInputField
        control={form.control}
        name='student.pob'
        label='မွေးဖွားရာဒေသ'
      />
      <DobPicker
        control={form.control}
        name='student.dob'
        description='တက္ကသိုလ်ဝင်စာမေးပွဲဖြေစဉ်ကဖော်ပြသည့်အတိုင်းထည့်ရန်'
      />
    </div>
  )
}
