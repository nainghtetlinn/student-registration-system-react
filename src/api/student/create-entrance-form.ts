import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { type TEntranceFormInput } from '@/features/student/schemas/entrance-form-schema'
import { nrcObjectToString } from '@/lib/utils'
import type { ApiResponse } from '@/types/api'
import type {
  TRegisterEntranceFormRequest,
  TRegisterEntranceFormResponse,
} from '@/types/student'
import { api } from '../lib/axios'

export const createEntranceForm = (data: TEntranceFormInput) => {
  const { acknowledged, ...payload } = data
  if (!acknowledged) throw new Error('Acknowledgement required.')

  const transformedData: TRegisterEntranceFormRequest = {
    ...payload,
    academicYear:
      payload.academicYear ||
      `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    studentNrc: nrcObjectToString(payload.studentNrc),
    dob: payload.dob.toISOString().split('T')[0],
    fatherNrc: nrcObjectToString(payload.fatherNrc),
    motherNrc: nrcObjectToString(payload.motherNrc),
  }
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
      TEntranceFormInput
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
