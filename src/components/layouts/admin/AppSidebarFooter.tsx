import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { EllipsisVertical, Loader2, LogOut, UserCircle2 } from 'lucide-react'

import { Link, useNavigate } from '@tanstack/react-router'

import { useLogout, useUser } from '@/api/lib/auth'
import { paths } from '@/config/paths'
import { useGetFile } from '@/features/profile/api/get-file'
import { useGetProfile } from '@/features/profile/api/get-profile'

export const AppSidebarFooter = () => {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()

  const logout = useLogout({
    onSuccess: () => {
      navigate({ to: '/' })
    },
  })

  const { data: user } = useUser()

  const { data: profile, isPending } = useGetProfile()

  const { fileUrl, loading } = useGetFile(
    profile?.photoUrl || null,
    'Profile Photo',
  )

  if (isPending) return <Skeleton className='h-[60px] w-full' />

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              {loading ? (
                <Skeleton className='h-8 w-8 rounded-lg' />
              ) : (
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={fileUrl || '/profile.png'}
                    alt={profile?.engName || 'username'}
                    className='object-cover'
                  />
                  <AvatarFallback className='rounded-lg'>
                    {profile?.engName
                      ? profile.engName.slice(0, 2).toUpperCase()
                      : '??'}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>
                  {profile?.engName || 'username'} ({user?.role})
                </span>
                <span className='text-muted-foreground truncate text-xs'>
                  {user?.email}
                </span>
              </div>
              <EllipsisVertical className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={8}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                {loading ? (
                  <Skeleton className='h-8 w-8 rounded-lg' />
                ) : (
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage
                      src={fileUrl || '/profile.png'}
                      alt={profile?.engName || 'username'}
                      className='object-cover'
                    />
                    <AvatarFallback className='rounded-lg'>
                      {profile?.engName
                        ? profile.engName.slice(0, 2).toUpperCase()
                        : '??'}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>
                    {profile?.engName || 'username'} ({user?.role})
                  </span>
                  <span className='text-muted-foreground truncate text-xs'>
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {user?.role !== 'Admin' && (
              <DropdownMenuItem asChild>
                <Link to={paths.admin.profile.root.getHref()}>
                  <UserCircle2 />
                  Profile
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => logout.mutate({})}
              disabled={logout.isPending}
            >
              {logout.isPending ? (
                <Loader2 className='animate-spin' />
              ) : (
                <LogOut />
              )}
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
