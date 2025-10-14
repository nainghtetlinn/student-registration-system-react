import type { TForm } from './form'

export type TEntranceForm = {
  formId: number
  enrollmentNumber: string
  studentNameMm: string
  studentNameEng: string
  studentNrc: string
  ethnicity: string
  religion: string
  dob: string
  matriculationPassedYear: string
  department: string
  fatherNameMm: string
  fatherNameEng: string
  fatherNrc: string
  fatherJob: string
  motherNameMm: string
  motherNameEng: string
  motherNrc: string
  motherJob: string
  address: string
  phoneNumber: string
  permanentAddress: string
  permanentPhoneNumber: string
}

export type TEntranceFormError = {
  field: keyof TEntranceForm
  message: string
}[]

export type TRegisterEntranceFormRequest = TEntranceForm
export type TRegisterEntranceFormResponse = string
export type TRegisterEntranceFormErrorResponse = TEntranceFormError

export type TGetEntranceFormResponse = Omit<TEntranceForm, 'formId'> & {
  formData: TForm
}

export type TUpdateEntranceFormRequest = {
  enrollmentNumber?: string
  studentNameMm?: string
  studentNameEng?: string
  studentNrc?: string
  ethnicity?: string
  religion?: string
  dob?: string
  matriculationPassedYear?: string
  department?: string
  fatherNameMm?: string
  fatherNameEng?: string
  fatherNrc?: string
  fatherJob?: string
  motherNameMm?: string
  motherNameEng?: string
  motherNrc?: string
  motherJob?: string
  address?: string
  phoneNumber?: string
  permanentAddress?: string
  permanentPhoneNumber?: string
}
export type TUpdateEntranceFormResponse = string
export type TUpdateEntranceFormErrorResponse = TEntranceFormError

/********** Subject Choice Form **********/
export type TSubjectChoiceForm = {
  formId: number
  studentNickname?: string
  studentPob: string
  fatherNickname?: string
  fatherEthnicity: string
  fatherReligion: string
  fatherDob: Date
  fatherPob: string
  fatherPhoneNumber: string
  fatherAddress: string
  motherNickname?: string
  motherEthnicity: string
  motherReligion: string
  motherDob: Date
  motherPob: string
  motherPhoneNumber: string
  motherAddress: string
  matriculationRollNumber: string
  subjectScores: [
    {
      subjectName: 'MYAN'
      score: number
    },
    {
      subjectName: 'ENG'
      score: number
    },
    {
      subjectName: 'MATH'
      score: number
    },
    {
      subjectName: 'CHEMIST'
      score: number
    },
    {
      subjectName: 'PHYSICS'
      score: number
    },
    {
      subjectName: 'OTHERS'
      score: number
    },
  ]
  majorChoices: {
    majorName: string
    priorityScore: number
  }[]
}

export type TSubjectChoiceFormError = {
  field: keyof TSubjectChoiceForm
  message: string
}[]

export type TRegisterSubjectChoiceFormRequest = TSubjectChoiceForm
export type TRegisterSubjectChoiceFormResponse = string
export type TRegisterSubjectChoiceFormErrorResponse = TSubjectChoiceFormError
