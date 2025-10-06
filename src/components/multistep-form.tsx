import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'

// import { AnimatePresence, motion, Variants } from 'motion/react'
import React, { createContext, useContext, useState } from 'react'
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

const multistepContext = createContext<{
  steps: TStep[]
  current: number
  total: number
  next: () => void
  previous: () => void
}>({ steps: [], current: 0, total: 0, next: () => {}, previous: () => {} })

const useMultistep = () => useContext(multistepContext)

export const MultistepForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>({
  steps,
  form,
  onSubmit,
  children,
}: {
  steps: TStep<TFieldValues>[]
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>
  onSubmit: (data: TTransformedValues) => void
  children: React.ReactNode
}) => {
  const [active, setActive] = useState(0)

  const handleNext = async () => {
    const isValid = await form.trigger(steps[active].fields)
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
    <>
      <multistepContext.Provider
        value={{
          steps,
          current: active,
          total: steps.length,
          next: handleNext,
          previous: handlePrevious,
        }}
      >
        <Form {...form}>
          <form
            className='w-full'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {children}
          </form>
        </Form>
      </multistepContext.Provider>
    </>
  )
}

export const MultistepFormCurrent = () => {
  const { current, steps } = useMultistep()

  return steps[current].component
}

export const MultistepFormPrevious = () => {
  const { current, previous } = useMultistep()

  return (
    <>
      {current > 0 ? (
        <Button
          type='button'
          onClick={previous}
        >
          Previous
        </Button>
      ) : null}
    </>
  )
}

export const MultistepFormNext = () => {
  const { current, total, next } = useMultistep()

  return (
    <>
      {current < total - 1 ? (
        <Button
          type='button'
          onClick={next}
        >
          Next
        </Button>
      ) : null}
    </>
  )
}

export const MultistepFormSubmit = ({ isPending }: { isPending: boolean }) => {
  const { current, total } = useMultistep()
  return (
    <>
      {current == total - 1 ? (
        <Button disabled={isPending}>Submit {isPending && <Spinner />}</Button>
      ) : null}
    </>
  )
}
