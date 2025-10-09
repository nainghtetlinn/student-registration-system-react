import { CreateNewAccountForm } from '@/features/admin/components/create-new-account-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_accounts/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Create Account</title>

      <div className='flex justify-center p-2'>
        <CreateNewAccountForm />
      </div>
    </>
  )
}
