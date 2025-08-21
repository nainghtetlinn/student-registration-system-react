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
import { Loader2 } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  changePasswordInputSchema,
  useChangePassword,
  type TChangePasswordInput,
} from '@/api/lib/auth'

export const ChangePasswordForm = ({
  email,
  onSuccess,
}: {
  email: string
  onSuccess: (message: string, email: string) => void
}) => {
  const form = useForm({
    resolver: zodResolver(changePasswordInputSchema),
    defaultValues: {
      email,
    },
  })

  const { mutate, isPending } = useChangePassword({
    onSuccess: (message) => {
      onSuccess(message, form.getValues('email'))
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || error.message)
    },
  })

  const onSubmit = (data: TChangePasswordInput) => {
    mutate(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full max-w-xl'
      >
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              This is your first time login, you need to change password.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <FormInputField
              control={form.control}
              name='email'
              label='Email'
              placeholder='example@gmail.com'
            />
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button disabled={isPending}>
              Change {isPending && <Loader2 className='animate-spin' />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
