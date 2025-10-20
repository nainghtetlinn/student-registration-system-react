import { z } from 'zod'

export const receiptSchema = z.object({
  year: z.string().min(1),
  data: z.array(
    z.object({
      name: z.string().min(1),
      amount: z.coerce.number().gt(0),
    }),
  ),
})

export type TReceiptSchema = z.infer<typeof receiptSchema>
