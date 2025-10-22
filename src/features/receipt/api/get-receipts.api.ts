import type { ApiResponse } from '@/types/api'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TGetReceiptsResponse } from '../types/get.type'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

const getReceipts = () => {
  return api.get<ApiResponse<TGetReceiptsResponse>>('/finance')
}

export const getReceiptsQuery = () =>
  queryOptions({
    queryKey: ['receipts'],
    queryFn: async () => {
      const response = await getReceipts()
      return response.data.data
    },
  })

export const useGetReceipts = (
  options?: Omit<
    UseQueryOptions<
      TGetReceiptsResponse,
      AxiosError<ApiResponse<string>>,
      TGetReceiptsResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['receipts'],
    queryFn: async () => {
      const response = await getReceipts()
      return response.data.data
    },
    ...options,
  })
}
