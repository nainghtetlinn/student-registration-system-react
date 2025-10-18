import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { UploadFilesForm } from '@/features/student/forms/subject-choice/components/upload-files-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getSubjectChoiceFormQuery } from '@/features/student/forms/subject-choice/api/get.api'

export const Route = createFileRoute(
  '/student/forms/subject-choice/files-upload',
)({
  component: RouteComponent,
  pendingComponent: () => <FormSkeleton />,
  onError: () => {
    throw redirect({
      to: '/student/forms/subject-choice/create',
    })
  },
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(
      getSubjectChoiceFormQuery(),
    )
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { formDetails, formData } = Route.useLoaderData()

  return (
    <>
      <title>Subject Choice Form</title>

      <div className='pt-4'>
        <UploadFilesForm
          formDetails={formDetails}
          studentName={formData.student.name}
          onSuccess={() => {
            navigate({ to: '/student/forms/registration/create' })
          }}
        />
      </div>
    </>
  )
}
