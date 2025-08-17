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
  token: {
    accessToken: string
  }
} & TUser

export type LogoutResponse = string

export type GetMeResponse = TUser

export type RefreshTokenResponse = {
  accessToken: string
}
