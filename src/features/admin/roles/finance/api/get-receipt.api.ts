import type { ApiResponse } from '@/types/api'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

const getReceipt = (id: string) => {
  return api.get<ApiResponse<string>>('/finance/' + id)
}

export const getReceiptQuery = (id: string) =>
  queryOptions({
    queryKey: ['receipts', id],
    queryFn: async () => {
      const response = await getReceipt(id)
      return response.data.data
    },
  })

export const useGetReceipt = (
  id: string,
  options?: Omit<
    UseQueryOptions<string, AxiosError<ApiResponse<string>>, string, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['receipts', id],
    queryFn: async () => {
      const response = await getReceipt(id)
      return response.data.data
    },
    ...options,
  })
}
