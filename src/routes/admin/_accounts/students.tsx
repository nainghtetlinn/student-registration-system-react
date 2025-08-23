import { AccountsListTable } from '@/features/admin/components/accounts-list-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_accounts/students')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Admin | Students</title>

      <AccountsListTable
        queryKey={['students']}
        search={{ role: 'Student' }}
      />
    </>
  )
}
