import type { TStep } from '@/components/multistep-form'
import type { TRegisterFormSchema } from '../../schemas/register-form-schema'
import { FatherDetails, MotherDetails } from './parents-details'
import { SiblingsDetails } from './siblings-details'
import { StudentDetails } from './student-details'
import { Acknowledgement } from './acknowledgement'

export const steps: TStep<TRegisterFormSchema>[] = [
  {
    position: 1,
    title: '',
    fields: ['universityRegisterNumber', 'enrollmentNumber', 'student'],
    component: <StudentDetails />,
  },
  {
    position: 2,
    title: '',
    fields: ['father'],
    component: <FatherDetails />,
  },
  {
    position: 3,
    title: '',
    fields: ['mother'],
    component: <MotherDetails />,
  },
  {
    position: 4,
    title: '',
    fields: ['siblings'],
    component: <SiblingsDetails />,
  },
  {
    position: 5,
    title: '',
    fields: ['acknowledged'],
    component: <Acknowledgement />,
  },
]
