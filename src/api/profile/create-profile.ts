import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'

import { nrcSchema } from '@/lib/schema'
import { nrcObjectToString } from '@/lib/utils'
import type { ApiResponse } from '@/types/api'
import type { TProfile } from '@/types/profile'
import { api } from '../lib/axios'

export const createProfileInputSchema = z.object({
  mmName: z.string().min(1),
  engName: z.string().min(1),
  nrc: nrcSchema,
})

export type TCreateProfileInput = z.infer<typeof createProfileInputSchema>

export const createProfile = (data: TCreateProfileInput) => {
  return api.post<ApiResponse<TProfile>>('/staff/profile', {
    mmName: data.mmName,
    engName: data.engName,
    nrc: nrcObjectToString(data.nrc),
  })
}

export const useCreateProfile = (
  options?: Omit<
    UseMutationOptions<TProfile, Error, TCreateProfileInput>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['profile', 'create'],
    mutationFn: async (data) => {
      const response = await createProfile(data)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Profile created successfully')
      queryClient.setQueryData(['profile'], response)
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
