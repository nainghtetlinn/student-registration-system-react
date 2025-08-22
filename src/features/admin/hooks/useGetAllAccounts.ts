import { getAllAccounts } from '@/api/admin/get-all-accounts'
import type { TUser } from '@/types/user'
import {
  useInfiniteQuery,
  type QueryKey,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query'

type UsersPage = {
  users: TUser[]
  nextPage: number | null
}

export const useGetAllAccounts = (
  options: Omit<
    UseInfiniteQueryOptions<UsersPage, Error, TUser[], QueryKey, number>,
    'queryFn' | 'initialPageParam' | 'getPreviousPageParam' | 'getNextPageParam'
  >,
) =>
  useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const response = await getAllAccounts({ page: pageParam })
      const { currentPage, totalPages } = response.data.meta
      const current = currentPage - 1
      return {
        users: response.data.data,
        nextPage: current < totalPages ? current + 1 : null,
      }
    },
    select: (data) => data.pages.flatMap((p) => p.users),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    ...options,
  })
