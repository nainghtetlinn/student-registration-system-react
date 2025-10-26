import { StudentsStatusDashboard } from '@/features/admin/roles/student-affair/components/students-status-dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/status/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Status</title>

      <StudentsStatusDashboard />
    </>
  )
}
