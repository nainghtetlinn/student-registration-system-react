import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TFormSchema } from '../schemas/form.schema'
import type {
  TCreateFormRequest,
  TCreateFormResponse,
} from '../types/create.type'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'

const createForm = (data: TCreateFormRequest) => {
  return api.post<ApiResponse<TCreateFormResponse>>('/admin/forms', data)
}

export const useCreateForm = (
  options?: Omit<
    UseMutationOptions<
      TCreateFormResponse,
      AxiosError<ApiResponse<string>>,
      TFormSchema
    >,
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
      toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
