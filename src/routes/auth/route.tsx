import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className='flex h-svh items-center justify-center'>
      <Outlet />
    </div>
  )
}
