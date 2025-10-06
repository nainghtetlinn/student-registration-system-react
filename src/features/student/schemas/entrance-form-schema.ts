import { academicYearSchema, nrcDefaults, nrcSchema } from '@/lib/schema'
import { z } from 'zod'

const studentSchema = z.object({
  nameEn: z.string().min(1),
  nameMm: z.string().min(1),
  ethnicity: z.string().min(1),
  religion: z.string().min(1),
  nrc: nrcSchema,
  dob: z.coerce
    .date()
    .refine(
      (date) => date < new Date(),
      'Date of birth cannot be in the future',
    ),
  matriculationPassedYear: academicYearSchema,
  matriculationRollNo: z.string().min(1),
  matriculationDepartment: z.string().min(1),
})

const parentSchema = z.object({
  nameEn: z.string().min(1),
  nameMm: z.string().min(1),
  nrc: nrcSchema,
  job: z.string().min(1),
})

const contactSchema = z.object({
  address: z.string().min(1),
  phoneNumber: z.string().min(1),
  permanentAddress: z.string().min(1),
  permanentPhoneNumber: z.string().min(1),
})

export const entranceFormSchema = z.object({
  student: studentSchema,
  father: parentSchema,
  mother: parentSchema,
  contact: contactSchema,
  acknowledged: z
    .boolean()
    .refine((val) => val === true, 'Acknowledgement required.'),
})

export type TEntranceFormSchema = z.infer<typeof entranceFormSchema>

const parentDefaults: z.infer<typeof parentSchema> = {
  nameEn: '',
  nameMm: '',
  nrc: nrcDefaults,
  job: '',
}

export const entranceFormDefaults: TEntranceFormSchema = {
  student: {
    nameEn: '',
    nameMm: '',
    ethnicity: '',
    religion: '',
    nrc: nrcDefaults,
    dob: '' as unknown as Date,
    matriculationPassedYear: '',
    matriculationDepartment: '',
    matriculationRollNo: '',
  },
  father: parentDefaults,
  mother: parentDefaults,
  contact: {
    address: '',
    phoneNumber: '',
    permanentAddress: '',
    permanentPhoneNumber: '',
  },
  acknowledged: false,
}
