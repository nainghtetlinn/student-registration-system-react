import type { TProfile } from '@/types/profile'

export type TCreateProfileRequest = {
  mmName: string
  engName: string
  nrc: string
}

export type TCreateProfileResponse = TProfile
