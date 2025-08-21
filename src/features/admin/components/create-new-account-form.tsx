import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form } from '@/components/ui/form'
import { FormInputField, FormSelectField } from '@/components/ui/form-fields'
import { Label } from '@/components/ui/label'
import { Loader2, LogIn, UserRoundPlus } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  createNewAccountInputSchema,
  type TCreateNewAccountInput,
} from '../utils/schemas'
import { ACCOUNT_ROLES } from '../utils/constants'
import { useCreateNewAccount } from '../hooks/useCreateNewAccount'

export const CreateNewAccountForm = () => {
  const form = useForm({
    resolver: zodResolver(createNewAccountInputSchema),
    defaultValues: {
      email: '',
      role: '',
    },
  })

  const { mutate, isPending } = useCreateNewAccount({
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || error.message)
    },
  })

  const onSubmit = (data: TCreateNewAccountInput) => {
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
              Create new account
            </CardTitle>
            <CardDescription className='text-muted-foreground text-sm text-balance'>
              Enter email and select role to create account
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <FormInputField
              control={form.control}
              name='email'
              label='Email'
              placeholder='example@gmail.com'
            />
            <FormSelectField
              control={form.control}
              name='role'
              label='Role'
              placeholder='Select role'
              items={ACCOUNT_ROLES}
              keyExtractor={(item) => item}
            />
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button disabled={isPending}>
              Create{' '}
              {isPending ? (
                <Loader2 className='animate-spin' />
              ) : (
                <UserRoundPlus />
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
