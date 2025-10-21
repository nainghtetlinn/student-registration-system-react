import { ReceiptsListTable } from '@/features/admin/roles/finance/components/receipts-list-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/receipts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Receipts</title>

      <ReceiptsListTable />
    </>
  )
}
