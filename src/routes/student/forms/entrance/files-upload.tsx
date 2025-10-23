import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { UploadFilesForm } from '@/features/student/forms/entrance/components/upload-files-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getEntranceFormQuery } from '@/features/student/forms/entrance/api/get.api'

export const Route = createFileRoute('/student/forms/entrance/files-upload')({
  component: RouteComponent,
  pendingComponent: () => <FormSkeleton />,
  onError: () => {
    throw redirect({
      to: '/student',
    })
  },
  loader: async ({ context }) => {
    const entranceForm = await context.queryClient.ensureQueryData(
      getEntranceFormQuery(),
    )

    if (entranceForm.studentPhotoUrl && entranceForm.studentSignatureUrl)
      throw redirect({
        to: '/student',
      })

    return entranceForm
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const data = Route.useLoaderData()

  return (
    <>
      <title>Entrance Form</title>

      <div className='pt-4'>
        <UploadFilesForm
          formDetails={data.formData}
          onSuccess={() => {
            navigate({ to: '/student/forms/subject-choice/create' })
          }}
        />
      </div>
    </>
  )
}
