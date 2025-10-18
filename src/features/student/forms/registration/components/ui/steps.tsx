import type { TStep } from '@/components/multistep-form'
import type { TRegistrationFormSchema } from '../../schema/registration-form.schema'
import { FatherDetails, MotherDetails } from './parents-details'
import { SiblingsDetails } from './siblings-details'
import { StudentDetails } from './student-details'

export const steps: TStep<TRegistrationFormSchema>[] = [
  {
    position: 1,
    title: '',
    fields: ['student'],
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
    fields: ['siblings', 'acknowledged'],
    component: <SiblingsDetails />,
  },
]
