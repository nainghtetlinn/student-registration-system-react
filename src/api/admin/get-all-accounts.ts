import {
  useInfiniteQuery,
  type QueryKey,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

import type { ApiResponse, GetAllAccountsResponse } from '@/types/api'
import type { TUser } from '@/types/user'
import { api } from '../lib/axios'

export const filterGetAccountsInputSchema = z.object({
  keyword: z.string().optional(),
  role: z.string().optional(),
  page: z.coerce.number().min(0).optional(),
  size: z.coerce.number().min(1).optional(),
  sortField: z.string().optional(),
  sortDirection: z.string().optional(),
})

export type TFilterGetAccountsInput = z.infer<
  typeof filterGetAccountsInputSchema
>

export const getAllAccounts = (search: TFilterGetAccountsInput) => {
  const params = {
    page: 0,
    size: 10,
    ...search,
  }
  return api.get<ApiResponse<GetAllAccountsResponse>>('/admin/getAllAccounts', {
    params,
  })
}

type UsersPage = {
  users: TUser[]
  nextPage: number | null
}

export const useGetAllAccounts = (
  options: Omit<
    UseInfiniteQueryOptions<UsersPage, Error, TUser[], QueryKey, number>,
    'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >,
  search?: Omit<TFilterGetAccountsInput, 'page'>,
) => {
  return useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const response = await getAllAccounts({ page: pageParam, ...search })
      const { currentPage, totalPages } = response.data.meta
      return {
        users: response.data.data,
        nextPage: currentPage === totalPages ? null : pageParam + 1,
      }
    },
    select: (data) => data.pages.flatMap((p) => p.users),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    ...options,
  })
}
