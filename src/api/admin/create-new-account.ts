import type { TCreateNewAccountInput } from '@/features/admin/utils/schemas'
import type { ApiResponse, RegisterResponse } from '@/types/api'
import { api } from '../lib/axios'

export const createNewAccountWithEmailAndRole = (
  data: TCreateNewAccountInput,
) => {
  return api.post<ApiResponse<RegisterResponse>>('/admin/register', data)
}
