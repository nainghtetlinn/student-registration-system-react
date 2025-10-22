import type { ApiResponse } from '@/types/api'
import type {
  QueryKey,
  UseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/react-query'
import type { TGetAllSubmittedDataResponse } from '../types/get.type'

import { useInfiniteQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { api } from '@/api/lib/axios'

export const filterGetAllSubmittedDataSchema = z.object({
  keyword: z.string().optional(),
  page: z.coerce.number().min(0).optional().default(0),
  size: z.coerce.number().min(1).optional().default(10),
  sortField: z.string().optional(),
  sortDirection: z.string().optional(),
})

export type TFilterGetAllSubmittedData = z.infer<
  typeof filterGetAllSubmittedDataSchema
>

export const getAllSubmittedData = (search: TFilterGetAllSubmittedData) => {
  return api.get<ApiResponse<TGetAllSubmittedDataResponse>>(
    '/studentAffair/getAllSubmittedData',
    {
      params: search,
    },
  )
}

type DataPage = {
  items: TGetAllSubmittedDataResponse
  nextPage: number | null
}

export type TData = InfiniteData<DataPage, number>

export const useGetAllSubmittedData = (
  options: Omit<
    UseInfiniteQueryOptions<
      DataPage,
      Error,
      TGetAllSubmittedDataResponse,
      QueryKey,
      number
    >,
    'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >,
  search?: Omit<TFilterGetAllSubmittedData, 'page'>,
) => {
  return useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const response = await getAllSubmittedData({
        page: pageParam,
        size: search?.size || 10,
        ...search,
      })
      const { currentPage, totalPages } = response.data.meta
      return {
        items: response.data.data,
        nextPage: currentPage === totalPages ? null : pageParam + 1,
      }
    },
    select: (data) => data.pages.flatMap((p) => p.items),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    ...options,
  })
}
