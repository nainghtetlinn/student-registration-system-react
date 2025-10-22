import type { ApiResponse } from '@/types/api'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TGetStudentEntranceFormResponse } from '../types/get.type'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

const getStudentEntranceForm = (id: string) => {
  return api.get<ApiResponse<TGetStudentEntranceFormResponse>>(
    '/studentAffair/entranceForm/' + id,
  )
}

export const getStudentEntranceFormQuery = (id: string) =>
  queryOptions({
    queryKey: ['student-affair', 'entrance-form', 'student', id],
    queryFn: async () => {
      const response = await getStudentEntranceForm(id)
      return response.data.data
    },
  })

export const useGetStudentEntranceForm = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      TGetStudentEntranceFormResponse,
      AxiosError<ApiResponse<string>>,
      TGetStudentEntranceFormResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['student-affair', 'entrance-form', 'student', id],
    queryFn: async () => {
      const response = await getStudentEntranceForm(id)
      return response.data.data
    },
    ...options,
  })
}
