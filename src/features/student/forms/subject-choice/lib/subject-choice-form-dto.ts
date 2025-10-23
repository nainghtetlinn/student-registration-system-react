import type { TSubjectChoiceForm } from '@/types/student'
import type { FieldPath } from 'react-hook-form'
import type { TSubjectChoiceFormSchema } from '../schema/subject-choice-form.schema'
import type { TSubjectChoiceFormError } from '../types/error.type'
import type { TGetSubjectChoiceFormResponse } from '../types/get.type'

import { nrcStringToObject } from '@/lib/utils'

const fieldMap: Record<
  keyof TSubjectChoiceForm,
  FieldPath<TSubjectChoiceFormSchema>
> = {
  formId: 'formId',
  studentNickname: 'student.otherName',
  fatherNickname: 'father.otherName',
  motherNickname: 'mother.otherName',
  fatherEthnicity: 'father.ethnicity',
  motherEthnicity: 'mother.ethnicity',
  fatherReligion: 'father.religion',
  motherReligion: 'mother.religion',
  fatherDob: 'father.dob',
  motherDob: 'mother.dob',
  studentPob: 'student.pob',
  fatherPob: 'father.pob',
  motherPob: 'mother.pob',
  fatherPhoneNumber: 'father.phoneNumber',
  motherPhoneNumber: 'mother.phoneNumber',
  fatherAddress: 'father.address',
  motherAddress: 'mother.address',
  matriculationRollNumber: 'student.enrollmentNumber',
  subjectScores: 'matriculation',
  majorChoices: 'majorChoices',
}

export function fromErrorDto(
  data: TSubjectChoiceFormError,
): { field: FieldPath<TSubjectChoiceFormSchema>; message: string }[] {
  return data.map((e) => ({
    field: fieldMap[e.field],
    message: e.message,
  }))
}

export function fromDto(
  data: TGetSubjectChoiceFormResponse,
): TSubjectChoiceFormSchema {
  return {
    formId: data.formData.id,
    student: {
      name: data.studentNameEng,
      otherName: data.studentNickname,
      ethnicity: data.studentEthnicity,
      religion: data.studentReligion,
      nrc: nrcStringToObject(data.studentNrc),
      dob: new Date(data.studentDob),
      pob: data.studentPob,
      phoneNumber: data.studentPhoneNumber,
      enrollmentNumber: data.enrollmentNumber,
    },
    father: {
      name: data.fatherNameEng,
      otherName: data.fatherNickname,
      ethnicity: data.fatherEthnicity,
      religion: data.fatherReligion,
      nrc: nrcStringToObject(data.fatherNrc),
      dob: new Date(data.fatherDob),
      pob: data.fatherPob,
      phoneNumber: data.fatherPhoneNumber,
      address: data.fatherAddress,
      job: data.fatherJob,
    },
    mother: {
      name: data.motherNameEng,
      otherName: data.motherNickname,
      ethnicity: data.motherEthnicity,
      religion: data.motherReligion,
      nrc: nrcStringToObject(data.motherNrc),
      dob: new Date(data.motherDob),
      pob: data.motherPob,
      phoneNumber: data.motherPhoneNumber,
      address: data.motherAddress,
      job: data.motherJob,
    },
    matriculation: {
      rollNo: data.matriculationRollNumber,
      year: data.matriculationPassedYear,
      department: data.department,
      myanmar: data.subjectScores[0].score || ('' as unknown as number),
      english: data.subjectScores[1].score || ('' as unknown as number),
      mathematic: data.subjectScores[2].score || ('' as unknown as number),
      chemistry: data.subjectScores[3].score || ('' as unknown as number),
      physics: data.subjectScores[4].score || ('' as unknown as number),
      other: data.subjectScores[5].score || ('' as unknown as number),
    },
    majorChoices: data.majorChoices,
    acknowledged: false,
  }
}
