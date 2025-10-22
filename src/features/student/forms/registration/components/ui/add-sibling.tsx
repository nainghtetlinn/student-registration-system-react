import { NrcInput } from '@/components/nrc-input'
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

import {
  siblingSchema,
  type TSiblingSchema,
} from '../../schema/registration-form.schema'

export const AddSibling = ({
  append,
}: {
  append: (data: TSiblingSchema) => void
}) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(siblingSchema),
    defaultValues: {
      name: '',
      address: '',
      job: '',
      nrc: { stateCode: '', townshipCode: '', nrcType: '', nrcNumber: '' },
    },
  })

  const handleAdd = async () => {
    const isValid = await form.trigger()
    if (!isValid) return

    const data = form.getValues()
    append(data)
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
          className='w-full'
        >
          Add Sibling
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Sibling</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <div className='space-y-4'>
            <FormInputField
              control={form.control}
              name='name'
              placeholder='အမည်'
            />
            <NrcInput
              control={form.control}
              stateCodeName='nrc.stateCode'
              townshipCodeName='nrc.townshipCode'
              nrcTypeName='nrc.nrcType'
              nrcNumberName='nrc.nrcNumber'
            />
            <FormInputField
              control={form.control}
              name='job'
              placeholder='အလုပ်အကိုင်'
            />
            <FormInputField
              control={form.control}
              name='address'
              placeholder='နေရပ်လိပ်စာ'
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
