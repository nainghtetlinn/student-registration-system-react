import { academicYearSchema, nrcSchema } from '@/lib/schema'
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
  enrollmentNumber: z.string().min(1),
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
})

const majorChoicesSchema = z.array(
  z.object({
    majorName: z.string().min(1),
    priorityScore: z.coerce.number().min(1),
  }),
)

export const subjectChoiceFormSchema = z.object({
  formId: z.coerce.number(),
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
