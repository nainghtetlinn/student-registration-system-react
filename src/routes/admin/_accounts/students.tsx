import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_accounts/students')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h2 className='px-2 py-4 font-bold'>Students</h2>
    </div>
  )
}
