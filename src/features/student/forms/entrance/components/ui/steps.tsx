import { Acknowledgement } from './acknowledgement'
import { ContactsDetails } from './contacts-details'
import { FatherDetails, MotherDetails } from './parents-details'
import { StudentDetails } from './student-details'

import type { TStep } from '@/components/multistep-form'
import type { TEntranceFormSchema } from '../../schema/entrance-form.schema'

export const steps: TStep<TEntranceFormSchema>[] = [
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
    fields: ['contact'],
    component: <ContactsDetails />,
  },
  {
    position: 5,
    title: '',
    fields: ['acknowledged', 'formId'],
    component: <Acknowledgement />,
  },
]
