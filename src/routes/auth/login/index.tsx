import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { LoginForm } from '@/features/auth/components/login-form'

import { createFileRoute, useRouter } from '@tanstack/react-router'
import { z } from 'zod'

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

      <AlertDialog defaultOpen={search.isSuccessPasswordReset}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login required</AlertDialogTitle>
            <AlertDialogDescription>
              You need to login again after successful password reset.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <LoginForm
        redirect={search.redirect}
        email={search.email ?? ''}
        onSuccess={(data) => {
          if (data.user.updatedAt == null) {
            router.navigate({
              to: '/auth/change-password',
              search: {
                email: data.user.email,
                redirect: search.redirect,
              },
            })
          } else if (search.redirect) {
            router.history.push(search.redirect)
          } else {
            if (data.user.role === 'Student') router.history.push('/student')
            else router.history.push('/admin')
          }
        }}
      />
    </>
  )
}
