import { AccountsListTable } from '@/features/admin/components/accounts-list-table'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/accounts/student-affairs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Student Affairs</title>

      <AccountsListTable
        queryKey={['accounts', 'student-affair']}
        search={{ role: 'Student Affair' }}
      />
    </>
  )
}
