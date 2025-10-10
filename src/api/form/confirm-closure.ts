import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

import { type TConfirmClosureSchema } from '@/features/form/schemas/confirm-closure-schema'
import type { ApiResponse } from '@/types/api'
import type {
  TConfirmClosureRequest,
  TConfirmClosureResponse,
} from '@/types/form'
import { api } from '../lib/axios'

const confirmClosure = (id: string, data: TConfirmClosureRequest) => {
  return api.post<ApiResponse<TConfirmClosureResponse>>(
    '/admin/forms/confirm-closure/' + id,
    data,
  )
}

export const useConfirmClosure = (
  id: string,
  options?: Omit<
    UseMutationOptions<TConfirmClosureResponse, Error, TConfirmClosureSchema>,
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
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
