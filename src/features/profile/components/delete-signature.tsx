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
import { Loader2, Trash2 } from 'lucide-react'

import { useDeleteProfileSignatureFile } from '@/api/profile/delete-file'
import { useState } from 'react'

export const DeleteSignature = () => {
  const [open, setOpen] = useState(false)

  const { mutate, isPending } = useDeleteProfileSignatureFile({
    onSuccess: () => {
      setOpen(false)
    },
    onError: () => {
      setOpen(false)
    },
  })

  const handleDelete = () => {
    mutate({})
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant='destructive'
          size='icon'
          className='border-background h-6 w-6 rounded-full border-2'
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You&apos;re deleting your profile signature
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant='destructive'
            disabled={isPending}
            onClick={handleDelete}
          >
            Delete{' '}
            {isPending ? <Loader2 className='animate-spin' /> : <Trash2 />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
