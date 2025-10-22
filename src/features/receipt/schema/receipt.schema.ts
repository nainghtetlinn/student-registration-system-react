import { z } from 'zod'

export const dataSchema = z.object({
  name: z.string().min(1),
  amount: z.coerce.number().gt(0),
})

export const receiptSchema = z.object({
  year: z.string().min(1),
  data: z.array(dataSchema),
})

export type TDataSchema = z.infer<typeof dataSchema>
export type TReceiptSchema = z.infer<typeof receiptSchema>
