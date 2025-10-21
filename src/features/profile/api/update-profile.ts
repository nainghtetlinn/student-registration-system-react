import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TProfileSchema } from '../schema/profile.schema'
import type {
  TUpdateProfileRequest,
  TUpdateProfileResponse,
} from '../types/update.type'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'
import { nrcObjectToString } from '@/lib/utils'

const toDto = (data: TProfileSchema): TUpdateProfileRequest => ({
  mmName: data.mmName,
  engName: data.engName,
  nrc: nrcObjectToString(data.nrc),
})

const updateProfile = (data: TUpdateProfileRequest) => {
  return api.patch<ApiResponse<TUpdateProfileResponse>>('/staff/profile', data)
}

export const useUpdateProfile = (
  options?: Omit<
    UseMutationOptions<
      TUpdateProfileResponse,
      AxiosError<ApiResponse<string>>,
      TProfileSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['profile', 'update'],
    mutationFn: async (data) => {
      const transformedData = toDto(data)
      const response = await updateProfile(transformedData)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Profile updated successfully')
      queryClient.setQueryData(['profile'], response)
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
