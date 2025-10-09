import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/forms/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/forms/$id/"!</div>
}
