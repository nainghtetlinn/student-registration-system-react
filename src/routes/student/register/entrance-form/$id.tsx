import { CreateEntranceForm } from '@/features/student/components/create-entrance-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/student/register/entrance-form/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <>
      <title>Register Entrance Form</title>

      <div className='flex justify-center pt-4'>
        <CreateEntranceForm id={id} />
      </div>
    </>
  )
}
