import { AccountsListTable } from '@/features/admin/components/accounts-list-table'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/accounts/deans')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Deans</title>

      <AccountsListTable
        queryKey={['accounts', 'dean']}
        search={{ role: 'Dean' }}
      />
    </>
  )
}
