import {
  queryOptions,
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query'

import type { ApiResponse } from '@/types/api'
import type { TGetOpenedFormsResponse } from '@/types/form'
import { api } from '../lib/axios'

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
      Error,
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
