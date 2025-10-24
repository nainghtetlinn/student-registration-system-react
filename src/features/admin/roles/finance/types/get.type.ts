import type { TForm } from '@/types/form'
import type { TEntranceForm } from '@/types/student'
import type { TSubmittedData } from './submitted-data.type'

export type TGetAllSubmittedDataResponse = TSubmittedData[]

export type TGetStudentEntranceFormResponse = {
  formData: TForm
  studentId: number
  studentSignatureUrl: string | null
  studentPhotoUrl: string | null
  submitted: boolean
  paid: boolean
  verified: boolean
  departmentSection: {
    studentAffairNote: string | null
    studentAffairOtherNote: string | null
    studentAffairVerifiedDate: string | null
    financeNote: string | null
    financeDate: string | null
    financeVoucherNumber: string | null
    financeVerifierName: string | null
    financeVerifierSignature: string | null
    paymentUrl: string | null
  }
  formUrls: {
    entranceFormUrl: string | null
    subjectChoiceUrl: string | null
    registrationUrl: string | null
  }
} & Omit<TEntranceForm, 'formId'>

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
