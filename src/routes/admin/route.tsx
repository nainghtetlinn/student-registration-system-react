import { AppHeader } from '@/components/layouts/admin/AppHeader'
import { AppSidebar } from '@/components/layouts/admin/AppSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { paths } from '@/config/paths'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ location, context }) => {
    const user = context.queryClient.getQueryData(['user'])
    if (!user) {
      throw redirect({
        to: paths.auth.login.getHref(location.href),
      })
    }
  },
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
