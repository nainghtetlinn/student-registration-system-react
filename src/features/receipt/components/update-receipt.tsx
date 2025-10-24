import { ReceiptForm } from './ui/receipt-form'

import type { TReceipt } from '@/types/receipt'

import { useNavigate } from '@tanstack/react-router'

import { useUpdateReceipt } from '../api/update-receipt.api'

export const UpdateReceipt = ({ data: receipt }: { data: TReceipt }) => {
  const navigate = useNavigate()

  const { mutate, isPending } = useUpdateReceipt(receipt.id.toString(), {
    onSuccess: () => {
      navigate({ to: '..' })
    },
  })

  return (
    <ReceiptForm
      title='Update receipt'
      description='Click save to update receipt'
      isPending={isPending}
      onSubmit={mutate}
      defaultValues={{
        year: receipt.year,
        data: receipt.data,
        phoneNumbers: receipt.phoneNumbers,
      }}
    />
  )
}
