import { Pending } from '@/components/layouts/shared/pending'

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { getUserQuery } from '@/api/lib/auth'
import { Header } from '@/components/layouts/student/Header'
import { paths } from '@/config/paths'

export const Route = createFileRoute('/student')({
  beforeLoad: async ({ location, context }) => {
    let shouldRedirect = false

    const status = context.queryClient.getQueryState(['auth', 'user'])?.status

    if (!status || status == 'error') {
      shouldRedirect = true
    }

    let user
    try {
      user = await context.queryClient.ensureQueryData(getUserQuery())
    } catch (error) {
      console.log(error)
      shouldRedirect = true
    }
    if (!user) {
      shouldRedirect = true
    }

    if (shouldRedirect) {
      throw redirect({
        to: paths.auth.login.getHref(location.href),
      })
    }

    if (user?.role.toLowerCase() !== 'student') {
      throw redirect({
        to: paths.home.getHref(),
      })
    }
  },
  pendingComponent: Pending,
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
