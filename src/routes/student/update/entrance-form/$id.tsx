import { createFileRoute, redirect } from '@tanstack/react-router'

import { getEntranceFormQuery } from '@/api/student/get-entrance-form'
import { UpdateEntranceForm } from '@/features/student/components/update-entrance-form'

export const Route = createFileRoute('/student/update/entrance-form/$id')({
  component: RouteComponent,
  onError: () => {
    throw redirect({
      to: '/',
    })
  },
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(getEntranceFormQuery())
  },
})

function RouteComponent() {
  const { id } = Route.useParams()
  const formData = Route.useLoaderData()

  return (
    <>
      <title>Update Entrance Form</title>

      <div className='flex justify-center pt-4'>
        <UpdateEntranceForm
          id={id}
          formData={formData}
        />
      </div>
    </>
  )
}
