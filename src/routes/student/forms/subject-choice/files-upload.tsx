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
      to: '/student',
    })
  },
  loader: async ({ context }) => {
    const subjectChoiceForm = await context.queryClient.ensureQueryData(
      getSubjectChoiceFormQuery(),
    )

    if (
      subjectChoiceForm.studentSignatureUrl &&
      subjectChoiceForm.guardianSginatureUrl &&
      subjectChoiceForm.guardianName
    )
      throw redirect({
        to: '/student',
      })

    return subjectChoiceForm
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const data = Route.useLoaderData()

  return (
    <>
      <title>Subject Choice Form</title>

      <div className='pt-4'>
        <UploadFilesForm
          formDetails={data.formData}
          studentName={data.studentNameEng}
          onSuccess={() => {
            navigate({ to: '/student/forms/registration/create' })
          }}
        />
      </div>
    </>
  )
}
