import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { toDto } from '@/features/student/lib/entrance-form-dto'
import { type TEntranceFormSchema } from '@/features/student/schemas/entrance-form-schema'
import type { ApiResponse } from '@/types/api'
import type {
  TRegisterEntranceFormRequest,
  TRegisterEntranceFormResponse,
} from '@/types/student'
import { api } from '../lib/axios'

export const createEntranceForm = (data: TEntranceFormSchema) => {
  if (!data.acknowledged) throw new Error('Acknowledgement required.')

  const transformedData: TRegisterEntranceFormRequest = toDto(data)

  return api.post<ApiResponse<TRegisterEntranceFormResponse>>(
    '/student/entranceForm',
    transformedData,
  )
}

export const useCreateEntranceForm = (
  options?: Omit<
    UseMutationOptions<
      TRegisterEntranceFormResponse,
      Error,
      TEntranceFormSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['entrance form', 'create'],
    mutationFn: async (data) => {
      const response = await createEntranceForm(data)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Entrance form submitted successfully')
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
