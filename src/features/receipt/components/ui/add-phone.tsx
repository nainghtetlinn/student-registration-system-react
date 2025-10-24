import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { FormInputField } from '@/components/ui/form-fields'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { phoneSchema, type TPhoneSchema } from '../../schema/receipt.schema'

export const AddPhone = ({
  append,
}: {
  append: (data: TPhoneSchema) => void
}) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: '',
    },
  })

  const handleAdd = async () => {
    const isValid = await form.trigger()
    if (!isValid) return

    const data = form.getValues()
    append(data as TPhoneSchema)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          type='button'
          variant={'outline'}
          size={'sm'}
        >
          Add Phone
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Phone number to receive payment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <div className='space-y-4'>
            <FormInputField
              control={form.control}
              name='phoneNumber'
              label='Phone Number'
            />
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant={'secondary'}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type='button'
              onClick={handleAdd}
            >
              Add
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
