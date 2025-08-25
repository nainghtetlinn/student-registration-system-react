import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query'

import type { ApiResponse } from '@/types/api'
import type { TProfile } from '@/types/profile'
import { api } from '../lib/axios'

export const getProfile = () => {
  return api.get<ApiResponse<TProfile>>('/staff/profile')
}

export const useGetProfile = (
  options?: Omit<
    UseQueryOptions<ApiResponse<TProfile>, Error, TProfile, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['profile', 'get'],
    queryFn: async () => {
      const response = await getProfile()
      return response.data
    },
    select: (response) => response.data,
    ...options,
  })
}
