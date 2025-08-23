import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'

import type { ApiResponse, ResendPasswordResponse } from '@/types/api'
import { api } from '../lib/axios'

export const resendPasswordInputSchema = z.object({
  email: z.email(),
})

export type TResendPasswordInput = z.infer<typeof resendPasswordInputSchema>

export const resendPassword = (data: TResendPasswordInput) => {
  return api.post<ApiResponse<ResendPasswordResponse>>(
    '/admin/resendPassword',
    data,
  )
}

export const useResendPassword = (
  options?: Omit<
    UseMutationOptions<ResendPasswordResponse, Error, TResendPasswordInput>,
    'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationFn: async (data) => {
      const response = await resendPassword(data)
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
