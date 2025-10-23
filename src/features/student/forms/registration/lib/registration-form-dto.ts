import type { TRegistrationForm } from '@/types/student'
import type { FieldPath } from 'react-hook-form'
import type { TRegistrationFormSchema } from '../schema/registration-form.schema'
import type { TRegistrationFormError } from '../types/error.type'
import type { TGetRegistrationFormResponse } from '../types/get.type'

import { nrcStringToObject } from '@/lib/utils'

const fieldMap: Record<
  keyof TRegistrationForm,
  FieldPath<TRegistrationFormSchema>
> = {
  formId: 'formId',
  fatherDeathDate: 'father.yod',
  motherDeathDate: 'mother.yod',
  siblings: 'siblings',
}

export function fromErrorDto(
  data: TRegistrationFormError,
): { field: FieldPath<TRegistrationFormSchema>; message: string }[] {
  return data.map((e) => ({
    field: fieldMap[e.field],
    message: e.message,
  }))
}

export function fromDto(
  data: TGetRegistrationFormResponse,
): TRegistrationFormSchema {
  return {
    student: {
      nameEn: data.studentNameEng,
      nameMm: data.studentNameMm,
      otherName: data.studentNickname,
      ethnicity: data.studentEthnicity,
      religion: data.studentReligion,
      nrc: nrcStringToObject(data.studentNrc),
      dob: new Date(data.studentDob),
      pob: data.studentPob,
      enrollmentNumber: data.enrollmentNumber,
    },
    father: {
      nameEn: data.fatherNameEng,
      nameMm: data.fatherNameMm,
      otherName: data.fatherNickname,
      ethnicity: data.fatherEthnicity,
      religion: data.fatherReligion,
      nrc: nrcStringToObject(data.fatherNrc),
      dob: new Date(data.fatherDob),
      pob: data.fatherPob,
      address: data.fatherAddress,
      job: data.fatherJob,
      yod: data.fatherDeathDate
        ? new Date(data.fatherDeathDate).getFullYear()
        : ('' as unknown as number),
    },
    mother: {
      nameEn: data.motherNameEng,
      nameMm: data.motherNameMm,
      otherName: data.motherNickname,
      ethnicity: data.motherEthnicity,
      religion: data.motherReligion,
      nrc: nrcStringToObject(data.motherNrc),
      dob: new Date(data.motherDob),
      pob: data.motherPob,
      address: data.motherAddress,
      job: data.motherJob,
      yod: data.motherDeathDate
        ? new Date(data.motherDeathDate).getFullYear()
        : ('' as unknown as number),
    },
    siblings: data.siblings.map((s) => ({
      ...s,
      nrc: nrcStringToObject(s.nrc),
    })),
    formId: data.formData.id,
    acknowledged: false,
  }
}
