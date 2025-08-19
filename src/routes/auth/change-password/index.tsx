import { ChangePasswordForm } from '@/features/auth/components/change-password-form'
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'
import { VerifyOtpForm } from '@/features/auth/components/verify-otp-form'

import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/auth/change-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')

  return (
    <>
      <title>Change Password</title>

      {step == 0 && (
        <ChangePasswordForm
          onSuccess={(email) => {
            setEmail(email)
            setStep(1)
          }}
        />
      )}
      {step == 1 && (
        <VerifyOtpForm
          email={email}
          onSuccess={() => setStep(2)}
        />
      )}
      {step == 2 && (
        <ResetPasswordForm
          email={email}
          onSuccess={() => {
            toast.success('Successfully reset password')
            router.history.push('/auth/login?email=' + email)
          }}
        />
      )}
    </>
  )
}
