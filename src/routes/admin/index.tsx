import { FinanceDashboard } from '@/features/admin/roles/finance/components/dashboard'

import { createFileRoute } from '@tanstack/react-router'

import { useUser } from '@/api/lib/auth'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user } = useUser()

  if (user?.role.toLowerCase() === 'dean') return <FinanceDashboard />

  return <div>This is protected route</div>
}
