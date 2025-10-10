import { Pending } from '@/components/layouts/shared/pending'
import { UpdateForm } from '@/features/form/components/update-form'

import { getFormQuery } from '@/api/form/get-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/forms/$id/update/')({
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
      <title>Update Form</title>

      <div className='flex justify-center p-2'>
        <UpdateForm data={formDetails} />
      </div>
    </>
  )
}
