import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

import { useState } from 'react'

import { useRejectStudent } from '../../api/reject-student.api'

export const RejectBtn = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useRejectStudent(id, {
    onSuccess: () => {
      setOpen(false)
    },
  })

  const handleReject = () => {
    mutate({})
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
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
        <DialogFooter>
          <Button
            variant={'secondary'}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleReject}
            disabled={isPending}
            variant={'destructive'}
          >
            Reject {isPending && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
