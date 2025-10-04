import { MultistepForm } from '@/components/multistep-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { useCreateEntranceForm } from '@/api/student/create-entrance-form'
import { getEntranceFormQuery } from '@/api/student/get-entrance-form'
import { paths } from '@/config/paths'
import { steps } from '@/features/student/components/entrance-form-input/steps'
import { defaultEntranceFormInput } from '@/features/student/lib/constants'
import { entranceFormInputSchema } from '@/features/student/schemas/entrance-form-schema'

export const Route = createFileRoute('/student/register/')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    let shouldRedirect = false

    try {
      const data = await context.queryClient.ensureQueryData(
        getEntranceFormQuery(),
      )
      if (data) shouldRedirect = true
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

  const form = useForm({
    resolver: zodResolver(entranceFormInputSchema),
    defaultValues: defaultEntranceFormInput,
  })

  const { mutate, isPending } = useCreateEntranceForm({
    onSuccess: () => {
      form.reset()
      router.navigate({
        to: paths.student.entranceForm.register.success.getHref(),
      })
    },
  })

  return (
    <>
      <title>Register entrance form</title>

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
