import { academicYearSchema } from '@/lib/schema'
import { z } from 'zod'

export const formSchema = z.object({
  academicYear: academicYearSchema,
  number: z.string().min(1),
  code: z.string().min(1),
})

export type TFormSchema = z.infer<typeof formSchema>
