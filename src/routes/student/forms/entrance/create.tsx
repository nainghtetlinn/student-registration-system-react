import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { CreateEntranceForm } from '@/features/student/forms/entrance/components/create-entrance-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getOpenedFormsQuery } from '@/features/form/api/get-opened-forms'
import { getEntranceFormQuery } from '@/features/student/forms/entrance/api/get.api'

export const Route = createFileRoute('/student/forms/entrance/create')({
  component: RouteComponent,
  pendingComponent: () => <FormSkeleton />,
  onError: () => {
    throw redirect({
      to: '/student',
    })
  },
  loader: async ({ context }) => {
    let shouldRedirect = false

    const openedForms = await context.queryClient.ensureQueryData(
      getOpenedFormsQuery(),
    )
    if (openedForms.length === 0) shouldRedirect = true

    let shouldGoToNext = false
    try {
      const entranceForm = await context.queryClient.ensureQueryData(
        getEntranceFormQuery(),
      )
      if (entranceForm) shouldRedirect = true
      if (!entranceForm.studentPhotoUrl || !entranceForm.studentSignatureUrl)
        shouldGoToNext = true
    } catch (error) {
      console.log(error)
    }

    if (shouldGoToNext)
      throw redirect({
        to: '/student/forms/entrance/files-upload',
      })

    if (shouldRedirect)
      throw redirect({
        to: '/student',
      })

    return { formDetails: openedForms[0] }
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { formDetails } = Route.useLoaderData()

  return (
    <>
      <title>Entrance Form</title>

      <div className='pt-4'>
        <CreateEntranceForm
          formDetails={formDetails}
          onSuccess={() => {
            navigate({ to: '/student/forms/entrance/files-upload' })
          }}
        />
      </div>
    </>
  )
}
