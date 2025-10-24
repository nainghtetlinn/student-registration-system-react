import type { TForm } from '@/types/form'
import type { TEntranceForm } from '@/types/student'

export type TFiles = {
  studentSignatureUrl: string | null
  studentPhotoUrl: string | null
}

export type TGetEntranceFormResponse = {
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
