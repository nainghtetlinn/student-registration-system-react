import { nrcObjectToString, nrcStringToObject } from '@/lib/utils'
import type { TEntranceForm } from '@/types/student'
import type { TEntranceFormSchema } from '../schemas/entrance-form-schema'

export function toDto(data: TEntranceFormSchema): TEntranceForm {
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

export function fromDto(data: TEntranceForm): TEntranceFormSchema {
  return {
    student: {
      nameEn: data.studentNameEng,
      nameMm: data.studentNameMm,
      ethnicity: data.ethnicity,
      religion: data.religion,
      nrc: nrcStringToObject(data.studentNrc),
      dob: new Date(data.dob),
      matriculationPassedYear: data.matriculationPassedYear,
      matriculationDepartment: data.department,
      matriculationRollNo: data.rollNumber,
    },
    father: {
      nameEn: data.fatherNameEng,
      nameMm: data.fatherNameMm,
      nrc: nrcStringToObject(data.fatherNrc),
      job: data.fatherJob,
    },
    mother: {
      nameEn: data.motherNameEng,
      nameMm: data.motherNameMm,
      nrc: nrcStringToObject(data.motherNrc),
      job: data.motherJob,
    },
    contact: {
      address: data.address,
      phoneNumber: data.phoneNumber,
      permanentAddress: data.permanentAddress,
      permanentPhoneNumber: data.permanentPhoneNumber,
    },
    acknowledged: false,
  }
}
