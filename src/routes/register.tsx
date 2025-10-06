import { Header } from '@/components/layouts/shared/header'
import { UniversityEntranceForm } from '@/features/student/components/university-entrance-form'

import { createFileRoute } from '@tanstack/react-router'

import { type TUniversityEntranceFormSchema } from '@/features/student/schemas/university-entrance-form-schema'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const handleSubmit = (data: TUniversityEntranceFormSchema) => {
    console.log(data)
  }

  return (
    <>
      <title>University entrance form</title>

      <Header />

      <div className='flex justify-center pt-4'>
        <UniversityEntranceForm
          onSubmit={handleSubmit}
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
