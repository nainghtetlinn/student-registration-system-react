import type { TForm } from '@/types/form'
import type { TRegistrationForm } from '@/types/student'

export type TFiles = {
  studentSignatureUrl: string | null
  guardianName: string | null
  guardianSginatureUrl: string | null
}

export type TGetRegistrationFormResponse = {
  formData: TForm
  studentPhotoUrl: string | null
  studentSignatureUrl: string | null
  studentSignatureDate: string | null
  guardianName: string | null
  guardianSginatureUrl: string | null
  guardianSignatureDate: string | null
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
} & Omit<TRegistrationForm, 'formId'>
