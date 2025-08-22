import { useLogout } from '@/api/lib/auth'
import { paths } from '@/config/paths'
import { ChangePasswordForm } from '@/features/auth/components/change-password-form'
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'
import { VerifyOtpForm } from '@/features/auth/components/verify-otp-form'

import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

export const Route = createFileRoute('/auth/change-password/')({
  validateSearch: z.object({
    redirect: z.string().optional(),
    email: z.email().optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const search = Route.useSearch()

  const { mutate: logout } = useLogout()

  const [step, setStep] = useState(0)
  const [email, setEmail] = useState(search.email ?? '')
  const [message, setMessage] = useState('')

  return (
    <>
      <title>Change Password</title>

      {step == 0 && (
        <ChangePasswordForm
          email={email}
          onSuccess={(message, email) => {
            setMessage(message)
            setEmail(email)
            setStep(1)
          }}
        />
      )}
      {step == 1 && (
        <VerifyOtpForm
          message={message}
          email={email}
          onSuccess={(message) => {
            setMessage(message)
            setStep(2)
          }}
        />
      )}
      {step == 2 && (
        <ResetPasswordForm
          message={message}
          email={email}
          onSuccess={(message) => {
            toast.success(message)
            logout({})
            router.navigate({
              to: paths.auth.login.getHref(),
              search: { email, redirect: search.redirect },
            })
          }}
        />
      )}
    </>
  )
}
