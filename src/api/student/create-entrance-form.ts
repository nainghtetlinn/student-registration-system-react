import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { toDto } from '@/features/student/lib/entrance-form-dto'
import { type TEntranceFormSchema } from '@/features/student/schemas/entrance-form-schema'
import type { ApiResponse } from '@/types/api'
import type {
  TRegisterEntranceFormRequest,
  TRegisterEntranceFormResponse,
  TUpdateEntranceFormErrorResponse,
} from '@/types/student'
import { api } from '../lib/axios'

export const createEntranceForm = (data: TRegisterEntranceFormRequest) => {
  return api.post<ApiResponse<TRegisterEntranceFormResponse>>(
    '/student/entranceForm',
    data,
  )
}

export const useCreateEntranceForm = (
  options?: Omit<
    UseMutationOptions<
      TRegisterEntranceFormResponse,
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
      const transformedData: TRegisterEntranceFormRequest = toDto(data)
      const response = await createEntranceForm(transformedData)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Entrance form submitted successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
