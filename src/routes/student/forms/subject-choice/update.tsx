import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { UpdateSubjectChoiceForm } from '@/features/student/forms/subject-choice/components/update-subject-choice-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getEntranceFormQuery } from '@/features/student/forms/entrance/api/get.api'
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
    const { formDetails, formData } = await context.queryClient.ensureQueryData(
      getSubjectChoiceFormQuery(),
    )
    const { formData: entranceForm } =
      await context.queryClient.ensureQueryData(getEntranceFormQuery())
    return { formDetails, formData, entranceForm }
  },
})

function RouteComponent() {
  const { formDetails, formData, entranceForm } = Route.useLoaderData()

  return (
    <>
      <title>Subject Choice Form</title>

      <div className='pt-4'>
        <UpdateSubjectChoiceForm
          formDetails={formDetails}
          formData={formData}
          entranceForm={entranceForm}
        />
      </div>
    </>
  )
}
