import { configureAuth } from 'react-query-auth'
import { z } from 'zod'

import type { AuthResponse } from '@/types/api'
import { api } from './axios'

export const loginInputSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export type TLoginInput = z.infer<typeof loginInputSchema>

export const loginWithEmailAndPassword = (
  data: TLoginInput,
): Promise<AuthResponse> => {
  return api.post('/auth/login', data)
}

export const registerInputSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

export type TRegisterInput = z.infer<typeof registerInputSchema>

export const registerWithEmailAndPassword = (
  data: TRegisterInput,
): Promise<AuthResponse> => {
  return api.post('/auth/register', data)
}

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth({
    userFn: async () => {
      const response = await api.get('/auth/me')
      return response.data
    },
    loginFn: async (data: TLoginInput) => {
      const response = await loginWithEmailAndPassword(data)
      return response.user
    },
    registerFn: async (data: TRegisterInput) => {
      const response = await registerWithEmailAndPassword(data)
      return response.user
    },
    logoutFn: async () => {
      const response = await api.post('/auth/logout')
      return response.data
    },
  })
