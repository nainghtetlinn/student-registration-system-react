import { getUserQuery } from '@/api/lib/auth'
import { getProfileQuery } from '@/api/profile/get-profile'
import { AppHeader } from '@/components/layouts/admin/AppHeader'
import { AppSidebar } from '@/components/layouts/admin/AppSidebar'
import { Pending } from '@/components/layouts/shared/pending'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { paths } from '@/config/paths'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
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
    } else if (user.updatedAt == null) {
      // user is logged in but haven't changed his password
      throw redirect({
        to: paths.auth.changePassword.getHref(),
        search: {
          redirect: location.href,
          email: user.email,
        },
      })
    }

    if (shouldRedirect) {
      throw redirect({
        to: paths.auth.login.getHref(location.href),
      })
    }

    let profile
    try {
      profile = await context.queryClient.ensureQueryData(getProfileQuery())
    } catch (error) {
      console.log(error)
    }
    if (
      !profile &&
      !location.href.includes(paths.admin.profile.create.getHref())
    ) {
      // redirect profile/create if profile is undefined
      throw redirect({
        to: paths.admin.profile.create.getHref(),
        search: {
          redirect: location.href,
        },
      })
    }
  },
  pendingComponent: () => <Pending />,
  component: RouteComponent,
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
