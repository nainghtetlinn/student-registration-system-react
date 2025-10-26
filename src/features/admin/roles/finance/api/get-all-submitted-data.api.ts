import type { ApiResponse } from '@/types/api'
import type {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'
import type { TFilterSchema } from '../schema/filter.schema'
import type { TGetAllSubmittedDataResponse } from '../types/get.type'

import { useInfiniteQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

type TFilterGetAllSubmittedData = {
  keyword?: string
  page: number
  size: number
  sortField?: string
  sortDirection?: string
}

export const getAllSubmittedData = (search: TFilterGetAllSubmittedData) => {
  return api.get<ApiResponse<TGetAllSubmittedDataResponse>>(
    '/finance/getAllSubmittedData',
    {
      params: search,
    },
  )
}

type DataPage = {
  items: TGetAllSubmittedDataResponse
  currentPage: number
  totalPages: number
  totalItems: number
  nextPage: number | null
}

export type TData = InfiniteData<DataPage, number>

export const useGetAllSubmittedData = (
  search?: TFilterSchema,
  options?: Omit<
    UseInfiniteQueryOptions<
      DataPage,
      Error,
      TGetAllSubmittedDataResponse,
      QueryKey,
      number
    >,
    'queryFn' | 'queryKey' | 'initialPageParam' | 'getNextPageParam'
  >,
) => {
  return useInfiniteQuery({
    queryKey: ['finance', 'submitted-data'],
    queryFn: async ({ pageParam }) => {
      const response = await getAllSubmittedData({
        page: pageParam,
        size: 10,
        ...search,
      })
      const { currentPage, totalPages, totalItems } = response.data.meta
      return {
        items: response.data.data,
        currentPage,
        totalPages,
        totalItems,
        nextPage: currentPage === totalPages ? null : pageParam + 1,
      }
    },
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((p) => p.items),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    ...options,
  })
}
