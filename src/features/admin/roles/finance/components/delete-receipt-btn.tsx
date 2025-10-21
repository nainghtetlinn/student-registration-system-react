import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Trash2 } from 'lucide-react'

import { useNavigate } from '@tanstack/react-router'

import { useDeleteReceipt } from '../api/delete-receipt.api'

export const DeleteReceiptBtn = ({ id }: { id: string }) => {
  const navigate = useNavigate()
  const { mutate, isPending } = useDeleteReceipt(id, {
    onSuccess: () => {
      navigate({ to: '/admin/receipts' })
    },
  })

  const handleDelete = () => {
    mutate()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={'destructive'}
          size={'icon'}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Receipt</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this receipt? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className='bg-destructive hover:bg-destructive/90 text-white'
          >
            Confirm {isPending && <Spinner />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
