import { ConfirmClosure } from '@/features/form/components/confirm-closure'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/forms/$id/confirm-closure/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <>
      <title>Close Form</title>

      <div className='flex justify-center p-2'>
        <ConfirmClosure id={id} />
      </div>
    </>
  )
}
