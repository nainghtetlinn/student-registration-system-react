import { academicYearSchema } from '@/lib/schema'
import { z } from 'zod'

export const updateFormSchema = z.object({
  academicYear: academicYearSchema,
  number: z.string().min(1),
  code: z.string().min(1),
})

export type TUpdateFormSchema = z.infer<typeof updateFormSchema>

export const updateFormDefaults: TUpdateFormSchema = {
  academicYear: '',
  number: '',
  code: '',
}
