import type { ApiResponse } from '@/types/api'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TGetOpenedFormsResponse } from '../types/get.type'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

const getOpenedForms = () => {
  return api.get<ApiResponse<TGetOpenedFormsResponse>>('/forms/open/all')
}

export const getOpenedFormsQuery = () =>
  queryOptions({
    queryKey: ['forms', 'opened'],
    queryFn: async () => {
      const response = await getOpenedForms()
      return response.data.data
    },
  })

export const useGetOpenedForms = (
  options?: Omit<
    UseQueryOptions<
      TGetOpenedFormsResponse,
      AxiosError<ApiResponse<string>>,
      TGetOpenedFormsResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['forms', 'opened'],
    queryFn: async () => {
      const response = await getOpenedForms()
      return response.data.data
    },
    ...options,
  })
}
