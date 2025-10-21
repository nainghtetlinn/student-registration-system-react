import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { getOpenedFormsQuery } from '@/features/form/api/get-opened-forms'

export const Route = createFileRoute('/student/forms')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    let shouldRedirect = false

    try {
      const openedForms = await context.queryClient.ensureQueryData(
        getOpenedFormsQuery(),
      )
      if (openedForms.length === 0) shouldRedirect = true
    } catch (error) {
      console.log(error)
      shouldRedirect = true
    }

    if (shouldRedirect) {
      throw redirect({
        to: '/student',
      })
    }
  },
})

function RouteComponent() {
  return <Outlet />
}
