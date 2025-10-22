import type { ApiResponse } from '@/types/api'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TGetStudentSubjectChoiceFormResponse } from '../types/get.type'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

const getStudentSubjectChoiceForm = (id: string) => {
  return api.get<ApiResponse<TGetStudentSubjectChoiceFormResponse>>(
    '/finance/subjectChoice/' + id,
  )
}

export const getStudentSubjectChoiceFormQuery = (id: string) =>
  queryOptions({
    queryKey: ['finance', 'subject-choice-form', 'student', id],
    queryFn: async () => {
      const response = await getStudentSubjectChoiceForm(id)
      return response.data.data
    },
  })

export const useGetStudentSubjectChoiceForm = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      TGetStudentSubjectChoiceFormResponse,
      AxiosError<ApiResponse<string>>,
      TGetStudentSubjectChoiceFormResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['finance', 'subject-choice-form', 'student', id],
    queryFn: async () => {
      const response = await getStudentSubjectChoiceForm(id)
      return response.data.data
    },
    ...options,
  })
}
