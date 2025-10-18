import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { CreateRegistrationForm } from '@/features/student/forms/registration/components/create-registration-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getSubjectChoiceFormQuery } from '@/features/student/forms/subject-choice/api/get.api'

export const Route = createFileRoute('/student/forms/registration/create')({
  component: RouteComponent,
  pendingComponent: () => <FormSkeleton />,
  onError: () => {
    throw redirect({
      to: '/student',
    })
  },
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(
      getSubjectChoiceFormQuery(),
    )
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const {
    formDetails,
    formData: subjectChoiceForm,
    entranceForm,
  } = Route.useLoaderData()

  return (
    <>
      <title>Registration Form</title>

      <div className='pt-4'>
        <CreateRegistrationForm
          formDetails={formDetails}
          defaultValues={{
            student: {
              nameEn: entranceForm.student.nameEn,
              nameMm: entranceForm.student.nameMm,
              otherName: subjectChoiceForm.student.otherName,
              ethnicity: subjectChoiceForm.student.ethnicity,
              religion: subjectChoiceForm.student.religion,
              nrc: subjectChoiceForm.student.nrc,
              dob: subjectChoiceForm.student.dob,
              pob: subjectChoiceForm.student.pob,
              enrollmentNumber: subjectChoiceForm.student.enrollmentNumber,
            },
            father: {
              nameEn: entranceForm.father.nameEn,
              nameMm: entranceForm.father.nameMm,
              otherName: subjectChoiceForm.father.otherName,
              ethnicity: subjectChoiceForm.father.ethnicity,
              religion: subjectChoiceForm.father.religion,
              nrc: subjectChoiceForm.father.nrc,
              dob: subjectChoiceForm.father.dob,
              pob: subjectChoiceForm.father.pob,
              address: subjectChoiceForm.father.address,
              job: subjectChoiceForm.father.job,
              yod: '' as unknown as number,
            },
            mother: {
              nameEn: entranceForm.mother.nameEn,
              nameMm: entranceForm.mother.nameMm,
              otherName: subjectChoiceForm.mother.otherName,
              ethnicity: subjectChoiceForm.mother.ethnicity,
              religion: subjectChoiceForm.mother.religion,
              nrc: subjectChoiceForm.mother.nrc,
              dob: subjectChoiceForm.mother.dob,
              pob: subjectChoiceForm.mother.pob,
              address: subjectChoiceForm.mother.address,
              job: subjectChoiceForm.mother.job,
              yod: '' as unknown as number,
            },
            siblings: [],
            formId: formDetails.id,
            acknowledged: false,
          }}
          onSuccess={() => {
            navigate({ to: '/student/forms/registration/files-upload' })
          }}
        />
      </div>
    </>
  )
}
