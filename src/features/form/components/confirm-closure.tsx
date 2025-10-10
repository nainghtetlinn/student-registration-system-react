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
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Spinner } from '@/components/ui/spinner'

import { useConfirmClosure } from '@/api/form/confirm-closure'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import {
  confirmClosureDefaults,
  confirmClosureSchema,
  type TConfirmClosureSchema,
} from '../schemas/confirm-closure-schema'

export const ConfirmClosure = ({ id }: { id: string }) => {
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(confirmClosureSchema),
    defaultValues: confirmClosureDefaults,
  })

  const { mutate, isPending } = useConfirmClosure(id, {
    onSuccess: () => {
      navigate({ to: '/admin/forms' })
    },
  })

  const onSubmit = (data: TConfirmClosureSchema) => {
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
              Confirm Form Closure
            </CardTitle>
            <CardDescription className='text-muted-foreground text-sm text-balance'>
              Enter otp and click confirm to close form
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem className='flex justify-center'>
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
          <CardFooter className='flex justify-end'>
            <Button
              variant={'destructive'}
              disabled={isPending}
            >
              Confirm {isPending && <Spinner />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
