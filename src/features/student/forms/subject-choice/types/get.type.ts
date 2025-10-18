import type { TForm } from '@/types/form'
import type { TSubjectChoiceForm } from '@/types/student'

export type TFiles = {
  studentSignatureUrl: string | null
  studentSignatureDate: string | null
  guardianName: string | null
  guardianSginatureUrl: string | null
  guardianSignatureDate: string | null
}

export type TGetSubjectChoiceFormResponse = {
  formData: TForm
} & Omit<TSubjectChoiceForm, 'formId'> &
  TFiles & {
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
