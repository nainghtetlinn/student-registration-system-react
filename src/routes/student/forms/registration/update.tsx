import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { UpdateRegistrationForm } from '@/features/student/forms/registration/components/update-registration-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getRegistrationFormQuery } from '@/features/student/forms/registration/api/get.api'
import { fromDto } from '@/features/student/forms/registration/lib/registration-form-dto'

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
  const data = Route.useLoaderData()

  return (
    <>
      <title>Registration Form</title>

      <div className='pt-4'>
        <UpdateRegistrationForm
          formDetails={data.formData}
          formData={fromDto(data)}
          onSuccess={() => {
            navigate({ to: '/student/forms/registration/files-update' })
          }}
        />
      </div>
    </>
  )
}
