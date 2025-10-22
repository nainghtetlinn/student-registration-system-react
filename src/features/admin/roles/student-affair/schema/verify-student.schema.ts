import { z } from 'zod'

export const verifyStudentSchema = z.object({
  studentAffairNote: z.string().min(1),
  studentAffairOtherNote: z.string().min(1),
})

export type TVerifyStudentSchema = z.infer<typeof verifyStudentSchema>
