import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { UpdateEntranceForm } from '@/features/student/forms/entrance/components/update-entrance-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getEntranceFormQuery } from '@/features/student/forms/entrance/api/get.api'

export const Route = createFileRoute('/student/forms/entrance/update')({
  component: RouteComponent,
  pendingComponent: () => <FormSkeleton />,
  onError: () => {
    throw redirect({
      to: '/student',
    })
  },
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(getEntranceFormQuery())
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { formDetails, formData } = Route.useLoaderData()

  return (
    <>
      <title>Entrance Form</title>

      <div className='pt-4'>
        <UpdateEntranceForm
          formDetails={formDetails}
          formData={formData}
          onSuccess={() => {
            navigate({ to: '/student/forms/entrance/files-update' })
          }}
        />
      </div>
    </>
  )
}
