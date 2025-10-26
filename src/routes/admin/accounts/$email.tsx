import { Pending } from '@/components/layouts/shared/pending'
import { AccountDetails } from '@/features/admin/components/account-details'

import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

import { getAllAccounts } from '@/api/admin/get-all-accounts'

export const Route = createFileRoute('/admin/accounts/$email')({
  component: RouteComponent,
  pendingComponent: () => <Pending />,
  beforeLoad: ({ params }) => {
    const ok = z.email().safeParse(decodeURIComponent(params.email)).success
    if (!ok) throw redirect({ to: '/admin' })
  },
  loader: async ({ context, params }) => {
    const details = await context.queryClient.ensureQueryData({
      queryKey: ['admin', 'accounts', params.email],
      queryFn: async () => {
        const response = await getAllAccounts({
          keyword: params.email,
          page: 0,
          size: 1,
        })
        return response.data.data
      },
      revalidateIfStale: true,
    })
    return details[0]
  },
})

function RouteComponent() {
  const accountDetails = Route.useLoaderData()

  return (
    <>
      <title>Account Details</title>

      <AccountDetails data={accountDetails} />
    </>
  )
}
