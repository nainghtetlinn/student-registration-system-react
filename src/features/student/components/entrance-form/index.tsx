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

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  entranceFormDefaults,
  entranceFormSchema,
  type TEntranceFormSchema,
} from '../../schemas/entrance-form-schema'
import { steps } from './steps'

type Props = {
  isPending: boolean
  onSubmit: (data: TEntranceFormSchema) => void
  defaultValues?: TEntranceFormSchema
}

export const EntranceForm = ({ isPending, onSubmit, defaultValues }: Props) => {
  const form = useForm({
    resolver: zodResolver(entranceFormSchema),
    defaultValues: defaultValues ?? entranceFormDefaults,
  })

  return (
    <>
      <MultistepForm
        form={form}
        steps={steps}
        onSubmit={onSubmit}
      >
        <Card className='container mx-auto max-w-3xl'>
          <CardHeader className='text-center'>
            <CardTitle className='leading-6'>
              နည်းပညာတက္ကသိုလ်(တောင်ကြီး)
            </CardTitle>
            <CardDescription className='text-card-foreground leading-6'>
              ({new Date().getFullYear()}-{new Date().getFullYear() + 1}
              )ပညာသင်နှစ်
            </CardDescription>
            <CardTitle className='leading-6'>
              တက္ကသိုလ်ဝင်ခွင့်လျှောက်လွှာ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MultistepFormCurrent />
          </CardContent>
          <CardFooter className='flex items-center justify-end gap-2'>
            <MultistepFormPrevious />
            <MultistepFormNext />
            <MultistepFormSubmit isPending={isPending} />
          </CardFooter>
        </Card>
      </MultistepForm>
    </>
  )
}
