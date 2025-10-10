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
import { FilePlus2 } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'

import { FormInputField } from '@/components/ui/form-fields'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  createFormDefaults,
  createFormSchema,
  type TCreateFormSchema,
} from '../schemas/create-form-schema'
import { useCreateForm } from '@/api/form/create-form'

export const CreateForm = () => {
  const form = useForm({
    resolver: zodResolver(createFormSchema),
    defaultValues: createFormDefaults,
  })

  const { mutate, isPending } = useCreateForm({
    onSuccess: () => {
      form.reset()
    },
  })

  const onSubmit = (data: TCreateFormSchema) => {
    mutate(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full max-w-lg'
      >
        <Card className='border-none'>
          <CardHeader className='flex flex-col items-center gap-2 text-center'>
            <CardTitle className='text-2xl font-bold'>
              Create new form
            </CardTitle>
            <CardDescription className='text-muted-foreground text-sm text-balance'>
              Enter academic year, number and code to create form
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <FormInputField
              control={form.control}
              name='academicYear'
              label='Academic Year'
              placeholder='Eg- 2025-2026'
            />
            <FormInputField
              control={form.control}
              name='number'
              label='Number'
            />
            <FormInputField
              control={form.control}
              name='code'
              label='Code'
            />
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button disabled={isPending}>
              Save {isPending ? <Spinner /> : <FilePlus2 />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
