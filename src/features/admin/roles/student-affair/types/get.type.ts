import type { TForm } from '@/types/form'
import type { TSubmittedData } from './submitted-data.type'

export type TGetAllSubmittedDataResponse = TSubmittedData[]

export type TGetAllSubmittedVerifiedDataResponse = TSubmittedData[]

export type TGetStudentEntranceFormResponse = {
  formData: TForm
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
  studentSignatureUrl: string
  studentPhotoUrl: string
  submitted: boolean
  paid: boolean
}

export type TGetStudentSubjectChoiceFormResponse = {
  formData: TForm
  studentNickname: string
  fatherNickname: string
  motherNickname: string
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
  studentSignatureUrl: string
  studentSignatureDate: string
  guardianName: string
  guardianSginatureUrl: string
  guardianSignatureDate: string
  subjectScores: { subjectName: string; score: number }[]
  majorChoices: { majorName: string; priorityScore: number }[]
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
  studentPhotoUrl: string
}

export type TGetStudentRegistrationFormResponse = {
  formData: TForm
  enrollmentNumber: string
  matriculationRollNumber: string
  studentNameMm: string
  studentNameEng: string
  fatherNameMm: string
  fatherNameEng: string
  motherNameMm: string
  motherNameEng: string
  studentNickname: string
  fatherNickname: string
  motherNickname: string
  studentNrc: string
  fatherNrc: string
  motherNrc: string
  studentEthnicity: string
  fatherEthnicity: string
  motherEthnicity: string
  studentReligion: string
  fatherReligion: string
  motherReligion: string
  studentPob: string
  fatherPob: string
  motherPob: string
  studentDob: string
  fatherDob: string
  motherDob: string
  fatherJob: string
  motherJob: string
  fatherAddress: string
  motherAddress: string
  studentPhotoUrl: string
  fatherDeathDate: string | null
  motherDeathDate: string | null
  studentSignatureUrl: string
  studentSignatureDate: string
  guardianName: string
  guardianSginatureUrl: string
  guardianSignatureDate: string
  siblings: { name: string; nrc: string; job: string; address: string }[]
}
