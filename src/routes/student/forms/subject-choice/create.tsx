import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { CreateSubjectChoiceForm } from '@/features/student/forms/subject-choice/components/create-subject-choice-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getEntranceFormQuery } from '@/features/student/forms/entrance/api/get.api'

export const Route = createFileRoute('/student/forms/subject-choice/create')({
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
  const { formDetails, formData: entranceForm } = Route.useLoaderData()

  return (
    <>
      <title>Subject Choice Form</title>

      <div className='pt-4'>
        <CreateSubjectChoiceForm
          formDetails={formDetails}
          entranceForm={entranceForm}
          onSuccess={() => {
            navigate({ to: '/student/forms/subject-choice/files-upload' })
          }}
        />
      </div>
    </>
  )
}
