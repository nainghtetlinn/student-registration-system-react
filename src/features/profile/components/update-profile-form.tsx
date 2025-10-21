import { NrcInput } from '@/components/nrc-input'
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

import type { TProfile } from '@/types/profile'
import type { TProfileSchema } from '../schema/profile.schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { nrcStringToObject } from '@/lib/utils'
import { useUpdateProfile } from '../api/update-profile'
import { profileSchema } from '../schema/profile.schema'

export const UpdateProfileForm = ({
  old,
  onSuccess,
  onCancel,
}: {
  old: TProfile
  onSuccess: () => void
  onCancel: () => void
}) => {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      mmName: old.mmName,
      engName: old.engName,
      nrc: nrcStringToObject(old.nrc) ?? {
        stateCode: '',
        nrcType: '',
        townshipCode: '',
        nrcNumber: '',
      },
    },
  })

  const { mutate, isPending } = useUpdateProfile({
    onSuccess,
  })

  const onSubmit = (data: TProfileSchema) => {
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
            <CardTitle className='text-2xl font-bold'>Update Profile</CardTitle>
            <CardDescription className='text-muted-foreground text-sm text-balance'>
              You can update your profile information here
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
          <CardFooter className='flex justify-end gap-2'>
            <Button
              type='button'
              variant='secondary'
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button disabled={isPending}>
              Update{' '}
              {isPending ? <Loader2 className='animate-spin' /> : <User2 />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
