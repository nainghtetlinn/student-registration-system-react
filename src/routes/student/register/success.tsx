import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/student/register/success')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300'>
      <div className='flex w-full max-w-md flex-col items-center rounded-xl bg-white p-10 shadow-lg'>
        <svg
          className='mb-6 h-20 w-20 text-green-500'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          viewBox='0 0 24 24'
        >
          <circle
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='2'
            fill='white'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 12l2 2 4-4'
          />
        </svg>
        <h1 className='mb-2 text-2xl font-bold text-green-700'>
          Submission Successful!
        </h1>
        <p className='mb-6 text-center text-gray-600'>
          Thank you for registering. Your form has been successfully submitted.
        </p>
        <Link
          to='/'
          className='inline-block rounded-lg bg-green-500 px-6 py-2 text-white shadow transition hover:bg-green-600'
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
