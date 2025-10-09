import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { type TCreateFormSchema } from '@/features/form/schemas/create-form-schema'
import type { ApiResponse } from '@/types/api'
import type { TCreateFormRequest, TCreateFormResponse } from '@/types/form'
import { api } from '../lib/axios'

const createForm = (data: TCreateFormRequest) => {
  return api.post<ApiResponse<TCreateFormResponse>>('/admin/forms', data)
}

export const useCreateForm = (
  options?: Omit<
    UseMutationOptions<TCreateFormResponse, Error, TCreateFormSchema>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['form', 'create'],
    mutationFn: async (data) => {
      const response = await createForm(data)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Form created successfully')
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
