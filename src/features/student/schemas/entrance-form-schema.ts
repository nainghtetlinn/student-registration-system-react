import { academicYearSchema, nrcSchema } from '@/lib/schema'
import { z } from 'zod'

export const entranceFormInputSchema = z.object({
  academicYear: z.string().optional(),
  studentNameMm: z.string().min(1),
  studentNameEng: z.string().min(1),
  studentNrc: nrcSchema,
  ethnicity: z.string().min(1),
  religion: z.string().min(1),
  dob: z.coerce
    .date()
    .refine(
      (date) => date < new Date(),
      'Date of birth cannot be in the future',
    ),

  matriculationPassedYear: academicYearSchema,
  rollNumber: z.string().min(1),
  department: z.string().min(1),

  fatherNameMm: z.string().min(1),
  fatherNameEng: z.string().min(1),
  fatherNrc: nrcSchema,
  fatherJob: z.string().min(1),

  motherNameMm: z.string().min(1),
  motherNameEng: z.string().min(1),
  motherNrc: nrcSchema,
  motherJob: z.string().min(1),

  address: z.string().min(1),
  phoneNumber: z.string().min(1),
  permanentAddress: z.string().min(1),
  permanentPhoneNumber: z.string().min(1),
  acknowledged: z
    .boolean()
    .refine(
      (val) => val === true,
      'You must acknowledge that the information you provided is correct.',
    ),
})

export type TEntranceFormInput = z.infer<typeof entranceFormInputSchema>
