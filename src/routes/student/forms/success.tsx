import { Button } from '@/components/ui/button'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/student/forms/success')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <title>Success</title>

      <div className='flex h-[80vh] flex-col items-center justify-center gap-4'>
        <h2 className='text-2xl font-bold'>Success!</h2>
        <Button
          asChild
          size='lg'
          className='bg-green-600 hover:bg-green-700'
        >
          <Link to='/student'>Go to Dashboard</Link>
        </Button>
      </div>
    </>
  )
}
