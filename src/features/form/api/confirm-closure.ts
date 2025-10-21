import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TConfirmClosureSchema } from '../schemas/confirm-closure-schema'
import type {
  TConfirmClosureRequest,
  TConfirmClosureResponse,
} from '../types/confirm-closure.type'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'

const confirmClosure = (id: string, data: TConfirmClosureRequest) => {
  return api.post<ApiResponse<TConfirmClosureResponse>>(
    '/admin/forms/confirm-closure/' + id,
    data,
  )
}

export const useConfirmClosure = (
  id: string,
  options?: Omit<
    UseMutationOptions<
      TConfirmClosureResponse,
      AxiosError<ApiResponse<string>>,
      TConfirmClosureSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['form', 'confirm-closure', id],
    mutationFn: async (data) => {
      const response = await confirmClosure(id, data)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Form closed successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
