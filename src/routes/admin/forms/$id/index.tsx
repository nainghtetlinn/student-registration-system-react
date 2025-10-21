import { Pending } from '@/components/layouts/shared/pending'
import { FormDetails } from '@/features/form/components/form-details'

import { createFileRoute } from '@tanstack/react-router'

import { getFormQuery } from '@/features/form/api/get-form'

export const Route = createFileRoute('/admin/forms/$id/')({
  component: RouteComponent,
  pendingComponent: () => <Pending />,
  errorComponent: () => <div>Error</div>,
  loader: async ({ context, params }) => {
    return await context.queryClient.ensureQueryData(getFormQuery(params.id))
  },
})

function RouteComponent() {
  const formDetails = Route.useLoaderData()

  return (
    <>
      <title>Form Details</title>

      <div className='flex justify-center p-2'>
        <FormDetails data={formDetails} />
      </div>
    </>
  )
}
