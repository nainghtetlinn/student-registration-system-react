import type { TEntranceForm, TEntranceFormError } from '@/types/student'
import type { TEntranceFormSchema } from '../schemas/entrance-form-schema'

import { type FieldPath } from 'react-hook-form'

const fieldMap: Record<keyof TEntranceForm, FieldPath<TEntranceFormSchema>> = {
  formId: 'formId',
  studentNameMm: 'student.nameMm',
  studentNameEng: 'student.nameEn',
  studentNrc: 'student.nrc',
  ethnicity: 'student.ethnicity',
  religion: 'student.religion',
  dob: 'student.dob',
  matriculationPassedYear: 'student.matriculationPassedYear',
  enrollmentNumber: 'student.enrollmentNumber',
  department: 'student.matriculationDepartment',

  fatherNameMm: 'father.nameMm',
  fatherNameEng: 'father.nameEn',
  fatherNrc: 'father.nrc',
  fatherJob: 'father.job',

  motherNameMm: 'mother.nameMm',
  motherNameEng: 'mother.nameEn',
  motherNrc: 'mother.nrc',
  motherJob: 'mother.job',

  address: 'contact.address',
  phoneNumber: 'contact.phoneNumber',
  permanentAddress: 'contact.permanentAddress',
  permanentPhoneNumber: 'contact.permanentPhoneNumber',
}

export function fromErrorDto(
  data: TEntranceFormError,
): { field: FieldPath<TEntranceFormSchema>; message: string }[] {
  return data.map((e) => ({
    field: fieldMap[e.field],
    message: e.message,
  }))
}
