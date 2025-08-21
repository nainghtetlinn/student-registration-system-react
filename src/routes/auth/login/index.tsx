import { paths } from '@/config/paths'
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
        onSuccess={(data) => {
          if (data.user.updatedAt == null) {
            router.navigate({
              to: paths.auth.changePassword.getHref(),
              search: {
                email: data.user.email,
                redirect: search.redirect,
              },
            })
          } else if (data.profile == null) {
            router.history.push('/profile/create')
          } else {
            router.history.push(search.redirect ?? '/')
          }
        }}
      />
    </>
  )
}
