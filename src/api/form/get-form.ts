import {
  queryOptions,
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query'

import type { ApiResponse } from '@/types/api'
import type { TGetFormResponse } from '@/types/form'
import { api } from '../lib/axios'

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
    UseQueryOptions<TGetFormResponse, Error, TGetFormResponse, QueryKey>,
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
