export type TEntranceForm = {
  academicYear: string
  studentNameMm: string
  studentNameEng: string
  studentNrc: string
  ethnicity: string
  religion: string
  dob: string
  matriculationPassedYear: string
  rollNumber: string
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

export type TRegisterEntranceFormRequest = TEntranceForm
export type TRegisterEntranceFormResponse = string

export type TGetEntranceFormResponse = TEntranceForm

export type TUpdateEntranceFormRequest = {
  academicYear?: string
  studentNameMm?: string
  studentNameEng?: string
  studentNrc?: string
  ethnicity?: string
  religion?: string
  dob?: string
  matriculationPassedYear?: string
  rollNumber?: string
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
