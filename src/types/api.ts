import type { TProfile } from './profile'
import type { TUser } from './user'

type Meta = {
  method: string
  endpoint: string
  totalItems: number
  totalPages: number
  currentPage: number
}

export interface ApiResponse<T> {
  code: number
  duration: number
  message: string
  success: number
  meta: Meta
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

export type RegisterResponse = string

export type GetAllAccountsResponse = TUser[]

export type ResendPasswordResponse = string
