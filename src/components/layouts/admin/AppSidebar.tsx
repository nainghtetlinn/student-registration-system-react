import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  ChartPie,
  File,
  FilePlus2,
  SquareSlash,
  User2,
  UserRoundCog,
  UserRoundPlus,
} from 'lucide-react'
import { AppSidebarFooter } from './AppSidebarFooter'
import { AppSidebarGroup } from './AppSidebarGroup'

import { paths } from '@/config/paths'

const contents = {
  accounts: [
    {
      name: 'Staffs',
      href: paths.admin.staffs.getHref(),
      icon: UserRoundCog,
    },
    {
      name: 'Students',
      href: paths.admin.students.getHref(),
      icon: User2,
    },
    {
      name: 'Register',
      href: paths.admin.register.getHref(),
      icon: UserRoundPlus,
    },
  ],

  forms: [
    {
      name: 'Forms',
      href: paths.admin.forms.root.getHref(),
      icon: File,
    },
    {
      name: 'Create',
      href: paths.admin.forms.create.getHref(),
      icon: FilePlus2,
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
          label='Accounts'
          items={contents.accounts}
        />
        <AppSidebarGroup
          label='Forms'
          items={contents.forms}
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
        <AppSidebarFooter />
      </SidebarFooter>
    </Sidebar>
  )
}
