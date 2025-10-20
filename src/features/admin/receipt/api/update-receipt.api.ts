import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TReceiptSchema } from '../schema/receipt.schema'
import type {
  TUpdateReceiptRequest,
  TUpdateReceiptResponse,
} from '../types/update.type'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'

const updateReceipt = (id: string, data: TUpdateReceiptRequest) => {
  return api.put<ApiResponse<TUpdateReceiptResponse>>('/finance/' + id, data)
}

export const useUpdateReceipt = (
  id: string,
  options?: Omit<
    UseMutationOptions<
      TUpdateReceiptResponse,
      AxiosError<ApiResponse<string>>,
      TReceiptSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['receipt', 'update', id],
    mutationFn: async (data) => {
      const response = await updateReceipt(id, data)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Receipt updated successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
