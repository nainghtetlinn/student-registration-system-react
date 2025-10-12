import type { TStep } from '@/components/multistep-form'
import type { TSubjectChoiceFormSchema } from '../../schemas/subject-choice-form-schema'
import { MajorChoices } from './major-choices'
import { MatriculationDetails } from './matriculation-details'
import { FatherDetails, MotherDetails } from './parents-details'
import { PhotoUpload } from './photo-upload'
import { StudentDetails } from './student-details'

export const steps: TStep<TSubjectChoiceFormSchema>[] = [
  {
    position: 6,
    title: '',
    fields: [],
    component: <PhotoUpload />,
  },
  {
    position: 1,
    title: '',
    fields: ['enrollmentNumber', 'student'],
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
