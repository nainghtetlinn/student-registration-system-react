import { LoginForm } from '@/features/auth/components/login-form'

import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return { redirect: (search.redirect as string) || '/' }
  },
})

function RouteComponent() {
  const router = useRouter()
  const search = Route.useSearch()

  return (
    <>
      <title>Login</title>

      <LoginForm
        onSuccess={() => {
          router.history.push(search.redirect)
        }}
      />
    </>
  )
}
