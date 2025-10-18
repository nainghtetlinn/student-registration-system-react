import { nrcSchema } from '@/lib/schema'
import { z } from 'zod'

const studentSchema = z.object({
  nameEn: z.string().min(1),
  nameMm: z.string().min(1),
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
  enrollmentNumber: z.string().min(1),
})

const parentSchema = z.object({
  nameEn: z.string().min(1),
  nameMm: z.string().min(1),
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
  job: z.string().min(1),
  address: z.string().min(1),
  yod: z.coerce
    .number()
    .refine((val) => val === 0 || val.toString().length === 4, 'Invalid year'),
})

const siblingSchema = z.object({
  name: z.string().min(1),
  nrc: nrcSchema,
  job: z.string().min(1),
  address: z.string().min(1),
})

export const registrationFormSchema = z.object({
  formId: z.coerce.number(),
  student: studentSchema,
  father: parentSchema,
  mother: parentSchema,
  siblings: z.array(siblingSchema),
  acknowledged: z
    .boolean()
    .refine((val) => val === true, 'Acknowledgement required.'),
})

export type TRegistrationFormSchema = z.infer<typeof registrationFormSchema>
