import { CreateNewAccountForm } from '@/features/admin/components/create-new-account-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/accounts/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Register Account</title>

      <div className='flex justify-center p-2'>
        <CreateNewAccountForm />
      </div>
    </>
  )
}
