import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogIn, LogOut } from 'lucide-react'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'

import { useLogout } from '@/api/lib/auth'
import { paths } from '@/config/paths'
import type { TUser } from '@/types/user'

export const UserAvatar = () => {
  const router = useRouter()
  const qc = useQueryClient()

  const logout = useLogout({
    onSuccess: () => {
      toast.success('Logout successfully')
      router.navigate({
        to: paths.home.getHref(),
      })
    },
  })
  const user = qc.getQueryData(['auth', 'user']) as TUser | undefined | null

  const handleLogout = () => {
    logout.mutate({})
  }

  const handleLogin = () => {
    router.navigate({
      to: paths.auth.login.getHref(),
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='cursor-pointer'>
          <Avatar>
            <AvatarImage
              src={'/shadcn.jpg'}
              alt={user?.name || 'username'}
            />
            <AvatarFallback>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {user && (
          <>
            <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={'/shadcn.jpg'}
                  alt={user?.name || 'username'}
                />
                <AvatarFallback className='rounded-lg'>
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : '??'}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user?.role}</span>
                <span className='text-muted-foreground truncate text-xs'>
                  {user?.email}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        {user && (
          <DropdownMenuItem
            className='cursor-pointer'
            variant='destructive'
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            <LogOut /> Logout
          </DropdownMenuItem>
        )}
        {!user && (
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={handleLogin}
          >
            <LogIn /> Login
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
