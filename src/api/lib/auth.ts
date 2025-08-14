import { z } from 'zod'
import { configureAuth } from 'react-query-auth'

import type { ApiResponse, LoginResponse } from '@/types/api'
import { api } from './axios'

export const loginInputSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export type TLoginInput = z.infer<typeof loginInputSchema>

export const loginWithEmailAndPassword = (
  data: TLoginInput,
): Promise<ApiResponse<LoginResponse>> => {
  return api.post('/auth/users/login', data)
}

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
  userFn: () => {
    console.log('Method not implemented yet.')
    return {} as LoginResponse
  },
  loginFn: async (data: TLoginInput) => {
    const response = await loginWithEmailAndPassword(data)
    localStorage.setItem('access-token', response.data.token.accessToken)
    localStorage.setItem('refresh-token', response.data.token.refreshToken)
    return response.data
  },
  registerFn: async () => {
    console.log('Method not implemented yet.')
    return {} as LoginResponse
  },
  logoutFn: async () => {
    console.log('Method not implemented yet.')
    return
  },
  userKey: ['user'],
})
