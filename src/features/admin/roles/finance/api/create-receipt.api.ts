import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TReceiptSchema } from '../schema/receipt.schema'
import type {
  TCreateReceiptRequest,
  TCreateReceiptResponse,
} from '../types/create.type'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'

const createReceipt = (data: TCreateReceiptRequest) => {
  return api.post<ApiResponse<TCreateReceiptResponse>>('/finance', data)
}

export const useCreateReceipt = (
  options?: Omit<
    UseMutationOptions<
      TCreateReceiptResponse,
      AxiosError<ApiResponse<string>>,
      TReceiptSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['receipt', 'create'],
    mutationFn: async (data) => {
      const response = await createReceipt(data)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Receipt created successfully')
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
