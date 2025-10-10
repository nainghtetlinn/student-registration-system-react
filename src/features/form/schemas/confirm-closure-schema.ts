import { z } from 'zod'

export const confirmClosureSchema = z.object({
  otp: z.string().min(6),
})

export type TConfirmClosureSchema = z.infer<typeof confirmClosureSchema>

export const confirmClosureDefaults: TConfirmClosureSchema = {
  otp: '',
}
