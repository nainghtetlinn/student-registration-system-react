import type { ApiResponse } from '@/types/api'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TGetStudentRegistrationFormResponse } from '../types/get.type'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

const getStudentRegistrationForm = (id: string) => {
  return api.get<ApiResponse<TGetStudentRegistrationFormResponse>>(
    '/finance/registrationForm/' + id,
  )
}

export const getStudentRegistrationFormQuery = (id: string) =>
  queryOptions({
    queryKey: ['finance', 'subject-choice-form', 'student', id],
    queryFn: async () => {
      const response = await getStudentRegistrationForm(id)
      return response.data.data
    },
  })

export const useGetStudentRegistrationForm = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      TGetStudentRegistrationFormResponse,
      AxiosError<ApiResponse<string>>,
      TGetStudentRegistrationFormResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['finance', 'registration-form', 'student', id],
    queryFn: async () => {
      const response = await getStudentRegistrationForm(id)
      return response.data.data
    },
    ...options,
  })
}
