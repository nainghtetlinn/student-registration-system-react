import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { SubjectChoiceFormDetails } from '@/features/student/forms/subject-choice/components/subject-choice-form-details'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getSubjectChoiceFormQuery } from '@/features/student/forms/subject-choice/api/get.api'
import { fromDto } from '@/features/student/forms/subject-choice/lib/subject-choice-form-dto'

export const Route = createFileRoute('/student/forms/subject-choice/')({
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
  const data = Route.useLoaderData()

  return (
    <>
      <title>Subject Choice Form</title>

      <div className='pt-4'>
        <SubjectChoiceFormDetails
          formDetails={data.formData}
          formData={fromDto(data)}
        />
      </div>
    </>
  )
}
