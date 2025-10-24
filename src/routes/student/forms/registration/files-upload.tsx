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
    const registrationForm = await context.queryClient.ensureQueryData(
      getRegistrationFormQuery(),
    )

    if (
      registrationForm.studentSignatureUrl &&
      registrationForm.guardianSginatureUrl &&
      registrationForm.guardianName
    )
      throw redirect({
        to: '/student',
      })

    return registrationForm
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const data = Route.useLoaderData()

  return (
    <>
      <title>Registration Form</title>

      <div className='pt-4'>
        <UploadFilesForm
          formDetails={data.formData}
          onSuccess={() => {
            navigate({
              to: '/student/forms/payment',
            })
          }}
        />
      </div>
    </>
  )
}
