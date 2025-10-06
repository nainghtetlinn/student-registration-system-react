import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateEntranceForm } from '@/api/student/create-entrance-form'
import { useMultistep } from '@/hooks/use-multistep'
import {
  entranceFormDefaults,
  entranceFormSchema,
  type TEntranceFormSchema,
} from '../../schemas/entrance-form-schema'
import { steps } from './steps'

type Props = {
  onSuccess: () => void
  defaultValues?: TEntranceFormSchema
}

export const EntranceForm = ({ onSuccess, defaultValues }: Props) => {
  const form = useForm({
    resolver: zodResolver(entranceFormSchema),
    defaultValues: defaultValues ?? entranceFormDefaults,
  })

  const { mutate, isPending } = useCreateEntranceForm({
    onSuccess: () => {
      form.reset()
      onSuccess()
    },
  })

  const { current, next, previous } = useMultistep({
    totalSteps: steps.length,
  })

  const handleNext = async () => {
    const isValid = await form.trigger(steps[current].fields)
    if (!isValid) {
      return // Stop progression if validation fails
    }
    next()
  }

  const handleSubmit = (data: TEntranceFormSchema) => {
    mutate(data)
  }

  return (
    <>
      <Form {...form}>
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
          <CardContent>{steps[current].component}</CardContent>
          <CardFooter className='flex items-center justify-end gap-2'>
            {current > 0 && (
              <Button
                type='button'
                onClick={previous}
              >
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button
                type='button'
                onClick={handleNext}
              >
                Next
              </Button>
            )}
            {current == steps.length - 1 && (
              <Button
                type='button'
                onClick={form.handleSubmit(handleSubmit)}
                disabled={isPending}
              >
                Submit {isPending && <Spinner />}
              </Button>
            )}
          </CardFooter>
        </Card>
      </Form>
    </>
  )
}
