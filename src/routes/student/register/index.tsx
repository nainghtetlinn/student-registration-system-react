import { EntranceForm } from '@/features/student/components/entrance-form'

import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'

import { getEntranceFormQuery } from '@/api/student/get-entrance-form'
import { paths } from '@/config/paths'

export const Route = createFileRoute('/student/register/')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    let shouldRedirect = false
    try {
      const data = await context.queryClient.ensureQueryData(
        getEntranceFormQuery(),
      )
      if (data) shouldRedirect = true
    } catch (error) {
      console.log(error)
    }
    if (shouldRedirect)
      throw redirect({
        to: paths.home.getHref(),
      })
  },
})

function RouteComponent() {
  const router = useRouter()

  return (
    <>
      <title>Register entrance form</title>

      <div className='flex justify-center pt-4'>
        <EntranceForm
          onSuccess={() => {
            router.navigate({
              to: paths.student.register.success.getHref(),
            })
          }}
          defaultValues={{
            student: {
              nameEn: 'Mg Mg',
              nameMm: 'mgmg',
              ethnicity: 'a',
              religion: 'a',
              nrc: {
                stateCode: 'a',
                townshipCode: 'a',
                nrcType: 'a',
                nrcNumber: '123123',
              },
              dob: new Date(),
              matriculationPassedYear: '2020-2021',
              matriculationRollNo: 'a',
              matriculationDepartment: 'a',
            },
            father: {
              nameEn: 'U Ba',
              nameMm: 'uba',
              nrc: {
                stateCode: 'a',
                townshipCode: 'a',
                nrcType: 'a',
                nrcNumber: '123123',
              },
              job: 'b',
            },
            mother: {
              nameEn: 'Daw Chaw',
              nameMm: 'dawchaw',
              nrc: {
                stateCode: 'a',
                townshipCode: 'a',
                nrcType: 'a',
                nrcNumber: '123123',
              },
              job: 'c',
            },
            contact: {
              address: 'd',
              phoneNumber: 'd',
              permanentAddress: 'e',
              permanentPhoneNumber: 'e',
            },
            acknowledged: true,
          }}
        />
      </div>
    </>
  )
}
