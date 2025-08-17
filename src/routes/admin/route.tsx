import { AppHeader } from '@/components/layouts/admin/AppHeader'
import { AppSidebar } from '@/components/layouts/admin/AppSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ location, context }) => {
    const user = context.queryClient.getQueryData(['user'])
    if (!user) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar variant='inset' />

      <SidebarInset>
        <AppHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
