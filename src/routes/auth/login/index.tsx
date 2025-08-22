import { paths } from '@/config/paths'
import { LoginForm } from '@/features/auth/components/login-form'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

import { createFileRoute, useRouter } from '@tanstack/react-router'
import { z } from 'zod'
import { AlertCircleIcon } from 'lucide-react'

export const Route = createFileRoute('/auth/login/')({
  validateSearch: z.object({
    redirect: z.string().optional(),
    email: z.email().optional(),
    isSuccessPasswordReset: z.coerce.boolean().optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const search = Route.useSearch()

  return (
    <>
      <title>Login</title>

      <div className='flex w-full flex-col items-center gap-2'>
        {search.isSuccessPasswordReset && (
          <Alert className='max-w-xl border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-200 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400'>
            <AlertCircleIcon />
            <AlertTitle>Login required</AlertTitle>
            <AlertDescription>
              You need to login again after successful password reset.
            </AlertDescription>
          </Alert>
        )}
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
            } else {
              router.history.push(search.redirect ?? '/')
            }
          }}
        />
      </div>
    </>
  )
}
