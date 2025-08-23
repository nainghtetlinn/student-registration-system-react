import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'

import type { ApiResponse, RegisterResponse } from '@/types/api'
import { api } from '../lib/axios'

export const ROLES = ['Student Affair', 'Finance', 'Dean', 'Student']

export const createNewAccountInputSchema = z.object({
  email: z.email(),
  role: z.string().refine((val) => ROLES.includes(val)),
})

export type TCreateNewAccountInput = z.infer<typeof createNewAccountInputSchema>

export const createNewAccountWithEmailAndRole = (
  data: TCreateNewAccountInput,
) => {
  return api.post<ApiResponse<RegisterResponse>>('/admin/register', data)
}

export const useCreateNewAccount = (
  options?: Omit<
    UseMutationOptions<RegisterResponse, Error, TCreateNewAccountInput>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['admin', 'create account'],
    mutationFn: async (data) => {
      const response = await createNewAccountWithEmailAndRole(data)
      return response.data.message
    },
    onSuccess: (message, ...restArgs) => {
      toast.success(message)
      onSuccess?.(message, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
