import {
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
    'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const response = await loginWithEmailAndPassword(data)
      return response.data.data
    },
    ...options,
    onSuccess: (responseData, ...rest) => {
      queryClient.setQueryData(['user'], responseData.user)
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
  options?: UseMutationOptions<LogoutResponse, Error, unknown>,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await logout()
      return response.data.data
    },
    ...options,
    onSuccess: (...args) => {
      queryClient.setQueryData(['user'], null)
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
export const useUser = (
  options?: Omit<
    UseQueryOptions<GetMeResponse, Error, GetMeResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { mutateAsync } = useRefreshToken()
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      await mutateAsync({})
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
    UseMutationOptions<RefreshTokenResponse, Error, unknown>,
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    mutationKey: ['refresh-token'],
    mutationFn: async () => {
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
