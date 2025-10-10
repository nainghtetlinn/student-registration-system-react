import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import type { ApiResponse } from '@/types/api'
import type { TInitiateClosureResponse } from '@/types/form'
import { api } from '../lib/axios'

const initiateClosure = (id: string) => {
  return api.post<ApiResponse<TInitiateClosureResponse>>(
    '/admin/forms/initiate-closure/' + id,
  )
}

export const useInitiateClosure = (
  id: string,
  options?: Omit<
    UseMutationOptions<TInitiateClosureResponse, Error, unknown>,
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
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
