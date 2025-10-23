import type { ApiResponse } from '@/types/api'
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TGetSubjectChoiceFormResponse } from '../types/get.type'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

const getSubjectChoiceForm = () => {
  return api.get<ApiResponse<TGetSubjectChoiceFormResponse>>(
    '/student/subjectChoiceForm',
  )
}

export const getSubjectChoiceFormQuery = () =>
  queryOptions({
    queryKey: ['form', 'subject-choice'],
    queryFn: async () => {
      const response = await getSubjectChoiceForm()
      return response.data.data
    },
  })

export const useGetSubjectChoiceForm = (
  options?: Omit<
    UseQueryOptions<
      TGetSubjectChoiceFormResponse,
      AxiosError<ApiResponse<string>>,
      TGetSubjectChoiceFormResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['form', 'subject-choice'],
    queryFn: async () => {
      const response = await getSubjectChoiceForm()
      return response.data.data
    },
    ...options,
  })
}
