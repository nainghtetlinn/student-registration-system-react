import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { CreateEntranceForm } from '@/features/student/forms/entrance/components/create-entrance-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getOpenedFormsQuery } from '@/api/form/get-opened-forms'

export const Route = createFileRoute('/student/forms/entrance/create')({
  component: RouteComponent,
  pendingComponent: () => <FormSkeleton />,
  onError: () => {
    throw redirect({
      to: '/student',
    })
  },
  loader: async ({ context }) => {
    const openedForms = await context.queryClient.ensureQueryData(
      getOpenedFormsQuery(),
    )
    if (openedForms.length === 0) throw new Error('There is no opened form.')
    return { formDetails: openedForms[0] }
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { formDetails } = Route.useLoaderData()

  return (
    <>
      <title>Entrance Form</title>

      <div className='pt-4'>
        <CreateEntranceForm
          formDetails={formDetails}
          onSuccess={() => {
            navigate({ to: '/student/forms/entrance/files-upload' })
          }}
        />
      </div>
    </>
  )
}
