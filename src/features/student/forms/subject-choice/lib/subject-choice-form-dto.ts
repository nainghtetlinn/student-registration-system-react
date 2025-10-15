import type { TSubjectChoiceForm } from '@/types/student'
import type { FieldPath } from 'react-hook-form'
import type { TSubjectChoiceFormSchema } from '../schema/subject-choice-form.schema'
import type { TSubjectChoiceFormError } from '../types/error.type'

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
