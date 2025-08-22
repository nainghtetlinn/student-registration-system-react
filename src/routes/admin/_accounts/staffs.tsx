import { StaffsListTable } from '@/features/admin/components/staffs-list-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_accounts/staffs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Admin | Staffs</title>

      <StaffsListTable />
    </>
  )
}
