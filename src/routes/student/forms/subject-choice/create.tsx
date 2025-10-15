import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { CreateSubjectChoiceForm } from '@/features/student/forms/subject-choice/components/create-subject-choice-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getOpenedFormsQuery } from '@/api/form/get-opened-forms'
import { getEntranceFormQuery } from '@/features/student/forms/entrance/api/get.api'

export const Route = createFileRoute('/student/forms/subject-choice/create')({
  component: RouteComponent,
  pendingComponent: () => <FormSkeleton />,
  onError: () => {
    throw redirect({
      to: '/',
    })
  },
  loader: async ({ context }) => {
    const openedForms = await context.queryClient.ensureQueryData(
      getOpenedFormsQuery(),
    )
    if (openedForms.length === 0) throw new Error('There is no opened form.')

    const entranceForm = await context.queryClient.ensureQueryData(
      getEntranceFormQuery(),
    )

    return {
      formDetails: openedForms[0],
      entranceForm: entranceForm.formData,
    }
  },
})

function RouteComponent() {
  const { formDetails, entranceForm } = Route.useLoaderData()

  return (
    <>
      <title>Subject Choice Form</title>

      <div className='pt-4'>
        <CreateSubjectChoiceForm
          formDetails={formDetails}
          entranceForm={entranceForm}
        />
      </div>
    </>
  )
}
