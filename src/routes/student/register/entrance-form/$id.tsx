import { CreateEntranceForm } from '@/features/student/components/create-entrance-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getOpenedFormsQuery } from '@/api/form/get-opened-forms'

export const Route = createFileRoute('/student/register/entrance-form/$id')({
  component: RouteComponent,
  onError: () => {
    throw redirect({
      to: '/',
    })
  },
  loader: async ({ context }) => {
    const openedForms = await context.queryClient.ensureQueryData(
      getOpenedFormsQuery(),
    )
    if (openedForms.length === 0) throw new Error('There is no opened form.')
    return openedForms
  },
})

function RouteComponent() {
  const openedForms = Route.useLoaderData()

  return (
    <>
      <title>Register Entrance Form</title>

      <div className='flex justify-center pt-4'>
        <CreateEntranceForm formDetails={openedForms[0]} />
      </div>
    </>
  )
}
