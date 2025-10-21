import type { ApiResponse } from '@/types/api'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TGetReceiptResponse } from '../types/get.type'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

type Year =
  | 'FIRST_YEAR'
  | 'SECOND_YEAR'
  | 'THIRD_YEAR'
  | 'FOURTH_YEAR'
  | 'FIFTH_YEAR'
  | 'SIXTH_YEAR'

const getReceipt = (year: Year) => {
  return api.get<ApiResponse<TGetReceiptResponse>>('/student/receipt', {
    params: {
      year,
    },
  })
}

export const getReceiptQuery = (year: Year) =>
  queryOptions({
    queryKey: ['payment', 'receipt', year],
    queryFn: async () => {
      const response = await getReceipt(year)
      return response.data.data
    },
  })

export const useGetReceipt = (
  year: Year,
  options?: Omit<
    UseQueryOptions<
      TGetReceiptResponse,
      AxiosError<ApiResponse<string>>,
      TGetReceiptResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['payment', 'receipt', year],
    queryFn: async () => {
      const response = await getReceipt(year)
      return response.data.data
    },
    ...options,
  })
}
