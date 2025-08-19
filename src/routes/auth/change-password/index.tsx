import { ChangePasswordForm } from '@/features/auth/components/change-password-form'
import { VerifyOtpForm } from '@/features/auth/components/verify-otp-form'
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'

import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/auth/change-password/')({
  component: RouteComponent,
})

function RouteComponent() {
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
          onSuccess={() => console.log('success')}
        />
      )}
    </>
  )
}
