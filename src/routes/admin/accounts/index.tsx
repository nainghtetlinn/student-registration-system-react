import { AccountsListTable } from '@/features/admin/components/accounts-list-table'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/accounts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Accounts</title>

      <AccountsListTable />
    </>
  )
}
