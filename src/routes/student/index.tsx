import { EntranceFormDetails } from '@/features/student/components/entrance-form-details'

import { createFileRoute } from '@tanstack/react-router'

import {
  getEntranceFormQuery,
  useGetEntranceForm,
} from '@/api/student/get-entrance-form'

export const Route = createFileRoute('/student/')({
  pendingComponent: () => <div>Loading</div>,
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getEntranceFormQuery())
  },
})

function RouteComponent() {
  const { data } = useGetEntranceForm()

  if (!data) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <h4>No entrance form data found.</h4>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen items-center justify-center py-12'>
      <EntranceFormDetails data={data} />
    </div>
  )
}
