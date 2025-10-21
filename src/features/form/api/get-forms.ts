import type { ApiResponse } from '@/types/api'
import type { TForm } from '@/types/form'
import type { QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query'
import type { TGetFormsResponse } from '../types/get.type'
import type { AxiosError } from 'axios'

import { useInfiniteQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { api } from '@/api/lib/axios'

export const filterGetFormsInputSchema = z.object({
  page: z.coerce.number().min(0).optional(),
  size: z.coerce.number().min(1).optional(),
})

export type TFilterGetFormsInput = z.infer<typeof filterGetFormsInputSchema>

const getForms = (search: TFilterGetFormsInput) => {
  const params = {
    page: 0,
    size: 10,
    ...search,
  }
  return api.get<ApiResponse<TGetFormsResponse>>('/admin/forms', { params })
}

type FormsPage = {
  forms: TForm[]
  nextPage: number | null
}

export const useGetForms = (
  options: Omit<
    UseInfiniteQueryOptions<
      FormsPage,
      AxiosError<ApiResponse<string>>,
      TForm[],
      QueryKey,
      number
    >,
    'queryFn' | 'queryKey' | 'initialPageParam' | 'getNextPageParam'
  >,
  search?: Omit<TFilterGetFormsInput, 'page'>,
) => {
  return useInfiniteQuery({
    queryKey: ['forms'],
    queryFn: async ({ pageParam }) => {
      const response = await getForms({ page: pageParam, ...search })
      const { currentPage, totalPages } = response.data.meta
      return {
        forms: response.data.data,
        nextPage: currentPage === totalPages ? null : pageParam + 1,
      }
    },
    select: (data) => data.pages.flatMap((p) => p.forms),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    ...options,
  })
}
