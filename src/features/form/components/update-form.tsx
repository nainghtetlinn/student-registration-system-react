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
import { FormInputField } from '@/components/ui/form-fields'
import { Spinner } from '@/components/ui/spinner'
import { FilePen } from 'lucide-react'

import { useUpdateForm } from '@/api/form/update-form'
import type { TForm } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  updateFormSchema,
  type TUpdateFormSchema,
} from '../schemas/update-form-schema'

export const UpdateForm = ({ data: formDetails }: { data: TForm }) => {
  const form = useForm({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      academicYear: formDetails.academicYear,
      code: formDetails.code,
      number: formDetails.number,
    },
  })

  const { mutate, isPending } = useUpdateForm(formDetails.id.toString())

  const onSubmit = (data: TUpdateFormSchema) => {
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
            <CardTitle className='text-2xl font-bold'>Update form</CardTitle>
            <CardDescription className='text-muted-foreground text-sm text-balance'>
              Click save to update form
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
              Save {isPending ? <Spinner /> : <FilePen />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
