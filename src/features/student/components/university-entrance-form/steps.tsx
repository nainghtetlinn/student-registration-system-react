import type { TStep } from '@/components/multistep-form'
import type { TUniversityEntranceFormSchema } from '../../schemas/university-entrance-form-schema'
import { ContactsDetails } from './contacts-details'
import { ParentsDetails } from './parents-details'
import { StudentDetails } from './student-details'

export const steps: TStep<TUniversityEntranceFormSchema>[] = [
  {
    position: 1,
    title: 'ကျောင်းသားကိုယ်ရေးအချက်အလက်',
    fields: ['student'],
    component: <StudentDetails />,
  },
  {
    position: 2,
    title: 'အဖအချက်အလက်',
    fields: ['father', 'mother'],
    component: <ParentsDetails />,
  },

  {
    position: 3,
    title: 'ဆက်သွယ်ရန်အချက်အလက်',
    fields: ['contact'],
    component: <ContactsDetails />,
  },
]
