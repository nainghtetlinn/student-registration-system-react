import { StudentsListTable } from '@/features/admin/components/students-list-table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_accounts/students')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Admin | Students</title>

      <StudentsListTable />
    </>
  )
}
