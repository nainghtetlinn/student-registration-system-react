import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import type { TVerifyStudentSchema } from '../../schema/verify-student.schema'

import { useFormContext } from 'react-hook-form'
import { FormInputField } from '@/components/ui/form-fields'

export const FinanceNote = () => {
  const form = useFormContext<TVerifyStudentSchema>()

  return (
    <>
      <CardHeader className='mb-4'>
        <CardTitle>Note & Voucher no.</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <FormInputField
          control={form.control}
          name='financeNote'
          label='Note'
        />
        <FormInputField
          control={form.control}
          name='financeVoucherNumber'
          label='Voucher no.'
        />
      </CardContent>
    </>
  )
}
