import type { TProfile } from './profile'
import type { TUser } from './user'

export interface ApiResponse<T> {
  code: number
  duration: number
  message: string
  success: number
  meta: { endpoint: string; method: string }
  data: T
}

export type LoginResponse = {
  user: TUser
  token: {
    accessToken: string
  }
  profile: TProfile | null
}

export type LogoutResponse = string

export type GetMeResponse = TUser

export type RefreshTokenResponse = {
  accessToken: string
}

export type ChangePasswordResponse = string

export type VerifyOtpResponse = string

export type ResetPasswordResponse = string
