import { EntranceForm } from '@/features/student/components/entrance-form'

import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'

import { useCreateEntranceForm } from '@/api/student/create-entrance-form'
import { getEntranceFormQuery } from '@/api/student/get-entrance-form'
import { paths } from '@/config/paths'
import { entranceFormDefaults } from '@/features/student/schemas/entrance-form-schema'

export const Route = createFileRoute('/student/register/')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    let shouldRedirect = false

    try {
      const form = await context.queryClient.ensureQueryData(
        getEntranceFormQuery(),
      )
      if (form) shouldRedirect = true
    } catch (error) {
      console.log(error)
    }

    if (shouldRedirect)
      throw redirect({
        to: paths.home.getHref(),
      })
  },
})

function RouteComponent() {
  const router = useRouter()

  const { mutate, isPending } = useCreateEntranceForm({
    onSuccess: () => {
      router.navigate({
        to: paths.student.register.success.getHref(),
      })
    },
  })

  return (
    <>
      <title>Register entrance form</title>

      <div className='flex justify-center pt-4'>
        <EntranceForm
          isPending={isPending}
          onSubmit={mutate}
          defaultValues={entranceFormDefaults}
        />
      </div>
    </>
  )
}
