import type { TEntranceForm } from '@/types/student'
import type { FieldPath } from 'react-hook-form'
import type { TEntranceFormSchema } from '../schema/entrance-form.schema'
import type { TEntranceFormError } from '../types/error.type'
import type { TGetEntranceFormResponse } from '../types/get.type'

import { nrcStringToObject } from '@/lib/utils'

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

export function fromDto(data: TGetEntranceFormResponse): TEntranceFormSchema {
  return {
    formId: data.formData.id,
    student: {
      nameEn: data.studentNameEng,
      nameMm: data.studentNameMm,
      ethnicity: data.ethnicity,
      religion: data.religion,
      nrc: nrcStringToObject(data.studentNrc),
      dob: new Date(data.dob),
      matriculationPassedYear: data.matriculationPassedYear,
      matriculationDepartment: data.department,
      enrollmentNumber: data.enrollmentNumber,
    },
    father: {
      nameEn: data.fatherNameEng,
      nameMm: data.fatherNameMm,
      nrc: nrcStringToObject(data.fatherNrc),
      job: data.fatherJob,
    },
    mother: {
      nameEn: data.motherNameEng,
      nameMm: data.motherNameMm,
      nrc: nrcStringToObject(data.motherNrc),
      job: data.motherJob,
    },
    contact: {
      address: data.address,
      phoneNumber: data.phoneNumber,
      permanentAddress: data.permanentAddress,
      permanentPhoneNumber: data.permanentPhoneNumber,
    },
    acknowledged: false,
  }
}
