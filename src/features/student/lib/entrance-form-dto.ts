import type { TRegisterEntranceFormRequest } from '@/types/student'
import type { TEntranceFormSchema } from '../schemas/entrance-form-schema'
import { nrcObjectToString } from '@/lib/utils'

export function toRequestDto(
  data: TEntranceFormSchema,
): TRegisterEntranceFormRequest {
  return {
    academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    studentNameEng: data.student.nameEn,
    studentNameMm: data.student.nameMm,
    ethnicity: data.student.ethnicity,
    religion: data.student.religion,
    studentNrc: nrcObjectToString(data.student.nrc),
    dob: data.student.dob.toISOString().split('T')[0],
    matriculationPassedYear: data.student.matriculationPassedYear,
    department: data.student.matriculationDepartment,
    rollNumber: data.student.matriculationRollNo,
    fatherNameEng: data.father.nameEn,
    fatherNameMm: data.father.nameMm,
    fatherNrc: nrcObjectToString(data.father.nrc),
    fatherJob: data.father.job,
    motherNameEng: data.mother.nameEn,
    motherNameMm: data.mother.nameMm,
    motherNrc: nrcObjectToString(data.mother.nrc),
    motherJob: data.mother.job,
    address: data.contact.address,
    phoneNumber: data.contact.phoneNumber,
    permanentAddress: data.contact.permanentAddress,
    permanentPhoneNumber: data.contact.permanentPhoneNumber,
  }
}
