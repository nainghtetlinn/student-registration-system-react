import { AccountsListTable } from '@/features/admin/components/accounts-list-table'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/accounts/students')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Students</title>

      <AccountsListTable
        queryKey={['accounts', 'student']}
        search={{ role: 'Student' }}
      />
    </>
  )
}
