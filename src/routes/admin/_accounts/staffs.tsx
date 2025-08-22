import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_accounts/staffs')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Admin | Staffs</title>

      <div>
        <h2 className='px-2 py-4 font-bold'>Staffs</h2>
      </div>
    </>
  )
}
