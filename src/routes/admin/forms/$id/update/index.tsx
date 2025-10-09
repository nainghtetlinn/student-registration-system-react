import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/forms/$id/update/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/forms/$id/update/"!</div>
}
