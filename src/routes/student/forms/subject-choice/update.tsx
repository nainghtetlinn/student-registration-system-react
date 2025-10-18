import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { UpdateSubjectChoiceForm } from '@/features/student/forms/subject-choice/components/update-subject-choice-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getSubjectChoiceFormQuery } from '@/features/student/forms/subject-choice/api/get.api'

export const Route = createFileRoute('/student/forms/subject-choice/update')({
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
  const { formDetails, formData } = Route.useLoaderData()

  return (
    <>
      <title>Subject Choice Form</title>

      <div className='pt-4'>
        <UpdateSubjectChoiceForm
          formDetails={formDetails}
          formData={formData}
          onSuccess={() => {
            navigate({ to: '/student/forms/subject-choice/files-update' })
          }}
        />
      </div>
    </>
  )
}
