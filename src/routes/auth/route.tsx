import { ModeToggle } from '@/components/mode-toggle'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className='flex h-svh items-center justify-center'>
      <Outlet />
      <div className='absolute top-4 right-4'>
        <ModeToggle />
      </div>
    </div>
  )
}
