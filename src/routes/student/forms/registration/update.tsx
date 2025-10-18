import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { getRegistrationFormQuery } from '@/features/student/forms/registration/api/get.api'
import { UpdateRegistrationForm } from '@/features/student/forms/registration/components/update-registration-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/student/forms/registration/update')({
  component: RouteComponent,
  pendingComponent: () => <FormSkeleton />,
  onError: () => {
    throw redirect({
      to: '/student',
    })
  },
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(getRegistrationFormQuery())
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { formDetails, formData } = Route.useLoaderData()

  return (
    <>
      <title>Registration Form</title>

      <div className='pt-4'>
        <UpdateRegistrationForm
          formDetails={formDetails}
          formData={formData}
          onSuccess={() => {
            navigate({ to: '/student/forms/registration/files-update' })
          }}
        />
      </div>
    </>
  )
}
