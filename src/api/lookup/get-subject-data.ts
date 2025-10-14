import {
  queryOptions,
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query'

import type { TGetSubjectDataResponse } from '@/types/lookup'
import { api } from '../lib/axios'
import type { ApiResponse } from '@/types/api'

const getSubjectData = () => {
  return api.get<ApiResponse<TGetSubjectDataResponse>>('/lookup/getSubjectData')
}

export const getSubjectDataQuery = () =>
  queryOptions({
    queryKey: ['lookup', 'subject'],
    queryFn: async () => {
      const response = await getSubjectData()
      return response.data.data
    },
    staleTime: Infinity,
  })

export const useGetSubjectData = (
  options?: Omit<
    UseQueryOptions<
      TGetSubjectDataResponse,
      Error,
      TGetSubjectDataResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['lookup', 'subject'],
    queryFn: async () => {
      const response = await getSubjectData()
      return response.data.data
    },
    staleTime: Infinity,
    ...options,
  })
}
