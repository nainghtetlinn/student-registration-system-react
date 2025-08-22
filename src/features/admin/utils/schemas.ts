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
  keyword: z.string().optional(),
  role: z.string().optional(),
  page: z.coerce.number().min(0).optional(),
  size: z.coerce.number().min(1).optional(),
  sortField: z.string().optional(),
  sortDirection: z.string().optional(),
})

export type TFilterGetAccountsInput = z.infer<
  typeof filterGetAccountsInputSchema
>
