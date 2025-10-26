import type { ApiResponse, GetAllAccountsResponse } from '@/types/api'
import type { TUser } from '@/types/user'
import type { QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query'

import { useInfiniteQuery } from '@tanstack/react-query'

import { api } from '../lib/axios'

type TFilterGetAccountsInput = {
  keyword?: string
  page: number
  size: number
  sortField?: string
  sortDirection?: string
  role?: string
}

export const getAllAccounts = (search: TFilterGetAccountsInput) => {
  return api.get<ApiResponse<GetAllAccountsResponse>>('/admin/getAllAccounts', {
    params: search,
  })
}

type UsersPage = {
  items: TUser[]
  currentPage: number
  totalPages: number
  totalItems: number
  nextPage: number | null
}

export const useGetAllAccounts = (
  search?: Omit<TFilterGetAccountsInput, 'page' | 'size'>,
  options?: Omit<
    UseInfiniteQueryOptions<UsersPage, Error, TUser[], QueryKey, number>,
    'queryFn' | 'queryKey' | 'initialPageParam' | 'getNextPageParam'
  >,
) => {
  return useInfiniteQuery({
    queryKey: ['admin', 'accounts'],
    queryFn: async ({ pageParam }) => {
      const response = await getAllAccounts({
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
