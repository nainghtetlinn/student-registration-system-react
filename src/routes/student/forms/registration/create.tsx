import { FormSkeleton } from '@/components/layouts/shared/form-skeleton'
import { CreateRegistrationForm } from '@/features/student/forms/registration/components/create-registration-form'

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getRegistrationFormQuery } from '@/features/student/forms/registration/api/get.api'
import { getSubjectChoiceFormQuery } from '@/features/student/forms/subject-choice/api/get.api'
import { nrcStringToObject } from '@/lib/utils'

export const Route = createFileRoute('/student/forms/registration/create')({
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
      const registrationForm = await context.queryClient.ensureQueryData(
        getRegistrationFormQuery(),
      )
      if (registrationForm) shouldRedirect = true
      if (
        !registrationForm.studentSignatureUrl ||
        !registrationForm.guardianSginatureUrl ||
        !registrationForm.guardianName
      )
        throw redirect({
          to: '/student/forms/registration/files-upload',
        })
    } catch (error) {
      console.log(error)
    }

    if (shouldRedirect)
      throw redirect({
        to: '/student',
      })

    return await context.queryClient.ensureQueryData(
      getSubjectChoiceFormQuery(),
    )
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const data = Route.useLoaderData()

  return (
    <>
      <title>Registration Form</title>

      <div className='pt-4'>
        <CreateRegistrationForm
          formDetails={data.formData}
          defaultValues={{
            student: {
              nameEn: data.studentNameEng,
              nameMm: data.studentNameMm,
              otherName: data.studentNickname,
              ethnicity: data.studentEthnicity,
              religion: data.studentReligion,
              nrc: nrcStringToObject(data.studentNrc),
              dob: new Date(data.studentDob),
              pob: data.studentPob,
              enrollmentNumber: data.enrollmentNumber,
            },
            father: {
              nameEn: data.fatherNameEng,
              nameMm: data.fatherNameMm,
              otherName: data.fatherNickname,
              ethnicity: data.fatherEthnicity,
              religion: data.fatherReligion,
              nrc: nrcStringToObject(data.fatherNrc),
              dob: new Date(data.fatherDob),
              pob: data.fatherPob,
              address: data.fatherAddress,
              job: data.fatherJob,
              yod: '' as unknown as number,
            },
            mother: {
              nameEn: data.motherNameEng,
              nameMm: data.motherNameMm,
              otherName: data.motherNickname,
              ethnicity: data.motherEthnicity,
              religion: data.motherReligion,
              nrc: nrcStringToObject(data.motherNrc),
              dob: new Date(data.motherDob),
              pob: data.motherPob,
              address: data.motherAddress,
              job: data.motherJob,
              yod: '' as unknown as number,
            },
            siblings: [],
            formId: data.formData.id,
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
