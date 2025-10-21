import type { ApiResponse } from '@/types/api'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TGetFormResponse } from '../types/get.type'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

const getForm = (id: string) => {
  return api.get<ApiResponse<TGetFormResponse>>('/admin/forms/' + id)
}

export const getFormQuery = (id: string) =>
  queryOptions({
    queryKey: ['forms', 'details', id],
    queryFn: async () => {
      const response = await getForm(id)
      return response.data.data
    },
  })

export const useGetForm = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      TGetFormResponse,
      AxiosError<ApiResponse<string>>,
      TGetFormResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['forms', 'details', id],
    queryFn: async () => {
      const response = await getForm(id)
      return response.data.data
    },
    ...options,
  })
}
