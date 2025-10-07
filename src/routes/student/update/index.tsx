import { EntranceForm } from '@/features/student/components/entrance-form'

import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'

import { getEntranceFormQuery } from '@/api/student/get-entrance-form'
import { useUpdateEntranceForm } from '@/api/student/update-entrance-form'
import { paths } from '@/config/paths'

export const Route = createFileRoute('/student/update/')({
  component: RouteComponent,
  onError: () => {
    throw redirect({
      to: paths.home.getHref(),
    })
  },
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(getEntranceFormQuery())
  },
})

function RouteComponent() {
  const router = useRouter()
  const formData = Route.useLoaderData()

  const { mutate, isPending } = useUpdateEntranceForm({
    onSuccess: () => {
      router.navigate({
        to: paths.student.update.success.getHref(),
      })
    },
  })

  return (
    <>
      <title>Update entrance form</title>

      <div className='flex justify-center pt-4'>
        <EntranceForm
          isPending={isPending}
          onSubmit={mutate}
          defaultValues={formData}
        />
      </div>
    </>
  )
}
