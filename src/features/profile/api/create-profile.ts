import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TProfileSchema } from '../schema/profile.schema'
import type {
  TCreateProfileRequest,
  TCreateProfileResponse,
} from '../types/create.type'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'
import { nrcObjectToString } from '@/lib/utils'

const toDto = (data: TProfileSchema): TCreateProfileRequest => ({
  mmName: data.mmName,
  engName: data.engName,
  nrc: nrcObjectToString(data.nrc),
})

const createProfile = (data: TCreateProfileRequest) => {
  return api.post<ApiResponse<TCreateProfileResponse>>('/staff/profile', data)
}

export const useCreateProfile = (
  options?: Omit<
    UseMutationOptions<
      TCreateProfileResponse,
      AxiosError<ApiResponse<string>>,
      TProfileSchema
    >,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['profile', 'create'],
    mutationFn: async (data) => {
      const transformedData = toDto(data)
      const response = await createProfile(transformedData)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Profile created successfully')
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
