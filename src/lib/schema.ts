import { z } from 'zod'

export const nrcSchema = z.object({
  stateCode: z.string().min(1),
  townshipCode: z.string().min(1),
  nrcType: z.string().min(1),
  nrcNumber: z
    .string()
    .trim()
    .regex(/^[0-9၀၁၂၃၄၅၆၇၈၉]{6}$/),
})

export type TNrcSchema = z.infer<typeof nrcSchema>

export const rollNoSchema = z.object({
  year: z.coerce.number().min(1).max(6),
  major: z
    .string()
    .refine(
      (val) => ['CIVIL', 'EC', 'EP', 'MECH', 'CEIT', 'MN'].includes(val),
      'Invalid major',
    ),
  no: z.coerce.number().gt(0),
})

export type TRollNoSchema = z.infer<typeof rollNoSchema>

export const academicYearSchema = z
  .string()
  .min(1)
  .regex(/^\d{4}-\d{4}$/, 'Format must be YYYY-YYYY')
  .refine((val) => {
    const [start, end] = val.split('-').map(Number)
    return end === start + 1
  }, 'End year must be exactly one greater than start year')

export type TAcademicYearSchema = z.infer<typeof academicYearSchema>
