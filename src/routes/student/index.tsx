import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { EntranceFormDetails } from '@/features/student/forms/entrance/components/entrance-form-details'
import { RegistrationFormDetails } from '@/features/student/forms/registration/components/registration-form-details'
import { SubjectChoiceFormDetails } from '@/features/student/forms/subject-choice/components/subject-choice-form-details'
import { File } from 'lucide-react'

import { createFileRoute, Link } from '@tanstack/react-router'

import { useGetOpenedForms } from '@/features/form/api/get-opened-forms'
import { useGetEntranceForm } from '@/features/student/forms/entrance/api/get.api'
import { fromDto as fromEntranceFormDto } from '@/features/student/forms/entrance/lib/entrance-form-dto'
import { useGetRegistrationForm } from '@/features/student/forms/registration/api/get.api'
import { fromDto as fromRegistrationFormDto } from '@/features/student/forms/registration/lib/registration-form-dto'
import { useGetSubjectChoiceForm } from '@/features/student/forms/subject-choice/api/get.api'
import { fromDto as fromSubjectChoiceFormDto } from '@/features/student/forms/subject-choice/lib/subject-choice-form-dto'

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

  const subjectChoiceFormResult = useGetSubjectChoiceForm({
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const registrationFormResult = useGetRegistrationForm({
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  if (
    openedFormsResult.isPending ||
    entranceFormResult.isPending ||
    subjectChoiceFormResult.isPending ||
    registrationFormResult.isPending
  )
    return <FormSkeleton />

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

  if (!entranceFormResult.data)
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant='icon'>
            <File />
          </EmptyMedia>
        </EmptyHeader>
        <EmptyTitle>No entrance form found</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created or submitted an entrance form yet.
        </EmptyDescription>
        <EmptyContent>
          <Button asChild>
            <Link to='/student/forms/entrance/create'>
              Submit entrance form
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    )

  if (!subjectChoiceFormResult.data)
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant='icon'>
            <File />
          </EmptyMedia>
        </EmptyHeader>
        <EmptyTitle>No subject choice form found</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created or submitted an subject choice form yet.
        </EmptyDescription>
        <EmptyContent>
          <Button asChild>
            <Link to='/student/forms/subject-choice/create'>
              Submit subject choice form
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    )

  if (!registrationFormResult.data)
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant='icon'>
            <File />
          </EmptyMedia>
        </EmptyHeader>
        <EmptyTitle>No registration form found</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created or submitted an registration form yet.
        </EmptyDescription>
        <EmptyContent>
          <Button asChild>
            <Link to='/student/forms/registration/create'>
              Submit registration form
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    )

  return (
    <div>
      <div className='pt-4'>
        <EntranceFormDetails
          formDetails={entranceFormResult.data.formData}
          formData={fromEntranceFormDto(entranceFormResult.data)}
        />
      </div>
      <div className='pt-4'>
        <SubjectChoiceFormDetails
          formDetails={subjectChoiceFormResult.data.formData}
          formData={fromSubjectChoiceFormDto(subjectChoiceFormResult.data)}
        />
      </div>
      <div className='pt-4'>
        <RegistrationFormDetails
          formDetails={registrationFormResult.data.formData}
          formData={fromRegistrationFormDto(registrationFormResult.data)}
        />
      </div>
    </div>
  )
}
