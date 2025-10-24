import { ReceiptForm } from './ui/receipt-form'

import { useNavigate } from '@tanstack/react-router'

import { useCreateReceipt } from '../api/create-receipt.api'

export const CreateReceipt = () => {
  const navigate = useNavigate()

  const { mutate, isPending } = useCreateReceipt({
    onSuccess: () => {
      navigate({ to: '..' })
    },
  })

  return (
    <ReceiptForm
      title='Create receipt'
      description='Click save to create receipt'
      isPending={isPending}
      onSubmit={mutate}
      defaultValues={{
        year: '',
        data: [],
        phoneNumbers: [],
      }}
    />
  )
}
