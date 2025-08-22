import type { TFilterGetAccountsInput } from '@/features/admin/utils/schemas'
import { api } from '../lib/axios'
import type { ApiResponse, GetAllAccountsResponse } from '@/types/api'

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
