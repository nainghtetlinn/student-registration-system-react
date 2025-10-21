import { CreateReceipt } from '@/features/admin/roles/finance/components/create-receipt'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/receipts/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Create Receipt</title>

      <div className='flex justify-center pt-2'>
        <CreateReceipt />
      </div>
    </>
  )
}
