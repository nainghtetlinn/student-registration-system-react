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

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useMultistep } from '@/hooks/use-multistep'
import {
  universityEntranceFormDefaults,
  universityEntranceFormSchema,
  type TUniversityEntranceFormSchema,
} from '../../schemas/university-entrance-form-schema'
import { steps } from './steps'

type Props = {
  onSubmit: (data: TUniversityEntranceFormSchema) => void
  defaultValues?: TUniversityEntranceFormSchema
}

export const UniversityEntranceForm = ({ onSubmit, defaultValues }: Props) => {
  const form = useForm({
    resolver: zodResolver(universityEntranceFormSchema),
    defaultValues: defaultValues ?? universityEntranceFormDefaults,
  })

  const { current, next, previous } = useMultistep({
    totalSteps: steps.length,
    start: 3,
  })

  const handleNext = async () => {
    const isValid = await form.trigger(steps[current].fields)
    if (!isValid) {
      return // Stop progression if validation fails
    }
    next()
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
                onClick={form.handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            )}
          </CardFooter>
        </Card>
      </Form>
    </>
  )
}
