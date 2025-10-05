import Logo from '@/assets/tutgi-logo.png'
import { ModeToggle } from '@/components/mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { UserAvatar } from '@/components/user-avatar'
import { LogIn, LogOut, Menu, MonitorCog, Moon, Sun } from 'lucide-react'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'

import { useLogout } from '@/api/lib/auth'
import { paths } from '@/config/paths'
import { useTheme } from '@/providers/theme-provider'
import type { TUser } from '@/types/user'

export const Header = () => {
  const router = useRouter()
  const qc = useQueryClient()
  const { theme, setTheme } = useTheme()

  const logout = useLogout({
    onSuccess: () => {
      toast.success('Logout successfully')
      router.navigate({
        to: paths.home.getHref(),
      })
    },
  })

  const user = qc.getQueryData(['auth', 'user']) as TUser | undefined | null

  const handleLogout = () => logout.mutate({})

  const handleLogin = () =>
    router.navigate({
      to: paths.auth.login.getHref(),
    })

  return (
    <header className='p-2 shadow'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <img
            src={Logo}
            alt='Logo'
            className='h-12 w-12'
          />
          <span className='text-xl font-bold'>
            Technological University Taunggyi
          </span>
        </div>

        <div className='hidden items-center gap-2 md:flex'>
          <nav>
            <ul className='flex items-center gap-2'>
              <li className='hover:text-primary hover:bg-accent rounded p-2'>
                <a href='#'>Home</a>
              </li>
              <li className='hover:text-primary hover:bg-accent rounded p-2'>
                <a href='#'>Contact</a>
              </li>
              <li className='hover:text-primary hover:bg-accent rounded p-2'>
                <a href='#'>About</a>
              </li>
            </ul>
          </nav>
          <ModeToggle />
          <UserAvatar />
        </div>

        <Sheet>
          <SheetTrigger
            asChild
            className='md:hidden'
          >
            <Button
              variant='outline'
              size='icon'
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <SheetHeader>
              <SheetTitle>Technological University Taunggyi</SheetTitle>
            </SheetHeader>
            <div className='flex-1 px-4'>
              <nav className='mb-8 -ml-4'>
                <ul className='flex flex-col items-stretch gap-2'>
                  <li>
                    <Button
                      asChild
                      variant='ghost'
                    >
                      <a href='#'>Home</a>
                    </Button>
                  </li>
                  <li>
                    <Button
                      asChild
                      variant='ghost'
                    >
                      <a href='#'>Contact</a>
                    </Button>
                  </li>
                  <li>
                    <Button
                      asChild
                      variant='ghost'
                    >
                      <a href='#'>About</a>
                    </Button>
                  </li>
                </ul>
              </nav>

              <Label
                htmlFor='theme'
                className='mb-2'
              >
                Theme
              </Label>
              <ToggleGroup
                id='theme'
                variant='outline'
                type='single'
                value={theme}
                onValueChange={setTheme}
              >
                <ToggleGroupItem
                  value='light'
                  aria-label='Theme light'
                >
                  <Sun className='h-4 w-4' />
                  Light
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='dark'
                  aria-label='Theme dark'
                >
                  <Moon className='h-4 w-4' />
                  Dark
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='system'
                  aria-label='Theme system'
                >
                  <MonitorCog className='h-4 w-4' />
                  System
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <SheetFooter>
              {user && (
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
              )}
              {user && (
                <Button
                  className='cursor-pointer'
                  variant='destructive'
                  onClick={handleLogout}
                  disabled={logout.isPending}
                >
                  <LogOut />
                  Logout
                </Button>
              )}
              {!user && (
                <Button
                  className='cursor-pointer'
                  onClick={handleLogin}
                >
                  <LogIn /> Login
                </Button>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
