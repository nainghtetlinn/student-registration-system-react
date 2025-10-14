import { academicYearSchema, nrcDefaults, nrcSchema } from '@/lib/schema'
import { MAJORS } from '@/lib/constants'
import { z } from 'zod'

const studentSchema = z.object({
  name: z.string().min(1),
  otherName: z.string().optional(),
  nrc: nrcSchema,
  ethnicity: z.string().min(1),
  religion: z.string().min(1),
  pob: z.string().min(1),
  dob: z.coerce
    .date()
    .refine(
      (date) => date < new Date(),
      'Date of birth cannot be in the future',
    ),
  phoneNumber: z.string().min(1),
})

const parentSchema = z.object({
  name: z.string().min(1),
  otherName: z.string().optional(),
  nrc: nrcSchema,
  ethnicity: z.string().min(1),
  religion: z.string().min(1),
  pob: z.string().min(1),
  dob: z.coerce
    .date()
    .refine(
      (date) => date < new Date(),
      'Date of birth cannot be in the future',
    ),
  phoneNumber: z.string().min(1),
  job: z.string().min(1),
  address: z.string().min(1),
})

const matriculationSchema = z.object({
  rollNo: z.string().min(1),
  year: academicYearSchema,
  department: z.string().min(1),
  myanmar: z.coerce.number().min(1).max(100),
  english: z.coerce.number().min(1).max(100),
  mathematic: z.coerce.number().min(1).max(100),
  chemistry: z.coerce.number().min(1).max(100),
  physics: z.coerce.number().min(1).max(100),
  other: z.coerce.number().min(1).max(100),
  total: z.coerce.number().min(1),
})

const majorChoicesSchema = z.object({
  first: z.coerce
    .number()
    .refine((val) => MAJORS.findIndex((d) => d.id == val) >= 0),
  second: z.coerce
    .number()
    .refine((val) => MAJORS.findIndex((d) => d.id == val) >= 0),
  third: z.coerce
    .number()
    .refine((val) => MAJORS.findIndex((d) => d.id == val) >= 0),
  fourth: z.coerce
    .number()
    .refine((val) => MAJORS.findIndex((d) => d.id == val) >= 0),
  fifth: z.coerce
    .number()
    .refine((val) => MAJORS.findIndex((d) => d.id == val) >= 0),
  sixth: z.coerce
    .number()
    .refine((val) => MAJORS.findIndex((d) => d.id == val) >= 0),
})

export const subjectChoiceFormSchema = z.object({
  enrollmentNumber: z.string().min(1),
  student: studentSchema,
  father: parentSchema,
  mother: parentSchema,
  matriculation: matriculationSchema,
  majorChoices: majorChoicesSchema,
  acknowledged: z
    .boolean()
    .refine((val) => val === true, 'Acknowledgement required.'),
})

export type TSubjectChoiceFormSchema = z.infer<typeof subjectChoiceFormSchema>

export const subjectChoiceFormDefaults: TSubjectChoiceFormSchema = {
  enrollmentNumber: '',
  student: {
    name: '',
    nrc: nrcDefaults,
    ethnicity: '',
    religion: '',
    pob: '',
    dob: '' as unknown as Date,
    phoneNumber: '',
  },
  father: {
    name: '',
    nrc: nrcDefaults,
    ethnicity: '',
    religion: '',
    pob: '',
    dob: '' as unknown as Date,
    phoneNumber: '',
    job: '',
    address: '',
  },
  mother: {
    name: '',
    nrc: nrcDefaults,
    ethnicity: '',
    religion: '',
    pob: '',
    dob: '' as unknown as Date,
    phoneNumber: '',
    job: '',
    address: '',
  },
  matriculation: {
    rollNo: '',
    year: '',
    department: '',
    myanmar: '' as unknown as number,
    english: '' as unknown as number,
    mathematic: '' as unknown as number,
    chemistry: '' as unknown as number,
    physics: '' as unknown as number,
    other: '' as unknown as number,
    total: '' as unknown as number,
  },
  majorChoices: {
    first: '' as unknown as number,
    second: '' as unknown as number,
    third: '' as unknown as number,
    fourth: '' as unknown as number,
    fifth: '' as unknown as number,
    sixth: '' as unknown as number,
  },
  acknowledged: false,
}
