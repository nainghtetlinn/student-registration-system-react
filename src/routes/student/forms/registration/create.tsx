import { CreateRegistrationForm } from '@/features/student/forms/registration/components/create-registration-form'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/student/forms/registration/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Registration Form</title>

      <div className='pt-4'>
        <CreateRegistrationForm />
      </div>
    </>
  )
}
