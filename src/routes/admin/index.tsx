import { FinanceDashboard } from '@/features/admin/roles/finance/components/dashboard'
import { StudentAffairDashboard } from '@/features/admin/roles/student-affair/components/dashboard'

import { createFileRoute } from '@tanstack/react-router'

import { useUser } from '@/api/lib/auth'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user } = useUser()

  if (user?.role.toLowerCase() === 'finance') return <FinanceDashboard />

  if (user?.role.toLowerCase() === 'student affair')
    return <StudentAffairDashboard />

  return <div>This is protected route</div>
}
