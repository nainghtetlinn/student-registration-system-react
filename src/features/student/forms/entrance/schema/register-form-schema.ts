import { nrcDefaults, nrcSchema } from '@/lib/schema'
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
  yod: z.string().length(4).optional(),
})

const siblingSchema = z.object({
  name: z.string().min(1),
  nrc: nrcSchema,
  job: z.string().min(1),
  address: z.string().min(1),
})

export const registerFormSchema = z.object({
  universityRegisterNumber: z.string().min(1),
  enrollmentNumber: z.string().min(1),
  student: studentSchema,
  father: parentSchema,
  mother: parentSchema,
  siblings: z.array(siblingSchema),
  acknowledged: z
    .boolean()
    .refine((val) => val === true, 'Acknowledgement required.'),
})

export type TRegisterFormSchema = z.infer<typeof registerFormSchema>

export const registerFormDefaults: TRegisterFormSchema = {
  universityRegisterNumber: '',
  enrollmentNumber: '',
  student: {
    nameEn: '',
    nameMm: '',
    ethnicity: '',
    religion: '',
    nrc: nrcDefaults,
    pob: '',
    dob: '' as unknown as Date,
  },
  father: {
    nameEn: '',
    nameMm: '',
    ethnicity: '',
    religion: '',
    nrc: nrcDefaults,
    pob: '',
    dob: '' as unknown as Date,
    job: '',
    address: '',
  },
  mother: {
    nameEn: '',
    nameMm: '',
    ethnicity: '',
    religion: '',
    nrc: nrcDefaults,
    pob: '',
    dob: '' as unknown as Date,
    job: '',
    address: '',
  },
  siblings: [],
  acknowledged: false,
}
