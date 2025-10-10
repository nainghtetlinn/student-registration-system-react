import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'

import type { ApiResponse } from '@/types/api'
import type { TForm, TUploadStampResponse } from '@/types/form'
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

const uploadStamp = (file: File, id: string) => {
  const formData = new FormData()
  formData.append('file', file)

  return api.post<ApiResponse<TUploadStampResponse>>(
    '/admin/forms/upload-stamp/' + id,
    formData,
  )
}

export const useUploadStamp = (
  id: string,
  options?: Omit<
    UseMutationOptions<string, Error, File>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['form', 'upload-stamp'],
    mutationFn: async (data) => {
      const response = await uploadStamp(data, id)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Form stamp uploaded successfully')
      queryClient.setQueryData(['forms', 'details', id], (old: TForm) => ({
        ...old,
        stampUrl: response,
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
