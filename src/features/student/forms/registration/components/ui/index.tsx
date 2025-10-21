import { FormCardHeader } from '@/components/common/form-card-header'
import {
  MultistepForm,
  MultistepFormCurrent,
  MultistepFormNext,
  MultistepFormPrevious,
  MultistepFormSubmit,
} from '@/components/multistep-form'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'

import type { TForm } from '@/types/form'
import type { TRegistrationFormSchema } from '../../schema/registration-form.schema'
import type { TRegistrationFormError } from '../../types/error.type'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { fromErrorDto } from '../../lib/registration-form-dto'
import { registrationFormSchema } from '../../schema/registration-form.schema'
import { steps } from './steps'

type Props = {
  formDetails: TForm
  isPending: boolean
  errors: TRegistrationFormError | null
  onSubmit: (data: TRegistrationFormSchema) => void
  defaultValues: TRegistrationFormSchema
}

export const RegistrationForm = ({
  formDetails,
  isPending,
  errors,
  onSubmit,
  defaultValues,
}: Props) => {
  const [active, setActive] = useState(0)

  const form = useForm({
    resolver: zodResolver(registrationFormSchema),
    defaultValues,
  })

  useEffect(() => {
    if (errors && typeof errors !== 'string') {
      // this error comes form server
      let index = -1
      fromErrorDto(errors).forEach((e) => {
        if (index < 0) {
          steps.forEach((s, i) => {
            s.fields.forEach((f) => {
              if (e.field.startsWith(f)) index = i
            })
          })
        }
        form.setError(e.field, { message: e.message })
      })
      setActive(index < 0 ? 0 : index)
    }
  }, [errors])

  return (
    <>
      <MultistepForm
        active={active}
        setActive={setActive}
        form={form}
        steps={steps}
        onSubmit={onSubmit}
      >
        <Card className='relative container mx-auto max-w-3xl'>
          <FormCardHeader
            form={formDetails}
            title='ကျောင်းသားမှတ်ပုံတင်ခွင့်လျှောက်လွှာ'
          />
          <CardContent>
            <MultistepFormCurrent />
          </CardContent>
          <CardFooter className='flex items-center justify-end gap-2'>
            <MultistepFormPrevious>Previous</MultistepFormPrevious>
            <MultistepFormNext>Next</MultistepFormNext>
            <MultistepFormSubmit disabled={isPending}>
              Submit {isPending && <Spinner />}
            </MultistepFormSubmit>
          </CardFooter>
        </Card>
      </MultistepForm>
    </>
  )
}
