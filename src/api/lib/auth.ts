import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { configureAuth } from 'react-query-auth'
import { z } from 'zod'

import type {
  ApiResponse,
  ChangePasswordResponse,
  GetMeResponse,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  ResetPasswordResponse,
  VerifyOtpResponse,
} from '@/types/api'
import { api } from './axios'
import type { TUser } from '@/types/user'

const passwordSchema = z.string().min(6)

export const loginInputSchema = z.object({
  email: z.email(),
  password: passwordSchema,
})

export type TLoginInput = z.infer<typeof loginInputSchema>

const loginWithEmailAndPassword = (data: TLoginInput) => {
  return api.post<ApiResponse<LoginResponse>>('/auth/login', data)
}

const logout = () => {
  return api.post<ApiResponse<LogoutResponse>>('/auth/logout')
}

export const getme = () => {
  return api.get<ApiResponse<GetMeResponse>>('/auth/me')
}

export const refreshToken = async () => {
  const response =
    await api.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh')
  localStorage.setItem('access-token', response.data.data.accessToken)
  return response.data.data
}

/********** Change Password **********/
export const changePasswordInputSchema = z.object({ email: z.email() })

export type TChangePasswordInput = z.infer<typeof changePasswordInputSchema>

export const useChangePassword = (
  options?: Omit<
    UseMutationOptions<ChangePasswordResponse, Error, TChangePasswordInput>,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: async (data) => {
      const response = await api.post<ApiResponse<ChangePasswordResponse>>(
        '/auth/change-password',
        data,
      )
      return response.data.message
    },
    ...options,
  })
/********** Change Password **********/

/********** Verify Otp **********/
export const verifyOtpInputSchema = z.object({
  email: z.email(),
  otp: z.string().length(6),
})

export type TVerifyOtpInput = z.infer<typeof verifyOtpInputSchema>

export const useVerifyOtp = (
  options?: Omit<
    UseMutationOptions<VerifyOtpResponse, Error, TVerifyOtpInput>,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: async (data) => {
      const response = await api.post<ApiResponse<VerifyOtpResponse>>(
        '/auth/verify-otp',
        data,
      )
      return response.data.message
    },
    ...options,
  })
/********** Verify Otp **********/

/********** Reset Password **********/
export const resetPasswordInputSchema = z.object({
  email: z.email(),
  newPassword: passwordSchema,
  confirmPassword: passwordSchema,
})

export type TResetPasswordInput = z.infer<typeof resetPasswordInputSchema>

export const useResetPassword = (
  options?: Omit<
    UseMutationOptions<ResetPasswordResponse, Error, TResetPasswordInput>,
    'mutationFn'
  >,
) =>
  useMutation({
    mutationFn: async (data) => {
      const response = await api.post<ApiResponse<ResetPasswordResponse>>(
        '/auth/reset-password',
        data,
      )
      return response.data.message
    },
    ...options,
  })
/********** Reset Password **********/

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
  userFn: async () => {
    await refreshToken()
    const response = await getme()
    return response.data.data
  },
  loginFn: async (data: TLoginInput) => {
    const response = await loginWithEmailAndPassword(data)
    localStorage.setItem('access-token', response.data.data.token.accessToken)
    return response.data.data.user
  },
  registerFn: async () => {
    console.log('Method not implemented yet.')
    return {} as TUser
  },
  logoutFn: async () => {
    const response = await logout()
    localStorage.removeItem('access-token')
    return response.data
  },
  userKey: ['user'],
})
