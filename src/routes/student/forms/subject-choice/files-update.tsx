import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { UpdateFilesForm } from '@/features/student/forms/subject-choice/components/update-files-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getSubjectChoiceFormQuery } from '@/features/student/forms/subject-choice/api/get.api'

export const Route = createFileRoute(
  '/student/forms/subject-choice/files-update',
)({
  component: RouteComponent,
  pendingComponent: () => <FormSkeleton />,
  onError: () => {
    throw redirect({
      to: '/student',
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
  const data = Route.useLoaderData()

  return (
    <>
      <title>Subject Choice Form</title>

      <div className='pt-4'>
        <UpdateFilesForm
          formDetails={data.formData}
          studentName={data.studentNameEng}
          files={{
            studentSignatureUrl: data.studentSignatureUrl,
            guardianName: data.guardianName,
            guardianSginatureUrl: data.guardianSginatureUrl,
          }}
          onSuccess={() => {
            navigate({ to: '/student' })
          }}
        />
      </div>
    </>
  )
}
