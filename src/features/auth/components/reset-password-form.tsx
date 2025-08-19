import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form } from '@/components/ui/form'
import { FormInputField } from '@/components/ui/form-fields'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  resetPasswordInputSchema,
  useResetPassword,
  type TResetPasswordInput,
} from '@/api/lib/auth'

export const ResetPasswordForm = ({
  email,
  onSuccess,
}: {
  email: string
  onSuccess: () => void
}) => {
  const form = useForm({
    resolver: zodResolver(resetPasswordInputSchema),
    defaultValues: {
      email,
      newPassword: '',
      confirmPassword: '',
    },
  })
  const [show, setShow] = useState(false)

  const { mutate, isPending } = useResetPassword({
    onSuccess,
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || error.message)
    },
  })

  const onSubmit = (data: TResetPasswordInput) => {
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
            <CardTitle>Reset Password</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <FormInputField
              control={form.control}
              name='email'
              label='Email'
              placeholder='example@gmail.com'
            />
            <FormInputField
              control={form.control}
              name='newPassword'
              label='New Password'
              type={show ? 'text' : 'password'}
            />
            <FormInputField
              control={form.control}
              name='confirmPassword'
              label='Confirm Password'
              type='password'
            />
            <div className='flex gap-2'>
              <Checkbox
                id='show'
                onCheckedChange={(d) => setShow(!!d)}
              />
              <Label htmlFor='show'>Show password</Label>
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button disabled={isPending}>
              Reset {isPending && <Loader2 className='animate-spin' />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
