import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'

const initiateClosure = (id: string) => {
  return api.post<ApiResponse<string>>('/admin/forms/initiate-closure/' + id)
}

export const useInitiateClosure = (
  id: string,
  options?: Omit<
    UseMutationOptions<string, AxiosError<ApiResponse<string>>, unknown>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['form', 'initiate-closure', id],
    mutationFn: async () => {
      const response = await initiateClosure(id)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Form closure initiated successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
