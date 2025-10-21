import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TFormSchema } from '../schemas/form.schema'
import type {
  TUpdateFormRequest,
  TUpdateFormResponse,
} from '../types/update.type'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'

const updateForm = (id: string, data: TUpdateFormRequest) => {
  return api.put<ApiResponse<TUpdateFormResponse>>('/admin/forms/' + id, data)
}

export const useUpdateForm = (
  id: string,
  options?: Omit<
    UseMutationOptions<
      TUpdateFormResponse,
      AxiosError<ApiResponse<string>>,
      TFormSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['form', 'update', id],
    mutationFn: async (data) => {
      const response = await updateForm(id, data)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Form updated successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
