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

export const filterGetAccountsInputSchema = z.object({
  keyword: z.string(),
  role: z.string(),
  page: z.coerce.number().min(0),
  size: z.coerce.number().min(1),
  sortField: z.string(),
  sortDirection: z.string(),
})

export type TFilterGetAccountsInput = z.infer<
  typeof filterGetAccountsInputSchema
>
