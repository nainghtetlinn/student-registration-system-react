import { z } from 'zod'

export const dataSchema = z.object({
  name: z.string().min(1),
  amount: z.coerce.number().gt(0),
})

export const phoneSchema = z.object({
  phoneNumber: z.string().min(1),
})

export const receiptSchema = z.object({
  year: z.string().min(1),
  data: z.array(dataSchema).min(1, 'Required at least one receipt item.'),
  phoneNumbers: z
    .array(phoneSchema)
    .min(1, 'Required at least one phone number.'),
})

export type TDataSchema = z.infer<typeof dataSchema>
export type TPhoneSchema = z.infer<typeof phoneSchema>
export type TReceiptSchema = z.infer<typeof receiptSchema>
