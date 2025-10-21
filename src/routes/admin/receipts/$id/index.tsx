import { Pending } from '@/components/layouts/shared/pending'
import { ReceiptDetails } from '@/features/admin/roles/finance/components/receipt-details'

import { createFileRoute } from '@tanstack/react-router'

import { getReceiptQuery } from '@/features/admin/roles/finance/api/get-receipt.api'

export const Route = createFileRoute('/admin/receipts/$id/')({
  component: RouteComponent,
  pendingComponent: () => <Pending />,
  errorComponent: () => <div>Error</div>,
  loader: async ({ context, params }) => {
    return await context.queryClient.ensureQueryData(getReceiptQuery(params.id))
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <>
      <title>Receipt Details</title>

      <div className='flex justify-center p-2'>
        <ReceiptDetails data={data} />
      </div>
    </>
  )
}
