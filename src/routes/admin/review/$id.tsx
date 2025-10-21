import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/review/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello</div>
}
