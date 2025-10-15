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

export type TGetSubjectChoiceFormResponse = {
  formData: TForm
} & {
  studentNickname?: string
  fatherNickname?: string
  motherNickname?: string
  fatherEthnicity: string
  motherEthnicity: string
  fatherReligion: string
  motherReligion: string
  fatherDob: string
  motherDob: string
  studentPob: string
  fatherPob: string
  motherPob: string
  fatherPhoneNumber: string
  motherPhoneNumber: string
  fatherAddress: string
  motherAddress: string
  matriculationRollNumber: string
  studentSignatureUrl: string | null
  studentSignatureDate: string | null
  guardianName: string | null
  guardianSginatureUrl: string | null
  guardianSignatureDate: string | null
  subjectScores: [
    { subjectName: 'မြန်မာစာ'; score: number },
    { subjectName: 'အင်္ဂလိပ်စာ'; score: number },
    { subjectName: 'သင်္ချာ'; score: number },
    { subjectName: 'ဓါတု'; score: number },
    { subjectName: 'ရူပ'; score: number },
    { subjectName: 'ဇီဝ/ဘောဂ/သမိုင်း/ပထဝီ/စိတ်ကြိုက်မြန်မာ'; score: number },
  ]
  majorChoices: [
    { majorName: string; priorityScore: 1 },
    { majorName: string; priorityScore: 2 },
    { majorName: string; priorityScore: 3 },
    { majorName: string; priorityScore: 4 },
    { majorName: string; priorityScore: 5 },
    { majorName: string; priorityScore: 6 },
  ]
  enrollmentNumber: string
  studentNameMm: string
  studentNameEng: string
  fatherNameMm: string
  fatherNameEng: string
  motherNameMm: string
  motherNameEng: string
  studentNrc: string
  fatherNrc: string
  motherNrc: string
  studentEthnicity: string
  studentReligion: string
  studentDob: string
  matriculationPassedYear: string
  department: string
  fatherJob: string
  motherJob: string
  studentPhoneNumber: string
}

export type TUpdateSubjectChoiceFormRequest = {
  studentNickname?: string
  fatherNickname?: string
  motherNickname?: string
  fatherEthnicity?: string
  motherEthnicity?: string
  fatherReligion?: string
  motherReligion?: string
  fatherDob?: Date
  motherDob?: Date
  studentPob?: string
  fatherPob?: string
  motherPob?: string
  fatherPhoneNumber?: string
  motherPhoneNumber?: string
  fatherAddress?: string
  motherAddress?: string
  matriculationRollNumber?: string
  subjectScores?: {
    subjectName: 'MYAN' | 'ENG' | 'MATH' | 'CHEMIST' | 'PHYSICS' | 'OTHERS'
    score: number
  }[]
  majorChoices: {
    majorName: string
    priorityScore: number
  }[]
}
export type TUpdateSubjectChoiceFormResponse = string
export type TUpdateSubjectChoiceFormErrorResponse = TSubjectChoiceFormError
