import {
  MultistepForm,
  MultistepFormCurrent,
  MultistepFormNext,
  MultistepFormPrevious,
  MultistepFormSubmit,
} from '@/components/multistep-form'
import { Stamp } from '@/components/stamp'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import type { TForm } from '@/types/form'
import type { TEntranceFormError } from '@/types/student'
import { fromErrorDto } from '../../lib/entrance-form-dto'
import {
  entranceFormDefaults,
  entranceFormSchema,
  type TEntranceFormSchema,
} from '../../schemas/entrance-form-schema'
import { steps } from './steps'

type Props = {
  formDetails: TForm
  isPending: boolean
  errors: TEntranceFormError | null
  onSubmit: (data: TEntranceFormSchema) => void
  defaultValues?: TEntranceFormSchema
}

export const EntranceForm = ({
  formDetails,
  isPending,
  errors,
  onSubmit,
  defaultValues,
}: Props) => {
  const [active, setActive] = useState(0)

  const form = useForm({
    resolver: zodResolver(entranceFormSchema),
    defaultValues: defaultValues
      ? { ...defaultValues, formId: formDetails.id }
      : {
          ...entranceFormDefaults,
          formId: formDetails.id,
        },
  })

  useEffect(() => {
    if (errors) {
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
          <CardHeader className='text-center'>
            <CardTitle className='leading-6'>
              နည်းပညာတက္ကသိုလ်(တောင်ကြီး)
            </CardTitle>
            <CardDescription className='text-card-foreground leading-6'>
              ({formDetails.academicYear})ပညာသင်နှစ်
            </CardDescription>
            <CardTitle className='leading-6'>
              တက္ကသိုလ်ဝင်ခွင့်လျှောက်လွှာ
            </CardTitle>
            <Stamp
              url={formDetails.stampUrl}
              id={formDetails.id.toString()}
              className='absolute top-2 left-2'
            />
          </CardHeader>
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
