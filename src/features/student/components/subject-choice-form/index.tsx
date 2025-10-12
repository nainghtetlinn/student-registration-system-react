import {
  MultistepForm,
  MultistepFormCurrent,
  MultistepFormNext,
  MultistepFormPrevious,
  MultistepFormSubmit,
} from '@/components/multistep-form'
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
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  subjectChoiceFormSchema,
  type TSubjectChoiceFormSchema,
} from '../../schemas/subject-choice-form-schema'
import { steps } from './steps'

type Props = {
  isPending: boolean
  errors: null
  onSubmit: (data: TSubjectChoiceFormSchema) => void
  defaultValues: TSubjectChoiceFormSchema
}

export const SubjectChoiceForm = ({
  isPending,
  errors,
  onSubmit,
  defaultValues,
}: Props) => {
  const [active, setActive] = useState(0)

  const form = useForm({
    resolver: zodResolver(subjectChoiceFormSchema),
    defaultValues,
  })

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
              (2020-2021) ပညာသင်နှစ်
            </CardDescription>
            <CardTitle className='leading-6'>
              အထူးပြုဘာသာရပ်ရွေးချယ်ခွင့်လျှောက်လွှာ
            </CardTitle>
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
