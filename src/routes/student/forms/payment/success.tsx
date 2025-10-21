import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/student/forms/payment/success')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex min-h-[800px] items-center justify-center bg-gradient-to-br from-green-50 to-white p-6'>
      <Card className='w-full max-w-lg'>
        <CardContent className='p-8 text-center'>
          <div className='mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100'>
            <svg
              className='h-12 w-12 text-green-600'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 12l2 2 4-4'
              />
              <circle
                cx='12'
                cy='12'
                r='9'
                stroke='currentColor'
                strokeWidth='1.5'
              />
            </svg>
          </div>

          <h2 className='mb-2 text-2xl font-semibold text-green-800'>
            Payment Successful
          </h2>
          <p className='mb-6 text-sm text-gray-600'>
            Thank you — we are processing your payment. Wait for a confirmation
            email.
          </p>

          <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
            <Button
              asChild
              size='lg'
              className='bg-green-600 hover:bg-green-700'
            >
              <Link to='/student'>Go to Dashboard</Link>
            </Button>

            {/* <Button
              asChild
              size='lg'
              variant='ghost'
            >
              <Link to='/student/forms/payment/receipt'>View Receipt</Link>
            </Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
