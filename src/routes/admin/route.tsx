import { Pending } from '@/components/layouts/shared/pending'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppHeader } from '@/features/admin/components/layout/AppHeader'
import { AppSidebar } from '@/features/admin/components/layout/AppSidebar'

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { getUserQuery } from '@/api/lib/auth'
import { getProfileQuery } from '@/features/profile/api/get-profile'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  pendingComponent: () => <Pending />,
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
    } else if (user.role.toLowerCase() == 'student') {
      throw redirect({
        to: '/',
      })
    } else if (user.updatedAt == null) {
      // user is logged in but haven't changed his password
      throw redirect({
        to: '/auth/change-password',
        search: {
          redirect: location.href,
          email: user.email,
        },
      })
    }

    if (shouldRedirect) {
      throw redirect({
        to: '/auth/login',
        search: { redirect: location.href },
      })
    }

    let profile
    try {
      profile = await context.queryClient.ensureQueryData(getProfileQuery())
    } catch (error) {
      console.log(error)
    }
    if (!profile && !location.href.includes('/admin/profile/create')) {
      // redirect profile/create if profile is undefined
      throw redirect({
        to: '/admin/profile/create',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

function RouteComponent() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar variant='inset' />

      <SidebarInset className='overflow-x-hidden'>
        <AppHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
