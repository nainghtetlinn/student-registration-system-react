import { Pending } from '@/components/layouts/shared/pending'
import { Button } from '@/components/ui/button'
import { ErrorComponent } from '@/features/student/components/error-component'
import { OverviewCard } from '@/features/student/components/overview-card'
import { EntranceFormDetails } from '@/features/student/forms/entrance/components/entrance-form-details'
import { RegistrationFormDetails } from '@/features/student/forms/registration/components/registration-form-details'
import { SubjectChoiceFormDetails } from '@/features/student/forms/subject-choice/components/subject-choice-form-details'

import { createFileRoute, Link } from '@tanstack/react-router'

import { getOpenedFormsQuery } from '@/features/form/api/get-opened-forms'
import { useGetEntranceForm } from '@/features/student/forms/entrance/api/get.api'
import { useGetRegistrationForm } from '@/features/student/forms/registration/api/get.api'
import { useGetSubjectChoiceForm } from '@/features/student/forms/subject-choice/api/get.api'

export const Route = createFileRoute('/student/')({
  component: RouteComponent,
  pendingComponent: () => <Pending />,
  loader: async ({ context }) => {
    const qc = context.queryClient
    const openedForms = await qc.ensureQueryData(getOpenedFormsQuery())
    return openedForms[0]
  },
})

function RouteComponent() {
  const openedForm = Route.useLoaderData()

  const entranceFormResult = useGetEntranceForm({
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!openedForm,
  })

  const subjectChoiceFormResult = useGetSubjectChoiceForm({
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!entranceFormResult.data,
  })

  const registrationFormResult = useGetRegistrationForm({
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!subjectChoiceFormResult.data,
  })

  if (!openedForm)
    return (
      <ErrorComponent
        title='No Form Available'
        description='There are currently no forms to be filled out.'
      >
        <Button asChild>
          <Link to='/'>Home</Link>
        </Button>
      </ErrorComponent>
    )

  if (!entranceFormResult.data)
    return (
      <ErrorComponent
        title='No entrance form found'
        description="You haven't created or submitted an entrance form yet."
      >
        <Button asChild>
          <Link to='/student/forms/entrance/create'>Submit entrance form</Link>
        </Button>
      </ErrorComponent>
    )

  if (
    !entranceFormResult.data.studentPhotoUrl ||
    !entranceFormResult.data.studentSignatureUrl
  )
    return (
      <ErrorComponent
        title='Entrance form is not completed'
        description="You haven't completed an entrance form yet."
      >
        <Button asChild>
          <Link to='/student/forms/entrance/files-upload'>Continue</Link>
        </Button>
      </ErrorComponent>
    )

  if (!subjectChoiceFormResult.data)
    return (
      <ErrorComponent
        title='No subject choice form found'
        description="You haven't created or submitted a subject choice form yet."
      >
        <Button asChild>
          <Link to='/student/forms/subject-choice/create'>
            Submit subject choice form
          </Link>
        </Button>
      </ErrorComponent>
    )

  if (
    !subjectChoiceFormResult.data.studentSignatureUrl ||
    !subjectChoiceFormResult.data.guardianSginatureUrl ||
    !subjectChoiceFormResult.data.guardianName
  )
    return (
      <ErrorComponent
        title='Subject choice form is not completed'
        description="You haven't completed a subject choice form yet."
      >
        <Button asChild>
          <Link to='/student/forms/subject-choice/files-upload'>Continue</Link>
        </Button>
      </ErrorComponent>
    )

  if (!registrationFormResult.data)
    return (
      <ErrorComponent
        title='No registration form found'
        description="You haven't created or submitted a registration form yet."
      >
        <Button asChild>
          <Link to='/student/forms/registration/create'>
            Submit registration form
          </Link>
        </Button>
      </ErrorComponent>
    )

  if (
    !registrationFormResult.data.studentSignatureUrl ||
    !registrationFormResult.data.guardianSginatureUrl ||
    !registrationFormResult.data.guardianName
  )
    return (
      <ErrorComponent
        title='Registration form is not completed'
        description="You haven't completed a registration form yet."
      >
        <Button asChild>
          <Link to='/student/forms/registration/files-upload'>Continue</Link>
        </Button>
      </ErrorComponent>
    )

  return (
    <div>
      <section className='container mx-auto my-2'>
        <OverviewCard
          title='Overview'
          submitted={entranceFormResult.data.submitted}
          paid={entranceFormResult.data.paid}
          verified={entranceFormResult.data.verified}
        />
      </section>

      <div className='pt-4'>
        <EntranceFormDetails data={entranceFormResult.data} />
      </div>
      <div className='pt-4'>
        <SubjectChoiceFormDetails data={subjectChoiceFormResult.data} />
      </div>
      <div className='pt-4'>
        <RegistrationFormDetails data={registrationFormResult.data} />
      </div>
    </div>
  )
}
