import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const token = localStorage.getItem('token')
    if (!token) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

function RouteComponent() {
  return <div>This is protected route</div>
}
