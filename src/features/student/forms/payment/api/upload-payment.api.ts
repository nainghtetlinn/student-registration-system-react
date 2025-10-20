import type { ApiResponse } from '@/types/api'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { api } from '@/api/lib/axios'

const MAX_UPLOAD_SIZE = 1024 * 1024 * 4 // 4MB
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

const uploadPayment = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return api.patch<ApiResponse<string>>('/student/payment', formData)
}

export const useUploadPayment = (
  options?: Omit<
    UseMutationOptions<string, AxiosError<ApiResponse<string>>, File>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['payment', 'upload'],
    mutationFn: async (data) => {
      const response = await uploadPayment(data)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Payment photo uploaded successfully')
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
