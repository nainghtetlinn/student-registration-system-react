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
  FileText,
  PlusCircle,
  ShieldUser,
  SquareSlash,
  Ticket,
  User2,
  UserRoundCog,
} from 'lucide-react'
import { AppSidebarFooter } from './AppSidebarFooter'
import { AppSidebarGroup } from './AppSidebarGroup'

import { useUser } from '@/api/lib/auth'

const contents = {
  admin: [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: ShieldUser,
    },
  ],

  finance: [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: ShieldUser,
    },
  ],

  affair: [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: ShieldUser,
    },
  ],

  accounts: [
    {
      name: 'Accounts',
      href: '/admin/accounts',
      icon: UserRoundCog,
    },
    {
      name: 'Register',
      href: '/admin/accounts/register',
      icon: PlusCircle,
    },
  ],

  forms: [
    {
      name: 'Forms',
      href: '/admin/forms',
      icon: FileText,
    },
    {
      name: 'Create Form',
      href: '/admin/forms/create',
      icon: PlusCircle,
    },
  ],

  receipts: [
    {
      name: 'Receipts',
      href: '/admin/receipts',
      icon: Ticket,
    },
    {
      name: 'Create Receipt',
      href: '/admin/receipts/create',
      icon: PlusCircle,
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
      href: '/admin/shortcuts',
      icon: SquareSlash,
    },
  ],
}

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { data: user } = useUser()

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
        {user?.role === 'Admin' && (
          <AppSidebarGroup
            label='Admin'
            items={contents.admin}
          />
        )}
        {user?.role === 'Admin' && (
          <AppSidebarGroup
            label='Accounts'
            items={contents.accounts}
          />
        )}
        {user?.role === 'Admin' && (
          <AppSidebarGroup
            label='Forms'
            items={contents.forms}
          />
        )}
        {user?.role === 'Finance' && (
          <AppSidebarGroup
            label='Finance'
            items={contents.finance}
          />
        )}
        {user?.role === 'Finance' && (
          <AppSidebarGroup
            label='Receipts'
            items={contents.receipts}
          />
        )}
        {user?.role === 'Student Affair' && (
          <AppSidebarGroup
            label='Student Affair'
            items={contents.affair}
          />
        )}

        {/* <AppSidebarGroup
          label='Management'
          items={contents.management}
        /> */}

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
