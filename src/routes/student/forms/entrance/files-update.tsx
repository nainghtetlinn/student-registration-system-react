import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { UpdateFilesForm } from '@/features/student/forms/entrance/components/update-files-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getEntranceFormQuery } from '@/features/student/forms/entrance/api/get.api'

export const Route = createFileRoute('/student/forms/entrance/files-update')({
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
  const data = Route.useLoaderData()

  return (
    <>
      <title>Entrance Form</title>

      <div className='pt-4'>
        <UpdateFilesForm
          formDetails={data.formData}
          files={{
            studentPhotoUrl: data.studentPhotoUrl,
            studentSignatureUrl: data.studentSignatureUrl,
          }}
          onSuccess={() => {
            navigate({ to: '/student' })
          }}
        />
      </div>
    </>
  )
}
