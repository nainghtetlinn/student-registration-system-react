import { z } from 'zod'

import { ACCOUNT_ROLES } from './constants'

export const createNewAccountInputSchema = z.object({
  email: z.email(),
  role: z
    .string()
    .min(1)
    .refine((val) => ACCOUNT_ROLES.includes(val)),
})

export type TCreateNewAccountInput = z.infer<typeof createNewAccountInputSchema>
