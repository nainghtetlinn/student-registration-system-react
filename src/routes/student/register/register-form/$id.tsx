import { RegisterForm } from '@/features/student/components/register-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/student/register/register-form/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Register Form</title>

      <div className='flex justify-center pt-4'>
        <RegisterForm />
      </div>
    </>
  )
}
