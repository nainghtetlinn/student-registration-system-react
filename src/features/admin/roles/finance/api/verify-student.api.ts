import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TVerifyStudentSchema } from '../schema/verify-student.schema'
import type {
  TVerifyStudentRequest,
  TVerifyStudentResponse,
} from '../types/verify.type'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'

const verifyStudent = (id: string, data: TVerifyStudentRequest) => {
  return api.post<ApiResponse<TVerifyStudentResponse>>(
    '/finance/verify/' + id,
    data,
  )
}

export const useVerifyStudent = (
  id: string,
  options?: Omit<
    UseMutationOptions<
      TVerifyStudentResponse,
      AxiosError<ApiResponse<string>>,
      TVerifyStudentSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['finance', 'verify', 'student', id],
    mutationFn: async (data) => {
      const response = await verifyStudent(id, data)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Verified student successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
