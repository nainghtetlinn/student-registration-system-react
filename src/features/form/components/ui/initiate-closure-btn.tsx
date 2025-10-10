import { useInitiateClosure } from '@/api/form/initiate-closure'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
import { Spinner } from '@/components/ui/spinner'
import { useNavigate } from '@tanstack/react-router'
import { AlertCircleIcon, FileX2 } from 'lucide-react'

import { useState } from 'react'

export const InitiateClosureBtn = ({ id }: { id: string }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const { mutate, isPending } = useInitiateClosure(id, {
    onSuccess: () => {
      navigate({ to: '/admin/forms/$id/confirm-closure', params: { id } })
    },
  })

  const handleClose = () => {
    mutate({})
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant={'destructive'}
          className='w-full'
        >
          <FileX2 />
          Close this form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>You&apos;re closing this form</DialogDescription>
        </DialogHeader>
        <Alert
          variant='destructive'
          className='border-red-500/50'
        >
          <AlertCircleIcon />
          <AlertTitle>Close Form</AlertTitle>
          <AlertDescription>
            <p>
              Once closed, this form can’t be edited or reopened. Please confirm
              — this action is{' '}
              <span className='font-semibold'>irreversible.</span>
            </p>
          </AlertDescription>
        </Alert>
        <DialogFooter>
          <Button
            variant={'outline'}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant={'destructive'}
            disabled={isPending}
            onClick={handleClose}
          >
            Close {isPending && <Spinner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
