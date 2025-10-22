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

import { dataSchema, type TDataSchema } from '../schema/receipt.schema'

export const AddData = ({
  append,
}: {
  append: (data: TDataSchema) => void
}) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(dataSchema),
    defaultValues: {
      name: '',
      amount: '',
    },
  })

  const handleAdd = async () => {
    const isValid = await form.trigger()
    if (!isValid) return

    const data = form.getValues()
    append(data as TDataSchema)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button type='button'>Add Data</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Data</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <div className='space-y-4'>
            <FormInputField
              control={form.control}
              name='name'
              label='Name'
            />
            <FormInputField
              control={form.control}
              name='amount'
              label='Amount'
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
