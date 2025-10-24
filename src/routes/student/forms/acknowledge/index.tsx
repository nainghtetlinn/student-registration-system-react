import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { RulesForm } from '@/features/student/forms/acknowledge/components/rules-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getOpenedFormsQuery } from '@/features/form/api/get-opened-forms'

export const Route = createFileRoute('/student/forms/acknowledge/')({
  component: RouteComponent,
  pendingComponent: () => <FormSkeleton />,
  onError: () => {
    throw redirect({
      to: '/student',
    })
  },
  loader: async ({ context }) => {
    const openedForms = await context.queryClient.ensureQueryData(
      getOpenedFormsQuery(),
    )
    if (openedForms.length === 0) throw new Error('There is no opened form.')
    return { formDetails: openedForms[0] }
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { formDetails } = Route.useLoaderData()

  return (
    <>
      <title>Acknowledge</title>

      <div className='pt-4'>
        <RulesForm
          formDetails={formDetails}
          onSuccess={() => {
            navigate({ to: '/student/forms/success' })
          }}
        />
      </div>
    </>
  )
}
