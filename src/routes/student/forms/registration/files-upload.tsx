import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { UploadFilesForm } from '@/features/student/forms/registration/components/upload-files-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getRegistrationFormQuery } from '@/features/student/forms/registration/api/get.api'

export const Route = createFileRoute(
  '/student/forms/registration/files-upload',
)({
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
  const { formDetails } = Route.useLoaderData()

  return (
    <>
      <title>Registration Form</title>

      <div className='pt-4'>
        <UploadFilesForm
          formDetails={formDetails}
          onSuccess={() => {
            navigate({
              to: '/student',
            })
          }}
        />
      </div>
    </>
  )
}
