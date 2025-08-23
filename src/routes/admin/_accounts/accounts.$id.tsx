import { Pending } from '@/components/layouts/shared/pending'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { getAllAccounts } from '@/api/admin/get-all-accounts'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Badge } from '@/components/ui/badge'
import {
  AlertCircleIcon,
  BadgeCheckIcon,
  BadgeXIcon,
  SendIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const Route = createFileRoute('/admin/_accounts/accounts/$id')({
  component: RouteComponent,
  pendingComponent: () => <Pending />,
  validateSearch: z.object({
    email: z.email(),
  }),
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context, deps }) => {
    const qc = context.queryClient
    const details = await qc.ensureQueryData({
      queryKey: ['accounts', 'details', deps.search.email],
      queryFn: async () => {
        const response = await getAllAccounts({ keyword: deps.search.email })
        return response.data.data
      },
    })
    return details[0]
  },
})

function RouteComponent() {
  const accountDetails = Route.useLoaderData()

  return (
    <>
      <title>Account Details</title>

      <div className='flex justify-center p-2'>
        <div className='flex flex-col items-center gap-2'>
          <Avatar className='mx-auto h-[100px] w-[100px]'>
            <AvatarImage src='/shadcn.jpg' />
            <AvatarFallback>
              {accountDetails.name || accountDetails.email.slice(0, 2) || '?'}
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className='text-2xl font-bold'>
              {accountDetails.name || accountDetails.email.split('@')[0]}
            </h1>
            <p className='text-muted-foreground text-sm'>
              {accountDetails.email}
            </p>
          </div>

          <div className='flex items-center gap-2'>
            {accountDetails.updatedAt ? (
              <Badge
                variant='secondary'
                className='bg-blue-500 text-white dark:bg-blue-600'
              >
                <BadgeCheckIcon />
                Verified
              </Badge>
            ) : (
              <Badge
                variant='secondary'
                className='bg-red-500 text-white dark:bg-red-700'
              >
                <BadgeXIcon />
                Not Verified
              </Badge>
            )}
            <Badge variant='secondary'>{accountDetails.role}</Badge>
          </div>

          {accountDetails.updatedAt == null && (
            <Alert className='mt-8'>
              <AlertCircleIcon />
              <AlertTitle>This account is not verified yet.</AlertTitle>
              <AlertDescription>
                <p className='mr-12 mb-3'>You can resend email again.</p>
                <div className='flex w-full justify-end'>
                  <Button size='sm'>
                    Resend <SendIcon />
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </>
  )
}
