import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
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
  message,
  email,
  onSuccess,
}: {
  message: string
  email: string
  onSuccess: (message: string) => void
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
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
