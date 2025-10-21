import { Pending } from '@/components/layouts/shared/pending'
import { UpdateReceipt } from '@/features/admin/roles/finance/components/update-receipt'

import { createFileRoute } from '@tanstack/react-router'

import { getReceiptQuery } from '@/features/admin/roles/finance/api/get-receipt.api'

export const Route = createFileRoute('/admin/receipts/$id/update/')({
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
      <title>Edit Receipt</title>

      <div className='flex justify-center p-2'>
        <UpdateReceipt data={data} />
      </div>
    </>
  )
}
