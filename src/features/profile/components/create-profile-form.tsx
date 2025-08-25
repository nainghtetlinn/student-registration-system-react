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
import { Loader2, User2 } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  createProfileInputSchema,
  useCreateProfile,
  type TCreateProfileInput,
} from '@/api/profile/create-profile'
import { NrcInput } from '@/components/nrc-input'

export const CreateProfileForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const form = useForm({
    resolver: zodResolver(createProfileInputSchema),
    defaultValues: {
      mmName: '',
      engName: '',
      nrc: {
        nrcNumber: '',
      },
    },
  })

  const { mutate, isPending } = useCreateProfile({
    onSuccess,
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || error.message)
    },
  })

  const onSubmit = (data: TCreateProfileInput) => {
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
            <CardTitle className='text-2xl font-bold'>Create Profile</CardTitle>
            <CardDescription className='text-muted-foreground text-sm text-balance'>
              You can create your profile information here
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <FormInputField
              control={form.control}
              name='mmName'
              label='အမည် (မြန်မာ)'
              placeholder='Eg- မောင်မောင်'
            />
            <FormInputField
              control={form.control}
              name='engName'
              label='အမည် (အင်္ဂလိပ်)'
              placeholder='Eg- Mg Mg'
            />
            <NrcInput
              control={form.control}
              stateCodeName='nrc.stateCode'
              townshipCodeName='nrc.townshipCode'
              nrcTypeName='nrc.nrcType'
              nrcNumberName='nrc.nrcNumber'
            />
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button disabled={isPending}>
              Create{' '}
              {isPending ? <Loader2 className='animate-spin' /> : <User2 />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
