import {
  queryOptions,
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query'

import { fromDto } from '@/features/student/lib/entrance-form-dto'
import type { TEntranceFormSchema } from '@/features/student/schemas/entrance-form-schema'
import type { ApiResponse } from '@/types/api'
import type { TGetEntranceFormResponse } from '@/types/student'
import { api } from '../lib/axios'

const getEntranceForm = () => {
  return api.get<ApiResponse<TGetEntranceFormResponse>>('/student/entranceForm')
}

export const getEntranceFormQuery = () =>
  queryOptions({
    queryKey: ['entrance form'],
    queryFn: async () => {
      const response = await getEntranceForm()
      return fromDto(response.data.data)
    },
  })

export const useGetEntranceForm = (
  options?: Omit<
    UseQueryOptions<TEntranceFormSchema, Error, TEntranceFormSchema, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['entrance form'],
    queryFn: async () => {
      const response = await getEntranceForm()
      return fromDto(response.data.data)
    },
    ...options,
  })
}
