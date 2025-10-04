import { ContactsDetails } from './contacts-details'
import { MatriculationExamDetails } from './matriculation-exam-details'
import { FatherDetails, MotherDetails } from './parents-details'
import { StudentDetails } from './student-details'

import type { TStep } from '@/components/multistep-form'
import type { TEntranceFormInput } from '@/features/student/schemas/entrance-form-schema'

export const steps: TStep<TEntranceFormInput>[] = [
  {
    position: 1,
    title: 'ကျောင်းသားကိုယ်ရေးအချက်အလက်',
    fields: [
      'studentNameMm',
      'studentNameEng',
      'studentNrc',
      'ethnicity',
      'religion',
      'dob',
    ],
    component: <StudentDetails />,
  },
  {
    position: 2,
    title: 'တက္ကသိုလ်ဝင်တန်းအချက်အလက်',
    fields: ['matriculationPassedYear', 'rollNumber', 'department'],
    component: <MatriculationExamDetails />,
  },
  {
    position: 3,
    title: 'အဖအချက်အလက်',
    fields: ['fatherNameMm', 'fatherNameEng', 'fatherNrc', 'fatherJob'],
    component: <FatherDetails />,
  },
  {
    position: 4,
    title: 'အမိအချက်အလက်',
    fields: ['motherNameMm', 'motherNameEng', 'motherNrc', 'motherJob'],
    component: <MotherDetails />,
  },
  {
    position: 5,
    title: 'ဆက်သွယ်ရန်အချက်အလက်',
    fields: [
      'address',
      'phoneNumber',
      'permanentAddress',
      'permanentPhoneNumber',
    ],
    component: <ContactsDetails />,
  },
]
