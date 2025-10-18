import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { CreateSubjectChoiceForm } from '@/features/student/forms/subject-choice/components/create-subject-choice-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getEntranceFormQuery } from '@/features/student/forms/entrance/api/get.api'

export const Route = createFileRoute('/student/forms/subject-choice/create')({
  component: RouteComponent,
  pendingComponent: () => <FormSkeleton />,
  onError: () => {
    throw redirect({
      to: '/student',
    })
  },
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(getEntranceFormQuery())
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { formDetails, formData: entranceForm } = Route.useLoaderData()

  return (
    <>
      <title>Subject Choice Form</title>

      <div className='pt-4'>
        <CreateSubjectChoiceForm
          formDetails={formDetails}
          defaultValues={{
            student: {
              enrollmentNumber: entranceForm.student.enrollmentNumber,
              name: entranceForm.student.nameEn,
              otherName: '',
              nrc: entranceForm.student.nrc,
              ethnicity: entranceForm.student.ethnicity,
              religion: entranceForm.student.religion,
              dob: entranceForm.student.dob,
              phoneNumber: entranceForm.contact.phoneNumber,
              pob: '',
            },
            father: {
              name: entranceForm.father.nameEn,
              otherName: '',
              nrc: entranceForm.father.nrc,
              ethnicity: '',
              religion: '',
              pob: '',
              dob: '' as unknown as Date,
              phoneNumber: '',
              job: entranceForm.father.job,
              address: '',
            },
            mother: {
              name: entranceForm.mother.nameEn,
              otherName: '',
              nrc: entranceForm.mother.nrc,
              ethnicity: '',
              religion: '',
              pob: '',
              dob: '' as unknown as Date,
              phoneNumber: '',
              job: entranceForm.mother.job,
              address: '',
            },
            matriculation: {
              rollNo: '',
              year: entranceForm.student.matriculationPassedYear,
              department: entranceForm.student.matriculationDepartment,
              myanmar: '' as unknown as number,
              english: '' as unknown as number,
              mathematic: '' as unknown as number,
              chemistry: '' as unknown as number,
              physics: '' as unknown as number,
              other: '' as unknown as number,
            },
            majorChoices: [],
            formId: formDetails.id,
            acknowledged: false,
          }}
          onSuccess={() => {
            navigate({ to: '/student/forms/subject-choice/files-upload' })
          }}
        />
      </div>
    </>
  )
}
