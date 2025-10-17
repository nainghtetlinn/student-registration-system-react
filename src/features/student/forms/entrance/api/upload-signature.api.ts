import type { ApiResponse } from '@/types/api'
import type { TForm } from '@/types/form'
import type { UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { TEntranceFormSchema } from '../schema/entrance-form.schema'
import type { TFiles } from '../types/get.type'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { api } from '@/api/lib/axios'

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

const uploadSignature = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return api.patch<ApiResponse<string>>(
    '/student/entranceForm/uploadSignature',
    formData,
  )
}

export const useUploadSignature = (
  options?: Omit<
    UseMutationOptions<string, AxiosError<ApiResponse<string>>, File>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  const queryClient = useQueryClient()

  const { onSuccess, onError, ...restOptions } = options ?? {}

  return useMutation({
    mutationKey: ['form', 'entrance', 'upload-signature'],
    mutationFn: async (data) => {
      const response = await uploadSignature(data)
      return response.data.data
    },
    onSuccess: (response, ...restArgs) => {
      toast.success('Signature uploaded successfully')
      queryClient.setQueryData(
        ['form', 'entrance'],
        (old: {
          formDetails: TForm
          formData: TEntranceFormSchema
          files: TFiles
        }) => {
          return {
            ...old,
            files: { ...old.files, studentSignatureUrl: response },
          }
        },
      )
      onSuccess?.(response, ...restArgs)
    },
    onError: (error, ...restArgs) => {
      toast.error(error.response?.data?.message || error.message)
      onError?.(error, ...restArgs)
    },
    ...restOptions,
  })
}
