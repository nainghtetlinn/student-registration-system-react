import { MajorChoices } from './major-choices'
import { MatriculationDetails } from './matriculation-details'
import { FatherDetails, MotherDetails } from './parents-details'
import { StudentDetails } from './student-details'

import type { TStep } from '@/components/multistep-form'
import type { TSubjectChoiceFormSchema } from '../../schema/subject-choice-form.schema'

export const steps: TStep<TSubjectChoiceFormSchema>[] = [
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
    fields: ['matriculation'],
    component: <MatriculationDetails />,
  },
  {
    position: 5,
    title: '',
    fields: ['majorChoices', 'acknowledged'],
    component: <MajorChoices />,
  },
]
