import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { toDto } from '@/features/student/lib/entrance-form-dto'
import { type TEntranceFormSchema } from '@/features/student/schemas/entrance-form-schema'
import type { ApiResponse } from '@/types/api'
import type {
  TUpdateEntranceFormErrorResponse,
  TUpdateEntranceFormRequest,
  TUpdateEntranceFormResponse,
} from '@/types/student'
import { api } from '../lib/axios'

const updateEntranceForm = (data: TUpdateEntranceFormRequest) => {
  return api.patch<ApiResponse<TUpdateEntranceFormResponse>>(
    '/student/entranceForm',
    data,
  )
}

export const useUpdateEntranceForm = (
  options?: Omit<
    UseMutationOptions<
      TUpdateEntranceFormResponse,
      AxiosError<ApiResponse<TUpdateEntranceFormErrorResponse>>,
      TEntranceFormSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['entrance form', 'create'],
    mutationFn: async (data) => {
      if (!data.acknowledged) throw new Error('Acknowledgement required.')
      const transformedData = toDto(data)
      const response = await updateEntranceForm(transformedData)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Entrance form submitted successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
