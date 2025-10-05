import { MultistepForm } from '@/components/multistep-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { getEntranceFormQuery } from '@/api/student/get-entrance-form'
import { useUpdateEntranceForm } from '@/api/student/update-entrance-form'
import { paths } from '@/config/paths'
import { steps } from '@/features/student/components/entrance-form-input/steps'
import { entranceFormToFormInput } from '@/features/student/lib/utils'
import { entranceFormInputSchema } from '@/features/student/schemas/entrance-form-schema'

export const Route = createFileRoute('/student/update/')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    let shouldRedirect = false

    try {
      const data = await context.queryClient.ensureQueryData(
        getEntranceFormQuery(),
      )
      if (!data) shouldRedirect = true
    } catch (error) {
      console.log(error)
      shouldRedirect = true
    }

    if (shouldRedirect)
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

  const form = useForm({
    resolver: zodResolver(entranceFormInputSchema),
    defaultValues: entranceFormToFormInput(formData),
  })

  const { mutate, isPending } = useUpdateEntranceForm({
    onSuccess: () => {
      form.reset()
      router.navigate({
        to: paths.student.update.success.getHref(),
      })
    },
  })

  return (
    <>
      <title>Update entrance form</title>

      <div className='w-full py-12'>
        <MultistepForm
          title='ကျောင်းဝင်မှတ်ပုံတင်ခွင့်ပုံစံ'
          description={`${new Date().getFullYear()}-${new Date().getFullYear() + 1} ပညာသင်နှစ်`}
          form={form}
          steps={steps}
          onSubmit={mutate}
          isPending={isPending}
        />
      </div>
    </>
  )
}
