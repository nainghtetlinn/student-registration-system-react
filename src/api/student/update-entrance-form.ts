import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import type { TEntranceFormInput } from '@/features/student/schemas/entrance-form-schema'
import { nrcObjectToString } from '@/lib/utils'
import type { ApiResponse } from '@/types/api'
import type {
  TUpdateEntranceFormRequest,
  TUpdateEntranceFormResponse,
} from '@/types/student'
import { api } from '../lib/axios'

const updateEntranceForm = (data: TEntranceFormInput) => {
  const { acknowledged, ...payload } = data
  if (!acknowledged) throw new Error('Acknowledgement required.')

  const transformedData: TUpdateEntranceFormRequest = {
    ...payload,
    academicYear: data.academicYear ? data.academicYear : undefined,
    dob: data.dob ? data.dob.toISOString().split('T')[0] : undefined,
    studentNrc: data.studentNrc
      ? nrcObjectToString(data.studentNrc)
      : undefined,
    fatherNrc: data.fatherNrc ? nrcObjectToString(data.fatherNrc) : undefined,
    motherNrc: data.motherNrc ? nrcObjectToString(data.motherNrc) : undefined,
  }

  return api.patch<ApiResponse<TUpdateEntranceFormResponse>>(
    '/student/entranceForm',
    transformedData,
  )
}

export const useUpdateEntranceForm = (
  options?: Omit<
    UseMutationOptions<TUpdateEntranceFormResponse, Error, TEntranceFormInput>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['entrance form', 'create'],
    mutationFn: async (data) => {
      const response = await updateEntranceForm(data)
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
