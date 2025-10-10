import { Pending } from '@/components/layouts/shared/pending'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { EntranceFormDetails } from '@/features/student/components/entrance-form-details'
import { File } from 'lucide-react'

import { createFileRoute, Link } from '@tanstack/react-router'

import { useGetOpenedForms } from '@/api/form/get-opened-forms'
import { useGetEntranceForm } from '@/api/student/get-entrance-form'

export const Route = createFileRoute('/student/')({
  component: RouteComponent,
})

function RouteComponent() {
  const openedFormsResult = useGetOpenedForms()

  const entranceFormResult = useGetEntranceForm({
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  if (openedFormsResult.isPending) return <Pending />

  if (!openedFormsResult.data)
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant='icon'>
            <File />
          </EmptyMedia>
        </EmptyHeader>
        <EmptyTitle>No Form Available</EmptyTitle>
        <EmptyDescription>
          There are currently no forms to be filled out. Please check back later
          or contact the administrator if you believe this is an error.
        </EmptyDescription>
        <EmptyContent>
          <Button asChild>
            <Link to='/'>Home</Link>
          </Button>
        </EmptyContent>
      </Empty>
    )

  if (!entranceFormResult.data) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant='icon'>
            <File />
          </EmptyMedia>
        </EmptyHeader>
        <EmptyTitle>You aren&apos;t registered</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created or submitted an entrance form yet.
        </EmptyDescription>
        <EmptyContent>
          <Button asChild>
            <Link
              to='/student/register/entrance-form/$id'
              params={{ id: openedFormsResult.data[0].id.toString() }}
            >
              Register
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className='flex min-h-screen items-center justify-center py-12'>
      <EntranceFormDetails
        formDetails={entranceFormResult.data.formDetails}
        formData={entranceFormResult.data.formData}
      />
    </div>
  )
}
