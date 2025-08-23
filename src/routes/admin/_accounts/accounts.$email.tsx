import { Pending } from '@/components/layouts/shared/pending'
import { AccountDetails } from '@/features/admin/components/account-details'

import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

import { getAllAccounts } from '@/api/admin/get-all-accounts'
import { paths } from '@/config/paths'

export const Route = createFileRoute('/admin/_accounts/accounts/$email')({
  component: RouteComponent,
  pendingComponent: () => <Pending />,
  beforeLoad: ({ params }) => {
    const ok = z.email().safeParse(decodeURIComponent(params.email)).success
    if (!ok) throw redirect({ to: paths.admin.root.getHref() })
  },
  loader: async ({ context, params }) => {
    const qc = context.queryClient
    const details = await qc.ensureQueryData({
      queryKey: ['accounts', 'details', params.email],
      queryFn: async () => {
        const response = await getAllAccounts({ keyword: params.email })
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
