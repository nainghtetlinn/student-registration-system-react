import { nrcStringToObject } from '@/lib/utils'
import type { TEntranceForm } from '@/types/student'
import type { TEntranceFormInput } from '../schemas/entrance-form-schema'
import { defaultEntranceFormInput } from './constants'

export function entranceFormToFormInput(
  data: TEntranceForm,
): TEntranceFormInput {
  return {
    ...defaultEntranceFormInput,
    ...data,
    academicYear: '',
    acknowledged: false,
    dob: data.dob ? new Date(data.dob) : ('' as unknown as Date),
    studentNrc: nrcStringToObject(data.studentNrc) || {
      stateCode: '',
      townshipCode: '',
      nrcType: '',
      nrcNumber: '',
    },
    fatherNrc: nrcStringToObject(data.fatherNrc) || {
      stateCode: '',
      townshipCode: '',
      nrcType: '',
      nrcNumber: '',
    },
    motherNrc: nrcStringToObject(data.motherNrc) || {
      stateCode: '',
      townshipCode: '',
      nrcType: '',
      nrcNumber: '',
    },
  }
}
