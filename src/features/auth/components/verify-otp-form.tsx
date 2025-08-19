import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
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
  useVerifyOtp,
  verifyOtpInputSchema,
  type TVerifyOtpInput,
} from '@/api/lib/auth'

export const VerifyOtpForm = ({
  email,
  onSuccess,
}: {
  email: string
  onSuccess: () => void
}) => {
  const form = useForm({
    resolver: zodResolver(verifyOtpInputSchema),
    defaultValues: {
      email,
      otp: '',
    },
  })

  const { mutate, isPending } = useVerifyOtp({
    onSuccess,
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || error.message)
    },
  })

  const onSubmit = (data: TVerifyOtpInput) => {
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
            <CardTitle>Verify Otp</CardTitle>
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
              name='otp'
              label='OTP'
            />
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button disabled={isPending}>
              Verify {isPending && <Loader2 className='animate-spin' />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
