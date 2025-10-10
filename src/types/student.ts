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

export type TGetEntranceFormResponse = TEntranceForm

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
