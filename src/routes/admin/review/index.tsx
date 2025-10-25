import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/review/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to='/admin' />
}
