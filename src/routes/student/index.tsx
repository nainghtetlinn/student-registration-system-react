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

import { useGetEntranceForm } from '@/api/student/get-entrance-form'
import { paths } from '@/config/paths'

export const Route = createFileRoute('/student/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useGetEntranceForm({
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  if (data) {
    return (
      <div className='flex min-h-screen items-center justify-center py-12'>
        <EntranceFormDetails data={data} />
      </div>
    )
  }

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <File />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>No Entrance Form Found</EmptyTitle>
      <EmptyDescription>
        You haven’t created or submitted an entrance form yet.
      </EmptyDescription>
      <EmptyContent>
        <Button asChild>
          <Link to={paths.student.register.root.getHref()}>Submit form</Link>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
