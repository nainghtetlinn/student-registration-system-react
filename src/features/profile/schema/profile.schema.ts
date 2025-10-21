import { z } from 'zod'
import { nrcSchema } from '@/lib/schema'

export const profileSchema = z.object({
  mmName: z.string().min(1),
  engName: z.string().min(1),
  nrc: nrcSchema,
})

export type TProfileSchema = z.infer<typeof profileSchema>
