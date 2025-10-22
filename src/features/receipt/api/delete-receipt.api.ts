import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'

const deleteReceipt = (id: string) => {
  return api.delete<ApiResponse<string>>('/finance/' + id)
}

export const useDeleteReceipt = (
  id: string,
  options?: Omit<
    UseMutationOptions<string, AxiosError<ApiResponse<string>>>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['receipt', 'delete', id],
    mutationFn: async () => {
      const response = await deleteReceipt(id)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Receipt deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['receipts'] })
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
