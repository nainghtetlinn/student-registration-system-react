import { configureAuth } from 'react-query-auth'
import { z } from 'zod'

import type {
  ApiResponse,
  GetMeResponse,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
} from '@/types/api'
import { api } from './axios'

export const loginInputSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export type TLoginInput = z.infer<typeof loginInputSchema>

const loginWithEmailAndPassword = (
  data: TLoginInput,
): Promise<ApiResponse<LoginResponse>> => {
  return api.post('/auth/login', data)
}

const logout = (): Promise<ApiResponse<LogoutResponse>> => {
  return api.post('/auth/logout')
}

export const getme = (): Promise<ApiResponse<GetMeResponse>> => {
  return api.get('/auth/me')
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = (await api.post(
    '/auth/refresh',
  )) as ApiResponse<RefreshTokenResponse>
  localStorage.setItem('access-token', response.data.accessToken)
  return response.data
}

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
  userFn: async () => {
    await refreshToken()
    const response = await getme()
    return response.data
  },
  loginFn: async (data: TLoginInput) => {
    const response = await loginWithEmailAndPassword(data)
    localStorage.setItem('access-token', response.data.token.accessToken)
    return response.data
  },
  registerFn: async () => {
    console.log('Method not implemented yet.')
    return {} as LoginResponse
  },
  logoutFn: async () => {
    const response = await logout()
    localStorage.removeItem('access-token')
    return response.data
  },
  userKey: ['user'],
})
