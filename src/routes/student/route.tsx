import { Footer } from '@/components/layouts/shared/footer'
import { Header } from '@/components/layouts/shared/header'
import { Pending } from '@/components/layouts/shared/pending'

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { getUserQuery } from '@/api/lib/auth'

export const Route = createFileRoute('/student')({
  pendingComponent: Pending,
  component: RouteComponent,
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
        to: '/auth/login',
        search: {
          redirect: location.href,
        },
      })
    }

    if (user?.role.toLowerCase() !== 'student') {
      throw redirect({
        to: '/',
      })
    }
  },
})

function RouteComponent() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
