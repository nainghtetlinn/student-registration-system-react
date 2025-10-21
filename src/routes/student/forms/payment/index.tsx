import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { PaymentForm } from '@/features/student/forms/payment/components/payment-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getOpenedFormsQuery } from '@/api/form/get-opened-forms'
import { getReceiptQuery } from '@/features/student/forms/payment/api/get-receipt.api'

export const Route = createFileRoute('/student/forms/payment/')({
  component: RouteComponent,
  pendingComponent: () => <FormSkeleton />,
  onError: () => {
    throw redirect({
      to: '/student',
    })
  },
  loader: async ({ context }) => {
    const openedForms = await context.queryClient.ensureQueryData(
      getOpenedFormsQuery(),
    )
    if (openedForms.length === 0) throw new Error('No form to fill')
    const receipts = await context.queryClient.ensureQueryData(
      getReceiptQuery('FIRST_YEAR'),
    )
    if (receipts.length === 0) throw new Error('No receipt found')
    return { formDetails: openedForms[0], receipt: receipts[0] }
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { formDetails, receipt } = Route.useLoaderData()

  return (
    <>
      <title>Payment</title>

      <div className='min-h-[800px] pt-2'>
        <PaymentForm
          formDetails={formDetails}
          paymentDetails={receipt}
          onSuccess={() => {
            navigate({ to: '/student/forms/payment/success' })
          }}
        />
      </div>
    </>
  )
}
