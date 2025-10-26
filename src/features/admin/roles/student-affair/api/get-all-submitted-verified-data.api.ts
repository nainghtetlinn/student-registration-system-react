import type { ApiResponse } from '@/types/api'
import type {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'
import type { TGetAllSubmittedVerifiedDataResponse } from '../types/get.type'

import { useInfiniteQuery } from '@tanstack/react-query'

import { api } from '@/api/lib/axios'

type TFilterGetAllSubmittedVerifiedData = {
  keyword?: string
  page: number
  size: number
  sortField?: string
  sortDirection?: string
}

export const getAllSubmittedVerifiedData = (
  search: TFilterGetAllSubmittedVerifiedData,
) => {
  return api.get<ApiResponse<TGetAllSubmittedVerifiedDataResponse>>(
    '/studentAffair/getAllSubmittedVerifiedData',
    {
      params: search,
    },
  )
}

type DataPage = {
  items: TGetAllSubmittedVerifiedDataResponse
  currentPage: number
  totalPages: number
  totalItems: number
  nextPage: number | null
}

export type TData = InfiniteData<DataPage, number>

export const useGetAllSubmittedVerifiedData = (
  search?: Omit<TFilterGetAllSubmittedVerifiedData, 'page' | 'size'>,
  options?: Omit<
    UseInfiniteQueryOptions<
      DataPage,
      Error,
      TGetAllSubmittedVerifiedDataResponse,
      QueryKey,
      number
    >,
    'queryFn' | 'queryKey' | 'initialPageParam' | 'getNextPageParam'
  >,
) => {
  return useInfiniteQuery({
    queryKey: ['student-affair', 'submitted-verified-data'],
    queryFn: async ({ pageParam }) => {
      const response = await getAllSubmittedVerifiedData({
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
    select: (data) => data.pages.flatMap((p) => p.items),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    ...options,
  })
}
