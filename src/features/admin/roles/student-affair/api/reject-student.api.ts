import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'

const rejectStudent = (id: string) => {
  return api.post<ApiResponse<string>>('/studentAffair/reject/' + id)
}

export const useRejectStudent = (
  id: string,
  options?: Omit<
    UseMutationOptions<string, AxiosError<ApiResponse<string>>, unknown>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['student-affair', 'reject', 'student', id],
    mutationFn: async () => {
      const response = await rejectStudent(id)
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
