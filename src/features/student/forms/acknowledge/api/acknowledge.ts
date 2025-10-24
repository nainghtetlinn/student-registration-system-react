import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'

const acknowledgeRules = () => {
  return api.post<ApiResponse<string>>('/student/acknowledge')
}

export const useAcknowledgeRules = (
  options?: Omit<
    UseMutationOptions<string, AxiosError<ApiResponse<string>>>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['form', 'acknowledge'],
    mutationFn: async () => {
      const response = await acknowledgeRules()
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Registration successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
