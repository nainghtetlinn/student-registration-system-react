import { ReceiptDetails } from '@/features/admin/roles/finance/components/receipt-details'
import { Skeleton } from '@/components/ui/skeleton'

import { createFileRoute } from '@tanstack/react-router'

import { useGetReceipt } from '@/features/admin/roles/finance/api/get-receipt.api'

export const Route = createFileRoute('/admin/receipts/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  const { data, isPending, isError } = useGetReceipt(id)

  if (isPending)
    return (
      <>
        <title>Loading...</title>
        <div className='flex justify-center p-2'>
          <Skeleton className='h-[550px] w-full max-w-lg' />
        </div>
      </>
    )

  if (isError)
    return (
      <>
        <title>Error</title>
        <div className='flex justify-center p-2'>
          <div>Something went wrong</div>
        </div>
      </>
    )

  return (
    <>
      <title>Receipt Details</title>

      <div className='flex justify-center p-2'>
        <ReceiptDetails data={data} />
      </div>
    </>
  )
}
