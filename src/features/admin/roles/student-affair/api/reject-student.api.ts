import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type {
  TRejectStudentRequest,
  TRejectStudentResponse,
} from '../types/reject.type'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'

const rejectStudent = (id: string, data: TRejectStudentRequest) => {
  return api.post<ApiResponse<TRejectStudentResponse>>(
    '/studentAffair/reject/' + id,
    data,
  )
}

export const useRejectStudent = (
  id: string,
  options?: Omit<
    UseMutationOptions<
      TRejectStudentResponse,
      AxiosError<ApiResponse<string>>,
      TRejectStudentRequest
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['student-affair', 'reject', 'student', id],
    mutationFn: async (data) => {
      const response = await rejectStudent(id, data)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Rejected student successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
