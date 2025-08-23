import type { ApiResponse, ResendPasswordResponse } from '@/types/api'
import { api } from '../lib/axios'

export const resendPassword = (data: { email: string }) => {
  return api.post<ApiResponse<ResendPasswordResponse>>(
    '/admin/resendPassword',
    data,
  )
}
