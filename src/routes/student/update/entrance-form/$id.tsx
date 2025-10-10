import { UpdateEntranceForm } from '@/features/student/components/update-entrance-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getEntranceFormQuery } from '@/api/student/get-entrance-form'

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
  const { formDetails, formData } = Route.useLoaderData()

  return (
    <>
      <title>Update Entrance Form</title>

      <div className='flex justify-center pt-4'>
        <UpdateEntranceForm
          formDetails={formDetails}
          formData={formData}
        />
      </div>
    </>
  )
}
