import { CreateForm } from '@/features/form/components/create-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/forms/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Create Form</title>

      <div className='flex justify-center p-2'>
        <CreateForm />
      </div>
    </>
  )
}
