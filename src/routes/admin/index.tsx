import { Pending } from '@/components/layouts/shared/pending'
import { FinanceDashboard } from '@/features/admin/roles/finance/components/dashboard'
import { StudentAffairDashboard } from '@/features/admin/roles/student-affair/components/dashboard'

import { createFileRoute, Navigate } from '@tanstack/react-router'

import { useUser } from '@/api/lib/auth'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user, isPending, isError } = useUser()

  if (isPending) return <Pending />

  if (isError) return <div>Something went wrong.</div>

  if (user.role === 'Finance') return <FinanceDashboard />

  if (user.role === 'Student Affair') return <StudentAffairDashboard />

  return <Navigate to='/admin/accounts' />
}
