import { z } from 'zod'

export const rejectStudentSchema = z.object({
  rejectionMessage: z.string().min(1),
})

export type TRejectStudentSchema = z.infer<typeof rejectStudentSchema>
