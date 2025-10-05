import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useLogout } from '@/api/lib/auth'
import { paths } from '@/config/paths'
import type { TUser } from '@/types/user'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'

export const UserAvatar = ({ user }: { user: TUser }) => {
  const router = useRouter()
  const logout = useLogout({
    onSuccess: () => {
      toast.success('Logout successfully')
      router.navigate({
        to: paths.home.getHref(),
      })
    },
  })

  const handleLogout = () => {
    logout.mutate({})
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
      <DropdownMenuContent
        align='end'
        className='w-56'
      >
        <DropdownMenuLabel>
          <div className='font-medium'>{user?.name}</div>
          <div className='text-xs text-gray-500'>{user?.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer text-red-600'
          onClick={handleLogout}
          disabled={logout.isPending}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
