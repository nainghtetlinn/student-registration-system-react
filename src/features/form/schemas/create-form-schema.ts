import { academicYearSchema } from '@/lib/schema'
import { z } from 'zod'

export const createFormSchema = z.object({
  academicYear: academicYearSchema,
  number: z.string().min(1),
  code: z.string().min(1),
})

export type TCreateFormSchema = z.infer<typeof createFormSchema>

export const createFormDefaults: TCreateFormSchema = {
  academicYear: '',
  number: '',
  code: '',
}
