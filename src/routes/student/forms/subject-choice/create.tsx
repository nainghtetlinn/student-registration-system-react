import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { CreateSubjectChoiceForm } from '@/features/student/forms/subject-choice/components/create-subject-choice-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getEntranceFormQuery } from '@/features/student/forms/entrance/api/get.api'
import { nrcStringToObject } from '@/lib/utils'
import { getSubjectChoiceFormQuery } from '@/features/student/forms/subject-choice/api/get.api'

export const Route = createFileRoute('/student/forms/subject-choice/create')({
  component: RouteComponent,
  pendingComponent: () => <FormSkeleton />,
  onError: () => {
    throw redirect({
      to: '/student',
    })
  },
  loader: async ({ context }) => {
    let shouldRedirect = false

    try {
      const subjectChoiceForm = await context.queryClient.ensureQueryData(
        getSubjectChoiceFormQuery(),
      )
      if (subjectChoiceForm) shouldRedirect = true
      if (
        !subjectChoiceForm.studentSignatureUrl ||
        !subjectChoiceForm.guardianSginatureUrl ||
        !subjectChoiceForm.guardianName
      )
        throw redirect({
          to: '/student/forms/subject-choice/files-upload',
        })
    } catch (error) {
      console.log(error)
    }

    if (shouldRedirect)
      throw redirect({
        to: '/student',
      })

    return await context.queryClient.ensureQueryData(getEntranceFormQuery())
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const data = Route.useLoaderData()

  return (
    <>
      <title>Subject Choice Form</title>

      <div className='pt-4'>
        <CreateSubjectChoiceForm
          formDetails={data.formData}
          defaultValues={{
            student: {
              enrollmentNumber: data.enrollmentNumber,
              name: data.studentNameEng,
              otherName: '',
              nrc: nrcStringToObject(data.studentNrc),
              ethnicity: data.ethnicity,
              religion: data.religion,
              dob: new Date(data.dob),
              phoneNumber: data.phoneNumber,
              pob: '',
            },
            father: {
              name: data.fatherNameEng,
              otherName: '',
              nrc: nrcStringToObject(data.fatherNrc),
              ethnicity: '',
              religion: '',
              pob: '',
              dob: '' as unknown as Date,
              phoneNumber: '',
              job: data.fatherJob,
              address: '',
            },
            mother: {
              name: data.motherNameEng,
              otherName: '',
              nrc: nrcStringToObject(data.motherNrc),
              ethnicity: '',
              religion: '',
              pob: '',
              dob: '' as unknown as Date,
              phoneNumber: '',
              job: data.motherJob,
              address: '',
            },
            matriculation: {
              rollNo: '',
              year: data.matriculationPassedYear,
              department: data.department,
              myanmar: '' as unknown as number,
              english: '' as unknown as number,
              mathematic: '' as unknown as number,
              chemistry: '' as unknown as number,
              physics: '' as unknown as number,
              other: '' as unknown as number,
            },
            majorChoices: [],
            formId: data.formData.id,
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
