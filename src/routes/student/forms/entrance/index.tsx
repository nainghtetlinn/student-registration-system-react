import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { EntranceFormDetails } from '@/features/student/forms/entrance/components/entrance-form-details'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getEntranceFormQuery } from '@/features/student/forms/entrance/api/get.api'
import { fromDto } from '@/features/student/forms/entrance/lib/entrance-form-dto'

export const Route = createFileRoute('/student/forms/entrance/')({
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
  const data = Route.useLoaderData()

  return (
    <>
      <title>Entrance Form</title>

      <div className='pt-4'>
        <EntranceFormDetails
          formDetails={data.formData}
          formData={fromDto(data)}
        />
      </div>
    </>
  )
}
