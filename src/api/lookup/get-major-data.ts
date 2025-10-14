import {
  queryOptions,
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query'

import type { TGetMajorDataResponse } from '@/types/lookup'
import { api } from '../lib/axios'
import type { ApiResponse } from '@/types/api'

const getMajorData = () => {
  return api.get<ApiResponse<TGetMajorDataResponse>>('/lookup/getMajorData')
}

export const getMajorDataQuery = () =>
  queryOptions({
    queryKey: ['lookup', 'major'],
    queryFn: async () => {
      const response = await getMajorData()
      return response.data.data
    },
    staleTime: Infinity,
  })

export const useGetMajorData = (
  options?: Omit<
    UseQueryOptions<
      TGetMajorDataResponse,
      Error,
      TGetMajorDataResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['lookup', 'major'],
    queryFn: async () => {
      const response = await getMajorData()
      return response.data.data
    },
    staleTime: Infinity,
    ...options,
  })
}
