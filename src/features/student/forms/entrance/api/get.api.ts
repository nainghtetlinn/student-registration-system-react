import type { ApiResponse } from '@/types/api'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TGetEntranceFormResponse } from '../types/get.type'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

const getEntranceForm = () => {
  return api.get<ApiResponse<TGetEntranceFormResponse>>('/student/entranceForm')
}

export const getEntranceFormQuery = () =>
  queryOptions({
    queryKey: ['form', 'entrance'],
    queryFn: async () => {
      const response = await getEntranceForm()
      return response.data.data
    },
  })

export const useGetEntranceForm = (
  options?: Omit<
    UseQueryOptions<
      TGetEntranceFormResponse,
      AxiosError<ApiResponse<string>>,
      TGetEntranceFormResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['form', 'entrance'],
    queryFn: async () => {
      const response = await getEntranceForm()
      return response.data.data
    },
    ...options,
  })
}
