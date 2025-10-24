import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { FormInputField } from '@/components/ui/form-fields'
import { Spinner } from '@/components/ui/spinner'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useRejectStudent } from '../../api/reject-student.api'
import { rejectStudentSchema } from '../../schema/reject-student.schema'

export const RejectBtn = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(rejectStudentSchema),
    defaultValues: { rejectionMessage: '' },
  })

  const { mutate, isPending } = useRejectStudent(id, {
    onSuccess: () => {
      setOpen(false)
      form.reset()
    },
  })

  const handleReject = async () => {
    const isValid = await form.trigger()
    if (!isValid) return

    const data = form.getValues()
    mutate(data)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          type='button'
          variant={'destructive'}
        >
          Reject
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You&apos;re rejecting this student form
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div>
            <FormInputField
              control={form.control}
              name='rejectionMessage'
              label='Message'
            />
          </div>
          <DialogFooter>
            <Button
              variant={'secondary'}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              variant={'destructive'}
              onClick={handleReject}
            >
              Reject {isPending && <Spinner />}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
