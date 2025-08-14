import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { User2, SquareSlash, ChartPie, UserPlus } from 'lucide-react'
import { AppSidebarGroup } from './AppSidebarGroup'
import { AppSidebarFooter } from './AppSidebarFooter'

import { paths } from '@/config/paths'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/shadcn.jpg',
  },
}

const contents = {
  register: [
    {
      name: 'Employee',
      href: '/admin/register/employee',
      icon: UserPlus,
    },
    {
      name: 'Student',
      href: '/admin/register/student',
      icon: UserPlus,
    },
  ],

  management: [
    {
      name: 'Reports',
      href: '/admin/reports',
      icon: ChartPie,
    },
  ],

  documents: [
    {
      name: 'Shortcuts',
      href: paths.admin.shortcuts.getHref(),
      icon: SquareSlash,
    },
  ],
}

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      collapsible='offcanvas'
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='/admin'>
                <User2 className='!size-5' />
                <span className='text-base font-semibold'>TUT Admin</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <AppSidebarGroup
          label='Register'
          items={contents.register}
        />
        <AppSidebarGroup
          label='Management'
          items={contents.management}
        />
        <AppSidebarGroup
          label='Documents'
          items={contents.documents}
        />
      </SidebarContent>

      <SidebarFooter>
        <AppSidebarFooter user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
