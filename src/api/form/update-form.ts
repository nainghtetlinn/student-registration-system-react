import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { type TUpdateFormSchema } from '@/features/form/schemas/update-form-schema'
import type { ApiResponse } from '@/types/api'
import type { TUpdateFormRequest, TUpdateFormResponse } from '@/types/form'
import { api } from '../lib/axios'

const updateForm = (id: string, data: TUpdateFormRequest) => {
  return api.put<ApiResponse<TUpdateFormResponse>>('/admin/forms/' + id, data)
}

export const useUpdateForm = (
  id: string,
  options?: Omit<
    UseMutationOptions<TUpdateFormResponse, Error, TUpdateFormSchema>,
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
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
