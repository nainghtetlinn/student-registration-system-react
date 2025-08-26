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

export const updateProfileInputSchema = z.object({
  mmName: z.string().min(1).optional(),
  engName: z.string().min(1).optional(),
  nrc: nrcSchema.optional(),
})

export type TUpdateProfileInput = z.infer<typeof updateProfileInputSchema>

export const updateProfile = (data: TUpdateProfileInput) => {
  console.log({
    mmName: data.mmName,
    engName: data.engName,
    nrc: data.nrc ? nrcObjectToString(data.nrc) : null,
  })
  return api.patch<ApiResponse<TProfile>>('/staff/profile', {
    mmName: data.mmName,
    engName: data.engName,
    nrc: data.nrc ? nrcObjectToString(data.nrc) : null,
  })
}

export const useUpdateProfile = (
  options?: Omit<
    UseMutationOptions<TProfile, Error, TUpdateProfileInput>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['profile', 'create'],
    mutationFn: async (data) => {
      const response = await updateProfile(data)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Profile updated successfully')
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
