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
import { Loader2, Send } from 'lucide-react'

// import { AnimatePresence, motion, Variants } from 'motion/react'
import { useState } from 'react'
import {
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form'

// const tabContentVariants: Variants = {
//   initial: {
//     y: 10,
//     opacity: 0,
//   },
//   enter: {
//     y: 0,
//     opacity: 1,
//   },
//   exit: {
//     y: -10,
//     opacity: 0,
//   },
// }

export type TStep<
  TFieldValues extends FieldValues = FieldValues,
  TFieldPath extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  position: number
  title: string
  component: React.ReactElement
  fields: TFieldPath[]
}

export const MultistepForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>({
  title,
  description,
  steps,
  form,
  onSubmit,
  isPending,
}: {
  title: string
  description: string
  steps: TStep<TFieldValues>[]
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>
  onSubmit: (data: TTransformedValues) => void
  isPending: boolean
}) => {
  const [active, setActive] = useState(0)
  const currentStep = steps[active]

  const handleNext = async () => {
    const isValid = await form.trigger(currentStep.fields)
    if (!isValid) {
      return // Stop progression if validation fails
    }
    if (active < steps.length - 1) {
      setActive((prev) => prev + 1)
    }
  }
  const handlePrevious = () => {
    if (active > 0) {
      setActive((prev) => prev - 1)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='h-full'
      >
        <Card className='mx-auto h-full w-full max-w-lg'>
          <CardHeader className='text-center'>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <h3 className='text-center text-lg font-bold'>
              {currentStep.title}
            </h3>
          </CardHeader>
          <CardContent className='grow overflow-auto'>
            {/* <AnimatePresence mode='wait'> */}
            {/* <motion.div
                key={active}
                variants={tabContentVariants}
                initial='initial'
                animate='enter'
                exit='exit'
                transition={{
                  duration: 0.2,
                }}
              > */}
            {currentStep.component}
            {/* </motion.div> */}
            {/* </AnimatePresence> */}
          </CardContent>
          <CardFooter className='flex justify-end gap-2'>
            {active > 0 && (
              <Button
                type='button'
                onClick={handlePrevious}
              >
                Previous
              </Button>
            )}
            {active < steps.length - 1 && (
              <Button
                type='button'
                onClick={handleNext}
              >
                Next
              </Button>
            )}
            {active == steps.length - 1 && (
              <Button
                type='submit'
                disabled={isPending}
              >
                Submit{' '}
                {isPending ? <Loader2 className='animate-spin' /> : <Send />}
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
