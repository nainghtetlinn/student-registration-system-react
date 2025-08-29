import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query'
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

const passwordSchema = z.string().min(6)

/********** Login **********/
export const loginInputSchema = z.object({
  email: z.email(),
  password: passwordSchema,
})

export type TLoginInput = z.infer<typeof loginInputSchema>

const loginWithEmailAndPassword = (data: TLoginInput) => {
  return api.post<ApiResponse<LoginResponse>>('/auth/login', data)
}
export const useLogin = (
  options?: Omit<
    UseMutationOptions<LoginResponse, Error, TLoginInput>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: async (data) => {
      const response = await loginWithEmailAndPassword(data)
      return response.data.data
    },
    ...options,
    onSuccess: (responseData, ...rest) => {
      queryClient.setQueryData(['auth', 'user'], responseData.user)
      queryClient.setQueryData(['profile'], responseData.profile)
      localStorage.setItem('access-token', responseData.token.accessToken)
      options?.onSuccess?.(responseData, ...rest)
    },
  })
}
/********** Login **********/

/********** Logout **********/
const logout = () => {
  return api.post<ApiResponse<LogoutResponse>>('/auth/logout')
}
export const useLogout = (
  options?: Omit<
    UseMutationOptions<LogoutResponse, Error, unknown>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: async () => {
      const response = await logout()
      return response.data.data
    },
    ...options,
    onSuccess: (...args) => {
      queryClient.setQueryData(['auth', 'user'], null)
      localStorage.removeItem('access-token')
      options?.onSuccess?.(...args)
    },
  })
}
/********** Logout **********/

/********** Get Me **********/
const getme = () => {
  return api.get<ApiResponse<GetMeResponse>>('/auth/me')
}
export const getUserQuery = () =>
  queryOptions({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const response = await getme()
      return response.data.data
    },
  })
export const useUser = (
  options?: Omit<
    UseQueryOptions<GetMeResponse, Error, GetMeResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const response = await getme()
      return response.data.data
    },
    ...options,
  })
}
/********** Get Me **********/

/********** Refresh Token **********/
const refreshToken = async () => {
  return api.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh')
}
export const useRefreshToken = (
  options?: Omit<
    UseQueryOptions<
      RefreshTokenResponse,
      Error,
      RefreshTokenResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery({
    queryKey: ['auth', 'refresh-token'],
    queryFn: async () => {
      const response = await refreshToken()
      localStorage.setItem('access-token', response.data.data.accessToken)
      return response.data.data
    },
    ...options,
  })
/********** Refresh Token **********/

/********** Change Password **********/
export const changePasswordInputSchema = z.object({ email: z.email() })

export type TChangePasswordInput = z.infer<typeof changePasswordInputSchema>

export const useChangePassword = (
  options?: Omit<
    UseMutationOptions<ChangePasswordResponse, Error, TChangePasswordInput>,
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    mutationKey: ['auth', 'change-password'],
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
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    mutationKey: ['auth', 'verify-otp'],
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
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    mutationKey: ['auth', 'reset-password'],
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
