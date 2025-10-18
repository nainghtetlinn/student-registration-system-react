import { AccountsListTable } from '@/features/admin/components/accounts-list-table'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/accounts/finances')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Finances</title>

      <AccountsListTable
        queryKey={['accounts', 'finance']}
        search={{ role: 'Finance' }}
      />
    </>
  )
}
