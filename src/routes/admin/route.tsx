import { AppHeader } from '@/components/layouts/admin/AppHeader'
import { AppSidebar } from '@/components/layouts/admin/AppSidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  beforeLoad: async ({ location, context }) => {
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
  loader: async () => {
    // const defaultOpen = localStorage.getItem
    // return {defaultSidebarOpen: }
  },
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
