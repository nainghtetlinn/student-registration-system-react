import { CreateEntranceForm } from '@/features/student/components/create-entrance-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getEntranceFormQuery } from '@/api/student/get-entrance-form'

export const Route = createFileRoute('/student/register/entrance-form/$id')({
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
  const { formDetails } = Route.useLoaderData()

  return (
    <>
      <title>Register Entrance Form</title>

      <div className='flex justify-center pt-4'>
        <CreateEntranceForm formDetails={formDetails} />
      </div>
    </>
  )
}
