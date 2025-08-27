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

import { useDeleteProfileFile } from '@/api/profile/delete-file'

export const DeleteProfilePhoto = () => {
  const { mutate, isPending } = useDeleteProfileFile()

  const handleDelete = () => {
    mutate({})
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='destructive'
          size='icon'
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You&apos;re deleting your profile photo
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
