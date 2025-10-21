import type { ApiResponse } from '@/types/api'
import type { TProfile } from '@/types/profile'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/api/lib/axios'

const deleteFile = (type: 'Profile Photo' | 'Signature') => {
  return api.delete<ApiResponse<string>>('/staff/profile/deleteFile', {
    params: { type },
  })
}

export const useDeleteProfileFile = (
  options?: Omit<
    UseMutationOptions<string, AxiosError<ApiResponse<string>>, unknown>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['delete-file', 'profile-photo'],
    mutationFn: async () => {
      const response = await deleteFile('Profile Photo')
      return response.data.message
    },
    onSuccess: (response, ...restArgs) => {
      toast.success(response)
      queryClient.setQueryData(['profile'], (old: TProfile) => ({
        ...old,
        photoUrl: null,
      }))
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}

export const useDeleteProfileSignatureFile = (
  options?: Omit<
    UseMutationOptions<string, AxiosError<ApiResponse<string>>, unknown>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['delete-file', 'signature'],
    mutationFn: async () => {
      const response = await deleteFile('Signature')
      return response.data.message
    },
    onSuccess: (response, ...restArgs) => {
      toast.success(response)
      queryClient.setQueryData(['profile'], (old: TProfile) => ({
        ...old,
        signatureUrl: null,
      }))
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
