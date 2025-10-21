import type { ApiResponse } from '@/types/api'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TGetProfileResponse } from '../types/get.type'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

const getProfile = () => {
  return api.get<ApiResponse<TGetProfileResponse>>('/staff/profile')
}

export const getProfileQuery = () =>
  queryOptions({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await getProfile()
      return response.data.data
    },
  })

export const useGetProfile = (
  options?: Omit<
    UseQueryOptions<
      TGetProfileResponse,
      AxiosError<ApiResponse<string>>,
      TGetProfileResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await getProfile()
      return response.data.data
    },
    ...options,
  })
}
