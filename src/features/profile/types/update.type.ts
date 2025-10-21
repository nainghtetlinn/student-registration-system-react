import type { TProfile } from '@/types/profile'

export type TUpdateProfileRequest = {
  mmName?: string
  engName?: string
  nrc?: string
}

export type TUpdateProfileResponse = TProfile
