import type { ApiResponse } from '@/types/api'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TGetStudentRegistrationFormResponse } from '../types/get.type'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

const getStudentRegistrationForm = (id: string) => {
  return api.get<ApiResponse<TGetStudentRegistrationFormResponse>>(
    '/studentAffair/registrationForm/' + id,
  )
}

export const getStudentRegistrationFormQuery = (id: string) =>
  queryOptions({
    queryKey: ['student-affair', 'subject-choice-form', 'student', id],
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
    queryKey: ['student-affair', 'registration-form', 'student', id],
    queryFn: async () => {
      const response = await getStudentRegistrationForm(id)
      return response.data.data
    },
    ...options,
  })
}
