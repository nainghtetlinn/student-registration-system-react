import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'

import type { ApiResponse } from '@/types/api'
import type { TProfile } from '@/types/profile'
import { api } from '../lib/axios'

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1 // 1MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/webp',
]

export const imageSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= MAX_UPLOAD_SIZE,
    `Max image size is ${MAX_UPLOAD_SIZE / (1024 * 1024)}MB.`,
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Only .jpg, .jpeg, .png and .webp formats are accepted.',
  )

export const uploadFile = (file: File, type: 'Profile Photo' | 'Signature') => {
  const formData = new FormData()
  formData.append('file', file)

  return api.patch<ApiResponse<string>>('/staff/profile/uploadFile', formData, {
    params: {
      type,
    },
  })
}

export const useUploadProfile = (
  options?: Omit<
    UseMutationOptions<string, Error, File>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['upload-file', 'profile'],
    mutationFn: async (file: File) => {
      const response = await uploadFile(file, 'Profile Photo')
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Profile photo uploaded successfully')
      queryClient.setQueryData(['profile'], (old: TProfile) => ({
        ...old,
        photoUrl: response,
      }))
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

export const useUploadSignature = (
  options?: Omit<
    UseMutationOptions<string, Error, File>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['upload-file', 'signature'],
    mutationFn: async (file: File) => {
      const response = await uploadFile(file, 'Signature')
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Signature uploaded successfully')
      queryClient.setQueryData(['profile'], (old: TProfile) => ({
        ...old,
        signatureUrl: response,
      }))
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
