import { LoginForm } from '@/features/auth/components/login-form'

import { createFileRoute, useRouter } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/auth/login/')({
  validateSearch: z.object({
    redirect: z.string().optional(),
    email: z.email().optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const search = Route.useSearch()

  return (
    <>
      <title>Login</title>

      <LoginForm
        redirect={search.redirect}
        email={search.email ?? ''}
        onSuccess={() => {
          router.history.push(search.redirect ?? '/')
        }}
      />
    </>
  )
}
