import type { ApiResponse } from '@/types/api'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TGetRegistrationFormResponse } from '../types/get.type'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

const getRegistrationForm = () => {
  return api.get<ApiResponse<TGetRegistrationFormResponse>>(
    '/student/registrationForm',
  )
}

export const getRegistrationFormQuery = () =>
  queryOptions({
    queryKey: ['form', 'registration'],
    queryFn: async () => {
      const response = await getRegistrationForm()
      return response.data.data
    },
  })

export const useGetRegistrationForm = (
  options?: Omit<
    UseQueryOptions<
      TGetRegistrationFormResponse,
      AxiosError<ApiResponse<string>>,
      TGetRegistrationFormResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['form', 'registration'],
    queryFn: async () => {
      const response = await getRegistrationForm()
      return response.data.data
    },
    ...options,
  })
}
