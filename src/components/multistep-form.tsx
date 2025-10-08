import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

// import { AnimatePresence, motion, Variants } from 'motion/react'
import React, { createContext, useContext } from 'react'
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
  active,
  setActive,
  steps,
  form,
  onSubmit,
  children,
}: {
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  steps: TStep<TFieldValues>[]
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>
  onSubmit: (data: TTransformedValues) => void
  children: React.ReactNode
}) => {
  const handleNext = async () => {
    const isValid = await form.trigger(steps[active].fields, {
      shouldFocus: true,
    })
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

  return (
    <>
      {steps.map((s, i) => (
        <div
          key={s.position}
          style={{ display: i == current ? 'block' : 'none' }}
        >
          {s.component}
        </div>
      ))}
    </>
  )
}

export const MultistepFormPrevious = ({
  children,
  ...props
}: Omit<React.ComponentProps<'button'>, 'type' | 'onClick'> & {
  children: React.ReactNode
}) => {
  const { current, previous } = useMultistep()

  return (
    <>
      {current > 0 ? (
        <Button
          type='button'
          onClick={previous}
          {...props}
        >
          {children}
        </Button>
      ) : null}
    </>
  )
}

export const MultistepFormNext = ({
  children,
  ...props
}: Omit<React.ComponentProps<'button'>, 'type' | 'onClick'> & {
  children: React.ReactNode
}) => {
  const { current, total, next } = useMultistep()

  return (
    <>
      {current < total - 1 ? (
        <Button
          type='button'
          onClick={next}
          {...props}
        >
          {children}
        </Button>
      ) : null}
    </>
  )
}

export const MultistepFormSubmit = ({
  children,
  ...props
}: Omit<React.ComponentProps<'button'>, 'type' | 'onClick'> & {
  children: React.ReactNode
}) => {
  const { current, total } = useMultistep()
  return (
    <>{current == total - 1 ? <Button {...props}>{children}</Button> : null}</>
  )
}
