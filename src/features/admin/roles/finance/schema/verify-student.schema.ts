import { z } from 'zod'

export const verifyStudentSchema = z.object({
  financeNote: z.string().min(1),
  financeVoucherNumber: z.string().min(1),
})

export type TVerifyStudentSchema = z.infer<typeof verifyStudentSchema>
